import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Start Here',
  description: 'New to Christianity or exploring faith for the first time? This is where to begin.',
};

const STEPS = [
  {
    number: '01',
    title: 'Understand the Core Message',
    body: 'Christianity begins with a simple but profound claim: God is real, humanity is broken, and Jesus Christ is the bridge between the two. The "gospel" — meaning "good news" — is that forgiveness and new life are freely available to anyone who believes.',
    link: '/doctrine/salvation-by-grace',
    linkText: 'Read: Salvation by Grace →',
  },
  {
    number: '02',
    title: 'Meet Jesus',
    body: "Jesus of Nazareth is the most important figure in human history. He claimed to be God, performed miracles, died on a Roman cross, and his followers insisted he rose from the dead three days later. That last claim — the resurrection — is either the greatest hoax in history or the most important event that ever happened.",
    link: '/doctrine/resurrection',
    linkText: 'Read: The Resurrection →',
  },
  {
    number: '03',
    title: 'Take the Hard Questions Seriously',
    body: "If you're skeptical, good. Christianity doesn't ask you to check your brain at the door. The evidence for Christian truth claims is stronger than most people realize — from the historical reliability of Scripture to the philosophical case for God's existence.",
    link: '/apologetics',
    linkText: 'Explore Apologetics →',
  },
  {
    number: '04',
    title: 'Read the Bible',
    body: "The Bible is unlike any other book. Start with the Gospel of John — a first-person account of Jesus' life, miracles, and teachings, written by his closest friend. Then read Romans for the clearest explanation of the gospel ever written.",
    link: '/scripture',
    linkText: 'Open Scripture Explorer →',
  },
  {
    number: '05',
    title: 'Keep Exploring',
    body: 'Faith grows. No one has all the answers — and that\'s okay. Use the resources here to dig deeper into doctrine, understand other worldviews, and encounter voices from 2,000 years of Christian thought.',
    link: '/library',
    linkText: 'Visit the Library →',
  },
];

const FAQS = [
  {
    q: 'Do I have to have everything figured out to become a Christian?',
    a: 'No. Christianity begins with trust, not certainty. Jesus welcomed seekers, doubters, and questioners throughout his ministry. "Lord, I believe; help my unbelief" (Mark 9:24) is a perfectly valid starting point.',
  },
  {
    q: 'What if I\'ve done terrible things?',
    a: 'The gospel is specifically for people who know they\'ve fallen short. Paul, who wrote much of the New Testament, called himself "the chief of sinners" (1 Timothy 1:15). Grace is not for the morally excellent — it\'s the rescue of the morally bankrupt.',
  },
  {
    q: 'Does science conflict with Christianity?',
    a: 'Less than most people assume. Many of the greatest scientists in history — Galileo, Newton, Faraday, Collins — were Christians. Science describes how the universe works; Christianity speaks to why it exists and what it means.',
  },
  {
    q: 'What should I actually do if I want to become a Christian?',
    a: 'Talk to God. Tell him you recognize you\'ve lived for yourself rather than for him, that you believe Jesus died in your place, and that you want to follow him. That\'s it. You can use your own words — he hears them.',
  },
];

export default function StartHerePage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <div
        className="text-center py-10 px-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <span className="section-label">You&apos;re in the right place</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.1 }}>
          Where do I even<br /><em className="not-italic text-gold-light">begin?</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.4rem' }}>
          Whether you&apos;re curious, skeptical, returning, or just looking — this page is for you.
          We&apos;ll walk through the basics, the evidence, and what to do next.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        {STEPS.map((step, i) => (
          <AnimateOnScroll key={step.number} delay={i * 100}>
            <div className="flex gap-8 mb-8 group">
              <div className="flex-shrink-0">
                <span
                  className="font-cinzel text-gold-dim"
                  style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}
                >
                  {step.number}
                </span>
              </div>
              <div>
                <h2 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                  {step.title}
                </h2>
                <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}>
                  {step.body}
                </p>
                <Link
                  href={step.link}
                  className="font-cinzel tracking-[0.15em] uppercase text-gold-dim no-underline transition-colors hover:text-gold"
                  style={{ fontSize: '0.8rem' }}
                >
                  {step.linkText}
                </Link>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="mb-8 sm:mb-8 sm:ml-24"
                style={{ height: '1px', background: 'linear-gradient(to right, rgba(201,168,76,0.15), transparent)' }}
              />
            )}
          </AnimateOnScroll>
        ))}
      </div>

      {/* FAQs */}
      <div
        className="py-10 px-8"
        style={{ background: 'var(--deep-navy)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="section-label">Common Questions</span>
            <h2 className="section-title mb-10">Questions People Ask</h2>
            <div className="space-y-8">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <h3 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                    {faq.q}
                  </h3>
                  <p className="text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Pathways */}
      <div className="py-10 px-8" style={{ background: 'var(--midnight)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <span className="section-label">Where to Go Next</span>
            <h2 className="section-title mb-12">Choose Your Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: '🎓', title: "I'm Skeptical",
                  desc: "Start with the evidence. Explore the historical, philosophical, and scientific case for Christianity.",
                  link: '/apologetics', cta: 'Go to Apologetics',
                },
                {
                  icon: '📖', title: "I Want to Study",
                  desc: "Dive into Scripture, doctrine, and the great theologians who have shaped the faith for 2,000 years.",
                  link: '/doctrine', cta: 'Go to Doctrine',
                },
                {
                  icon: '🌍', title: 'I Have Big Questions',
                  desc: 'How does Christianity compare to other religions? What about evil and suffering? Find structured answers.',
                  link: '/religions', cta: 'Explore Worldviews',
                },
              ].map((p) => (
                <Link
                  key={p.title}
                  href={p.link}
                  className="hover-gold-bg block no-underline rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1 text-center group"
                  style={{
                    background: 'var(--navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                >
                  <span className="text-5xl block mb-5">{p.icon}</span>
                  <p className="font-cinzel text-gold tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.85rem' }}>
                    {p.title}
                  </p>
                  <p className="font-cormorant text-text-light italic leading-relaxed mb-6" style={{ fontSize: '1.1rem' }}>
                    {p.desc}
                  </p>
                  <span className="font-cinzel text-gold-dim tracking-[0.2em] uppercase transition-colors group-hover:text-gold" style={{ fontSize: '0.65rem' }}>
                    {p.cta} →
                  </span>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Email signup */}
      <div
        className="py-10 px-8 text-center"
        style={{ background: 'var(--deep-navy)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <AnimateOnScroll>
          <div className="max-w-md mx-auto">
            <span className="section-label">Daily Verse</span>
            <h2 className="font-cormorant font-light text-cream mb-3" style={{ fontSize: '2.2rem' }}>
              Begin each day with Scripture
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              One verse, every morning. No spam. Unsubscribe anytime.
            </p>
            <EmailSignup />
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
