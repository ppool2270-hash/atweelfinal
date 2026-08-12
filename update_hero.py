import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Replace hero section
new_hero = """
            <section 
              className="relative w-full overflow-hidden flex flex-col items-center justify-between bg-black h-screen pb-16 pt-32"
            >
              {/* Clean Banner Background Layer */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img 
                  src="/estate/hero-factory.jpg.png" 
                  alt="Tea Factory Overlooking Garden" 
                  className="w-full h-full object-cover object-center opacity-80" 
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
              </div>
              
              {/* Top Text Content */}
              <div className="relative z-10 max-w-5xl mx-auto px-5 w-full flex flex-col items-center text-center gap-4 mt-[5vh]">
                <h1 className="font-sans font-medium tracking-tight text-[40px] sm:text-[56px] text-white leading-tight">
                  Single-Estate Organic Tea
                </h1>
                
                <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">
                  Cultivated and processed on our 1,200-bigha organic garden in Kharsang.
                </p>
              </div>

              {/* Bottom Buttons & Badges */}
              <div className="relative z-10 w-full px-5 flex flex-col items-center gap-6 mb-[5vh]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-black/20 backdrop-blur-md border border-white/10 shadow-none">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white font-medium">100% Organic · USDA · ISO 22000</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    data-testid="hero-explore-catalog"
                    className="w-full sm:w-[264px] bg-[#3e3e3e]/80 hover:bg-[#3e3e3e] backdrop-blur-md text-white font-medium py-2.5 rounded text-[13px] transition-colors duration-300 flex items-center justify-center"
                  >
                    Explore Our Tea
                  </button>
                  <button
                    onClick={() => setActiveTab("standards")}
                    data-testid="hero-custom-rfq"
                    className="w-full sm:w-[264px] bg-[#f4f4f4]/80 hover:bg-[#f4f4f4] backdrop-blur-md text-[#393c41] font-medium py-2.5 rounded text-[13px] transition-colors duration-300 flex items-center justify-center"
                  >
                    Our Operations
                  </button>
                </div>
              </div>
            </section>
"""

content = re.sub(
    r'<section\s+className="relative w-full overflow-hidden flex items-center justify-center bg-black h-screen pt-28 pb-32 sm:py-20"\s*>.*?</section>',
    new_hero.strip(),
    content,
    flags=re.DOTALL
)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
