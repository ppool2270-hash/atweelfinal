const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
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
    
    // Replace combinations first
    content = content.replace(/bg-champagne text-charcoal/g, "bg-tata-blue text-white");
    content = content.replace(/bg-champagne hover:bg-champagne text-charcoal/g, "bg-tata-blue hover:bg-tata-light-blue text-white");
    content = content.replace(/bg-champagne hover:bg-white text-charcoal/g, "bg-tata-blue hover:bg-tata-light-blue text-white");
    
    // Replace hover states involving champagne
    content = content.replace(/hover:bg-champagne/g, "hover:bg-tata-light-blue");
    content = content.replace(/hover:text-champagne/g, "hover:text-tata-light-blue");
    content = content.replace(/hover:border-champagne/g, "hover:border-tata-light-blue");
    
    // Replace general champagne
    content = content.replace(/bg-champagne/g, "bg-tata-blue");
    content = content.replace(/text-champagne/g, "text-tata-blue");
    content = content.replace(/border-champagne/g, "border-tata-blue");
    content = content.replace(/from-champagne/g, "from-tata-blue");
    content = content.replace(/to-champagne/g, "to-tata-blue");
    content = content.replace(/via-champagne/g, "via-tata-blue");
    content = content.replace(/ring-champagne/g, "ring-tata-blue");
    
    // Replace ivory with tata-bg
    content = content.replace(/bg-ivory/g, "bg-tata-bg");
    content = content.replace(/text-ivory/g, "text-tata-bg");
    content = content.replace(/from-ivory/g, "from-tata-bg");
    content = content.replace(/to-ivory/g, "to-tata-bg");
    content = content.replace(/via-ivory/g, "via-tata-bg");

    // Replace charcoal with tata-dark
    content = content.replace(/bg-charcoal/g, "bg-tata-dark");
    content = content.replace(/text-charcoal/g, "text-tata-dark");
    content = content.replace(/border-charcoal/g, "border-tata-dark");
    content = content.replace(/from-charcoal/g, "from-tata-dark");
    content = content.replace(/to-charcoal/g, "to-tata-dark");
    content = content.replace(/via-charcoal/g, "via-tata-dark");
    content = content.replace(/shadow-charcoal/g, "shadow-tata-dark");
    
    // Replace lightgrey with tata-light
    content = content.replace(/bg-lightgrey/g, "bg-tata-light");
    content = content.replace(/text-lightgrey/g, "text-tata-light");
    content = content.replace(/border-lightgrey/g, "border-tata-light");

    fs.writeFileSync(file, content);
});
console.log('Palette updated in JS files.');
