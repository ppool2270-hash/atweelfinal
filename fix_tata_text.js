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
    
    // Any button/element that has bg-tata-blue (or from-tata-blue) and text-tata-dark should be text-white
    content = content.replace(/bg-tata-blue([^"]*)text-tata-dark/g, "bg-tata-blue$1text-white");
    content = content.replace(/from-tata-blue([^"]*)text-tata-dark/g, "from-tata-blue$1text-white");
    
    fs.writeFileSync(file, content);
});
console.log('Fixed contrast text.');
