const fs = require('fs');

const file = 'frontend/src/components/FooterComplianceBar.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-charcoal border border-white\/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-mono text-stone-800/g, 
  'bg-charcoal border border-white/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-mono text-amber-50');

fs.writeFileSync(file, content, 'utf8');
