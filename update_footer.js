const fs = require('fs');

const file = 'frontend/src/App.js';
let content = fs.readFileSync(file, 'utf8');

// Update imports
if (!content.includes('Instagram')) {
  content = content.replace(
    /from "lucide-react";/,
    ", Instagram, Linkedin, Twitter, Facebook } from \"lucide-react\";"
  );
}

// Add Social Media snippet
const targetText = 'Atweel Food & Beverages Pvt. Ltd. · FSSAI & CIN available on request\n            </p>';
const socialHtml = `Atweel Food & Beverages Pvt. Ltd. · FSSAI & CIN available on request
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>`;

content = content.replace(targetText, socialHtml);

fs.writeFileSync(file, content, 'utf8');
