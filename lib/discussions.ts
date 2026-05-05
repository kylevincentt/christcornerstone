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
      'Dr. William Lane Craig opens his Defenders series on the Doctrine of Christ by examining the Incarnation — the eternal Son of God taking on human flesh. Craig explores the philosophical and theological depth of Jesus being fully God and fully man, drawing on the Chalcedonian definition and key New Testament texts to ground this central mystery of the Christian faith.',
    key_points: [
      'The Incarnation is the doctrine that the eternal Son of God became fully human in the person of Jesus Christ without ceasing to be divine.',
      'The Council of Chalcedon (451 AD) defined Christ as having two natures — fully divine and fully human — united in one person, without confusion, change, division, or separation.',
      'Philippians 2:6–8 (the “kenosis” passage) describes Christ “emptying himself,” which Craig explains as taking on human limitations, not surrendering divine attributes.',
      'John 1:14 (“the Word became flesh”) establishes that the pre-existent Logos, the eternal Son, entered space and time in a real, physical human body.',
      'Understanding the Incarnation is foundational to the doctrines of the Atonement and Resurrection — only a being who is both God and man could serve as the perfect mediator and sacrifice.',
    ],
    scripture_references: ['John 1:14', 'Phil. 2:6–8', 'Col. 2:9', 'Heb. 2:14'],
    additional_context:
      'This video is part of the Defenders podcast series by Dr. William Lane Craig of Reasonable Faith Ministries — a rigorous Sunday school class covering the full sweep of Christian doctrine and apologetics. The series is freely available at reasonablefaith.org and is an excellent resource for anyone seeking a deeper, academically grounded understanding of the faith.',
  },
];

export function getDiscussionBySlug(slug: string): Discussion | undefined {
  return DISCUSSIONS.find((d) => d.slug === slug);
}
