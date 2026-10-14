#!/usr/bin/env node
// Add a commit message as an entry under "## [Unreleased]" in CHANGELOG.md.
//
// Usage: node add-changelog-entry.js CHANGELOG.md "<commit subject>"
// The subject's prefix picks the group: add/feat -> Added, fix -> Fixed,
// del/remove -> Removed, deprecate -> Deprecated, sec/security -> Security,
// anything else -> Changed. Prints the entry if one was added, nothing otherwise.
'use strict';

const fs = require('fs');

const [path = 'CHANGELOG.md', subject = ''] = process.argv.slice(2);
const GROUP_ORDER = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
const PREFIX_GROUPS = {
  add: 'Added', feat: 'Added',
  fix: 'Fixed',
  del: 'Removed', remove: 'Removed',
  deprecate: 'Deprecated',
  sec: 'Security', security: 'Security',
};
// Subjects that never belong in the changelog
const SKIP = [/^Merge /, /^Revert "/, /^Release changelog /, /^goo:/i, /\[skip changelog\]/i];

if (!subject.trim() || SKIP.some(re => re.test(subject))) process.exit(0);

// "ref(scope)!: change thing" -> group from "ref", text "Change thing"
const match = subject.match(/^(\w+)(?:\([^)]*\))?!?:\s*(.+)$/);
const group = (match && PREFIX_GROUPS[match[1].toLowerCase()]) || 'Changed';
let text = (match ? match[2] : subject).trim();
text = text.charAt(0).toUpperCase() + text.slice(1);
const entry = `- ${text}`;

const lines = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('\n');
const unreleased = lines.findIndex(l => /^## \[Unreleased\]/i.test(l));
if (unreleased === -1) {
  console.error(`No "## [Unreleased]" heading found in ${path}`);
  process.exit(1);
}
let bodyEnd = lines.findIndex((l, i) => i > unreleased && /^## \[/.test(l));
if (bodyEnd === -1) bodyEnd = lines.length;

const body = lines.slice(unreleased + 1, bodyEnd);
if (body.some(l => l.trim() === entry)) process.exit(0);

// { group: [entry lines] }, then add the new entry at the top of its group
const groups = new Map();
let current = 'Changed';
for (const line of body) {
  const heading = line.match(/^###\s+(.+?)\s*$/);
  if (heading) current = heading[1];
  if (!groups.has(current)) groups.set(current, []);
  if (!heading && line.trim()) groups.get(current).push(line.trimEnd());
}
groups.set(group, [entry, ...(groups.get(group) || [])]);

const names = [...GROUP_ORDER, ...[...groups.keys()].filter(g => !GROUP_ORDER.includes(g))]
  .filter(g => groups.has(g) && groups.get(g).length);
const rendered = names.flatMap(name => [`### ${name}`, ...groups.get(name), '']);

const output = [...lines.slice(0, unreleased + 1), '', ...rendered, ...lines.slice(bodyEnd)];
fs.writeFileSync(path, output.join('\n').replace(/\n+$/, '') + '\n');
console.log(entry);
