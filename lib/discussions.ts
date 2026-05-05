/**
 * Hardcoded weekly discussion videos.
 * To add a new discussion, append an entry to the DISCUSSIONS array.
 */

export interface Discussion {
  id: string;
  slug: string;
  youtube_id: string;
  title: string;
  date: string;
  series: string;
  summary: string;
  key_points: string[];
  scripture_references: string[];
  additional_context?: string;
}

export const DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    slug: 'doctrine-of-christ-1-incarnation',
    youtube_id: 'wvb7IoEv5oc',
    title: 'Doctrine of Christ Part 1: The Incarnation',
    date: '2026-05-04',
    series: 'Defenders · Reasonable Faith',
    summary:
      'Dr. William Lane Craig opens the Christology unit of his Defenders series by introducing the two-part structure of the doctrine of Christ: the person of Christ (the Incarnation) and the work of Christ (the Atonement). Drawing from a range of New Testament passages, Craig establishes that Scripture affirms both the true deity and the true humanity of Jesus. He walks through texts showing Christ experienced physical birth, hunger, fatigue, sleep, mental limitation, temptation, moral growth through suffering, and ultimately death. Critically, Craig notes that 1 John 4:1–3 identifies denial of Christ’s coming in the flesh as the spirit of antichrist — making the humanity of Christ as doctrinally essential as His divinity. Craig then surveys the Christological controversies of the 4th–7th centuries, framing the central debate between monophysite (one blended divine-human nature) and dyophysite (two complete natures) Christology. He closes with the crucial insight that the Incarnation was not subtraction — the Logos did not shed divine attributes to become human — but addition: the eternal Son acquired a complete human nature while remaining fully divine.',
    key_points: [
      'Christology has two divisions: the Person of Christ (the Incarnation) and the Work of Christ (the Atonement). Both are absolutely central to Christian theology — everything distinctly Christian hinges on them.',
      'Scripture affirms Christ’s true deity through passages like Philippians 2:5–8, which describes him as being “in the form of God” and equal with God before his voluntary humbling and taking on human form.',
      'Christ’s true humanity is equally attested: Scripture records him experiencing physical birth, hunger (Matt. 4:2), fatigue (John 4:6), sleep (Mark 4:38), temptation (Matt. 4:1), mental limitation — not knowing the day of his return (Mark 13:32) — and finally torture and death (Luke 23:33, 46).',
      'Hebrews 5:7–10 reveals that Jesus was “perfected through what he suffered,” meaning he underwent real moral and spiritual growth as a human being. This may be uncomfortable, Craig says, but is doctrinally essential.',
      '1 John 4:1–3 declares that any spirit which does not confess that Jesus Christ has come in the flesh “is not of God” — affirming the true humanity of Christ is not optional but a test of orthodoxy.',
      'The Incarnation must be understood as addition, not subtraction. The Logos did not shed divine attributes to turn into a human being (as in pagan mythology). Rather, the eternal Son acquired a full human nature — body and rational soul — in addition to his existing divine nature.',
      'The central christological dispute of the early church was between monophysites (Christ has one blended divine-human nature) and dyophysites (Christ has two complete and distinct natures). Craig closes by asking students to consider which position makes more sense — to be resolved in the next session.',
    ],
    scripture_references: ['Phil. 2:5–8', 'Mark 13:32', 'Heb. 5:7–10', '1 John 4:1–3', 'Luke 23:33', 'John 4:6'],
    additional_context:
      'This class is part of the Defenders podcast by Dr. William Lane Craig of Reasonable Faith Ministries — a rigorous Sunday school course covering the full sweep of Christian doctrine and apologetics. The Christological controversies Craig surveys here (4th–7th centuries) came directly after the Trinitarian controversies that produced the Councils of Nicaea (325 AD) and Constantinople (381 AD). The Greek term at the center of these debates is physis (“nature”): the Aristotelian framework the church fathers used defined human nature as being “a rational animal” — possessing both a physical body and an intellectual soul. The question was how the eternal Logos could acquire that nature without either ceasing to be God or producing an incoherent metaphysical mixture. The full series is freely available at reasonablefaith.org.',
  },
];

export function getDiscussionBySlug(slug: string): Discussion | undefined {
  return DISCUSSIONS.find((d) => d.slug === slug);
}
