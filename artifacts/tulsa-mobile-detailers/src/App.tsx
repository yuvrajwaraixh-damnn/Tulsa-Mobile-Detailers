import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import dirtyExterior1 from '@assets/generated_images/tmd-dirty-exterior-1.jpg';
import cleanExterior1 from '@assets/generated_images/tmd-clean-exterior-1.jpg';
import dirtyInterior1 from '@assets/generated_images/tmd-dirty-interior-1.jpg';
import cleanInterior1 from '@assets/generated_images/tmd-clean-interior-1.jpg';
import dirtyExterior2 from '@assets/generated_images/tmd-dirty-exterior-2.jpg';
import cleanExterior2 from '@assets/generated_images/tmd-clean-exterior-2.jpg';
import dirtyInterior2 from '@assets/generated_images/tmd-dirty-interior-2.jpg';
import cleanInterior2 from '@assets/generated_images/tmd-clean-interior-2.jpg';
import dirtyExterior3 from '@assets/generated_images/tmd-dirty-exterior-3.jpg';
import cleanExterior3 from '@assets/generated_images/tmd-clean-exterior-3.jpg';
import dirtyInterior3 from '@assets/generated_images/tmd-dirty-interior-3.jpg';
import cleanInterior3 from '@assets/generated_images/tmd-clean-interior-3.jpg';
import dirtyExterior4 from '@assets/generated_images/tmd-dirty-exterior-4.jpg';
import cleanExterior4 from '@assets/generated_images/tmd-clean-exterior-4.jpg';
import dirtyInterior4 from '@assets/generated_images/tmd-dirty-interior-4.jpg';
import cleanInterior4 from '@assets/generated_images/tmd-clean-interior-4.jpg';
import bookingCarWash from '@assets/generated_images/tmd-booking-car-wash.jpg';
import detailWashCloseup from '@assets/generated_images/tmd-detail-wash-closeup.jpg';

const queryClient = new QueryClient();

const images = {
  hero: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1800',
  detail: detailWashCloseup,
  van: bookingCarWash,
  contact: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

type GalleryItem = { id: number; category: string; title: string; before: string; after: string };
const galleryItems: GalleryItem[] = [
  { id: 1, category: 'Exterior', title: 'Road grime, rinsed away', before: dirtyExterior1, after: cleanExterior1 },
  { id: 2, category: 'Interior', title: 'The family SUV reset', before: dirtyInterior1, after: cleanInterior1 },
  { id: 3, category: 'Exterior', title: 'Dusty daily driver, bright again', before: dirtyExterior2, after: cleanExterior2 },
  { id: 4, category: 'Interior', title: 'A quiet cabin again', before: dirtyInterior2, after: cleanInterior2 },
  { id: 5, category: 'Exterior', title: 'Black paint, no shortcuts', before: dirtyExterior3, after: cleanExterior3 },
  { id: 6, category: 'Interior', title: 'Work truck, weekend ready', before: dirtyInterior3, after: cleanInterior3 },
  { id: 7, category: 'Exterior', title: 'Muddy pickup, clean finish', before: dirtyExterior4, after: cleanExterior4 },
  { id: 8, category: 'Interior', title: 'From workday to spotless', before: dirtyInterior4, after: cleanInterior4 },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Tulsa Mobile Detailers`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description]);
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function SmartImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`bg-[#dfe1d7] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20262e] text-[#cbe95c]">
        <Droplets size={19} strokeWidth={2.4} />
      </span>
      <span className="display text-[15px] font-bold leading-[.95] tracking-[-.04em] text-[#20262e]">TULSA<br /><span className="text-[#e25f37]">MOBILE DETAILERS</span></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const links = [{ href: '/', label: 'Home' }, { href: '/gallery', label: 'Our work' }, { href: '/book', label: 'Book a detail' }, { href: '/contact', label: 'Contact' }];
  return (
    <>
      <div className="bg-[#20262e] px-5 py-2 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#f1eee7]/80">Door-to-door detailing across Tulsa & surrounding areas</div>
      <header className="relative z-40 border-b border-[#20262e]/10 bg-[#f2f0e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {links.map((link) => <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`} className={`text-[12px] font-bold uppercase tracking-[.14em] transition-colors hover:text-[#e25f37] ${location === link.href ? 'text-[#e25f37]' : 'text-[#20262e]/70'}`}>{link.label}</Link>)}
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <a href="tel:9185550148" className="flex items-center gap-2 text-[12px] font-bold text-[#20262e]" data-testid="link-phone-header"><Phone size={14} /> (918) 555-0148</a>
            <Link href="/book" className="lime-button flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-extrabold uppercase tracking-[.12em] transition-all" data-testid="link-book-header">Book your spot <ArrowRight size={15} /></Link>
          </div>
          <button type="button" onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#20262e] md:hidden" aria-label="Toggle navigation" data-testid="button-toggle-navigation">{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
        {open && (
          <div className="border-t border-[#20262e]/10 bg-[#f2f0e9] px-5 py-4 md:hidden">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`} className={`block border-b border-[#20262e]/10 py-4 text-sm font-bold uppercase tracking-[.12em] ${location === link.href ? 'text-[#e25f37]' : ''}`}>{link.label}</Link>)}
            <a href="tel:9185550148" className="flex items-center gap-2 py-4 text-sm font-bold" data-testid="link-phone-mobile"><Phone size={16} /> (918) 555-0148</a>
          </div>
        )}
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="dark-panel">
      <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-6 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbe95c] text-[#20262e]"><Droplets size={19} /></span><span className="display text-[15px] font-bold leading-[.95] tracking-[-.04em]">TULSA<br /><span className="text-[#e25f37]">MOBILE DETAILERS</span></span></div>
            <p className="max-w-xs text-sm leading-7 text-[#f1eee7]/58">Your driveway. Our craft. A better-looking car, without giving up your Saturday.</p>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full border border-[#f1eee7]/20 p-3 transition-colors hover:border-[#cbe95c] hover:text-[#cbe95c]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={17} /></a>
          </div>
          <div><p className="mono mb-5 text-[10px] uppercase tracking-[.2em] text-[#cbe95c]">Explore</p><div className="flex flex-col gap-3 text-sm text-[#f1eee7]/75"><Link href="/gallery" className="hover:text-[#cbe95c]" data-testid="link-footer-gallery">Before & after</Link><Link href="/book" className="hover:text-[#cbe95c]" data-testid="link-footer-book">Book a detail</Link><Link href="/contact" className="hover:text-[#cbe95c]" data-testid="link-footer-contact">Contact & service area</Link></div></div>
          <div><p className="mono mb-5 text-[10px] uppercase tracking-[.2em] text-[#cbe95c]">Services</p><div className="flex flex-col gap-3 text-sm text-[#f1eee7]/75"><span>Interior Detailing</span><span>Exterior Detailing</span><span>Ceramic Coating</span><span>Rubbing & Polishing</span></div></div>
          <div><p className="mono mb-5 text-[10px] uppercase tracking-[.2em] text-[#cbe95c]">Come to you</p><p className="text-sm leading-7 text-[#f1eee7]/75">Tulsa, OK<br />and surrounding areas</p><a href="mailto:info@tulsamobiledetailers.com" className="mt-4 block text-sm text-[#f1eee7] underline decoration-[#cbe95c] underline-offset-4" data-testid="link-footer-email">info@tulsamobiledetailers.com</a></div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-[#f1eee7]/15 pt-6 text-[10px] uppercase tracking-[.14em] text-[#f1eee7]/40 sm:flex-row"><span>© {new Date().getFullYear()} Tulsa Mobile Detailers</span><span>Made for the vehicles of Tulsa</span></div>
      </div>
    </footer>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh] overflow-hidden bg-[#f2f0e9] text-[#20262e]"><Header />{children}<Footer /></div>;
}

function SectionEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mono mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[.2em] ${light ? 'text-[#cbe95c]' : 'text-[#e25f37]'}`}><span className={`h-2 w-2 rounded-full ${light ? 'bg-[#cbe95c]' : 'bg-[#e25f37]'}`} />{children}</p>;
}

function Home() {
  usePageMeta('Detailing that comes to you', 'Tulsa Mobile Detailers brings premium interior and exterior detailing right to your driveway across Tulsa and surrounding areas.');
  return (
    <PageShell>
      <main>
        <section className="site-grid relative">
          <div className="mx-auto grid min-h-[680px] max-w-[1240px] items-end gap-10 px-5 pb-14 pt-14 lg:grid-cols-[.93fr_1.07fr] lg:px-8 lg:pb-20 lg:pt-20">
            <Reveal className="relative z-10 lg:pb-6">
              <SectionEyebrow>Mobile detailing / Tulsa, OK</SectionEyebrow>
              <h1 className="display max-w-[600px] text-[clamp(3.6rem,8vw,7.8rem)] font-bold leading-[.86] tracking-[-.08em] text-[#20262e]">Your car.<br /><span className="text-[#e25f37]">Properly</span><br />looked after.</h1>
              <p className="mt-8 max-w-[410px] text-base leading-7 text-[#20262e]/65">A meticulous, door-to-door detail for people who notice the difference. We bring the shop to you.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/book" className="lime-button flex items-center gap-3 rounded-full px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] transition-all" data-testid="link-hero-book">Book a detail <ArrowRight size={16} /></Link><Link href="/gallery" className="arrow-link flex items-center gap-2 px-2 py-3 text-xs font-extrabold uppercase tracking-[.13em] text-[#20262e] underline decoration-[#e25f37] decoration-2 underline-offset-8" data-testid="link-hero-gallery">See the work <ArrowRight size={15} /></Link></div>
              <div className="mt-14 flex items-center gap-4 text-[11px] font-bold text-[#20262e]/60"><div className="flex text-[#e25f37]"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>4.9 / 5 from Tulsa drivers</div>
            </Reveal>
            <Reveal delay={1} className="relative min-h-[450px] lg:min-h-[580px]">
              <div className="absolute -right-10 top-5 h-32 w-32 rounded-full border border-[#e25f37]/40 lg:right-2" />
              <div className="image-shine absolute inset-0 overflow-hidden rounded-[2rem] rounded-bl-[7rem] bg-[#303842] shadow-2xl shadow-[#20262e]/20"><SmartImage src={images.hero} alt="Deep black sports car catching the light" className="h-full w-full opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-[#20262e]/70 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-7 text-[#f1eee7]"><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#cbe95c]">The TMD standard</p><p className="display mt-2 text-2xl font-semibold tracking-[-.04em]">The finish says it all.</p></div><span className="rounded-full border border-[#f1eee7]/30 px-3 py-2 text-[10px] uppercase tracking-[.15em]">01 / 04</span></div></div>
              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-[#e25f37] p-4 text-[#f2f0e9] shadow-xl lg:-left-10"><Award size={24} /><div><p className="display text-lg font-bold leading-none">100%</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#f2f0e9]/75">attention to detail</p></div></div>
            </Reveal>
          </div>
          <div className="mx-auto max-w-[1240px] px-5 pb-5 lg:px-8"><div className="flex items-center justify-between border-t border-[#20262e]/15 pt-4 text-[10px] uppercase tracking-[.18em] text-[#20262e]/45"><span>Built for Tulsa roads</span><span className="hidden sm:block">Appointments available Mon–Sat</span><span>Scroll to explore ↓</span></div></div>
        </section>

        <section className="dark-panel">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <Reveal><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionEyebrow light>Why mobile?</SectionEyebrow><div><h2 className="display max-w-3xl text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[.94] tracking-[-.07em]">More care. Less <span className="text-[#cbe95c]">shuffle.</span></h2><p className="mt-7 max-w-xl text-lg leading-8 text-[#f1eee7]/60">Your time is worth more than a waiting room and a vending machine. We arrive prepared, work carefully, and leave your vehicle looking like it belongs in the front row.</p></div></div></Reveal>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#f1eee7]/15 bg-[#f1eee7]/15 md:grid-cols-3">
              {[['01', 'We come to you', 'Home, office, or wherever the day parked you.'], ['02', 'We work with intent', 'Professional products, deliberate technique, zero rushing.'], ['03', 'You drive away happy', 'A clean you can feel, a finish you can see.']].map(([num, title, copy], index) => <Reveal key={num} delay={index + 1}><div className="h-full bg-[#20262e] p-7 lg:p-9"><span className="mono text-xs text-[#e25f37]">{num}</span><h3 className="display mt-14 text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#f1eee7]/55">{copy}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="site-grid">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <Reveal><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionEyebrow>What we do</SectionEyebrow><h2 className="display max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.07em]">A better baseline<br /><span className="text-[#e25f37]">for every drive.</span></h2></div><Link href="/book" className="arrow-link flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.13em] underline decoration-[#cbe95c] decoration-2 underline-offset-8" data-testid="link-services-book">Find your detail <ArrowRight size={16} /></Link></div></Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {[
                ['01', 'Interior Detailing', 'The reset your cabin has been waiting for.', 'Deep vacuum, surfaces, glass, and the details you see every time you get in.'],
                ['02', 'Exterior Detailing', 'Clean lines. Clear reflections.', 'A careful wash, wheels, trim, and finish that makes the whole vehicle look newer.'],
                ['03', 'Ceramic Coating', 'Long-term shine, properly protected.', 'A durable layer of protection that keeps Tulsa weather from dulling your paint.'],
                ['04', 'Rubbing & Polishing', 'Bring the gloss back.', 'Thoughtful paint correction for swirls, oxidation, and the years that show on the surface.'],
              ].map(([num, title, tagline, copy], index) => <Reveal key={num} delay={(index % 3) + 1}><div className="group relative overflow-hidden rounded-3xl border border-[#20262e]/12 bg-[#f2f0e9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#20262e]/30 lg:p-9"><div className="flex items-start justify-between"><span className="mono text-xs text-[#e25f37]">{num}</span><ChevronRight className="text-[#20262e]/35 transition-transform group-hover:translate-x-1" size={20} /></div><h3 className="display mt-14 text-3xl font-semibold tracking-[-.05em]">{title}</h3><p className="mt-3 text-base font-semibold text-[#e25f37]">{tagline}</p><p className="mt-3 max-w-sm text-sm leading-6 text-[#20262e]/60">{copy}</p><div className="mt-9 h-1 w-12 bg-[#cbe95c] transition-all duration-300 group-hover:w-24" /></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="bg-[#e25f37] text-[#f2f0e9]">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_.8fr] lg:px-8 lg:py-24">
            <Reveal><SectionEyebrow light>The good kind of particular</SectionEyebrow><h2 className="display max-w-3xl text-[clamp(2.8rem,6vw,6.4rem)] font-semibold leading-[.9] tracking-[-.08em]">We sweat the small stuff.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#f2f0e9]/80">Door jambs. The seam between the seats. The haze on the inside of the windshield. That last, satisfying pass over the paint. Small things add up to a car that feels cared for.</p></Reveal>
            <Reveal delay={1}><div className="relative overflow-hidden rounded-[2rem] rounded-tr-[7rem]"><SmartImage src={images.detail} alt="Detailer carefully working on a vehicle" className="h-[360px] w-full grayscale-[.15]" /><div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-[#20262e] px-4 py-3 text-xs font-bold"><Sparkles size={15} className="text-[#cbe95c]" />No detail overlooked</div></div></Reveal>
          </div>
        </section>

        <section className="dark-panel">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <Reveal><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><SectionEyebrow light>Kind words</SectionEyebrow><div><Quote className="mb-5 text-[#e25f37]" size={30} /><blockquote className="display max-w-4xl text-[clamp(2rem,4vw,4.2rem)] font-medium leading-[1.02] tracking-[-.06em]">“I got in after work and actually said wow out loud. They made my five-year-old SUV feel brand new.”</blockquote><div className="mt-7 flex items-center gap-3 text-xs font-bold text-[#f1eee7]/55"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cbe95c] text-[#20262e]">JL</span>Jordan L. · Midtown Tulsa</div></div></div></Reveal>
          </div>
        </section>

        <section className="bg-[#cbe95c]">
          <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-5 py-16 lg:flex-row lg:items-center lg:px-8 lg:py-20"><Reveal><p className="mono text-[10px] font-bold uppercase tracking-[.2em] text-[#20262e]/60">Ready when your car is</p><h2 className="display mt-3 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.08em] text-[#20262e]">Let's make it<br />look like you care.</h2></Reveal><Link href="/book" className="group flex items-center gap-4 rounded-full bg-[#20262e] px-7 py-5 text-xs font-extrabold uppercase tracking-[.13em] text-[#f2f0e9] transition-transform hover:-translate-y-1" data-testid="link-home-final-book">Book your detail <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e25f37] transition-transform group-hover:rotate-[-45deg]"><ArrowRight size={15} /></span></Link></div>
        </section>
      </main>
    </PageShell>
  );
}

function Gallery() {
  usePageMeta('Before & after', 'See the difference Tulsa Mobile Detailers makes with real interior, exterior, and paint correction work.');
  const [filter, setFilter] = useState('All work');
  const filtered = filter === 'All work' ? galleryItems : galleryItems.filter((item) => item.category === filter);
  return <PageShell><main>
    <section className="dark-panel">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28"><Reveal><SectionEyebrow light>Proof, not promises</SectionEyebrow><h1 className="display max-w-4xl text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[.85] tracking-[-.09em]">The difference<br /><span className="text-[#cbe95c]">is in the finish.</span></h1><p className="mt-8 max-w-lg text-base leading-7 text-[#f1eee7]/60">Every vehicle has a story. Here are a few we got to improve, one careful pass at a time.</p></Reveal></div>
    </section>
    <section className="site-grid"><div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
       <Reveal><div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#20262e]/15 pb-5"><p className="mono text-[10px] uppercase tracking-[.18em] text-[#20262e]/55">{filtered.length.toString().padStart(2, '0')} transformations</p><div className="flex flex-wrap gap-2">{['All work', 'Interior', 'Exterior'].map((option) => <button type="button" key={option} onClick={() => setFilter(option)} className={`rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] transition-colors ${filter === option ? 'border-[#20262e] bg-[#20262e] text-[#f2f0e9]' : 'border-[#20262e]/20 hover:border-[#20262e]'}`} data-testid={`button-filter-${option.toLowerCase().replace(' ', '-')}`}>{option}</button>)}</div></div></Reveal>
      <div className="mt-10 grid gap-7 md:grid-cols-2">{filtered.map((item, index) => <Reveal key={item.id} delay={(index % 3) + 1}><article className="group"><div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl"><div className="relative aspect-[.9] overflow-hidden bg-[#dfe1d7]"><SmartImage src={item.before} alt={`${item.title} before detailing`} className="h-full w-full grayscale-[.35] transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-[#20262e]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-[#f2f0e9]">Before</span></div><div className="relative aspect-[.9] overflow-hidden bg-[#dfe1d7]"><SmartImage src={item.after} alt={`${item.title} after detailing`} className="h-full w-full transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-[#cbe95c] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-[#20262e]">After</span></div></div><div className="flex items-end justify-between border-b border-[#20262e]/15 py-5"><div><p className="mono text-[9px] uppercase tracking-[.18em] text-[#e25f37]">{item.category}</p><h2 className="display mt-2 text-2xl font-semibold tracking-[-.04em]">{item.title}</h2></div><span className="text-xs text-[#20262e]/35">0{index + 1}</span></div></article></Reveal>)}</div>
    </div></section>
    <section className="bg-[#e25f37]"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-7 px-5 py-16 lg:flex-row lg:items-center lg:px-8"><div><SectionEyebrow light>Your car is next</SectionEyebrow><h2 className="display text-4xl font-semibold tracking-[-.06em] text-[#f2f0e9]">Give it the before.</h2></div><Link href="/book" className="flex w-fit items-center gap-3 rounded-full bg-[#20262e] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] text-[#f2f0e9] transition-transform hover:-translate-y-1" data-testid="link-gallery-book">Book your detail <ArrowRight size={16} /></Link></div></section>
  </main></PageShell>;
}

const bookingSchema = z.object({
  name: z.string().min(2, 'Please add your name'),
  email: z.string().email('Please add a valid email'),
  phone: z.string().min(7, 'Please add a phone number'),
  service: z.string().min(1, 'Choose a service'),
  vehicle: z.string().min(2, 'Tell us what you drive'),
  date: z.string().min(1, 'Choose a preferred date'),
  message: z.string().optional(),
});
type BookingValues = z.infer<typeof bookingSchema>;

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.15em] text-[#20262e]/60">{label}</span>{children}{error && <span className="mt-1 block text-xs text-[#e25f37]">{error}</span>}</label>;
}

function Book() {
  usePageMeta('Book a detail', 'Request a door-to-door car detailing appointment with Tulsa Mobile Detailers.');
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<BookingValues>({ resolver: zodResolver(bookingSchema), defaultValues: { name: '', email: '', phone: '', service: '', vehicle: '', date: '', message: '' } });
  const submit = () => setSubmitted(true);
  if (submitted) return <PageShell><main className="site-grid"><div className="mx-auto flex min-h-[650px] max-w-[1240px] items-center px-5 py-24 lg:px-8"><Reveal className="w-full"><div className="mx-auto max-w-2xl rounded-[2rem] bg-[#20262e] p-8 text-center text-[#f2f0e9] shadow-2xl lg:p-16"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#cbe95c] text-[#20262e]"><Check size={28} /></div><SectionEyebrow light>Request received</SectionEyebrow><h1 className="display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[.9] tracking-[-.07em]">You're on<br />our radar.</h1><p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#f1eee7]/65">Thanks, {form.getValues('name') || 'there'}. We’ll review your request and reach out shortly to confirm the best time for your detail.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/" className="rounded-full bg-[#cbe95c] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] text-[#20262e]" data-testid="link-confirmation-home">Back to home</Link><button type="button" onClick={() => { setSubmitted(false); form.reset(); }} className="rounded-full border border-[#f1eee7]/25 px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em]" data-testid="button-new-request">New request</button></div></div></Reveal></div></main></PageShell>;
  return <PageShell><main>
    <section className="dark-panel"><div className="mx-auto max-w-[1240px] px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28"><Reveal><SectionEyebrow light>Start with your vehicle</SectionEyebrow><h1 className="display max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.85] tracking-[-.09em]">Let's get your<br /><span className="text-[#e25f37]">spotless.</span></h1><p className="mt-8 max-w-lg text-base leading-7 text-[#f1eee7]/60">Tell us a little about your vehicle and where you’d like us to meet you. We’ll take it from there.</p></Reveal></div></section>
    <section className="site-grid"><div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-16 lg:grid-cols-[1.1fr_.65fr] lg:px-8 lg:py-24">
      <Reveal><Form {...form}><form onSubmit={form.handleSubmit(submit)} className="rounded-[2rem] border border-[#20262e]/12 bg-[#f2f0e9] p-6 lg:p-10" noValidate><div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" error={form.formState.errors.name?.message}><input {...form.register('name')} placeholder="First and last" className="form-input" data-testid="input-booking-name" /></Field>
        <Field label="Email address" error={form.formState.errors.email?.message}><input type="email" {...form.register('email')} placeholder="you@email.com" className="form-input" data-testid="input-booking-email" /></Field>
        <Field label="Phone number" error={form.formState.errors.phone?.message}><input type="tel" {...form.register('phone')} placeholder="(918) 555-0148" className="form-input" data-testid="input-booking-phone" /></Field>
        <Field label="What do you drive?" error={form.formState.errors.vehicle?.message}><input {...form.register('vehicle')} placeholder="Year, make, model" className="form-input" data-testid="input-booking-vehicle" /></Field>
        <Field label="Service" error={form.formState.errors.service?.message}><select {...form.register('service')} className="form-input" data-testid="select-booking-service"><option value="">Choose a service</option><option>Interior Detailing</option><option>Exterior Detailing</option><option>Ceramic Coating</option><option>Rubbing & Polishing</option></select></Field>
        <Field label="Preferred date" error={form.formState.errors.date?.message}><input type="date" {...form.register('date')} className="form-input" data-testid="input-booking-date" /></Field>
        <div className="sm:col-span-2"><Field label="Anything we should know?"><textarea {...form.register('message')} rows={4} placeholder="Kids, pets, paint concerns, access notes..." className="form-input resize-none" data-testid="textarea-booking-message" /></Field></div>
      </div><div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#20262e]/12 pt-7 sm:flex-row sm:items-center"><p className="flex max-w-sm items-start gap-2 text-xs leading-5 text-[#20262e]/55"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#e25f37]" />No payment is taken here. This is a request, and we’ll confirm your appointment by phone.</p><button type="submit" className="lime-button flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-extrabold uppercase tracking-[.13em] transition-all" data-testid="button-submit-booking">Request my appointment <ArrowRight size={16} /></button></div></form></Form></Reveal>
      <Reveal delay={1}><aside className="lg:sticky lg:top-8 lg:self-start"><div className="overflow-hidden rounded-[2rem] bg-[#e25f37] text-[#f2f0e9]"><SmartImage src={images.van} alt="Professional mobile detailing setup" className="h-52 w-full opacity-80 grayscale-[.2]" /><div className="p-7"><SectionEyebrow light>What happens next</SectionEyebrow><div className="space-y-6">{[['01', 'We call to confirm', 'We’ll make sure the service and timing are right.'], ['02', 'We meet at your door', 'Home, office, or another convenient spot in Tulsa.'], ['03', 'You get your time back', 'A clean, protected car without the shop detour.']].map(([num, title, copy]) => <div key={num} className="flex gap-4"><span className="mono text-xs text-[#cbe95c]">{num}</span><div><h3 className="display text-lg font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#f2f0e9]/70">{copy}</p></div></div>)}</div></div></div><p className="mt-5 flex items-center gap-2 text-xs text-[#20262e]/55"><Clock3 size={15} />Typical reply: same business day</p></aside></Reveal>
    </div></section>
  </main></PageShell>;
}

function Contact() {
  usePageMeta('Contact & service area', 'Get in touch with Tulsa Mobile Detailers. Door-to-door service in Tulsa and surrounding areas.');
  return <PageShell><main>
    <section className="dark-panel"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1fr_.8fr] lg:items-end lg:px-8 lg:pb-28 lg:pt-28"><Reveal><SectionEyebrow light>Come say hello</SectionEyebrow><h1 className="display max-w-3xl text-[clamp(3.7rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.09em]">Good cars<br /><span className="text-[#cbe95c]">welcome.</span></h1><p className="mt-8 max-w-md text-base leading-7 text-[#f1eee7]/60">We bring a considered, professional detail to your driveway in Tulsa and the communities around it.</p></Reveal><Reveal delay={1}><div className="overflow-hidden rounded-[2rem] rounded-bl-[6rem]"><SmartImage src={images.contact} alt="Polished car on a Tulsa road" className="h-[330px] w-full" /></div></Reveal></div></section>
    <section className="site-grid"><div className="mx-auto grid max-w-[1240px] gap-16 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-24">
      <Reveal><SectionEyebrow>Find us on your schedule</SectionEyebrow><h2 className="display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.07em]">Let's talk<br /><span className="text-[#e25f37]">cars.</span></h2><div className="mt-10 space-y-5"><a href="tel:9185550148" className="group flex items-center gap-4" data-testid="link-contact-phone"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20262e] text-[#cbe95c]"><Phone size={18} /></span><span><span className="mono block text-[9px] uppercase tracking-[.18em] text-[#20262e]/45">Call or text</span><span className="mt-1 block text-lg font-bold group-hover:text-[#e25f37]">(918) 555-0148</span></span></a><a href="mailto:info@tulsamobiledetailers.com" className="group flex items-center gap-4" data-testid="link-contact-email"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20262e] text-[#cbe95c]"><Mail size={18} /></span><span><span className="mono block text-[9px] uppercase tracking-[.18em] text-[#20262e]/45">Email us</span><span className="mt-1 block text-lg font-bold group-hover:text-[#e25f37]">info@tulsamobiledetailers.com</span></span></a></div></Reveal>
      <Reveal delay={1}><div className="rounded-[2rem] bg-[#cbe95c] p-7 lg:p-10"><SectionEyebrow>Service area</SectionEyebrow><h3 className="display text-3xl font-semibold tracking-[-.05em]">We come to you.</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#20262e]/65">Our mobile unit serves Tulsa and surrounding areas, including the places you spend your everyday: Midtown, Brookside, South Tulsa, Bixby, Jenks, Broken Arrow, and beyond.</p><div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#20262e]/15 pt-7 text-xs font-bold"><span className="flex items-center gap-2"><MapPin size={14} className="text-[#e25f37]" />Tulsa</span><span className="flex items-center gap-2"><MapPin size={14} className="text-[#e25f37]" />Bixby</span><span className="flex items-center gap-2"><MapPin size={14} className="text-[#e25f37]" />Jenks</span><span className="flex items-center gap-2"><MapPin size={14} className="text-[#e25f37]" />Broken Arrow</span></div><Link href="/book" className="mt-9 flex w-fit items-center gap-3 rounded-full bg-[#20262e] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] text-[#f2f0e9] transition-transform hover:-translate-y-1" data-testid="link-contact-book">Request an appointment <ArrowRight size={15} /></Link></div></Reveal>
    </div></section>
    <section className="bg-[#e25f37]"><div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8"><Reveal><p className="mono text-[10px] uppercase tracking-[.2em] text-[#f2f0e9]/70">Hours that fit real life</p><h2 className="display mt-3 text-4xl font-semibold tracking-[-.06em] text-[#f2f0e9]">Appointments Monday through Saturday.</h2></Reveal><div className="flex items-center gap-3 text-sm font-bold text-[#f2f0e9]"><CalendarDays size={20} className="text-[#cbe95c]" />By appointment</div></div></section>
  </main></PageShell>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/gallery" component={Gallery} /><Route path="/book" component={Book} /><Route path="/contact" component={Contact} /><Route component={() => <PageShell><main className="flex min-h-[60vh] items-center justify-center"><div className="text-center"><p className="mono text-xs uppercase tracking-[.2em] text-[#e25f37]">404</p><h1 className="display mt-3 text-5xl font-bold">That page took a wrong turn.</h1><Link href="/" className="mt-7 inline-flex rounded-full bg-[#cbe95c] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em]" data-testid="link-not-found-home">Back to home</Link></div></main></PageShell>} /></Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Router /></RoutedErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;