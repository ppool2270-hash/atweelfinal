const fs = require('fs');
const file = 'frontend/src/App.js';
let content = fs.readFileSync(file, 'utf8');

// The view-home div starts around line 1478.
const viewHomeStart = content.indexOf('<div data-testid="view-home">');

// The components before the hero section:
const cinematicSplitHeroStart = content.indexOf('{/* CINEMATIC SPLIT HERO */}');
// The start of the hero video section:
const heroVideoStart = content.indexOf('<section className="relative min-h-[440px] flex flex-col justify-center overflow-hidden px-6 pt-10 pb-12">');

// The start of the next section after the about section:
const bentoHighlightsStart = content.indexOf('{/* BENTO HIGHLIGHTS & B2B OPERATIONS SECTION */}');

if (viewHomeStart !== -1 && cinematicSplitHeroStart !== -1 && heroVideoStart !== -1 && bentoHighlightsStart !== -1) {
  // Extract the part to move (from heroVideoStart up to bentoHighlightsStart)
  const partToMove = content.substring(heroVideoStart, bentoHighlightsStart);
  
  // Extract the original first part (from CinematicSplitHero to just before the hero video)
  const originalTopPart = content.substring(cinematicSplitHeroStart, heroVideoStart);
  
  // We need to put partToMove BEFORE originalTopPart inside view-home.
  
  // Reassemble:
  const beforeViewHome = content.substring(0, cinematicSplitHeroStart);
  const afterBento = content.substring(bentoHighlightsStart);
  
  const newContent = beforeViewHome + partToMove + originalTopPart + afterBento;
  
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully reordered sections.');
} else {
  console.log('Failed to find sections.');
}
