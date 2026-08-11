const fs = require('fs');

const fixFile = (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/bg-lightgrey text-white/g, 'bg-lightgrey text-charcoal');
  content = content.replace(/bg-lightgrey\/90 text-white/g, 'bg-lightgrey/90 text-charcoal');
  fs.writeFileSync(filepath, content, 'utf8');
}

fixFile('frontend/src/components/AllocationControlDesk.js');
fixFile('frontend/src/App.js');
