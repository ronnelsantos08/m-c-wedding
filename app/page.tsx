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
  Users,
  Camera,
  Utensils,
  Quote,
  ExternalLink,
  Crown,
  Gift,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';


import { Play, Pause, Music } from "lucide-react";
/**
 * Types & Interfaces
 */
interface RevealProps {
  children: React.ReactNode;
  width?: string;
  delay?: number;
  threshold?: number;
}

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

interface AnimationProps {
  top?: number;
  left?: number;
  size?: number;
  delay: number;
  duration: number;
}

// Improved Scroll Reveal Component
const Reveal: React.FC<RevealProps> = ({ children, width = "w-full", delay = 0, threshold = 0.15 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

const WindStreak: React.FC<AnimationProps> = ({ top, delay, duration }) => (
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

const HeroSparkle: React.FC<AnimationProps> = ({ left, top, size, delay, duration }) => (
  <div 
    className="absolute rounded-full bg-white blur-[1px] animate-sparkle-float pointer-events-none"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      boxShadow: `0 0 ${(size || 1) * 2}px rgba(255, 255, 255, 0.8)`
    }}
  />
);

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeEntourageCard, setActiveEntourageCard] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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


const audioRef = useRef<HTMLAudioElement | null>(null);
const [isPlaying, setIsPlaying] = useState(false);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
};

  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [attending, setAttending] = useState('');
const [guests, setGuests] = useState('1');
const [message, setMessage] = useState('');
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Here you can:
  // 1️⃣ Send data to an API endpoint
  // 2️⃣ Send email via serverless function
  // 3️⃣ Save to Google Sheets using API

  console.log({ name, email, attending, guests, message });

  // Reset form
  setName('');
  setEmail('');
  setAttending('');
  setGuests('1');
  setMessage('');
  setSubmitted(true);

  setTimeout(() => setSubmitted(false), 5000);
};


  

const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle }) => (
  <Reveal threshold={0.2}>
    <div className="text-center mb-10 md:mb-16 relative z-10 px-4">
      <h2 className="text-4xl md:text-7xl font-script text-[black] mb-2 tracking-normal">{children}</h2>
      <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-[#D4A5A5] to-transparent mx-auto mb-4"></div>
      {subtitle && <p className="text-[black] italic font-light tracking-widest uppercase text-[9px] md:text-[10px]">{subtitle}</p>}
    </div>
  </Reveal>
);

const entourageData = [
  {
    title: "Bride and Groom",
    content: (
      <div className="text-center px-2">
        <Crown className="text-[#D4A5A5] mx-auto mb-4" size={28} />
  
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A5A5] font-bold mb-3">
          The Wedding Celebration of
        </p>
  
        <p className="font-script text-3xl md:text-4xl text-[#8E7C9B] mb-4">
          Michael <span className="mx-2">&</span> Charlotte
        </p>
  
        <div className="h-px w-20 bg-[#D4A5A5]/30 mx-auto my-6 md:my-8"></div>
  
        <p className="font-serif text-gray-400 italic text-sm md:text-lg leading-relaxed">
          United in love, faith, and God’s grace as they begin their forever.
        </p>
      </div>
    )
  },
  
  {
    title: "Parents of the Bride",
    content: (
      <div className="text-center px-2">
        <Crown className="text-[#D4A5A5] mx-auto mb-4" size={28} />
        <p className="font-serif text-gray-400 mb-2 italic text-sm md:text-lg leading-relaxed">
          The late Cristina Garchitorena & Wilfredo Dizon (+)
        </p>
        <div className="h-px w-16 bg-[#D4A5A5]/20 mx-auto my-6 md:my-8"></div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4A5A5] font-bold mb-4 md:mb-6">Represented By</p>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1 italic">Aunt</p>
            <p className="font-serif text-base md:text-xl text-[#5D5461]">Josefina Thompson</p>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1 italic">Brother</p>
            <p className="font-serif text-base md:text-xl text-[#5D5461]">Jose Mari Dizon</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Principal Sponsors",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-h-[350px] md:max-h-[450px] overflow-y-auto px-4 custom-scrollbar">
        {[
          ["Ptr. Chubasco Villamor", "Mrs. Emily Villamor"],
          ["Ptr. Salvador Nava", "Mrs. Elisa Nava"],
          ["Ptr. Ejaz Qaisars", "Mrs. Geraldine Qaisars"],
          ["Mr. Albert Anthony Tuason", "Mrs. Marina Carina Medel"],
          ["Mr. Salvador Altar", "Mrs. Lilibeth Altar"],
          ["Mr. Gerardo Ramon Romano", "Mrs. Roslyn Romano"],
          ["Mr. Richard Hamilton", "Mrs. Betty Tan-Gomez"],
          ["Mr. Kelly Kuhlmann", "Mrs. Lynn Thompson-Kuhlmann"],
          ["Mr. Andy Belmonte", "Mrs. Gladys Rosales"],
          ["Ptr. Sang Hyun Park", "Mrs. Josefa Callos"]
        ].map(([mr, mrs], i) => (
          <div key={i} className="text-center p-3 rounded-xl bg-[#FDF8F8]/50 border border-pink-50/50">
            <p className="font-serif text-[#5D5461] text-[12px] md:text-sm leading-tight">{mr}</p>
            <p className="text-[10px] text-[#D4A5A5] font-script text-lg my-1 leading-none">&</p>
            <p className="font-serif text-[#5D5461] text-[12px] md:text-sm leading-tight">{mrs}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Bestman & Maid of Honor",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-xl mx-auto">
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-[#FDF8F8] text-center shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-[#D4A5A5] mb-2 font-bold">Bestman</p>
          <p className="font-serif text-lg md:text-2xl text-[#8E7C9B]">Mr. Rob Joy III</p>
        </div>
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-[#FDF8F8] text-center shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-[#D4A5A5] mb-2 font-bold">Maid of Honor</p>
          <p className="font-serif text-lg md:text-2xl text-[#8E7C9B]">Viktoria Sarah P. Dizon</p>
        </div>
      </div>
    )
  },
  {
    title: "Bridesmaids & Groomsmen",
    content: (
      <div className="px-2">
        <div className="grid grid-cols-2 gap-6 md:gap-10 text-center">
  
          {/* Groomsmen */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#A68DAD] mb-4 font-bold">
              Groomsmen
            </p>
  
            <div className="space-y-4">
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Mr. Meynard Landicho Jr.
              </p>
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Mr. Kenneth Rei Tuason
              </p>
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Mr. Erwin Caniba
              </p>
            </div>
          </div>
  
          {/* Bridesmaids */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4A5A5] mb-4 font-bold">
              Bridesmaids
            </p>
  
            <div className="space-y-4">
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Mrs. Genalyn Landicho
              </p>
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Ms. Majel Melgarejo
              </p>
              <p className="font-serif text-[#5D5461] text-sm md:text-lg">
                Ms. Marites Linsoco
              </p>
            </div>
          </div>
  
        </div>
      </div>
    )
  },  
  {
    title: "Secondary Sponsors",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-h-[350px] md:max-h-[450px] overflow-y-auto px-4 custom-scrollbar">
        {[
          { label: "Candle", names: ["Mr. Ronaldo Surara", "Mrs. Christine Surara"] },
          { label: "Cord", names: ["Mr. Kevin Ralph Tuason", "Ms. Jenette Jaudian"] },
          { label: "Veil", names: ["Mr. Dohnell Dy", "Dra. Cara Imperial"] }
        ].map((item, i) => (
          <div key={i} className="p-5 md:p-8 bg-[#FDF8F8] rounded-3xl text-center border border-white">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#D4A5A5] mb-2 font-bold">{item.label}</p>
            <p className="font-serif text-[13px] md:text-sm leading-tight">{item.names[0]}</p>
            <p className="font-script text-xl text-[#D4A5A5] my-1 leading-none">&</p>
            <p className="font-serif text-[13px] md:text-sm leading-tight">{item.names[1]}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Bearers & Flower Girls",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto px-2 custom-scrollbar">
        <div className="space-y-3">
           <h5 className="text-center font-script text-2xl text-[#D4A5A5] mb-2">Bearers</h5>
           {[
             { label: "Ring Bearer", name: "Mr. Seth Alain Callos" },
             { label: "Arrhae Bearer", name: "Mr. Jesus Gabriel Dizon" },
             { label: "Bible Bearer", name: "Mr. Ralph Laurenz Medel" }
           ].map((item, i) => (
             <div key={i} className="text-center p-3 rounded-2xl bg-white border border-pink-50">
               <p className="text-[7px] uppercase tracking-widest text-gray-400">{item.label}</p>
               <p className="font-serif text-[13px] md:text-sm">{item.name}</p>
             </div>
           ))}
        </div>
        <div className="space-y-3">
           <h5 className="text-center font-script text-2xl text-[#D4A5A5] mb-2">Flower Girls</h5>
           <div className="text-center p-3 rounded-2xl bg-white border border-pink-50">
              <p className="text-[7px] uppercase tracking-widest text-gray-400">Flower Girl</p>
              <p className="font-serif text-[13px] md:text-sm">Ms. Vivienne Isabelle Kristine Dizon</p>
           </div>
           <div className="text-center p-3 rounded-2xl bg-white border border-pink-50">
              <p className="text-[7px] uppercase tracking-widest text-gray-400">Flower Girl</p>
              <p className="font-serif text-[13px] md:text-sm">Ms. Joy Qaisars</p>
           </div>
        </div>
      </div>
    )
  }
];

const nextCard = () => setActiveEntourageCard((prev) => (prev + 1) % entourageData.length);
const prevCard = () => setActiveEntourageCard((prev) => (prev === 0 ? entourageData.length - 1 : prev - 1));

const faqData = [
  {
    question: "What is the dress code?",
    answer: "We would love to see our guests in Formal/Semi-Formal attire. We suggest pastel colors or neutral tones to match our wedding theme."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity, we can only accommodate the number of seats reserved for you in your invitation. Please check your RSVP form for your specific guest count."
  },
  {
    question: "When is the RSVP deadline?",
    answer: "Please let us know if you can join us by Feb 01, 2026. This helps us finalize arrangements with our venue and caterers."
  }
];

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
            src="/hero.png" 
            alt="Wedding flowers background" 
            className="w-full h-full object-cover opacity-100 scale-100"
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
          <div className="absolute bottom-6 right-6 z-40">
  <button
    onClick={toggleMusic}
    className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/15 backdrop-blur-md border border-white/30 text-white hover:bg-black/25 transition-all shadow-lg"
  >
    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
    <Music size={16} className="opacity-80" />
  </button>
  <audio ref={audioRef} loop>
  <source src="/bgmusic2.mp3" type="audio/mpeg" />
</audio>
</div>
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
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
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
            <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-[3rem] border border-pink-100 shadow-sm italic overflow-visible">

  
  {/* Decorative Ring */}
  <img
    src="/ring.png"
    alt="Wedding ring decoration"
    className="absolute bottom-[-70px] left-[-40px] w-24 md:w-40 opacity-90 ring-float"
  />

  <p className="font-serif text-xl text-[#8E7C9B] leading-relaxed relative z-10">
    "It was such a very special day when Michael asked Charlotte to be his wife.
    In that sacred moment, wrapped in God’s nearness, we knew we were ready to enter
    into covenant and love one another eternally."
  </p>

  <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#D4A5A5] font-bold relative z-10">
    August 30, 2025 • Benguet Mountains
  </p>
</div>

            </Reveal>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-32 px-6 bg-[#FDF8F8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.8] pointer-events-none">
          <img 
            src="/lilac.jpg" 
            alt="Garden pathway" 
            className="w-full h-full object-cover"
          />
        </div>

        <SectionTitle subtitle="Save the Date">Wedding Details</SectionTitle>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">

{/* Ceremony */}
<Reveal delay={100}>
  <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-[3rem] border border-white hover:shadow-xl transition-all overflow-hidden group">
    
    {/* Top Image */}
    <div className="w-full h-64 md:h-80 relative">
      <img 
        src="/ceremony.jpg" 
        alt="Trabiesa Garden Location" 
        className="w-full h-full object-cover rounded-t-[3rem] grayscale-[30%]"
      />
    </div>

    {/* Details Section */}
    <div className="p-8 flex flex-col gap-4 relative z-10">
      <Calendar className="text-[#D4A5A5] mb-4 transition-transform group-hover:scale-110" size={40} />
      <h3 className="text-4xl font-script text-[#8E7C9B] mb-2">The Ceremony</h3>
      <p className="flex items-center gap-3 text-lg italic text-[#A68DAD]"><Clock size={20} /> 2:30 PM</p>

      <div className="flex gap-3 items-start">
        <MapPin className="text-[#D4A5A5] shrink-0" size={24} />
        <div className="flex-1">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">
            <p className="font-script text-2xl">Trabiesa Garden</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Tagaytay City</p>
          </a>
        </div>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/60 rounded-full text-[#D4A5A5] hover:bg-[#D4A5A5] hover:text-white transition-all shadow-sm" title="Open in Google Maps">
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100/50">
        <p className="text-xs uppercase tracking-widest text-[#A68DAD] mb-2 font-semibold">Officiated By</p>
        <p className="font-serif text-[#5D5461]">Pastor Salvador Nava <span className="text-[10px] text-[#A68DAD] italic ml-2">(Officiant)</span></p>
        <p className="font-serif text-[#5D5461]">Pastor Joebert Armian <span className="text-[10px] text-[#A68DAD] italic ml-2">(Assistant Officiant)</span></p>
      </div>
    </div>
  </div>
</Reveal>

{/* Reception */}
<Reveal delay={300}>
  <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-[3rem] border border-white hover:shadow-xl transition-all overflow-hidden group">
    
    {/* Top Image */}
    <div className="w-full h-64 md:h-80 relative">
      <img 
        src="/reception.png" 
        alt="Trabiesa Pavillion Reception" 
        className="w-full h-full object-cover rounded-t-[3rem]"
      />
    </div>

    {/* Details Section */}
    <div className="p-8 flex flex-col gap-4 relative z-10">
      <Sparkles className="text-[#A68DAD] mb-4 transition-transform group-hover:scale-110" size={40} />
      <h3 className="text-4xl font-script text-[#8E7C9B] mb-2">The Reception</h3>
      <p className="flex items-center gap-3 text-lg italic text-[#A68DAD]"><Clock size={20} /> Following the Ceremony</p>

      <div className="flex gap-3 items-start">
        <MapPin className="text-[#A68DAD] shrink-0" size={24} />
        <div className="flex-1">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7C9B] transition-colors">
            <p className="font-script text-2xl">Trabiesa Pavillion</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Tagaytay City</p>
          </a>
        </div>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/60 rounded-full text-[#A68DAD] hover:bg-[#A68DAD] hover:text-white transition-all shadow-sm" title="Open in Google Maps">
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100/50">
        <p className="text-xs uppercase tracking-widest text-[#A68DAD] mb-2 font-semibold">Reception Host</p>
        <p className="font-serif text-[#5D5461]">Zyra</p>
      </div>
    </div>
  </div>
</Reveal>

</div>

        <Reveal delay={500}>
  <div className="relative overflow-hidden p-12 backdrop-blur-md  hover:shadow-xl transition-all">
    <h3 className="text-4xl font-script text-[#8E7C9B] mb-6 text-center">RSVP</h3>
    <p className="text-gray-600 mb-6 text-center">
      Kindly let us know if you’ll be attending our wedding.
    </p>

    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLScz0-QjBlHFn2QGSdW-txHDzW7p3lMH50GDcwPL-kanUnHohQ/formResponse"
      method="POST"
      target="_blank"
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Name */}
      <input
        type="text"
        name="entry.549690523"
        placeholder="Your Name"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A5A5]"
      />

      {/* Email */}
      <input
        type="email"
        name="entry.14247718"
        placeholder="Email"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A5A5]"
      />

      {/* Attending */}
      <select
        name="entry.1843377973"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A5A5]"
      >
        <option value="">Will you attend?</option>
        <option value="Yes, can’t wait!">Yes, can’t wait!</option>
        <option value="No, sadly can’t make it">No, sadly can’t make it</option>
      </select>

      {/* Number of Guests */}
      <input
        type="number"
        name="entry.882834054"
        placeholder="Number of Guests"
        min={1}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A5A5]"
      />

      {/* Message */}
      <textarea
        name="entry.1222939743"
        placeholder="Message / Notes (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A5A5]"
        rows={4}
      />

      <button
        type="submit"
        className="w-full p-3 bg-[#D4A5A5] text-white font-semibold rounded-lg hover:bg-[#8E7C9B] transition-colors"
      >
        Submit RSVP
      </button>
    </form>
  </div>
</Reveal>

      </section>


        {/* Entourage Section with Responsive Card Stack */}
        <section
  id="entourage"
  className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-[#FDF8F8]"
>
  {/* Section Background Image */}
  <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
    <img
      src="entourage.png"
      alt="Floral background"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
          <SectionTitle subtitle="Witnesses of our Love">The Wedding Entourage</SectionTitle>
          
          <div className="relative min-h-[550px] md:h-[650px] w-full flex flex-col items-center">
            {/* Card Stack Container */}
            <div className="relative w-full flex-grow max-w-3xl perspective-1000">
              {entourageData.map((card, index) => {
                let order = (index - activeEntourageCard + entourageData.length) % entourageData.length;
                let isActive = order === 0;
                let scale = 1 - (order * 0.04);
                let translateY = order * 12;
                let zIndex = entourageData.length - order;
                let opacity = order > 2 ? 0 : 1 - (order * 0.4);

                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      zIndex: zIndex,
                      opacity: opacity,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                <div
  className={`w-full h-full bg-white rounded-[2rem] md:rounded-[4rem] border border-[#FDF8F8] shadow-xl md:shadow-2xl p-6 md:p-12 flex flex-col transition-all relative ${isActive ? 'ring-1 ring-pink-50' : 'brightness-95'}`}
>
  <h4 className="font-script text-3xl md:text-5xl text-[#8E7C9B] mb-6 md:mb-10 text-center flex-shrink-0">
    {card.title}
  </h4>
  <div className="w-full flex-grow overflow-hidden flex flex-col justify-center">
    {card.content}
  </div>

  {/* Bottom-right decoration */}
  <img
    src="/deco1.png" // replace with your image URL
    alt="Decoration"
    className="absolute bottom-[-20] right-[-20] w-20 h-20 animate-bounce"
  />
</div>

                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 md:gap-8 mt-10 md:mt-12 relative z-50">
              <button onClick={prevCard} className="p-3 md:p-4 rounded-full bg-white border border-pink-100 text-[#D4A5A5] hover:bg-[#D4A5A5] hover:text-white transition-all shadow-md">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1.5 md:gap-2">
                {entourageData.map((_, i) => (
                  <button key={i} onClick={() => setActiveEntourageCard(i)} className={`h-1.5 rounded-full transition-all duration-500 ${activeEntourageCard === i ? 'w-6 md:w-8 bg-[#D4A5A5]' : 'w-1.5 bg-pink-100'}`} />
                ))}
              </div>
              <button onClick={nextCard} className="p-3 md:p-4 rounded-full bg-white border border-pink-100 text-[#D4A5A5] hover:bg-[#D4A5A5] hover:text-white transition-all shadow-md">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Flow */}
      <section id="program" className="py-32 px-6 bg-[#FDF8F8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[1] pointer-events-none">
          <img 
            src="/programbg.jpg" 
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
                    {i % 2 === 1 && <span className="text-[#C9A9A6] font-serif italic text-sm">{item.time}</span>}
                  </div>
                  <div className="z-10 w-8 h-8 rounded-full bg-[#C9A9A6] flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-100">
                    <div className="scale-75">{item.icon}</div>
                  </div>
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-left'}`}>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-l-4 border-[#C9A9A6] transition-colors hover:shadow-md border-r border-t border-b border-white">
                      <h5 className="font-bold text-[#C9A9A6]">{item.title}</h5>
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
        <div className="absolute inset-0 opacity-[1] pointer-events-none">
          <img 
            src="/motifbg.jpg" 
            alt="White garden flowers" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
  <SectionTitle subtitle="Cherry Blossoms in Tagaytay">Wedding Motif</SectionTitle>
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    {/* Left Cards */}
    <div className="space-y-6">
      <Reveal delay={100}>
        <div className="p-8 bg-[#FDF8F8]/90 backdrop-blur-sm rounded-[2rem] shadow-sm border-t-8 border-[#D4A5A5] border-x border-b border-white">
          <h4 className="font-script text-2xl text-[#8E7C9B] mb-2">The Ladies</h4>
          <p className="font-light">
            Long dress or Gown in shades of 
            <span className="font-bold text-[#D4A5A5]"> Dusty Rose</span> or 
            <span className="font-bold text-[#A68DAD]"> Lilac</span>.
          </p>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div className="p-8 bg-[#FDF8F8]/90 backdrop-blur-sm rounded-[2rem] shadow-sm border-t-8 border-[#A68DAD] border-x border-b border-white">
          <h4 className="font-script text-2xl text-[#8E7C9B] mb-2">The Gentlemen</h4>
          <p className="font-light">Dark colored suits or long sleeves reflecting the motif shades.</p>
        </div>
      </Reveal>
    </div>
    
    {/* Right Images */}
    <div className="relative">
      <Reveal delay={400}>
        <div className="grid grid-cols-2 gap-6 h-[400px]">
          <div className="relative  rounded-[3rem] shadow-lg flex flex-col items-center justify-center text-white transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden group">
            <img src="/dustyrose.jpg" alt="Dusty Rose" className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-soft-light scale-110 group-hover:scale-125 transition-transform duration-[2000ms]" />
            <div className="relative z-10 text-center px-4">
              <span className="font-script text-4xl block drop-shadow-md">Dusty Rose</span>
            </div>
          </div>
          <div className="relative  rounded-[3rem] shadow-lg mt-12 flex flex-col items-center justify-center text-white transform hover:translate-y-2 transition-transform duration-500 overflow-hidden group">
            <img src="lilac.png" alt="Lilac" className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-soft-light scale-110 group-hover:scale-125 transition-transform duration-[2000ms]" />
            <div className="relative z-10 text-center px-4">
              <span className="font-script text-4xl block drop-shadow-md">Lilac</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </div>

  {/* Color Palette */}
  <div className="flex justify-center mt-12 gap-6">
    <div className="w-10 h-10 rounded-full bg-[#D4A5A5] shadow-md"></div>
    <div className="w-10 h-10 rounded-full bg-[#A68DAD] shadow-md"></div>
    <div className="w-10 h-10 rounded-full bg-[#8E7C9B] shadow-md"></div>
    <div className="w-10 h-10 rounded-full bg-[#F2D5D5] shadow-md"></div>
    <div className="w-10 h-10 rounded-full bg-[#FFF0F5] shadow-md"></div>
  </div>
</div>

        {/* Registry Section */}
        <div className="max-w-2xl mx-auto mt-24 text-center px-6 relative z-10">
          <Reveal delay={200}>
             <div className="p-12 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white">
                <Gift className="text-[#D4A5A5] mx-auto mb-6" size={32} />
                <h4 className="font-script text-4xl text-[#8E7C9B] mb-4">Wedding Registry</h4>
                <p className="font-light text-gray-600 leading-relaxed mb-8">
                  Your presence at our wedding is the greatest gift of all.
                </p>
              
             </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 px-6 bg-[#FDF8F8] relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <SectionTitle subtitle="Everything You Need To Know">Frequently Asked Questions</SectionTitle>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <Reveal key={index} delay={index * 100}>
                <div 
                  className="bg-white rounded-2xl md:rounded-3xl border border-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-colors duration-300 ${openFaq === index ? 'bg-[#D4A5A5] text-white' : 'bg-pink-50 text-[#D4A5A5]'}`}>
                        <HelpCircle size={20} />
                      </div>
                      <h4 className="font-serif text-lg md:text-xl text-[#5D5461]">{item.question}</h4>
                    </div>
                    {openFaq === index ? <Minus size={20} className="text-[#D4A5A5]" /> : <Plus size={20} className="text-[#D4A5A5]" />}
                  </div>
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-[300px] border-t border-pink-50/50' : 'max-h-0'}`}
                  >
                    <div className="p-6 md:p-8 pt-0 md:pt-0 text-gray-500 font-light leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#FAF6F6] text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[1] pointer-events-none">
          <img 
            src="/footer.jpg" 
            alt="Garden silhouette" 
            className="w-full h-full object-cover "
          />
        </div>
        <Reveal>
          <div className="font-script text-7xl md:text-9xl text-[#D4A5A5] mb-8 relative z-10">M & C</div>
          <p className="font-script text-3xl text-[#8E7C9B] relative z-10">Together Forever in His Love</p>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#A68DAD] mt-6 relative z-10">
  Powered by:{" "}
  <a
    href="https://ronnelsantos.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#8E7C9B] underline transition-colors"
  >
    Webworks
  </a>
</p>
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