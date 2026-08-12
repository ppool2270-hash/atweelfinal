import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

old_hero = """
            <section 
              className="relative w-full overflow-hidden flex items-center justify-center bg-black h-screen pt-28 pb-32 sm:py-20"
            >
              {/* Clean Banner Background Layer */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img 
                  src="/estate/hero-factory.jpg.png" 
                  alt="Tea Factory Overlooking Garden" 
                  className="w-full h-full object-cover object-center opacity-70 sm:opacity-80 transition-transform duration-700 hover:scale-105" 
                />
                {/* Elegant dark vignette to protect text legibility and blend the contained image edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 sm:via-[#0a0a0a]/40 to-[#0a0a0a]/90 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80 pointer-events-none opacity-80"></div>
                {/* Extra text protection gradient for mobile */}
                <div className="absolute inset-0 bg-black/40 sm:hidden pointer-events-none"></div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Floating Tea Grades */}
                
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full flex flex-col items-center text-center gap-6 sm:gap-8">
                <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-none bg-black/50 backdrop-blur-md border border-gray-200 shadow-none transition-all hover:bg-black/70 hover:border-white/40">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
                  <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white font-bold">100% Organic · USDA · ISO 22000</span>
                </div>
                
                <h1 className="font-sans font-medium tracking-tight text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-4xl mx-auto">
                  Single-Estate <span className="italic text-gray-300">Organic Tea</span> from the Foothills of Arunachal
                </h1>
                
                <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-transparent rounded-none  opacity-80" />
                
                <p className="text-sm sm:text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto  px-2 sm:px-0">
                  Cultivated, plucked, and processed on our own <strong className="font-medium text-white">1,200-bigha</strong> organic garden and <strong className="font-medium text-white">72,000 sq ft</strong> factory in Kharsang. Shipped directly to tea houses worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto mt-2">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    data-testid="hero-explore-catalog"
                    className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-none text-[11px] sm:text-[12px] uppercase tracking-[0.2em]  hover: transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                  >
                    <span>Explore Our Tea</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("standards")}
                    data-testid="hero-custom-rfq"
                    className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-none text-[11px] sm:text-[12px] uppercase tracking-[0.2em]  hover: transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md transform hover:-translate-y-1"
                  >
                    <span>Our Operations</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
"""

content = re.sub(
    r'<section\s+className="relative w-full overflow-hidden flex flex-col items-center justify-between bg-black h-screen pb-16 pt-32"\s*>.*?</section>',
    old_hero.strip(),
    content,
    flags=re.DOTALL
)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
