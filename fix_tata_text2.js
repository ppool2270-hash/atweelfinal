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
    content = content.replace(/text-tata-dark bg-tata-blue/g, "text-white bg-tata-blue");
    
    fs.writeFileSync(file, content);
});
