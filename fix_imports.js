const fs = require('fs');
const file = 'frontend/src/App.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/} , Instagram, Linkedin, Twitter, Facebook } from "lucide-react";/, ", Instagram, Linkedin, Twitter, Facebook } from \"lucide-react\";");

fs.writeFileSync(file, content, 'utf8');
