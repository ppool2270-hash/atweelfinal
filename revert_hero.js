const fs = require('fs');
let code = fs.readFileSync('frontend/src/App.js', 'utf8');

const heroRegex = /<section[^>]*className="relative pt-32 pb-48[^>]*>[\s\S]*?<\/section>/;

const oldHero = `<section 
              className="relative pt-32 pb-48 overflow-hidden flex items-center justify-center min-h-[80vh] bg-tata-dark bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577978250009-41fdb4d59a80?auto=format&fit=crop&w=2000&q=80")' }}
            >
              {/* Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#174195]/85 via-[#231F20]/70 to-[#174195]/95 z-0 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#231F20] via-transparent to-transparent z-0 opacity-80"></div>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Floating Tea Grades */}
                {FLOATING_GRADES.map((item, idx) => (
                  <div
                    key={idx}
                    className={\`absolute hidden sm:flex px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg text-[9px] font-bold tracking-[0.2em] text-tata-grey-light uppercase animate-float \${item.scale}\`}
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 shadow-sm transition-all hover:bg-black/60">
                  <Leaf className="w-4 h-4 text-tata-blue-dark" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white font-bold">100% Organic · India Organic · USDA · ISO 22000</span>
                </div>
                
                <h1 className="font-serif text-[48px] sm:text-[64px] lg:text-[76px] font-medium tracking-tight text-white leading-[1.05] max-w-4xl mx-auto drop-shadow-2xl">
                  Single-Estate <span className="italic text-tata-blue-dark">Organic Tea</span> from the Foothills of Arunachal
                </h1>
                
                <div className="w-20 h-1 bg-tata-blue-dark rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                
                <p className="text-lg sm:text-xl text-tata-grey-light font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Cultivated, plucked, and processed on our own <strong className="font-medium text-white">1,200-bigha</strong> organic garden and <strong className="font-medium text-white">72,000 sq ft</strong> factory in Kharsang. Shipped directly to tea houses and blenders worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    data-testid="hero-explore-catalog"
                    className="bg-tata-blue-dark hover:bg-tata-blue-light text-white font-bold px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-0.5"
                  >
                    <span>Explore Our Tea</span>
                    <ArrowRight className="w-4 h-4 text-tata-dark" />
                  </button>
                  <button
                    onClick={() => setActiveTab("standards")}
                    data-testid="hero-custom-rfq"
                    className="border border-white/40 bg-black/30 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 backdrop-blur-md transform hover:-translate-y-0.5"
                  >
                    <span>Our Operations</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </section>`;

code = code.replace(heroRegex, oldHero);
fs.writeFileSync('frontend/src/App.js', code);
