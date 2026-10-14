#!/usr/bin/env node
// Move entries under "## [Unreleased]" in CHANGELOG.md to a new release.
//
// Usage: node release-changelog.js [path] [YYYY.MM.DD]
// The release is dated today. The first release of a day is YYYY.MM.DD;
// later ones that day are YYYY.MM.DD.1, YYYY.MM.DD.2, ...
// Prints the version if anything was released, nothing otherwise.
'use strict';

const fs = require('fs');

const path = process.argv[2] || 'CHANGELOG.md';
const TIMEZONE = 'America/New_York';
const GROUP_ORDER = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
const RELEASE_HEADING = /^## \[/;

function today() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date());
  const get = type => parts.find(p => p.type === type).value;
  return `${get('year')}.${get('month')}.${get('day')}`;
}

// { group: [entry lines] } for a release body. Ungrouped entries go under Changed.
function parseGroups(lines) {
  const groups = new Map();
  let current = null;
  for (const line of lines) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
      current = heading[1];
      if (!groups.has(current)) groups.set(current, []);
    } else if (line.trim()) {
      const name = current || 'Changed';
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(line.trimEnd());
    }
  }
  for (const [name, items] of groups) if (!items.length) groups.delete(name);
  return groups;
}

function renderGroups(groups) {
  const names = [...GROUP_ORDER.filter(g => groups.has(g)), ...[...groups.keys()].filter(g => !GROUP_ORDER.includes(g))];
  return names.flatMap(name => [`### ${name}`, ...groups.get(name), '']);
}

// Index of the next "## [" heading after start, or lines.length.
function nextRelease(lines, start) {
  for (let i = start + 1; i < lines.length; i++) if (RELEASE_HEADING.test(lines[i])) return i;
  return lines.length;
}

// Next free version for a date: the date itself, then date.1, date.2, ...
function nextVersion(lines, date) {
  const escaped = date.replace(/\./g, '\\.');
  const counters = lines
    .map(l => l.match(new RegExp(`^## \\[${escaped}(?:\\.(\\d+))?\\]`)))
    .filter(Boolean)
    .map(m => Number(m[1] || 0));
  return counters.length ? `${date}.${Math.max(...counters) + 1}` : date;
}

const lines = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('\n');
const unreleased = lines.findIndex(l => /^## \[Unreleased\]/i.test(l));
if (unreleased === -1) {
  console.error(`No "## [Unreleased]" heading found in ${path}`);
  process.exit(1);
}

const bodyEnd = nextRelease(lines, unreleased);
const fresh = parseGroups(lines.slice(unreleased + 1, bodyEnd));
if (!fresh.size) process.exit(0);

const version = nextVersion(lines, process.argv[3] || today());
const output = [...lines.slice(0, unreleased + 1), '', `## [${version}]`, '', ...renderGroups(fresh), ...lines.slice(bodyEnd)];
fs.writeFileSync(path, output.join('\n').replace(/\n+$/, '') + '\n');
console.log(version);
