const fs = require('fs');

const filepath = 'frontend/src/App.js';
let content = fs.readFileSync(filepath, 'utf8');
let lines = content.split('\n');

const linesToFix = [3089, 3062, 3082, 3422, 3446, 3499, 3724, 3733, 3773, 3851, 4545, 4546, 4547, 4548, 4549, 4574, 4589, 4601];

linesToFix.forEach(lineNum => {
    let lineIdx = lineNum - 1;
    if (lines[lineIdx]) {
        // replace text-champagne with text-charcoal
        // and hover:text-champagne with hover:text-charcoal/80
        lines[lineIdx] = lines[lineIdx].replace(/text-champagne/g, 'text-charcoal');
        lines[lineIdx] = lines[lineIdx].replace(/hover:text-champagne/g, 'hover:text-charcoal/80');
    }
});

fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
