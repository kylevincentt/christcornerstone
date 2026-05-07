/**
 * Hardcoded weekly discussion videos.
 * To add a new discussion, append an entry to the DISCUSSIONS array.
 */

export interface OutlineSection {
  heading: string;
  points: string[];
}

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
  outline?: OutlineSection[];
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
      'Dr. William Lane Craig opens the Christology unit of his Defenders series by introducing the two-part structure of the doctrine of Christ: the person of Christ (the Incarnation) and the work of Christ (the Atonement). Drawing from a range of New Testament passages, Craig establishes that Scripture affirms both the true deity and the true humanity of Jesus. He walks through texts showing Christ experienced physical birth, hunger, fatigue, sleep, mental limitation, temptation, moral growth through suffering, and ultimately death. Critically, Craig notes that 1 John 4:1–3 identifies denial of Christ’s coming in the flesh as the spirit of antichrist — making the humanity of Christ as doctrinally essential as His divinity. Craig then surveys the Christological controversies of the 4th–7th centuries, framing the central debate between monophysite (one blended divine-human nature) and dyophysite (two complete natures) Christology. He closes with the crucial insight that the Incarnation was not subtraction — the Logos did not shed divine attributes to become human — but addition: the eternal Son acquired a complete human nature while remaining fully divine.',
    key_points: [
      'Christology has two divisions: the Person of Christ (the Incarnation) and the Work of Christ (the Atonement). Both are absolutely central to Christian theology — everything distinctly Christian hinges on them.',
      'Scripture affirms Christ’s true deity through passages like Philippians 2:5–8, which describes him as being “in the form of God” and equal with God before his voluntary humbling and taking on human form.',
      'Christ’s true humanity is equally attested: Scripture records him experiencing physical birth, hunger (Matt. 4:2), fatigue (John 4:6), sleep (Mark 4:38), temptation (Matt. 4:1), mental limitation — not knowing the day of his return (Mark 13:32) — and finally torture and death (Luke 23:33, 46).',
      'Hebrews 5:7–10 reveals that Jesus was “perfected through what he suffered,” meaning he underwent real moral and spiritual growth as a human being. This may be uncomfortable, Craig says, but is doctrinally essential.',
      '1 John 4:1–3 declares that any spirit which does not confess that Jesus Christ has come in the flesh “is not of God” — affirming the true humanity of Christ is not optional but a test of orthodoxy.',
      'The Incarnation must be understood as addition, not subtraction. The Logos did not shed divine attributes to turn into a human being (as in pagan mythology). Rather, the eternal Son acquired a full human nature — body and rational soul — in addition to his existing divine nature.',
      'The central christological dispute of the early church was between monophysites (Christ has one blended divine-human nature) and dyophysites (Christ has two complete and distinct natures). Craig closes by asking students to consider which position makes more sense — to be resolved in the next session.',
    ],
    scripture_references: ['Phil. 2:5–8', 'Mark 13:32', 'Heb. 5:7–10', '1 John 4:1–3', 'Luke 23:33', 'John 4:6'],
    outline: [
      {
        heading: 'I. Introduction to Christology',
        points: [
          'Craig begins a new unit in the Defenders series: the Doctrine of Christ, which goes by the name Christology.',
          'Christology divides into two major areas: (1) the Person of Christ — Who is Jesus? — centered on the Incarnation; and (2) the Work of Christ — What did he do? — centered on the Atonement.',
          'Until now the series covered a generic monotheism (the doctrine of God, Trinity, Holy Spirit). With Christ, the content becomes distinctly and uniquely Christian.',
        ],
      },
      {
        heading: 'II. The True Deity of Christ',
        points: [
          'Craig refers back to the Trinity section for the full biblical case for Christ’s divinity rather than repeating it here.',
          'Key passage: Philippians 2:5–8 — “Though he was in the form of God, he did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being born in the likeness of men.”',
          'This passage captures both Christ’s pre-existent deity and his voluntary humbling in the Incarnation.',
        ],
      },
      {
        heading: 'III. The True Humanity of Christ',
        points: [
          'Physical birth — Luke 2:7, 11: Jesus was born as Mary’s firstborn son, laid in a manger. “For to you is born this day in the city of David a Savior, who is Christ the Lord.”',
          'Temptation — Matthew 4:1: “Jesus was led up by the Spirit into the wilderness to be tempted by the devil.” He experienced real temptation as we do.',
          'Intellectual and physical growth — Luke 2:52: “Jesus increased in wisdom and in stature and in favor with God and man.” The boy Jesus grew both mentally and physically.',
          'Hunger — Matthew 4:2: After fasting forty days, “afterward he was hungry.” His body was subject to physical deprivation.',
          'Fatigue and thirst — John 4:6: “Jesus, wearied as he was with his journey, sat down beside the well.” He was tired and asked the Samaritan woman for a drink.',
          'Exhaustion — Mark 4:38: During the violent storm on the lake, Jesus was so exhausted he slept on a cushion in the stern while the boat was being swamped.',
          'Mental limitation — Mark 13:32: “Of that day or that hour, no one knows, not even the angels in heaven, nor the Son, but only the Father.” Jesus did not know the timing of his own return.',
          'Torture and death — Luke 23:33, 46: Jesus was crucified and died on the cross, crying out, “Father, into thy hands I commit my spirit.”',
          'Moral growth through suffering — Hebrews 5:7–10: “Although he was a Son, he learned obedience through what he suffered, and being made perfect, he became the source of eternal salvation.” Jesus was morally perfected through his experience of human suffering.',
        ],
      },
      {
        heading: 'IV. Why the Humanity of Christ Is Non-Negotiable',
        points: [
          'Craig acknowledges that affirming Christ’s full human limitations may make believers “squirm in discomfort” — but insists it is just as essential as his deity.',
          '1 John 4:1–3: “Every spirit which does not confess Jesus is not of God. This is the spirit of antichrist.” Denying that Christ has come in the flesh is not a minor theological disagreement — John classifies it as heresy.',
          'Practically, if Christ’s suffering and death were merely illusory, the Atonement collapses. A merely apparent death cannot produce a real redemption.',
        ],
      },
      {
        heading: 'V. The Central Christological Problem',
        points: [
          'If anything looks like a logical contradiction, Craig says, surely this is it: how can Jesus be simultaneously creator and creature, infinite and finite, omniscient and ignorant, omnipotent and weak, morally perfect and morally perfectible?',
          'Craig calls this the “proverbial round square” or “married bachelor” — a tension that demanded centuries of careful theological work.',
          'The attributes of deity seem to drive out the attributes of humanity, and vice versa — making the affirmation of “truly God and truly man” (Latin: vera deus vero homo) appear incoherent on the surface.',
        ],
      },
      {
        heading: 'VI. The Christological Controversies (4th–7th Centuries)',
        points: [
          'After the Trinitarian controversies (Councils of Nicaea 325 AD and Constantinople 381 AD), the church entered a new era of Christological controversy.',
          'Two broad schools emerged, often labeled Alexandrian vs. Antiochian but more precisely monophysite vs. dyophysite — from the Greek physis, meaning “nature.”',
          'Both schools shared the Aristotelian framework: things have natures (essential properties) that make them what they are. Human nature = “rational animal” (body + intellectual/rational soul). Divine nature = omnipotence, omniscience, eternity, moral perfection, etc.',
          'Monophysites held that after the Incarnation Christ possessed a single blended divine-human nature. Some pictured the Logos “clothing himself in flesh”; some believed Christ’s flesh was deified by its union with the divine Logos.',
          'Dyophysites held that the Incarnation involved the Logos being joined to a complete human being — both body and rational soul — resulting in two complete and distinct natures united in one person.',
        ],
      },
      {
        heading: 'VII. The Incarnation as Addition, Not Subtraction',
        points: [
          'Craig establishes a foundational principle: the Incarnation is not the Logos shedding or laying aside divine attributes in order to become human. That conception resembles pagan mythology — Zeus turning himself into a bull or a swan.',
          'To shed his divine nature would mean ceasing to be God. But Christian doctrine insists Christ is both God and man simultaneously, not sequentially.',
          'Therefore the Incarnation must be understood as the Logos acquiring a human nature in addition to his existing divine nature — not subtraction, but addition.',
          'The remaining question — how exactly to understand this acquisition — is what separates monophysite from dyophysite Christology. Craig closes by posing the question to the class for the next session.',
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'doctrine-of-christ-2-apollinarianism',
    youtube_id: 'T4tOA7O3ETg',
    title: 'Doctrine of Christ Part 2: Apollinarianism',
    date: '2026-05-11',
    series: 'Defenders · Reasonable Faith',
    summary:
      'Dr. William Lane Craig continues the Christology unit by examining the first major monophysite solution to the Incarnation: Apollinarianism. Apollinaris of Laodicea (died 390 AD) identified a key problem — if Christ possessed both a complete human mind and the divine Logos, the result would be merely God indwelling a man, not true Incarnation. His solution drew on a tripartite anthropology: humans consist of a body (soma), animal soul (psyche), and rational mind (nous). In Christ, the Logos replaced the human nous, constitutionally uniting with humanity rather than merely inhabiting it. Craig traces this model back to Athanasius, surveys its genuine advantages — including its explanation of Christ’s sinlessness — and then presents the two fatal objections that led to its condemnation in 377 AD: it reduces human nature to a merely animal nature, and by failing to assume a human mind, Christ cannot redeem the human mind. A rich class discussion probes the unsolved tension of Christ’s real temptations, free will in heaven, the transmission of original sin, and the two wills of Christ.',
    key_points: [
      'Apollinaris’s core problem: if the Logos merely indwells a complete human being, that is not genuine incarnation — it is just God living inside a man.',
      'His tripartite anthropology: human beings = body (soma) + animal soul (psyche) + rational mind (nous). In Christ, the divine Logos replaced the human nous, producing a genuine constitutional union rather than mere indwelling.',
      'This model traces back to Athanasius, who consistently spoke of the Logos “taking on flesh” and never referred to a human soul in Jesus. The Logos experienced suffering, hunger, and fatigue through the flesh he assumed.',
      'Apollinarianism has real advantages: it secures genuine personal unity (one person, one mind), explains Christ’s sinlessness (the nous is the seat of sinful desire; Christ had no human nous), and is no more philosophically puzzling than soul-body union in ordinary humans.',
      'The temptation problem: if the Logos cannot be tempted and cannot sin, were Christ’s desert temptations real? Craig says on Apollinarianism they are like “bullets bouncing off Superman” — a constraint that any adequate Christology must address.',
      'First fatal flaw (condemned 377 AD): a body without a rational soul is not a true human nature but merely an animal nature. Gregory of Nyssa charged that Apollinaris made the Incarnation God becoming an animal, not a man.',
      'Second fatal flaw: quod non assumptum, non sanatum — “What is not assumed is not saved.” If Christ had no human mind or human will, he could not redeem them. Apollinarianism undermines the very salvation it claims to ground.',
    ],
    scripture_references: ['Heb. 4:15', 'James 1:13', 'Heb. 10:7', 'Heb. 5:5'],
    outline: [
      {
        heading: 'I. Recap of Part 1',
        points: [
          'Two competing schools: monophysite (one divine-human nature) vs. dyophysite (two complete natures).',
          'Monophysites pictured the Logos clothing himself in flesh — a single blended nature after the Incarnation.',
          'Dyophysites insisted the Logos was joined at conception to a complete human being (body + rational soul), resulting in two complete natures in one person.',
        ],
      },
      {
        heading: 'II. Apollinaris of Laodicea',
        points: [
          'Bishop in Laodicea, died 390 AD — one of the most creative and influential Alexandrian thinkers of the Christological controversies.',
          'Core problem he identified: if Christ had both a complete human mind (nous) and the divine Logos, then the Logos merely indwelt the man Jesus — that falls short of a true incarnation.',
          'His anthropology was tripartite: humans = soma (body) + psyche (animal soul) + nous (rational mind). In Christ, the Logos took the place of the human nous.',
          'Result: Christ = divine Logos + human soma + human psyche. A single nature — part co-essential with God (the Logos), parts co-essential with us (body and animal spirit).',
          'On this model the body was both the Logos’s means of experiencing the world and his instrument for acting in it.',
        ],
      },
      {
        heading: 'III. Athanasius as Precedent',
        points: [
          'The great Athanasius — champion of Nicene orthodoxy — consistently spoke of the Logos “taking on flesh,” never once referring to a human soul in Jesus.',
          'From Orations Against the Arians: “The Logos in his own nature is impassable... because of the flesh which he put on, these things are ascribed to him since they belong to the flesh.”',
          'Apollinaris stands squarely in this Alexandrian tradition of seeing the Incarnation as the Logos taking on flesh.',
        ],
      },
      {
        heading: 'IV. Advantages of Apollinarianism',
        points: [
          'Genuine constitutional union: not God inhabiting a man, but the Logos being constitutionally united with humanity — analogous to how a soul unites with a body.',
          'Unity of person: there is only one person, one intellect — the Logos clothed with flesh. No risk of splitting Christ into two persons.',
          'Sinlessness secured: the nous is the seat of sinful desires. Since Christ had no human nous but the divine Logos, he was not merely resistant to sin but incapable of it.',
          'No greater philosophical difficulty than ordinary anthropological dualism — if soul-body union is intelligible, so is Logos-body union on this model.',
        ],
      },
      {
        heading: 'V. The Temptation Problem (Class Discussion)',
        points: [
          'If the Logos is God and God cannot be tempted (James 1:13), yet Hebrews 4:15 says Christ “was tempted in every way just as we are,” how are these reconciled?',
          'Craig: on Apollinarianism, Christ’s temptations would be like “bullets bouncing off Superman” — no real lure, no existential pull.',
          'This is a constraint any viable Christological model must satisfy: Christ must have genuinely felt the force of temptation while remaining sinless.',
          'Craig flags the issue as unresolved on Apollinarianism and says it will require “finessing” — returning to it in future sessions.',
        ],
      },
      {
        heading: 'VI. Condemnation — Two Fatal Deficiencies (Synod of Rome, 377 AD)',
        points: [
          'Deficiency 1: A body without a rational soul is not a true human nature — it is merely an animal nature. Gregory of Nyssa accused Apollinaris of making the Incarnation God becoming an animal, not a man. The true humanity of Christ is compromised.',
          'Deficiency 2: The principle quod non assumptum, non sanatum — “What is not assumed is not saved.” If the Logos did not take on a human mind, the human mind was not redeemed. As a class member notes: if he had no human will, the human will is also unredeemed.',
          'Both objections strike at the same root: Apollinarianism gives us a Christ who is not genuinely human and therefore cannot genuinely save what is human.',
        ],
      },
      {
        heading: 'VII. Looking Ahead',
        points: [
          'Next session: the Antiochian (dyophysite) school of Christology, which insisted Christ must have two complete natures — both fully divine and fully human.',
          'Craig previews the problem this view creates: if there are two complete natures, how do we avoid splitting Christ into two persons? That tension will define the next chapter of the Christological controversies.',
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'doctrine-of-christ-3-nestorianism',
    youtube_id: 'eqXhewljWF0',
    title: 'Doctrine of Christ Part 3: Nestorianism and the Road to Chalcedon',
    date: '2026-05-18',
    series: 'Defenders · Reasonable Faith',
    summary:
      'Dr. William Lane Craig turns from the monophysite Christology of Apollinaris to its dyophysite alternative — the Antiochian school — and walks through the second great Christological crisis of the early church. He begins with Theodore of Mopsuestia, who construed the Incarnation as a special form of indwelling: the Logos attached himself to the man Jesus at the moment of conception in Mary’s womb, with the unity of the two natures being a functional unity of mutual love and harmonious will, presenting one prosopon (face or persona) to the world. Craig then introduces Nestorius, patriarch of Constantinople from 428, who insisted that Christ has two complete natures and rejected the title Theotokos for Mary on the ground that she bore only the man Jesus, not the divine Logos. The Alexandrians — and in particular Cyril of Alexandria — saw this as a thinly veiled doctrine of two persons, two sons. Yet Cyril’s own analogy of soul-body union failed to escape the dilemma, collapsing back into either Apollinarianism or Nestorianism. The Council of Ephesus (431 AD) condemned Nestorianism for failing to secure a real ontological union of God and man, leaving the church boxed in: Apollinarianism had been rejected for denying Christ a human mind, and Nestorianism for splitting Christ into two persons. A rich classroom discussion presses the unsolved tensions — two consciousnesses in Christ, the relationship between trichotomy and Christology, the status of Old Testament theophanies — and Craig closes by reading the Chalcedonian Definition (451 AD), the careful “middle course” the church charted between Antioch and Alexandria: one and the same Son, truly God and truly man, made known in two natures “without confusion, without change, without division, without separation,” the property of each nature being preserved and concurring in one person and one subsistence.',
    key_points: [
      'Antiochian (dyophysite) Christology insists Christ has two complete natures — both a divine nature and a fully human nature with a rational soul and a human body. The cost of preserving Christ’s full humanity, however, is the constant pressure toward affirming two persons.',
      'Theodore of Mopsuestia (Antiochian) framed the Incarnation as a special indwelling: God is providentially present in all things, but in Christ he was pleased to indwell “as in a son.” The unity of the two natures was a functional unity of mutual love and harmonious will, presenting one prosopon — the Greek theatrical mask, a common face — to the world.',
      'Nestorius, patriarch of Constantinople in 428, became the lightning rod of the Antiochian school. He affirmed two complete natures in Christ and rejected the title Theotokos (Mother of God) for Mary, insisting she bore only the man Jesus, who was united with the Logos in the Incarnation.',
      'Cyril of Alexandria countered Nestorius with the analogy that the Logos indwells the man Jesus the way a soul indwells a body. Craig argues this analogy collapses: it either reduces to Apollinarianism (Logos replaces the human soul) or to Nestorianism (Logos joins a complete human person, yielding two persons).',
      'The Council of Ephesus (431 AD) condemned Nestorianism. The fundamental problem was that Nestorianism could not secure a genuine ontological union of divinity and humanity in Christ — at best it gave a juxtaposition of God and man, not a true incarnation.',
      'The church now faced a corner: Apollinarianism had been condemned for denying Christ’s full humanity, and Nestorianism had been condemned for splitting Christ into two persons. Charting a path between these two errors required a more careful theological vocabulary.',
      'The Council of Chalcedon (451 AD), convened by the emperor at the request of Pope Leo the Great, settled the controversy with the Chalcedonian Definition: one and the same Son, truly God and truly man, made known in two natures “without confusion, without change, without division, without separation,” united in one person (prosopon) and one subsistence (hypostasis).',
    ],
    scripture_references: ['Phil. 2:7', 'Luke 2:52', 'John 1:14', 'Heb. 4:15', 'Prov. 20:27'],
    outline: [
      {
        heading: 'I. Recap — Two Schools of Christology',
        points: [
          'Alexandrian (monophysite) school: one nature in Christ after the Incarnation, with divine and human elements blended together — represented in Part 2 by Apollinaris.',
          'Antiochian (dyophysite) school: two complete natures in Christ — a full human nature (rational soul and human body) and a full divine nature.',
          'Apollinarianism had already been condemned. The question now: can the dyophysite alternative succeed where Apollinarianism failed?',
        ],
      },
      {
        heading: 'II. Theodore of Mopsuestia — Incarnation as Special Indwelling',
        points: [
          'Among the most prominent Antiochian theologians, author of On the Incarnation.',
          'Premise: God is omnipresent and providentially present to all things in their existence and operation. But by his good pleasure he chooses to be more intimately present to some than to others.',
          'In Christ, God was pleased to indwell “as in a son” — the Logos attached himself to the man Jesus at the moment of conception in Mary’s womb.',
          'Theodore affirmed only one person in Christ, but held that each nature has its own hypostasis — its own property bearer — and that the union is a functional unity of mutual love and harmonious will.',
          'The one person of Christ is therefore a prosopon — the Greek theatrical mask — a common “face” presented to the world by two harmoniously willing natures.',
          'Detractors immediately suspected that a unity merely of love and will, with each nature retaining its own hypostasis, was not really one person at all.',
        ],
      },
      {
        heading: 'III. Nestorius — Patriarch of Constantinople, 428 AD',
        points: [
          'Nestorius affirmed two complete natures in Christ and became the figure most associated with the Antiochian view.',
          'He famously objected to calling Mary Theotokos (“God-bearer” or “Mother of God”), a title widely used in Christian piety because she bore Christ.',
          'Nestorius’s position: Mary bore only the man Jesus. She did not bear the divine Logos. Mary is the mother of the man Jesus — the man who was united to the Logos in the Incarnation — not the mother of the Logos.',
          'What was conceived in Mary’s womb, what grew, was crucified, and was buried, was not God but the man Jesus — though he is called God because of the divinity of the Logos who assumed him as his human nature.',
          'Nestorius affirmed the Virgin Birth: through the power of the Holy Spirit, Mary miraculously conceived the man Jesus — but conceived a human being, not the Logos himself.',
        ],
      },
      {
        heading: 'IV. The Alexandrian Charge — Two Persons, Two Sons',
        points: [
          'Despite Nestorius’s protestations, the Alexandrian theologians believed his view was logically committed to two persons in Christ — two sons, one human and one divine.',
          'Their reasoning: if each nature is complete with its own rational faculties, it is hard to see why you would not have two persons. Two complete sets of personal faculties seem to constitute two persons.',
          'The Alexandrians could no longer take refuge in Apollinarianism (already condemned), so they had to admit a human soul in Christ — yet they could not explain how to do so without ending up with two persons.',
          'They were certain of one thing from Scripture: there is only one Son of God, only one person — not two.',
        ],
      },
      {
        heading: 'V. Cyril of Alexandria — The Soul-Body Analogy',
        points: [
          'Cyril writes: “When he was made flesh, we do not define the indwelling in him in precisely the same manner as that in which one speaks of an indwelling in the saints… being united by nature and not changed into flesh, he affected such an indwelling as the soul of man might be said to have in its own body.”',
          'Cyril’s indwelling of the Logos in Christ is therefore not like the Holy Spirit indwelling a believer — it is a constitutional union analogous to the soul’s union with its body.',
          'Craig’s critique: this analogy is unstable. Either the Logos takes the place of the human soul — which is Apollinarianism — or the Logos joins a complete man already possessing his own soul, which leads back to Nestorianism with two persons.',
          'Cyril could not explain how to have two complete natures in Christ without two persons.',
        ],
      },
      {
        heading: 'VI. Council of Ephesus, 431 AD — Nestorianism Condemned',
        points: [
          'The fundamental indictment: Nestorianism cannot posit a genuine union of God and man in Christ. At best it gives an indwelling — an ontological juxtaposition of divinity and humanity, not a real incarnation.',
          'Yet given that Apollinarianism is also rejected, the church now seems boxed in: a complete human nature (with mind and will) appears to push toward two persons; denying a complete human nature pushes toward Apollinarianism.',
          'Charting a path forward will require careful theological vocabulary — the distinction between nature, person (prosopon), and subsistence (hypostasis) — that the Council of Chalcedon will eventually supply.',
        ],
      },
      {
        heading: 'VII. Class Discussion — Pressing the Tensions',
        points: [
          'Two consciousnesses? On Nestorianism, Christ would seem to have two minds — a human mind that began as an infant and grew in wisdom (Luke 2:52), and the omniscient mind of the Logos. Critics worried this implied something like multiple personality.',
          'Trichotomy and Christology: a class member proposes that humans are body + soul + spirit, with the Logos taking the place of the human spirit. Craig responds that whatever element you say the Logos replaces, this just relocates Apollinarianism — the objection still applies.',
          'Theophanies: did the Son appear bodily in Old Testament theophanies before the Incarnation? Craig: orthodox Christology holds that there is only one Incarnation — the prior appearances were not genuine incarnations, only theophanies.',
          'Trinitarian common ground: across all parties in this debate, the truth of the Nicene Creed (325 AD) was assumed. The Christological controversies presupposed Christ’s full deity; the question was how the Logos relates to his human nature.',
        ],
      },
      {
        heading: 'VIII. The Council of Chalcedon, 451 AD — The Definition',
        points: [
          'Convened by the emperor at the request of Pope Leo the Great to settle the Antioch–Alexandria controversy. Its statement charts a careful middle course.',
          'Chalcedonian Definition: “We confess one and the same Son, our Lord Jesus Christ, the same perfect in Godhead and also perfect in manhood, truly God and truly man, of a reasonable soul and body…”',
          '“Consubstantial (homoousios) with the Father according to the Godhead, and consubstantial with us according to the manhood, like us in all things except sin.”',
          'The decisive negative formula: Christ is to be acknowledged in two natures “without confusion, without change, without division, without separation” — the property of each nature being preserved and concurring in one person (prosopon) and one subsistence (hypostasis).',
          'Craig closes by previewing the next session: a careful examination of how the Chalcedonian settlement establishes the “safe channel” for all subsequent Christological speculation in the church.',
        ],
      },
    ],
  },
];

export function getDiscussionBySlug(slug: string): Discussion | undefined {
  return DISCUSSIONS.find((d) => d.slug === slug);
}
