const fs = require('fs');

const filepath = 'frontend/src/components/QualityMetrics.js';
let content = fs.readFileSync(filepath, 'utf8');

let lines = content.split('\n');

for (let i = 630; i < 650; i++) {
  if (lines[i]) {
    lines[i] = lines[i].replace(/text-stone-800/g, 'text-amber-50');
    lines[i] = lines[i].replace(/text-stone-600/g, 'text-stone-300');
  }
}

fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
