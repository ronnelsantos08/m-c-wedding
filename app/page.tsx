"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Music,
  Users,
  Camera,
  Utensils,
  Quote,
  ExternalLink,
  Crown
} from 'lucide-react';

// Improved Scroll Reveal Component
const Reveal = ({ children, width = "w-full", delay = 0, threshold = 0.15 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${width} transition-all duration-[1200ms] ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const WindStreak = ({ top, delay, duration }) => (
  <div 
    className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-wind"
    style={{
      top: `${top}%`,
      left: '-20%',
      width: '40%',
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

const HeroSparkle = ({ left, top, size, delay, duration }) => (
  <div 
    className="absolute rounded-full bg-white blur-[1px] animate-sparkle-float pointer-events-none"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`
    }}
  />
);

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Trabiesa+Tagaytay";

  const sparkleData = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SectionTitle = ({ children, subtitle }) => (
    <Reveal threshold={0.2}>
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-script text-[#8E7C9B] mb-2 tracking-normal">{children}</h2>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4A5A5] to-transparent mx-auto mb-4"></div>
        {subtitle && <p className="text-[#A68DAD] italic font-light tracking-widest uppercase text-[10px]">{subtitle}</p>}
      </div>
    </Reveal>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F8] text-[#5D5461] font-sans selection:bg-[#D4A5A5] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&family=Great+Vibes&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Great Vibes', cursive; }

        @keyframes wind {
          0% { transform: translateX(-100%) scaleX(0.5); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateX(400%) scaleX(2); opacity: 0; }
        }
        .animate-wind { animation: wind linear infinite; }

        @keyframes sparkle-float {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { opacity: 1; transform: translateY(-20px) scale(1); }
          80% { opacity: 1; transform: translateY(-80px) scale(1); }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        .animate-sparkle-float { animation: sparkle-float linear infinite; }

        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrollY > 100 ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className={`font-script text-4xl transition-colors duration-500 ${scrollY > 100 ? 'text-[#8E7C9B]' : 'text-white'}`}>Michael & Charlotte</span>
          <div className={`hidden lg:flex space-x-10 uppercase text-[10px] tracking-[0.3em] font-semibold transition-colors duration-500 ${scrollY > 100 ? 'text-[#8E7C9B]' : 'text-white/90'}`}>
            {['home', 'story', 'details', 'entourage', 'attire', 'program'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-[#D4A5A5] transition-all relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4A5A5] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button className={`lg:hidden p-2 transition-colors duration-500 ${scrollY > 100 ? 'text-[#8E7C9B]' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D2430]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding flowers background" 
            className="w-full h-full object-cover opacity-70 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#FDF8F8]"></div>
        </div>

        <div className="absolute inset-0 z-10 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <WindStreak key={i} top={10 + (i * 8)} delay={Math.random() * 5} duration={3 + Math.random() * 4} />
          ))}
          {sparkleData.map((sparkle) => (
            <HeroSparkle key={sparkle.id} {...sparkle} />
          ))}
        </div>
        
        <div className="text-center z-20 px-4 mt-[-2vh]">
          <Reveal delay={200}><p className="uppercase tracking-[0.6em] text-white/90 mb-4 text-[10px] md:text-xs font-semibold drop-shadow-lg">The Wedding Celebration of</p></Reveal>
          
          <Reveal delay={400}>
            <h1 className="text-6xl md:text-[8rem] font-script text-white leading-none mb-4 pb-4 drop-shadow-2xl">Michael & Charlotte</h1>
          </Reveal>

          {/* Date Display on Hero */}
          <Reveal delay={500}>
             <div className="flex flex-col items-center justify-center mb-10">
               <div className="h-px w-16 bg-white/40 mb-4"></div>
               <div className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <p className="font-serif text-white text-xl md:text-2xl tracking-[0.3em] uppercase">April 26, 2026</p>
               </div>
               <div className="h-px w-16 bg-white/40 mt-4"></div>
             </div>
          </Reveal>
          
          <Reveal delay={600}>
            <div className="max-w-2xl mx-auto mb-12">
              <p className="font-serif italic text-white/90 text-lg md:text-2xl mb-4 leading-relaxed tracking-wide">
                “Wait on the LORD; be of good courage…”
              </p>
              <p className="uppercase tracking-[0.4em] text-white/70 text-[10px] font-bold">— Psalm 27:14</p>
            </div>
          </Reveal>
          
          <Reveal delay={800}>
            <div className="relative z-30">
              <a href="#story" className="inline-block animate-bounce p-4 rounded-full border-2 border-white/40 text-white bg-white/10 backdrop-blur-md">
                <ChevronDown size={28} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Love Story Section */}
      <section id="story" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=2000" 
            alt="Soft pink flowers" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle subtitle="Written by His Grace">Our Love Story</SectionTitle>
          
          <div className="space-y-12 text-center">
            <Reveal delay={100}>
              <div className="relative inline-block mb-8">
                <Quote className="text-[#D4A5A5]/20 absolute -top-8 -left-8 w-16 h-16" />
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#5D5461] relative z-10">
                  In the Lord’s perfect timing, a simple online conversation became the beginning of a journey authored by His grace. 
                  What began as exchanged messages soon unfolded into Bible studies, heartfelt discussions about Jesus, 
                  and moments of reflection shaped by watching <span className="text-[#8E7C9B] italic">The Chosen</span>.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-light text-lg leading-relaxed text-gray-600">
                As we spoke of Christ, our spirits grew beautifully intertwined. Charlotte has always believed in a love that begins in the spirit, 
                flows into the soul, and ultimately joins the body—an order divinely aligned with God’s design. 
                In His goodness, that is exactly how our love story unfolded.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4A5A5] to-transparent mx-auto"></div>
            </Reveal>

            <Reveal delay={400}>
              <p className="font-light text-lg leading-relaxed text-gray-600">
                From a strong spiritual foundation grew a deep emotional bond—strengthened through nightly prayers, unbroken conversations, 
                and a shared desire to honor God in every step. Together, we explored Cebu, Bohol, and Dumaguete, journeyed through Vietnam, 
                and served side by side in mission work across Metro Manila, Rizal, Batangas, Bulacan and Lubao Pampanga.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="bg-white/90 backdrop-blur-sm p-10 rounded-[3rem] border border-pink-100 shadow-sm italic">
                <p className="font-serif text-xl text-[#8E7C9B] leading-relaxed">
                  "It was such a very special day when Michael asked Charlotte to be his wife. In that sacred moment, 
                  wrapped in God’s nearness, we knew we were ready to enter into covenant and love one another eternally."
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#D4A5A5] font-bold">August 30, 2025 • Benguet Mountains</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-32 px-6 bg-[#FDF8F8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=2000" 
            alt="Garden pathway" 
            className="w-full h-full object-cover"
          />
        </div>

        <SectionTitle subtitle="Save the Date">Wedding Details</SectionTitle>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          <Reveal delay={100}>
            <div className="p-12 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white hover:shadow-xl transition-all h-full group">
              <Calendar className="text-[#D4A5A5] mb-6 transition-transform group-hover:scale-110" size={40} />
              <h3 className="text-4xl font-script text-[#8E7C9B] mb-4">The Ceremony</h3>
              <p className="flex items-center gap-3 text-lg mb-4 italic text-[#A68DAD]"><Clock size={20} /> 2:30 PM</p>
              <div className="flex gap-3">
                <MapPin className="text-[#D4A5A5] shrink-0" size={24} />
                <div className="flex-1">
                  <div className="flex items-center justify-between group/link">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">
                      <p className="font-script text-2xl">Trabiesa Garden</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500">Tagaytay City</p>
                    </a>
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#FDF8F8] rounded-full text-[#D4A5A5] hover:bg-[#D4A5A5] hover:text-white transition-all transform group-hover/link:scale-110 shadow-sm" title="Open in Google Maps">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest text-[#A68DAD] mb-4">Officiated By</p>
                <div className="space-y-2">
                    <p className="font-serif">Pastor Salvador Nava <span className="text-[10px] text-[#A68DAD] italic ml-2">(Officiant)</span></p>
                    <p className="font-serif">Pastor Joebert Armian <span className="text-[10px] text-[#A68DAD] italic ml-2">(Assistant Officiant)</span></p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="p-12 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white hover:shadow-xl transition-all h-full group">
              <Sparkles className="text-[#A68DAD] mb-6 transition-transform group-hover:scale-110" size={40} />
              <h3 className="text-4xl font-script text-[#8E7C9B] mb-4">The Reception</h3>
              <p className="flex items-center gap-3 text-lg mb-4 italic text-[#A68DAD]"><Clock size={20} /> Following the Ceremony</p>
              <div className="flex gap-3">
                <MapPin className="text-[#A68DAD] shrink-0" size={24} />
                <div className="flex-1">
                  <div className="flex items-center justify-between group/link">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7C9B] transition-colors">
                      <p className="font-script text-2xl">Trabiesa Pavillion</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500">Tagaytay City</p>
                    </a>
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#FDF8F8] rounded-full text-[#A68DAD] hover:bg-[#A68DAD] hover:text-white transition-all transform group-hover/link:scale-110 shadow-sm" title="Open in Google Maps">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest text-[#A68DAD] mb-4">Reception Host</p>
                <p className="font-serif">Zyra</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Entourage Section */}
      <section id="entourage" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1519225495810-751253df622a?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding florals" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Witnesses of our Love">The Wedding Entourage</SectionTitle>
          
          <div className="space-y-16">
            {/* Parents Section */}
            <Reveal>
              <div className="text-center max-w-2xl mx-auto p-12 bg-[#FDF8F8]/80 backdrop-blur-sm rounded-[3rem] shadow-sm border border-pink-50/50">
                <Crown className="text-[#D4A5A5] mx-auto mb-4" size={32} />
                <h4 className="font-script text-4xl text-[#8E7C9B] mb-8">Parents of the Bride</h4>
                <p className="font-serif text-gray-400 mb-2 italic text-lg leading-relaxed">
                  The late Cristina Garchitorena & Wilfredo Dizon (+)
                </p>
                
                <div className="h-px w-24 bg-[#D4A5A5]/20 mx-auto my-8"></div>
                
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A5A5] font-bold mb-6">Represented By</p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 italic">Aunt</p>
                    <p className="font-serif text-xl text-[#5D5461]">Josefina Thompson</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 italic">Brother</p>
                    <p className="font-serif text-xl text-[#5D5461]">Jose Mari Dizon</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Principal Sponsors */}
            <Reveal delay={200}>
              <div className="bg-[#FDF8F8]/90 backdrop-blur-md p-16 rounded-[4rem] shadow-sm border border-white">
                <h4 className="font-script text-5xl text-center text-[#8E7C9B] mb-12">Principal Sponsors</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    ["Ptr. Chubasco Villamor", "Mrs. Emily Villamor"],
                    ["Ptr. Ejaz Qaisars", "Mrs. Geraldine Qaisars"],
                    ["Mr. Albert Anthony Tuason", "Mrs. Marina Carina Medel"],
                    ["Mr. Salvador Altar", "Mrs. Lilibeth Altar"],
                    ["Mr. Gerardo Ramon Romano", "Mrs. Roslyn Romano"],
                    ["Mr. Richard Hamilton", "Mrs. Betty Tan-Gomez"],
                    ["Mr. Kelly Kuhlmann", "Mrs. Lynn Thompson-Kuhlmann"],
                    ["Mr. Andy Belmonte", "Mrs. Gladys Rosales"],
                    ["Ptr. Sang Hyun Park", "Mrs. Josefa Callos"]
                  ].map(([mr, mrs], i) => (
                    <div key={i} className="text-center p-6 rounded-3xl hover:bg-white transition-all duration-500 hover:shadow-sm">
                      <p className="font-serif text-[#5D5461] text-lg">{mr}</p>
                      <p className="text-xs text-[#D4A5A5] font-script text-xl my-2">&</p>
                      <p className="font-serif text-[#5D5461] text-lg">{mrs}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Bestman & Maid of Honor */}
            <Reveal delay={300}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-[#FDF8F8] text-center shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest text-[#D4A5A5] mb-2 font-bold">Bestman</p>
                        <p className="font-serif text-2xl text-[#8E7C9B]">Mr. Rob Joy III</p>
                    </div>
                    <div className="bg-white p-10 rounded-[3rem] border border-[#FDF8F8] text-center shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest text-[#D4A5A5] mb-2 font-bold">Maid of Honor</p>
                        <p className="font-serif text-2xl text-[#8E7C9B]">Viktoria Sarah P. Dizon</p>
                    </div>
                </div>
            </Reveal>

            {/* Bridesmaids & Groomsmen */}
            <Reveal delay={400}>
              <div className="bg-white p-16 rounded-[4rem] border border-[#FDF8F8] shadow-sm">
                <h4 className="font-script text-4xl text-center text-[#8E7C9B] mb-12">Groomsmen & Bridesmaids</h4>
                <div className="space-y-10 max-w-2xl mx-auto">
                    {[
                        ["Mr. Meynard Landicho Jr.", "Mrs. Genalyn Landicho"],
                        ["Mr. Kenneth Rei Tuason", "Ms. Majel Melgarejo"],
                        ["Mr. Erwin Caniba", "Ms. Marites Linsoco"]
                    ].map(([man, lady], i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-pink-50 last:border-0">
                            <p className="font-serif text-lg text-gray-700 text-center md:text-left md:w-5/12">{man}</p>
                            <span className="text-[#D4A5A5] font-script text-2xl">&</span>
                            <p className="font-serif text-lg text-gray-700 text-center md:text-right md:w-5/12">{lady}</p>
                        </div>
                    ))}
                </div>
              </div>
            </Reveal>

            {/* Secondary Sponsors */}
            <Reveal delay={500}>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: "Candle", names: ["Mr. Ronaldo Surara", "Mrs. Christine Surara"] },
                  { label: "Cord", names: ["Mr. Kevin Ralph Tuason", "Ms. Jenette Jaudian"] },
                  { label: "Veil", names: ["Mr. Dohnell Dy", "Dra. Cara Imperial"] }
                ].map((item, i) => (
                  <div key={i} className="p-10 bg-[#FDF8F8] rounded-[3rem] text-center border border-white hover:bg-white transition-colors duration-500">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A5A5] mb-4 font-bold">{item.label}</p>
                    <p className="font-serif mb-1">{item.names[0]}</p>
                    <p className="font-script text-xl text-[#D4A5A5] mb-1">&</p>
                    <p className="font-serif">{item.names[1]}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Bearers & Flower Girls */}
            <Reveal delay={600}>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-12 rounded-[4rem] border border-[#FDF8F8] shadow-sm">
                  <h4 className="font-script text-4xl text-[#8E7C9B] mb-10 text-center">Gentlemen Bearers</h4>
                  <div className="space-y-8">
                    {[
                      { label: "Ring Bearer", name: "Mr. Seth Alain Callos" },
                      { label: "Arrhae Bearer", name: "Mr. Jesus Gabriel Dizon" },
                      { label: "Bible Bearer", name: "Mr. Ralph Laurenz Medel" }
                    ].map((item, i) => (
                      <div key={i} className="text-center group">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-[#D4A5A5] transition-colors">{item.label}</p>
                        <p className="font-serif text-lg">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[4rem] border border-[#FDF8F8] shadow-sm">
                  <h4 className="font-script text-4xl text-[#8E7C9B] mb-10 text-center">Flower Girls</h4>
                  <div className="space-y-8">
                    <div className="text-center group">
                       <p className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-[#D4A5A5] transition-colors">Maiden of Honor</p>
                       <p className="font-serif text-lg">Ms. Vivienne Isabelle Kristine Dizon</p>
                    </div>
                    <div className="text-center group">
                       <p className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-[#D4A5A5] transition-colors">Flower Girl</p>
                       <p className="font-serif text-lg">Ms. Joy Qaisars</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Program Flow */}
      <section id="program" className="py-32 px-6 bg-[#FDF8F8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=2000" 
            alt="Cherry blossoms" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle subtitle="The Celebration Continues">Reception Program</SectionTitle>
          <div className="space-y-4 relative before:absolute before:left-4 md:before:left-1/2 before:w-px before:h-full before:bg-[#D4A5A5]/20">
            {[
              { time: "Arrival", title: "Guest Arrival", desc: "Pica-Pica & Acoustic Duo", icon: <Music /> },
              { time: "Welcome", title: "Welcome Remarks", desc: "Host Zyra & Trivia Game", icon: <Users /> },
              { time: "Proper", title: "Entourage Recognition", desc: "Acknowledging loved ones and sponsors", icon: <Heart /> },
              { time: "Grand", title: "Grand Entrance", desc: "Entrance of Team Groom, Team Bride & Newlyweds", icon: <Sparkles /> },
              { time: "Prayer", title: "Opening Prayer", desc: "Ptr. Ejaz Qaisars", icon: <Heart /> },
              { time: "Dance", title: "Traditional Dances", desc: "Brother & Sister Dance / Couple's First Dance", icon: <Music /> },
              { time: "Tradition", title: "Cake & Wine", desc: "Cake Cutting & Wine Toasting by Mr. Rob Joy", icon: <Utensils /> },
              { time: "Spectacle", title: "Fireworks", desc: "Fireworks Display with Sparklers", icon: <Sparkles /> },
              { time: "Dinner", title: "Dinner & Photo Op", desc: "Prayer by Ptr. Joebert Armian", icon: <Utensils /> },
              { time: "Perf", title: "Special Performance", desc: "Ms. Vivienne Isabelle Dizon - Young & Beautiful", icon: <Music /> },
              { time: "Fun", title: "Games & Messages", desc: "Name the Tune / Messages from Sponsors & Friends", icon: <Camera /> },
              { time: "Single", title: "Singles Game", desc: "Ribbon Bouquet & Blind Fold Dance", icon: <Users /> },
              { time: "Memory", title: "Same-Day-Edit", desc: "Highlights of our Special Day", icon: <Camera /> },
              { time: "Closing", title: "Thank You & After Party", desc: "Closing Remarks & After Party Beats", icon: <Music /> },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className={`flex items-center gap-8 mb-8 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block w-1/2 text-right">
                    {i % 2 === 1 && <span className="text-[#A68DAD] font-serif italic text-sm">{item.time}</span>}
                  </div>
                  <div className="z-10 w-8 h-8 rounded-full bg-[#D4A5A5] flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-100">
                    <div className="scale-75">{item.icon}</div>
                  </div>
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-left'}`}>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-l-4 border-[#D4A5A5] transition-colors hover:shadow-md border-r border-t border-b border-white">
                      <h5 className="font-bold text-[#8E7C9B]">{item.title}</h5>
                      <p className="text-xs text-gray-500 font-light">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Attire Section */}
      <section id="attire" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1517722014278-c256a91a6fba?auto=format&fit=crop&q=80&w=2000" 
            alt="White garden flowers" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Cherry Blossoms in Tagaytay">Wedding Motif</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Reveal delay={100}>
                <div className="p-8 bg-[#FDF8F8]/90 backdrop-blur-sm rounded-[2rem] shadow-sm border-t-8 border-[#D4A5A5] border-x border-b border-white">
                  <h4 className="font-script text-2xl text-[#8E7C9B] mb-2">The Ladies</h4>
                  <p className="font-light">Long dress or Gown in shades of <span className="font-bold text-[#D4A5A5]">Dusty Rose</span> or <span className="font-bold text-[#A68DAD]">Lilac</span>.</p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="p-8 bg-[#FDF8F8]/90 backdrop-blur-sm rounded-[2rem] shadow-sm border-t-8 border-[#A68DAD] border-x border-b border-white">
                  <h4 className="font-script text-2xl text-[#8E7C9B] mb-2">The Gentlemen</h4>
                  <p className="font-light">Dark colored suits or long sleeves reflecting the motif shades.</p>
                </div>
              </Reveal>
            </div>
            
            <div className="relative">
              <Reveal delay={400}>
                <div className="grid grid-cols-2 gap-6 h-[400px]">
                  <div className="relative bg-[#D4A5A5] rounded-[3rem] shadow-lg flex flex-col items-center justify-center text-white transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1594235412402-9f9932a37c18?auto=format&fit=crop&q=80&w=800" alt="Dusty Rose" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-soft-light scale-110 group-hover:scale-125 transition-transform duration-[2000ms]" />
                    <div className="relative z-10 text-center px-4">
                      <span className="font-script text-4xl block drop-shadow-md">Dusty Rose</span>
                    </div>
                  </div>
                  <div className="relative bg-[#A68DAD] rounded-[3rem] shadow-lg mt-12 flex flex-col items-center justify-center text-white transform hover:translate-y-2 transition-transform duration-500 overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=800" alt="Lilac" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-soft-light scale-110 group-hover:scale-125 transition-transform duration-[2000ms]" />
                    <div className="relative z-10 text-center px-4">
                      <span className="font-script text-4xl block drop-shadow-md">Lilac</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#FAF6F6] text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1507502707541-f369a3b18502?auto=format&fit=crop&q=80&w=2000" 
            alt="Garden silhouette" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <Reveal>
          <div className="font-script text-7xl md:text-9xl text-[#D4A5A5] mb-8 relative z-10">M & C</div>
          <p className="font-script text-3xl text-[#8E7C9B] relative z-10">Together Forever in His Love</p>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#A68DAD] mt-6 relative z-10">April 26, 2026 • Tagaytay</p>
        </Reveal>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#8E7C9B]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
           <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
           <div className="text-center space-y-8">
              {['home', 'story', 'details', 'entourage', 'attire', 'program'].map(item => (
                <a key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)} className="block font-script text-5xl text-white hover:text-[#D4A5A5]">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default App;