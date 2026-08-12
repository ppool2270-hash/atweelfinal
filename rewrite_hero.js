const fs = require('fs');
let code = fs.readFileSync('frontend/src/App.js', 'utf8');

const heroRegex = /<section[^>]*className="relative pt-32 pb-48[^>]*>[\s\S]*?<\/section>/;

const newHero = `<section 
              className="relative pt-32 pb-48 overflow-hidden flex items-center justify-center min-h-[80vh] bg-tata-dark bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577978250009-41fdb4d59a80?auto=format&fit=crop&w=2000&q=80")' }}
            >
              {/* Refined Overlays Using #bcb3b3 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#174195]/85 via-[#bcb3b3]/30 to-[#231F20]/95 z-0 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#231F20] via-transparent to-[#bcb3b3]/20 z-0 opacity-90"></div>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Floating Tea Grades */}
                {FLOATING_GRADES.map((item, idx) => (
                  <div
                    key={idx}
                    className={\`absolute hidden sm:flex px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#bcb3b3]/40 shadow-lg text-[9px] font-bold tracking-[0.2em] text-[#bcb3b3] uppercase animate-float \${item.scale}\`}
                    style={{
                      top: item.top,
                      left: item.left,
                      animationDelay: item.delay,
                    }}
                  >
                    {item.grade}
                  </div>
                ))}
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center gap-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#bcb3b3]/50 shadow-sm transition-all hover:bg-black/60">
                  <Sparkles className="w-4 h-4 text-[#bcb3b3]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#bcb3b3] font-bold">AI-Powered Global Sourcing</span>
                </div>
                
                <h1 className="font-serif text-[48px] sm:text-[64px] lg:text-[76px] font-medium tracking-tight text-white leading-[1.05] max-w-4xl mx-auto drop-shadow-2xl">
                  Single-Estate <span className="italic text-[#bcb3b3]">Organic Tea</span> from the Foothills of Arunachal
                </h1>
                
                <div className="w-20 h-1 bg-[#bcb3b3] rounded-full shadow-[0_0_15px_rgba(188,179,179,0.6)]" />
                
                <p className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Cultivated, plucked, and processed on our own <strong className="font-medium text-white">1,200-bigha</strong> organic garden. Shipped directly to tea houses worldwide.
                </p>
                
                {/* AI Search Bar */}
                <div className="w-full max-w-2xl mt-4 bg-white/10 backdrop-blur-md border border-[#bcb3b3]/40 rounded-full p-2 flex items-center shadow-2xl focus-within:ring-2 focus-within:ring-[#bcb3b3] transition-all">
                  <div className="pl-4 pr-2">
                    <Bot className="w-5 h-5 text-[#bcb3b3]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Describe your tea requirements... e.g. 'I need a strong breakfast blend for a hotel'" 
                    className="flex-1 bg-transparent border-none text-white placeholder-white/60 focus:outline-none text-sm px-2"
                  />
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="bg-[#bcb3b3] hover:bg-white text-[#231F20] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(188,179,179,0.5)] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Source AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>`;

code = code.replace(heroRegex, newHero);
fs.writeFileSync('frontend/src/App.js', code);
