#!/usr/bin/env node
// Print a released version from CHANGELOG.md and write its section as release notes.
//
// Usage: node changelog-notes.js CHANGELOG.md notes.md [version]
// Without a version, uses the newest dated release (the first "## [YYYY.MM.DD[.N]]").
// Prints nothing and exits 0 when no matching section exists.
'use strict';

const fs = require('fs');

const [changelogPath = 'CHANGELOG.md', notesPath = 'notes.md', wanted] = process.argv.slice(2);
const lines = fs.readFileSync(changelogPath, 'utf8').replace(/\r\n/g, '\n').split('\n');

const isRelease = l => /^## \[\d{4}\.\d{2}\.\d{2}(?:\.\d+)?\]/.test(l);
const start = lines.findIndex(l => (wanted ? l.startsWith(`## [${wanted}]`) : isRelease(l)));
if (start === -1) process.exit(0);

const version = lines[start].match(/^## \[([^\]]+)\]/)[1];
let end = lines.findIndex((l, i) => i > start && /^## \[/.test(l));
if (end === -1) end = lines.length;

const notes = lines.slice(start + 1, end).join('\n').trim();
if (!notes) process.exit(0);

fs.writeFileSync(notesPath, notes + '\n');
console.log(version);
