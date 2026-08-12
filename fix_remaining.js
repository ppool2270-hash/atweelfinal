const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace remaining references
    content = content.replace(/shadow-champagne/g, "shadow-tata-light-blue");
    content = content.replace(/accent-champagne/g, "accent-tata-blue");
    content = content.replace(/placeholder-lightgrey/g, "placeholder-tata-light");
    content = content.replace(/shadow-charcoal/g, "shadow-tata-dark");
    
    // Some buttons currently have: "bg-gradient-to-r from-tata-blue to-tata-blue text-tata-dark font-bold py-3.5"
    // Wait, text-tata-dark on tata-blue (dark blue) is illegible.
    content = content.replace(/from-tata-blue to-tata-blue text-tata-dark/g, "from-tata-blue to-tata-blue text-white");
    content = content.replace(/from-tata-blue via-tata-blue\/80 to-tata-blue text-tata-dark/g, "from-tata-blue via-tata-blue\/80 to-tata-blue text-white");
    content = content.replace(/bg-tata-blue text-tata-dark/g, "bg-tata-blue text-white");
    
    fs.writeFileSync(file, content);
});
console.log('Remaining fixed in JS files.');
