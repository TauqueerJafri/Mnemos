import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles, Globe, Zap, Shield, Layers, X, Brain, Clock, Infinity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';

// --- Helper Components (page-specific) ---

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

/** Canvas-based neural network particle animation that reacts to mouse movement. */
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/** Wraps children with a 3D perspective tilt effect on mouse hover. */
function PerspectiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`);
  }, []);

  const handleLeave = () => setTransform('perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)');

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/** Fades children in and slides up when they enter the viewport. */
function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// --- Feature card data ---

const FEATURES = [
  { icon: Zap, title: 'Lightning Capture', desc: 'Paste any URL. In under a second, content is extracted and stored.', gradient: 'from-yellow-500/10 to-orange-500/5' },
  { icon: Layers, title: 'Smart Organization', desc: 'AI automatically categorizes and connects your content.', gradient: 'from-blue-500/10 to-cyan-500/5' },
  { icon: Brain, title: 'Neural Search', desc: 'Search by meaning, not just keywords. Find what you need instantly.', gradient: 'from-purple-500/10 to-pink-500/5' },
  { icon: Shield, title: 'Private by Default', desc: 'Your knowledge is yours. Encrypted, secure, and never shared.', gradient: 'from-green-500/10 to-emerald-500/5' },
  { icon: Globe, title: 'Share Collections', desc: 'Curate and share knowledge bundles with anyone.', gradient: 'from-sky-500/10 to-blue-500/5' },
  { icon: Sparkles, title: 'AI Insights', desc: 'Surface connections between ideas you never knew existed.', gradient: 'from-pink-500/10 to-rose-500/5' },
];


// --- Main Page ---

export default function Home() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 200); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* Announcement banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-60 bg-linear-to-r from-blue-600 to-blue-500 text-center py-1.5 px-4 text-xs font-medium flex items-center justify-center gap-3">
          <span>Mnemos is now in public beta — try it free</span>
          <Link to="/signup" className="underline underline-offset-2 hover:no-underline">Sign up →</Link>
          <Button variant="ghost" size="icon" onClick={() => setShowBanner(false)} className="absolute right-4 p-1! text-white/80! hover:bg-white/20!">
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed ${showBanner ? 'top-7' : 'top-0'} left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/70 border-b border-white/6 shadow-[0_1px_12px_rgba(0,0,0,0.5)]' : 'bg-transparent border-b border-transparent'}`}
        style={{ backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none', WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/home">
              <Logo size="sm" />
            </Link>
            <div className="hidden md:flex items-center gap-5 text-[13px] font-medium text-gray-400">
              <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
              <a href="#comparison" className="hover:text-white transition-colors duration-300">Compare</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors duration-300 px-3 py-1.5">Log in</Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`min-h-screen flex items-center justify-center relative ${showBanner ? 'pt-[84px]' : 'pt-14'}`}>
        <NeuralBackground />
        <div className="absolute inset-0 bg-linear-to-b from-[#060606]/60 via-transparent to-[#060606]/80 pointer-events-none" />

        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1500 ${ready ? 'opacity-100' : 'opacity-0'}`}>

          <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6 transition-all duration-1000 delay-400 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Your digital
            <br />
            <span className="bg-linear-to-r from-blue-500 via-blue-300 to-blue-600 bg-clip-text text-transparent tracking-tight">nervous system.</span>
          </h1>

          <p className={`text-lg text-gray-400 max-w-lg mx-auto mb-10 transition-all duration-1000 delay-600 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Turn the content you consume into a structured, searchable system.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-800 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link to="/signup" className="group w-full sm:w-auto px-8 py-3.5 bg-blue-500 hover:bg-blue-400 rounded-xl text-base font-semibold transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2">
              Build Your Brain
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-base font-medium transition-all text-center">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-4">Why Mnemos</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Not just bookmarks
              <br />
              <span className="text-gray-500">A second brain</span>
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((card, i) => (
              <FadeSection key={i} delay={i * 100}>
                <PerspectiveCard>
                  <div className={`p-8 bg-linear-to-br ${card.gradient} rounded-2xl border border-white/6 h-full backdrop-blur-sm`}>
                    <div className="p-3 bg-white/5 rounded-xl w-fit mb-5 border border-white/6">
                      <card.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </PerspectiveCard>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section id="comparison" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/2 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <FadeSection className="text-center mb-16">
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-4">The Difference</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Stop forgetting what you consume
              <br />
              <span className="text-gray-500">Start building your system</span>
            </h2>
          </FadeSection>

          <FadeSection delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-8 bg-[#0c0c0c] rounded-2xl border border-gray-800/50">
                <div className="flex items-center gap-2.5 mb-8">
                  <Clock className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-red-400">Before Mnemos</h3>
                </div>
                <ul className="space-y-5">
                  {[
                    '100 open browser tabs',
                    'Bookmarks you never revisit',
                    '"I saw this somewhere..."',
                    'Scattered across 10 apps',
                    'Lost ideas, forgotten links',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] text-gray-400">
                      <span className="text-red-400/60 shrink-0 text-base leading-none">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="p-8 bg-[#0c0c0c] rounded-2xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                <div className="flex items-center gap-2.5 mb-8">
                  <Infinity className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-blue-400">With Mnemos</h3>
                </div>
                <ul className="space-y-5">
                  {[
                    'One brain, infinite capacity',
                    'Instant recall of anything saved',
                    '"Find that article about X" → found',
                    'All sources in one place',
                    'AI-powered connections',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] text-gray-300">
                      <span className="text-blue-400 shrink-0 text-base leading-none">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeSection className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Simple pricing</h2>
            <p className="text-gray-500">Start free. Upgrade when you're ready.</p>
          </FadeSection>

          <FadeSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Free tier */}
              <PerspectiveCard>
                <div className="p-8 bg-[#0c0c0c] rounded-2xl border border-gray-800/50 h-full flex flex-col">
                  <p className="text-sm text-gray-500 mb-1">Free</p>
                  <p className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-600">/mo</span></p>
                  <ul className="space-y-3 mb-8 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 100 captures/month</li>
                    <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Basic search</li>
                    <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 5 shared collections</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/signup">
                      <Button variant="secondary" className="w-full justify-center">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </PerspectiveCard>

              {/* Pro tier */}
              <PerspectiveCard>
                <div className="p-8 bg-[#0c0c0c] rounded-2xl border border-blue-500/30 h-full relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-xs font-semibold rounded-bl-xl">Popular</div>
                  <p className="text-sm text-blue-400 mb-1">Pro</p>
                  <p className="text-4xl font-bold mb-6">$9<span className="text-base font-normal text-gray-600">/mo</span></p>
                  <ul className="space-y-3 mb-8 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Unlimited captures</li>
                    <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> AI-powered search</li>
                    <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Unlimited sharing</li>
                    <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Priority support</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/signup">
                      <Button variant="primary" className="w-full justify-center">Start Pro Trial</Button>
                    </Link>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/2 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <FadeSection className="text-center mb-16">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mb-8 cursor-pointer">
              <Logo hideText size="lg" />
            </button>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-4">Your second brain awaits</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
              Remember everything
              <br />
              <span className="text-gray-500">Forget nothing</span>
            </h2>
            <p className="text-gray-500">Every article, every video, every idea. Captured once, recalled instantly.</p>
          </FadeSection>

          <FadeSection delay={100}>
            <div className="text-center">
              <Link to="/signup" className="group w-full sm:w-auto px-8 py-3.5 bg-blue-500 hover:bg-blue-400 rounded-xl text-base font-semibold transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] inline-flex items-center justify-center gap-2">
                Build Your Brain
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/4 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <Logo size="sm" />
            <p className="text-xs text-gray-600 leading-relaxed mt-2">Your second brain for the digital age. Capture, organize, and connect everything.</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Product</p>
            <div className="space-y-2 text-sm text-gray-500">
              <a href="#features" className="block hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="block hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block hover:text-white transition-colors">Changelog</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Legal</p>
            <div className="space-y-2 text-sm text-gray-500">
              <a href="#" className="block hover:text-white transition-colors">Privacy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms</a>
              <a href="#" className="block hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/4 text-center text-xs text-gray-700">
          © 2026 Mnemos. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}