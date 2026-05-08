import type { Metadata } from 'next';
import DiscussionAudioPlayer from '@/components/DiscussionAudioPlayer';
import ScriptureRefsSection from '@/components/ScriptureRefsSection';

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch curated apologetics and theology videos with commentary — equipping you to know and defend the Christian faith.',
};

interface OutlineSection {
  heading: string;
  points: string[];
}

interface Video {
  id: string;
  title: string;
  speaker: string;
  summary: string;
  keyPoints: string[];
  scriptureRefs: string[];
  outline: OutlineSection[];
}

const VIDEOS: Video[] = [
  {
    id: 'G1XJ7DeR5fc',
    title: 'Why I Choose to Believe the Bible',
    speaker: 'Voddie Baucham',
    summary:
      'Voddie Baucham addresses the most critical question any Christian must be able to answer: “Why do you believe the Bible?” He opens by demolishing the two most common but inadequate responses — “that’s how I was raised” and “it changed my life” — showing both collapse under simple scrutiny. He then introduces his famous definition, drawn from 2 Peter 1, and walks through it point by point. The Bible is a reliable collection of historical documents spanning 3 continents, 3 languages, 40+ authors, and 1,500 years. These documents were written by eyewitnesses during the lifetime of other eyewitnesses who could have falsified the claims — Paul cites over 500 living witnesses to the resurrection when he writes 1 Corinthians 15. Baucham refutes the “telephone game” translation objection by explaining that all translations go back to the original Hebrew, Greek, and Aramaic manuscripts, of which over 6,000 New Testament copies survive — more than any comparable ancient work. The writers report supernatural events, not mere moral teachings. And crucially, these events fulfilled prophecies written centuries and millennia in advance: Isaiah 53 was penned 700 years before Christ; Psalm 22 describes crucifixion in precise detail over 1,000 years before Jesus — and before crucifixion was even invented. Finally, the authors throughout claim divine rather than human authorship. Baucham closes by contrasting the evidentiary method — the proper tool for evaluating historical claims — with the scientific method, which cannot be applied to history.',
    keyPoints: [
      '“That’s how I was raised” and “it changed my life” are the two most common Christian answers to “Why the Bible?” — and both fail: the first reduces Christianity to cultural conditioning, the second proves nothing (Malcolm X had a transformative experience and was wrong).',
      'The Voddie Baucham definition, derived from 2 Peter 1:16–21: “I choose to believe the Bible because it is a reliable collection of historical documents written by eyewitnesses during the lifetime of other eyewitnesses. They report supernatural events that took place in fulfillment of specific prophecies and claim their writings are divine rather than human in origin.”',
      'The Bible is not one person’s claim — it is a collection: 40+ authors, 3 continents, 3 languages, 66 volumes covering hundreds of topics, written over 1,500 years, with remarkable internal coherence.',
      'Paul in 1 Corinthians 15 names 500+ eyewitnesses to the resurrection who were still alive when he wrote — a publicly falsifiable claim that was never falsified.',
      'The “telephone game” translation objection is false: every modern Bible translation goes directly back to the original Hebrew, Greek, and Aramaic manuscripts — not to prior translations. Over 6,000 New Testament manuscripts survive, dating within decades of the originals.',
      'Psalm 22 describes crucifixion — the piercing of hands and feet, casting lots for garments, dislocated bones, mocking bystanders — over 1,000 years before Jesus, and before crucifixion was invented as a form of execution.',
      'History is not evaluated by the scientific method (observable, measurable, repeatable) but by the evidentiary method — the same standard used in a court of law. By that standard, the Bible’s evidence is unmatched among ancient documents.',
    ],
    scriptureRefs: ['2 Pet. 1:16–21', '1 John 1:1–3', '1 Cor. 15:3–8', 'Isa. 53', 'Ps. 22'],
    outline: [
      {
        heading: 'I. The Most Important Question Every Christian Must Answer',
        points: [
          'Baucham opens by arguing that once a Christian answers any theological question with “the Bible says,” a follow-up question immediately arises: “Why the Bible? Why that authority above all others?”',
          'Every belief system — Islam, Buddhism, secular humanism — appeals to some authority. The Christian must be able to explain why the Bible deserves the authority they assign it.',
          'This is the Crux: everything distinctly Christian hinges on the answer to this one question.',
        ],
      },
      {
        heading: 'II. Two Inadequate Answers Christians Commonly Give',
        points: [
          'Answer 1: “That’s how I was raised.” The professor’s response: your parents are demonstrably fallible — you already know this. And if all you have is upbringing, then you and the Muslim and the Buddhist are just engaged in a grown-up version of “my dad is bigger than your dad.”',
          'Answer 2: “I tried it and it changed my life.” Baucham counters with Malcolm X: a man who had a vivid, life-altering prison encounter with his Messiah, built his entire life around it, and was wrong. His Messiah — the Honorable Elijah Muhammad — was a fraud. Experience alone proves nothing.',
          'A third variation: the AA member who made a flickering light outside his room his “higher power” and stayed sober for a year. By the “it changed my life” logic, that light has as much authority as the Bible.',
        ],
      },
      {
        heading: 'III. The Definition — Drawn from 2 Peter 1:16–21',
        points: [
          'At Dartmouth, Baucham gave students the answer he derived from Peter’s own defense of scripture: “I choose to believe the Bible because it is a reliable collection of historical documents written by eyewitnesses during the lifetime of other eyewitnesses. They report supernatural events that took place in fulfillment of specific prophecies and claim that their writings are divine rather than human in origin.”',
          'A student emailed later: she used it on her biology professor. He asked her to write it down. She taught it to him instead.',
          'Baucham notes he is not trying to “prove” the Bible — he agrees with Spurgeon: “I would no more defend the Bible than I would defend a lion. You don’t defend a lion, you just let him loose.” He is answering why he chooses to believe it.',
          'Because the Bible is the highest authority, he cannot appeal to a higher authority to justify it — any appeal to a higher authority would concede the argument. The definition is an internal explanation, not an external proof.',
        ],
      },
      {
        heading: 'IV. A Reliable Collection of Historical Documents',
        points: [
          'Written on 3 continents (Asia, Africa, Europe), in 3 languages (Hebrew, Greek, Aramaic), by 40+ authors from every walk of life — kings, fishermen, doctors, tax collectors, generals.',
          '66 volumes covering hundreds of subjects, written over more than 1,500 years.',
          'Luke 1:1–4: Luke openly states he was not an eyewitness but compiled his account from eyewitnesses — a mark of historical integrity. His chief sources were Mary and Peter.',
          'The four Gospels have different authors and different goals: Luke writes history and chronology; John writes for evangelism (organized around 7 signs); Mark is brief and immediate; Matthew writes to a Jewish audience to demonstrate Jesus is the promised Messiah.',
        ],
      },
      {
        heading: 'V. Written by Eyewitnesses',
        points: [
          '2 Peter 1:16: “We did not follow cleverly devised myths when we made known to you the power and coming of our Lord Jesus Christ, but we were eyewitnesses of his majesty.”',
          '1 John 1:1–3: John hammers the point with repeated sensory language — “that which we have heard, which we have seen with our eyes, which we have looked upon and have touched with our hands.”',
          'These are not people who later had a vision. They are attesting to events they personally witnessed.',
        ],
      },
      {
        heading: 'VI. During the Lifetime of Other Eyewitnesses (Falsifiability)',
        points: [
          '1 Corinthians 15:3–8: Paul states that after his resurrection, Jesus appeared to Peter, to the Twelve, then to more than 500 brothers at one time — “most of whom are still alive” when Paul writes.',
          'At minimum 500+ living eyewitnesses to the resurrection were available to contradict Paul’s claim. This made the Gospel message publicly falsifiable — and it was never falsified.',
          'Baucham addresses the apparent contradiction of Jesus appearing to “the Twelve” after Judas died: by the time of 1 Corinthians, Matthias had replaced Judas (Acts 1). The Twelve was an official body requiring eyewitness credentials; there was no contradiction.',
          '25,000+ archaeological digs related to Bible subject matter have been conducted — not one has contradicted the Bible; the overwhelming majority have confirmed it.',
        ],
      },
      {
        heading: 'VII. Refuting the “Telephone Game” Translation Objection',
        points: [
          'The claim: “The Bible has been translated so many times you can’t trust what we have — it’s like a game of telephone.” Baucham says anyone who makes this argument is “either ignorant or evil or both.”',
          'The telephone game analogy collapses because every modern Bible translation goes directly back to the original Hebrew, Greek, and Aramaic manuscripts — not to a prior translation. The source speaks to every translator simultaneously.',
          'Anyone who learns Hebrew, Greek, or Aramaic can go to the source manuscripts themselves. Software exists to test any translation against the manuscripts. There is no hiding.',
          'We are more capable of accurate translation today than at any point in history.',
        ],
      },
      {
        heading: 'VIII. Manuscript Evidence — Refuting Late Dating',
        points: [
          'The New Testament has over 6,000 manuscripts or portions of manuscripts, with the earliest dating to around AD 100–120 — within a few decades of the completion of the New Testament.',
          'Comparison: Aristotle’s Poetics — fewer than 12 manuscripts, earliest 1,000+ years after writing. Julius Caesar’s Gallic Wars — fewer than 12, earliest 1,000+ years after writing. Homer’s Iliad (the best-attested ancient work besides the NT) — a few hundred manuscripts, earliest 2,100 years after the original.',
          '“If the Bible is not considered reliable at an institution like this, then there is no ancient document that should ever be considered trustworthy, because none comes close.”',
          'The Constantine/monk conspiracy theory requires: altering 6,000+ Greek manuscripts identically without detection, then doing the same in Syriac, Coptic, and Latin, and then altering all the writings of the early church fathers — who quoted the NT so extensively we could reconstruct it but for 11 verses. “That’s fantasy.”',
        ],
      },
      {
        heading: 'IX. They Report Supernatural Events',
        points: [
          'The Bible is not a collection of moral rules — it is a record of supernatural events: the Transfiguration, healings, Jesus walking on water, the crossing of the Red Sea, and above all the bodily resurrection.',
          '“Dead Friday, risen Sunday.” These are not the writings of a religious community passing down regulations. They are eyewitness accounts of the miraculous.',
        ],
      },
      {
        heading: 'X. Fulfillment of Specific Prophecies — Isaiah 53',
        points: [
          'Isaiah 53 was written over 700 years before Jesus — and describes the suffering servant with detail that unmistakably matches the life, death, and purpose of Christ.',
          'The Jewish reading calendar skips Isaiah 53 — jumping from chapter 52 to 54 — because of how uncomfortable its messianic implications are.',
          'Baucham recounts a ministry colleague who read Isaiah 53 to a Jewish Israeli friend and asked who it described. The friend said, “That’s about Jesus — it’s in the New Testament.” When shown it was from his own Hebrew Bible, he became immediately angry — because he knew what it meant.',
        ],
      },
      {
        heading: 'XI. Psalm 22 — Crucifixion Described Before It Was Invented',
        points: [
          'Psalm 22 was written over 1,000 years before Jesus and opens with the words Jesus quotes from the cross: “My God, my God, why have you forsaken me?” — which was the scroll’s title, a deliberate quotation pointing hearers to the rest of the psalm.',
          'The psalm describes: bones out of joint from hanging; a heart melting like wax (consistent with cardiac rupture — blood and water from the side); extreme thirst (“I thirst”); the mocking of bystanders saying “he trusted in the Lord, let him deliver him” (the exact taunt at Calvary); and soldiers casting lots for garments.',
          'Most devastating: “they have pierced my hands and feet.” Not everyone crucified was pierced — some were merely tied. And crucifixion had not yet been invented when David wrote Psalm 22. It is a description of an execution method that did not yet exist.',
          'Jesus’ bones were not broken (fulfilling Ps. 34:20) because he died quickly before the legs needed to be shattered, allowing him to die before the Passover Sabbath.',
        ],
      },
      {
        heading: 'XII. They Claim Divine Rather Than Human Origin',
        points: [
          '2 Peter 1:20–21: “No prophecy of scripture comes from someone’s own interpretation. For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit.”',
          'Throughout Scripture the claim is constant: “And the Lord said…” “Thus says the Lord…” “The Lord spoke to Moses saying…” The authors are not presenting their own opinions — they are claiming to be instruments of divine communication.',
          'The fulfilled prophecies lend enormous credibility to this claim: if God predicted these things centuries in advance with precision, the claim to divine authorship becomes far harder to dismiss.',
        ],
      },
      {
        heading: 'XIII. The Scientific Method Objection',
        points: [
          '“I’m a man of science — I need this proven scientifically.” Baucham: “I just want to give them a hug… don’t ever say that to anyone else because you do sound like an idiot.”',
          'The scientific method requires something to be observable, measurable, and repeatable. History is none of these. You cannot apply the scientific method to historical events.',
          'Historical claims are evaluated by the evidentiary method — the standard used in a courtroom: reliability of witnesses, corroboration, internal and external evidence, falsifiability.',
          'By the evidentiary method: 3 continents, 3 languages, 40+ authors who mostly never met, 66 volumes, 1,500 years, one coherent redemptive story, 25,000+ confirming archaeological digs, and the unmatched manuscript record. The intelligent conclusion is to believe.',
        ],
      },
    ],
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      {/* Page header */}
      <div className="text-center px-8 pb-16">
        <p className="font-cinzel text-[0.75rem] tracking-[0.35em] uppercase text-gold mb-4 opacity-80">
          ChristCornerstone
        </p>
        {/* Audit L6: page header reads "Featured Talks" so the H1 doesn't oversell
            (was "Videos" plural for a single curated talk). The page route + tab
            title stay /videos and "Videos" so the slot is ready for an archive. */}
        <h1
          className="font-cormorant font-light text-cream mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.15 }}
        >
          Featured Talks
        </h1>
        <p className="font-lato text-text-muted max-w-xl mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          Apologetics, theology, and faith — watch, learn, and be equipped.
        </p>
        <div className="w-16 h-px bg-gold mx-auto mt-8" style={{ opacity: 0.4 }} />
      </div>

      {/* Video list */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-24">
        {VIDEOS.map((video) => {
          const summaryText = video.summary;
          const outlineText = video.outline
            .map((s) => `${s.heading}. ${s.points.join(' ')}`)
            .join(' ');

          return (
            <article key={video.id}>
              {/* Speaker label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-cinzel text-gold tracking-[0.2em] uppercase" style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                  {video.speaker}
                </span>
                <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
                <span className="font-cinzel text-gold-dim tracking-[0.2em] uppercase" style={{ fontSize: '0.72rem' }}>
                  Apologetics
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-cormorant font-semibold text-cream mb-8"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.2 }}
              >
                {video.title}
              </h2>

              {/* Key points */}
              {video.keyPoints.length > 0 && (
                <div
                  className="rounded-xl px-7 py-6 mb-8"
                  style={{ background: 'var(--deep-navy)', borderLeft: '3px solid rgba(201,168,76,0.5)' }}
                >
                  <h3 className="font-cinzel tracking-[0.25em] uppercase mb-5" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
                    Key Points
                  </h3>
                  <ul className="space-y-3">
                    {video.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-cinzel text-gold mt-0.5 flex-shrink-0" style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-lato text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 16:9 YouTube embed */}
              <div className="mb-10">
                <h3 className="font-cinzel tracking-[0.25em] uppercase mb-5" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
                  Watch the Full Talk
                </h3>
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    paddingBottom: '56.25%',
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.14)',
                  }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>

              {/* Summary with TTS player */}
              <div className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                  <h3 className="font-cinzel tracking-[0.25em] uppercase" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
                    Summary
                  </h3>
                  <DiscussionAudioPlayer text={summaryText} label="Listen to Summary" />
                </div>
                {video.summary.split('\n\n').map((para, i) => (
                  <p key={i} className="font-lato text-text-light leading-relaxed mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                    {para.trim()}
                  </p>
                ))}
              </div>

              {/* Scripture references */}
              {video.scriptureRefs.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-cinzel tracking-[0.25em] uppercase mb-4" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
                    Scripture References
                  </h3>
                  <ScriptureRefsSection references={video.scriptureRefs} />
                </div>
              )}

              {/* Detailed Outline with audio player */}
              {video.outline.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <h3 className="font-cinzel tracking-[0.25em] uppercase" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
                      Detailed Outline
                    </h3>
                    <DiscussionAudioPlayer text={outlineText} label="Listen to Outline" />
                  </div>
                  <div className="space-y-6">
                    {video.outline.map((section, si) => (
                      <div
                        key={si}
                        className="rounded-xl px-7 py-6"
                        style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
                      >
                        <h4 className="font-cinzel text-gold mb-4" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                          {section.heading}
                        </h4>
                        <ul className="space-y-3">
                          {section.points.map((point, pi) => (
                            <li key={pi} className="flex items-start gap-3">
                              <span
                                className="flex-shrink-0 mt-2 rounded-full bg-gold"
                                style={{ width: '4px', height: '4px', opacity: 0.5 }}
                              />
                              <span className="font-lato text-text-light leading-relaxed" style={{ fontSize: '0.97rem', lineHeight: 1.75 }}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
