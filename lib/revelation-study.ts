/**
 * Revelation Study — structured content for the interactive study dashboard.
 *
 * All content is static and authored here so the page renders instantly and
 * works offline (no DB/network at request time). Kept as plain arrays/records
 * to stay friendly to the project's ES5 TS target (no Map/Set iteration).
 *
 * Editorial stance: the four classic interpretive schools (Preterist,
 * Historicist, Futurist, Idealist) are presented side by side and even-
 * handedly. The goal is to help readers understand how each tradition reads a
 * passage — not to adjudicate between them. Where a view has internal variety
 * (e.g. partial vs. full preterism), the mainstream form is described.
 */

export type SchoolId = 'preterist' | 'historicist' | 'futurist' | 'idealist';

export interface InterpretiveSchool {
  id: SchoolId;
  name: string;
  tagline: string;
  /** One-line gloss used on compact chips. */
  short: string;
  coreClaim: string;
  timeFocus: string;
  millennium: string;
  strengths: string;
  challenges: string;
  proponents: string;
}

export interface SectionInterpretation {
  school: SchoolId;
  text: string;
}

export interface StudySection {
  id: string;
  order: number;
  title: string;
  reference: string;
  /** Literary "act" grouping for the walkthrough rail. */
  act: string;
  summary: string;
  bigIdea: string;
  symbols: { name: string; meaning: string }[];
  themes: string[];
  interpretations: SectionInterpretation[];
  crossRefs: string[];
  questions: string[];
}

export interface SymbolEntry {
  id: string;
  symbol: string;
  category: 'Numbers' | 'Colors' | 'Creatures & Figures' | 'Places' | 'Objects';
  meaning: string;
  appears: string;
}

export interface ThemeEntry {
  id: string;
  title: string;
  verse: string;
  reference: string;
  body: string;
}

/* ────────────────────────────────────────────────────────────────────────
 * Book overview
 * ──────────────────────────────────────────────────────────────────────── */

export const BOOK_OVERVIEW = {
  title: 'The Revelation of Jesus Christ',
  greekName: 'Apokalypsis — an "unveiling" or "disclosure"',
  author:
    'The book names its human author simply as "John" (1:1, 1:4, 1:9, 22:8), writing from exile on the island of Patmos. Church tradition from the second century (Justin Martyr, Irenaeus) identifies him as John the apostle. Some scholars distinguish a separate "John the Elder," but the traditional apostolic authorship remains the majority view.',
  date:
    'Two dates are debated. The majority view places it late in the reign of Emperor Domitian (c. AD 95), following Irenaeus. A minority argues for a date before AD 70 under Nero, largely to support a preterist reading in which the prophecies target Jerusalem’s fall. Your view of the date and your interpretive school tend to reinforce each other.',
  genre:
    'Revelation braids together three genres at once: apocalyptic (symbolic visions disclosing heavenly realities), prophecy (a word from God that both foretells and forth-tells, calling the church to faithfulness), and epistle (an actual letter, with greeting and benediction, sent to seven named congregations). Reading it well means holding all three together.',
  purpose:
    'Written to seven real churches in Roman Asia (western Turkey) facing pressure, persecution, complacency, and compromise, Revelation unveils the risen Christ as sovereign over history. Its pastoral aim is endurance: to assure suffering believers that the Lamb who was slain has already won, that Rome (and every Babylon) will fall, and that God will dwell with his people forever.',
  howToRead:
    'Revelation is saturated with the Old Testament — roughly 500 allusions, though it never quotes directly. Daniel, Ezekiel, Isaiah, Exodus, and Zechariah supply most of its imagery. It is structured largely in cycles of seven and is more like a symphony with recurring movements than a straight timeline. Numbers and images are symbolic before they are literal, and the book interprets many of its own symbols (e.g. 1:20; 17:9–18).',
  structureNote:
    'A common outline: the Prologue and vision of Christ (1); letters to the seven churches (2–3); the throne room and the Lamb (4–5); three sevenfold judgment cycles — seals, trumpets, bowls (6–16) — interrupted by interludes; the fall of Babylon and the return of Christ (17–19); the millennium and last judgment (20); and the new creation with the epilogue (21–22).',
};

/* ────────────────────────────────────────────────────────────────────────
 * The four interpretive schools
 * ──────────────────────────────────────────────────────────────────────── */

export const SCHOOLS: InterpretiveSchool[] = [
  {
    id: 'preterist',
    name: 'Preterist',
    tagline: 'Mostly fulfilled in the first century',
    short: 'Fulfilled in the past',
    coreClaim:
      'Most of Revelation describes events of the first century — chiefly the persecution of the church under Rome and the judgment on apostate Jerusalem in AD 70. The book was written to comfort real Christians about crises near at hand, taking seriously its own claim that these things "must soon take place" (1:1; 22:6).',
    timeFocus: 'The past (1st century AD)',
    millennium:
      'Partial preterists (the mainstream) still expect a literal future return of Christ, resurrection, and judgment in chapters 20–22; only the earlier judgments are past. Full preterists hold that all prophecy, including the second coming, was fulfilled by AD 70 — a position most churches regard as outside orthodoxy.',
    strengths:
      'Takes the book’s repeated "soon" and "near" language seriously; anchors the imagery in a concrete historical setting the first readers would recognize; connects powerfully to Jesus’ words about Jerusalem’s fall (Matthew 24).',
    challenges:
      'Requires an early (pre-AD 70) date that most scholars reject; can struggle to account for the cosmic, universal scope of the final chapters; risks leaving little for the present-day reader.',
    proponents: 'Kenneth Gentry, R.C. Sproul (partial), Jay Adams; roots in Moses Stuart.',
  },
  {
    id: 'historicist',
    name: 'Historicist',
    tagline: 'A map of church history unfolding',
    short: 'Unfolding through history',
    coreClaim:
      'Revelation surveys the whole sweep of church history from John’s day to the return of Christ. The seals, trumpets, and bowls chart successive eras — the fall of Rome, the rise of Islam, the medieval papacy, the Reformation — as a continuous unfolding prophecy of the western church’s story.',
    timeFocus: 'All of history (1st century → now)',
    millennium:
      'Typically read as a long era within church history, often understood in the older Protestant frame as culminating in a future golden age or the final return of Christ. Historicists have frequently tied the "1260 days" to year-long periods of papal or Islamic dominance.',
    strengths:
      'Treats the prophecy as genuinely relevant across the centuries; was the dominant Reformation reading and shaped much Protestant thought; honors the book’s sweep from the first coming to the last.',
    challenges:
      'Different interpreters map the symbols onto wildly different events, with no agreed key; tends to be Euro-centric; repeated failed date-setting has damaged its credibility.',
    proponents: 'The Reformers (Luther, Calvin at points), Isaac Newton, Matthew Henry, E.B. Elliott.',
  },
  {
    id: 'futurist',
    name: 'Futurist',
    tagline: 'Still to be fulfilled at the end',
    short: 'Awaiting the last days',
    coreClaim:
      'From chapter 4 onward, Revelation describes events still future to us — a coming period of tribulation, the rise of a personal Antichrist, the return of Christ, and the millennial kingdom. The visions are read as a largely chronological preview of the end of the age.',
    timeFocus: 'The future (the last days)',
    millennium:
      'Usually a literal future 1,000-year reign of Christ on earth after his return (premillennialism). Dispensational futurists add a pretribulation rapture of the church and a distinct future for national Israel; historic premillennialists hold to a single return after the tribulation.',
    strengths:
      'Reads the climactic chapters as a real, still-awaited consummation; takes the numbers and the return of Christ in a straightforward sense; widely held among modern evangelicals.',
    challenges:
      'Can feel disconnected from the first readers, for whom the book was meant to be immediately relevant ("soon"); the popular dispensational timeline is a relatively recent (19th-century) framework; details are debated even among futurists.',
    proponents: 'John Nelson Darby, C.I. Scofield, Hal Lindsey, John MacArthur, Robert Mounce (moderate).',
  },
  {
    id: 'idealist',
    name: 'Idealist',
    tagline: 'A timeless drama of good and evil',
    short: 'Timeless symbolism',
    coreClaim:
      'Revelation is not a coded timeline but a symbolic portrayal of the perennial conflict between God and evil, Christ and Satan, the church and the world. Its scenes depict spiritual realities true in every age: the suffering and vindication of God’s people, and the certain triumph of the Lamb.',
    timeFocus: 'Every age (timeless truths)',
    millennium:
      'Usually amillennial: the "thousand years" is a symbol for the entire present church age between Christ’s two comings, during which he reigns and the saints reign with him, rather than a distinct future epoch.',
    strengths:
      'Honors the book’s symbolic, poetic nature and its deep dependence on Old Testament imagery; keeps it perpetually relevant; avoids speculative date-setting.',
    challenges:
      'Can under-read the book’s genuine expectation of a real, final consummation of history; if pressed too far, it risks dissolving concrete prophecy into abstraction; offers less specificity than readers often want.',
    proponents: 'William Hendriksen, G.K. Beale (eclectic/idealist), Sam Hamstra, much of the early church tradition.',
  },
];

/* ────────────────────────────────────────────────────────────────────────
 * Section-by-section walkthrough
 * ──────────────────────────────────────────────────────────────────────── */

export const SECTIONS: StudySection[] = [
  {
    id: 'prologue',
    order: 1,
    title: 'Prologue & Greeting',
    reference: 'Revelation 1:1–8',
    act: 'Act I — The Risen Christ & His Church',
    summary:
      'John opens by naming the book a "revelation of Jesus Christ" given by God, delivered through an angel, to show his servants what must soon take place. A blessing is pronounced on those who read and keep it. John greets the seven churches from the eternal God, the seven-fold Spirit, and Jesus Christ — the faithful witness, firstborn from the dead, and ruler of earth’s kings — who is coming on the clouds.',
    bigIdea: 'The whole book is a disclosure of the risen, reigning Jesus, and it is meant to be read, heard, and obeyed.',
    symbols: [
      { name: 'Seven spirits before the throne', meaning: 'The one Holy Spirit in fullness/completeness (seven = perfection), or the sevenfold Spirit of Isaiah 11.' },
      { name: 'Coming with the clouds', meaning: 'Divine visitation and judgment, echoing Daniel 7:13 and Jesus’ own words.' },
      { name: 'Alpha and Omega', meaning: 'God’s sovereignty over all of history from beginning to end.' },
    ],
    themes: ['Revelation of Christ', 'Blessing on the reader', 'God’s sovereignty over time'],
    interpretations: [
      { school: 'preterist', text: '"Soon" and "near" (1:1, 1:3) are taken at face value: the events were imminent for the first readers. "Every eye will see him" and "coming with the clouds" evoke Old Testament judgment language applied to God’s coming against Jerusalem in AD 70 rather than the final return.' },
      { school: 'historicist', text: 'The prologue frames a prophecy that begins in John’s day and runs across the whole age of the church; "what must soon take place" launches a continuous unfolding that the following chapters will map onto history.' },
      { school: 'futurist', text: '"Soon" means the events are certain and could begin at any moment ("imminent"), not necessarily near in calendar time. "Coming with the clouds" is read as the literal, visible second coming that the book will climax with.' },
      { school: 'idealist', text: 'The opening establishes the book’s symbolic register. "Soon" conveys urgency and readiness rather than a datable timetable; the coming Christ is the ever-present Lord whose reign confronts every generation.' },
    ],
    crossRefs: ['Daniel 7:13', 'Zechariah 12:10', 'Exodus 3:14', 'Matthew 24:30'],
    questions: [
      'What difference does it make that the book is called a revelation of Jesus, not merely of the future?',
      'A blessing rests on those who "keep" what is written. How does one keep a prophecy?',
    ],
  },
  {
    id: 'son-of-man',
    order: 2,
    title: 'The Vision of the Son of Man',
    reference: 'Revelation 1:9–20',
    act: 'Act I — The Risen Christ & His Church',
    summary:
      'Exiled on Patmos, John hears a trumpet-like voice and turns to see the glorified Christ among seven golden lampstands: hair white as wool, eyes like fire, feet like burnished bronze, a sword from his mouth, a face like the sun. John falls as dead; Christ lays his hand on him, declares himself the Living One who died and now holds the keys of death, and commissions him to write.',
    bigIdea: 'The crucified Jesus now stands glorified and sovereign in the midst of his churches, holding death itself in his hand.',
    symbols: [
      { name: 'Seven golden lampstands', meaning: 'The seven churches (explicitly, 1:20) — and the church as light-bearer.' },
      { name: 'Seven stars in his hand', meaning: 'The "angels"/messengers of the churches, held securely by Christ.' },
      { name: 'Sword from his mouth', meaning: 'The piercing, judging power of Christ’s word.' },
      { name: 'Keys of Death and Hades', meaning: 'Christ’s authority over death, won through his resurrection.' },
    ],
    themes: ['The glorified Christ', 'Christ present with his church', 'Victory over death'],
    interpretations: [
      { school: 'preterist', text: 'The vision grounds first-century believers: whatever Rome or the synagogue can do, the risen Lord already holds the keys of death. The imagery is drawn wholesale from Daniel to assure the persecuted church of Christ’s present rule.' },
      { school: 'historicist', text: 'Christ walking among the lampstands signals his oversight of the church through every age of the history the book will unfold; the seven churches anticipate successive periods of church history in some historicist schemes.' },
      { school: 'futurist', text: 'The portrait of the glorified Son of Man establishes the divine authority of the one who will execute the end-time judgments to come; the sword and fiery eyes foreshadow his role as returning judge in chapter 19.' },
      { school: 'idealist', text: 'The vision is a timeless assurance: in every era of suffering, Christ stands in the midst of his people, radiant and victorious over death. The symbols disclose who he eternally is more than they date any event.' },
    ],
    crossRefs: ['Daniel 7:9–14', 'Daniel 10:5–6', 'Ezekiel 1:24–28', 'Isaiah 49:2'],
    questions: [
      'Why might John need this overwhelming vision of Christ before hearing hard words for the churches?',
      'What does it mean for your church that Christ walks "among the lampstands"?',
    ],
  },
  {
    id: 'seven-letters',
    order: 3,
    title: 'The Letters to the Seven Churches',
    reference: 'Revelation 2–3',
    act: 'Act I — The Risen Christ & His Church',
    summary:
      'Christ dictates seven letters — to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea. Each follows a pattern: a title of Christ, an assessment ("I know your works"), commendation and/or rebuke, a call to overcome, and a promise. Two churches (Smyrna, Philadelphia) receive no rebuke; one (Laodicea) receives no praise. Together they address love grown cold, faithful suffering, doctrinal compromise, tolerated immorality, spiritual deadness, and lukewarm self-sufficiency.',
    bigIdea: 'The exalted Christ knows each congregation intimately and calls every one to repent and overcome.',
    symbols: [
      { name: 'The seven churches', meaning: 'Real first-century congregations — and, by the number seven, the whole church in every place.' },
      { name: 'Hidden manna, white stone, morning star', meaning: 'Rewards of intimate fellowship, acquittal, and sharing in Christ’s rule for those who overcome.' },
      { name: 'Lukewarm water', meaning: 'Laodicea’s uselessness — neither the hot springs of Hierapolis nor the cold water of Colossae.' },
    ],
    themes: ['Christ knows the church', 'Repentance', 'Faithful endurance', 'Reward for overcomers'],
    interpretations: [
      { school: 'preterist', text: 'The letters address the actual conditions of seven cities in Roman Asia — the imperial cult at Pergamum ("Satan’s throne"), the wealth and textile trade of Laodicea, local synagogue conflict. The counsel is pastoral and immediate.' },
      { school: 'historicist', text: 'Many historicists read the seven churches as a prophetic outline of seven successive ages of church history — from the apostolic era (Ephesus) to a final lukewarm age (Laodicea) — as well as real congregations.' },
      { school: 'futurist', text: 'Futurists take the churches as genuine first-century bodies that also typify kinds of churches in every age; dispensationalists often see the sequence as portraying stages of church history leading up to the end, after which the church scene gives way to future events from chapter 4.' },
      { school: 'idealist', text: 'The seven churches represent the full range of spiritual conditions found in the church at all times. Every congregation can locate itself among them and heed the same call to repent and overcome.' },
    ],
    crossRefs: ['Matthew 5:14–16', 'Deuteronomy 8:11–18', 'Genesis 2:9', '1 Peter 4:12–19'],
    questions: [
      'If Christ wrote a letter to your church, what might he commend and what might he confront?',
      'What is the danger of being "lukewarm" that Laodicea illustrates?',
    ],
  },
  {
    id: 'throne-room',
    order: 4,
    title: 'The Throne Room of Heaven',
    reference: 'Revelation 4',
    act: 'Act II — Heaven’s Throne & the Lamb',
    summary:
      'A door opens in heaven and John is caught up to see the throne of God, encircled by a rainbow, flanked by twenty-four elders on thrones and four living creatures full of eyes. Day and night they cry "Holy, holy, holy," and the elders cast their crowns before the One who lives forever, declaring him worthy because he created all things.',
    bigIdea: 'Behind and above every earthly power stands the throne of God, the center of all reality, receiving ceaseless worship.',
    symbols: [
      { name: 'The throne', meaning: 'God’s sovereign rule — mentioned some forty times in Revelation, the book’s structural center of gravity.' },
      { name: 'Twenty-four elders', meaning: 'The people of God complete — often 12 patriarchs + 12 apostles — or an angelic council.' },
      { name: 'Four living creatures', meaning: 'The whole created order (lion, ox, man, eagle) worshiping, echoing Ezekiel’s cherubim and Isaiah’s seraphim.' },
      { name: 'Sea of glass', meaning: 'God’s transcendence and the calming of chaos before his throne.' },
    ],
    themes: ['The sovereignty of God', 'Heavenly worship', 'God as Creator'],
    interpretations: [
      { school: 'preterist', text: 'The throne vision assures a harassed first-century church that Caesar’s throne is a counterfeit; the true sovereign reigns, and the coming judgments proceed from his settled rule.' },
      { school: 'historicist', text: 'The heavenly throne room is the fixed vantage point from which the whole panorama of history — unrolled in the following chapters — is governed and interpreted.' },
      { school: 'futurist', text: 'John’s call "Come up here" (4:1) is sometimes read by dispensationalists as a picture of the church’s rapture before the tribulation begins; the scene sets heaven’s stage for the end-time judgments.' },
      { school: 'idealist', text: 'The vision reveals the permanent, unshakeable reality behind all appearances: God reigns and is worshiped now. Worship, not speculation, is the fitting response to the throne.' },
    ],
    crossRefs: ['Isaiah 6:1–3', 'Ezekiel 1:4–28', 'Psalm 47:8', 'Daniel 7:9–10'],
    questions: [
      'How does starting with worship reframe the judgments that follow?',
      'What "thrones" in your world present themselves as ultimate?',
    ],
  },
  {
    id: 'scroll-lamb',
    order: 5,
    title: 'The Scroll and the Lamb',
    reference: 'Revelation 5',
    act: 'Act II — Heaven’s Throne & the Lamb',
    summary:
      'God holds a scroll sealed with seven seals, and no one is found worthy to open it. John weeps — until an elder announces the Lion of Judah has conquered. John turns and sees, instead of a lion, a slain-yet-standing Lamb, who takes the scroll. Heaven erupts in a new song: the Lamb is worthy because by his blood he ransomed a people for God from every tribe and tongue. Every creature joins the praise.',
    bigIdea: 'The Lion conquers as a slaughtered Lamb; the crucified Christ alone is worthy to open and enact God’s purposes for history.',
    symbols: [
      { name: 'Sealed scroll', meaning: 'God’s plan/decree for history and the world’s inheritance, which only Christ can execute.' },
      { name: 'The Lamb standing, as though slain', meaning: 'The crucified and risen Jesus — victory through sacrifice.' },
      { name: 'Seven horns and seven eyes', meaning: 'The Lamb’s complete power and the sevenfold Spirit sent into all the earth.' },
      { name: 'Golden bowls of incense', meaning: 'The prayers of the saints, which rise before God.' },
    ],
    themes: ['The worthy Lamb', 'Victory through sacrifice', 'A people from every nation'],
    interpretations: [
      { school: 'preterist', text: 'The Lamb’s worthiness to open the scroll inaugurates the judgments about to fall in the first century; the ransomed multitude reassures the persecuted that their redemption is already secured.' },
      { school: 'historicist', text: 'The Lamb takes the scroll of history and begins to unroll it; the opening of the seals in chapter 6 launches the successive epochs the historicist school will trace through the centuries.' },
      { school: 'futurist', text: 'The scene is the heavenly commissioning that sets in motion the end-time judgments; the Lamb’s taking of the scroll is the prelude to the tribulation events that follow.' },
      { school: 'idealist', text: 'The chapter reveals the master key of the whole book: God’s purposes for all history are unlocked by the slain Lamb. Power is redefined — the throne of the universe belongs to sacrificial love.' },
    ],
    crossRefs: ['Genesis 49:9–10', 'Isaiah 53:7', 'Exodus 12', 'Daniel 7:14'],
    questions: [
      'Why is it significant that John hears "Lion" but sees "Lamb"?',
      'How does the Lamb’s way of conquering challenge our instincts about power?',
    ],
  },
  {
    id: 'seven-seals',
    order: 6,
    title: 'The Seven Seals & the 144,000',
    reference: 'Revelation 6:1–8:5',
    act: 'Act III — The Cycles of Judgment',
    summary:
      'The Lamb opens the seals. The first four release the famous horsemen — conquest, war, famine, and death. The fifth reveals martyrs under the altar crying "How long?"; the sixth brings cosmic upheaval and the terror of the great day of wrath. Before the seventh, an interlude: 144,000 from the tribes of Israel are sealed, and John sees a countless multitude from every nation in white robes worshiping the Lamb. The seventh seal opens into silence and the prayers of the saints.',
    bigIdea: 'History’s upheavals unfold under the Lamb’s authority, and God seals and secures his people through the storm.',
    symbols: [
      { name: 'Four horsemen', meaning: 'Conquest, war, famine, and death — the recurring judgments loosed on a rebellious world.' },
      { name: 'Souls under the altar', meaning: 'The martyrs, whose cry for justice God has heard and will answer.' },
      { name: '144,000 (12 x 12 x 1,000)', meaning: 'The complete people of God — symbolic fullness, sealed for protection.' },
      { name: 'White robes', meaning: 'Righteousness and purity granted by the Lamb’s blood; victory.' },
    ],
    themes: ['Judgment under the Lamb', 'The cry of the martyrs', 'God seals his people'],
    interpretations: [
      { school: 'preterist', text: 'The seals depict the calamities preceding Jerusalem’s fall — war, famine, and death across the Roman world, and the vindication of first-century martyrs. The 144,000 are Jewish Christians preserved through the crisis of AD 66–70.' },
      { school: 'historicist', text: 'The seals are read as successive periods of the Roman Empire and early church — e.g. the era of conquest, the civil wars, the famines, and the decline that follow the apostolic age, unfolding in sequence.' },
      { school: 'futurist', text: 'The seals begin a future seven-year tribulation; the horsemen are end-time global catastrophes, and the 144,000 are literal Israelites sealed and evangelizing during that period, with the multitude being tribulation converts.' },
      { school: 'idealist', text: 'The horsemen portray forces at work in every age — conquest, violence, scarcity, death — under God’s permission. The sealed 144,000 and the white-robed multitude are the one people of God, secured spiritually amid the world’s recurring judgments.' },
    ],
    crossRefs: ['Zechariah 1:8–11', 'Zechariah 6:1–8', 'Ezekiel 9:4–6', 'Matthew 24:6–8'],
    questions: [
      'The martyrs ask "How long?" How does Revelation answer the problem of delayed justice?',
      'What does it mean to be "sealed" by God in the middle of turmoil rather than removed from it?',
    ],
  },
  {
    id: 'seven-trumpets',
    order: 7,
    title: 'The Seven Trumpets',
    reference: 'Revelation 8:6–9:21; 11:15–19',
    act: 'Act III — The Cycles of Judgment',
    summary:
      'Seven angels sound trumpets, unleashing plagues on a third of the earth, sea, rivers, and sky — echoing the plagues of Egypt. Locust-like tormentors and a vast cavalry bring woe. Yet the survivors do not repent. When the seventh trumpet sounds, loud voices in heaven announce that "the kingdom of the world has become the kingdom of our Lord and of his Christ, and he shall reign forever."',
    bigIdea: 'Partial, warning judgments summon a hardened world to repentance, while heaven already proclaims God’s kingdom triumphant.',
    symbols: [
      { name: 'Trumpets', meaning: 'Warnings and heralds of judgment (as at Jericho and Sinai); a summons to repent.' },
      { name: 'A third destroyed', meaning: 'Judgments that are severe but partial and restrained — not yet the end.' },
      { name: 'Locusts from the abyss', meaning: 'Demonic torment loosed upon the unrepentant, echoing the eighth Egyptian plague.' },
      { name: 'Fallen star / Wormwood', meaning: 'Bitterness and death poisoning the waters; a picture of judgment on the earth.' },
    ],
    themes: ['Warning judgments', 'Human hardness of heart', 'The kingdom announced'],
    interpretations: [
      { school: 'preterist', text: 'The trumpets portray the escalating judgments on Israel and the Roman world in the first century, culminating in the fall of Jerusalem; the imagery of Exodus plagues frames God’s covenant lawsuit against apostate Israel.' },
      { school: 'historicist', text: 'Classic historicism assigns the trumpets to the barbarian invasions that dismantled the western Roman Empire and the later rise and expansion of Islam (the fifth and sixth trumpets), unfolding across many centuries.' },
      { school: 'futurist', text: 'The trumpets are literal (or near-literal) global catastrophes during the future tribulation, intensifying the seals and preparing for the final bowls; the demonic locusts are end-time torments.' },
      { school: 'idealist', text: 'The trumpets symbolize God’s recurring temporal judgments that warn and yet, tragically, often fail to bring repentance — a pattern visible throughout history. Heaven’s response shows the outcome is never in doubt.' },
    ],
    crossRefs: ['Exodus 7–10', 'Joel 2:1–11', 'Joshua 6', 'Amos 3:6'],
    questions: [
      'Why does Revelation stress that people "still did not repent" after the trumpets?',
      'How can partial judgments be an expression of mercy?',
    ],
  },
  {
    id: 'little-scroll-witnesses',
    order: 8,
    title: 'The Little Scroll & the Two Witnesses',
    reference: 'Revelation 10–11',
    act: 'Act III — The Cycles of Judgment',
    summary:
      'A mighty angel gives John a little scroll, sweet in the mouth but bitter in the stomach, and recommissions him to prophesy. The temple is measured, and two witnesses prophesy for 1,260 days, then are killed by the beast from the abyss, lie unburied while the world gloats, and are raised and vindicated after three and a half days. The seventh trumpet then sounds heaven’s triumph.',
    bigIdea: 'The church’s witness is powerful yet costly — sweet and bitter — and even its apparent defeat ends in resurrection and vindication.',
    symbols: [
      { name: 'Little scroll (sweet then bitter)', meaning: 'God’s word: joyful to receive, painful to proclaim and to bear.' },
      { name: 'Measuring the temple', meaning: 'God’s protection of the true worshiping community even amid trampling.' },
      { name: 'Two witnesses', meaning: 'The witnessing church (empowered like Moses and Elijah), or two literal prophets — two for valid testimony.' },
      { name: '1,260 days / 42 months / 3.5 years', meaning: 'A limited, bounded period of tribulation and faithful witness (half of seven).' },
    ],
    themes: ['The costly call to witness', 'Protection amid persecution', 'Resurrection vindication'],
    interpretations: [
      { school: 'preterist', text: 'The measured temple and the 1,260 days point to the siege of Jerusalem; the two witnesses represent faithful prophetic testimony (perhaps figures or the church) during that period, killed in the "great city" where the Lord was crucified.' },
      { school: 'historicist', text: 'The 1,260 "days" are read as 1,260 years of witness under persecution (often the era of papal dominance), with the two witnesses standing for the faithful remnant or the testimony of Scripture through those centuries.' },
      { school: 'futurist', text: 'The two witnesses are two literal end-time prophets who minister for a literal 3.5 years during the tribulation, are killed by the Antichrist, and are publicly resurrected — a foreshadowing of the church’s vindication.' },
      { school: 'idealist', text: 'The two witnesses embody the church’s Spirit-empowered testimony throughout the present age — opposed, seemingly defeated, yet always finally raised and vindicated by God. The time period signals the bounded season of gospel witness.' },
    ],
    crossRefs: ['Ezekiel 2:8–3:3', 'Zechariah 4', 'Exodus 7:17', '1 Kings 17:1'],
    questions: [
      'Why is God’s word described as both sweet and bitter to carry?',
      'What comfort is there in a witness that "dies" but is raised?',
    ],
  },
  {
    id: 'woman-dragon',
    order: 9,
    title: 'The Woman and the Dragon',
    reference: 'Revelation 12',
    act: 'Act IV — The Cosmic Conflict',
    summary:
      'A great sign: a woman clothed with the sun gives birth to a son who will rule the nations, while a seven-headed dragon waits to devour the child. The child is caught up to God; the woman flees to the wilderness. War breaks out in heaven, and Michael casts the dragon down. A loud voice declares the victory won "by the blood of the Lamb and the word of their testimony." Enraged, the dragon pursues the woman and makes war on her offspring.',
    bigIdea: 'Behind earthly persecution lies a cosmic war — already decisively lost by Satan through the Lamb’s blood.',
    symbols: [
      { name: 'The woman clothed with the sun', meaning: 'God’s covenant people (Israel/the church) from whom the Messiah comes.' },
      { name: 'The dragon', meaning: 'Satan, "that ancient serpent" (explicitly, 12:9), the accuser.' },
      { name: 'The male child', meaning: 'Christ, born to rule the nations, taken up to God’s throne.' },
      { name: 'Wilderness / 1,260 days', meaning: 'The place and bounded time of God’s protecting care for his people amid hostility.' },
    ],
    themes: ['Cosmic spiritual warfare', 'The defeated accuser', 'Overcoming by the Lamb’s blood'],
    interpretations: [
      { school: 'preterist', text: 'The chapter recounts the coming of Christ and Satan’s failed assault, with the woman as faithful Israel/the early church protected during the first-century upheavals; the dragon’s rage drives the persecution the first readers endured.' },
      { school: 'historicist', text: 'The vision spans from Christ’s birth and ascension through the church’s flight into "wilderness" seasons of persecution across the centuries, the 1,260 days again read as an extended historical era.' },
      { school: 'futurist', text: 'The woman is often identified with Israel, the child with Christ, and the wilderness flight with Israel’s protection during the future tribulation after Satan is cast down and intensifies his war on God’s people.' },
      { school: 'idealist', text: 'The chapter pulls back the curtain on the spiritual reality behind all persecution in every age: a defeated but furious dragon wars on God’s people, who overcome not by force but by the Lamb’s blood and faithful testimony unto death.' },
    ],
    crossRefs: ['Genesis 3:15', 'Daniel 7:7', 'Psalm 2:9', 'Luke 10:18'],
    questions: [
      'How does knowing the dragon is already defeated change how we face opposition?',
      'What does it mean to overcome "by the blood of the Lamb and the word of testimony"?',
    ],
  },
  {
    id: 'two-beasts',
    order: 10,
    title: 'The Two Beasts (666)',
    reference: 'Revelation 13',
    act: 'Act IV — The Cosmic Conflict',
    summary:
      'The dragon summons a beast from the sea — blasphemous, wielding worldly power, wounded yet healed, worshiped by the earth. A second beast from the land makes people worship the first, performs signs, and enforces a mark on hand or forehead without which none can buy or sell. Its number is 666. The scene calls for the endurance and faith of the saints.',
    bigIdea: 'Evil counterfeits Christ through coercive political power and deceptive religion, but its authority is derivative and doomed.',
    symbols: [
      { name: 'Beast from the sea', meaning: 'Oppressive worldly/political power (echoing Daniel’s beasts), a satanic parody of Christ.' },
      { name: 'Beast from the land', meaning: 'False religion/propaganda that enforces worship of the first beast — later called the false prophet.' },
      { name: 'The mark of the beast', meaning: 'Allegiance to the beast — a counterfeit of the seal of God on the faithful.' },
      { name: '666', meaning: 'The number of a man: repeated falling-short of the perfection of seven; often decoded (via gematria) as "Nero Caesar."' },
    ],
    themes: ['Counterfeit power and worship', 'Allegiance and identity', 'The call to endurance'],
    interpretations: [
      { school: 'preterist', text: 'The sea beast is the Roman Empire and its emperors (the healed wound often tied to the "Nero redivivus" legend); 666 is decoded as Nero Caesar in Hebrew numerals. The land beast is the imperial cult enforcing emperor worship.' },
      { school: 'historicist', text: 'Reformation-era historicists identified the sea beast with the papal-political system and the land beast with a corrupt religious power, the mark signifying enforced allegiance across medieval and later history.' },
      { school: 'futurist', text: 'The first beast is a future personal Antichrist heading a global empire; the second is the false prophet; the mark is a literal end-time system controlling commerce, imposed during the tribulation.' },
      { school: 'idealist', text: 'The two beasts symbolize the recurring alliance of coercive state power and deceptive false religion that pressures God’s people to compromise in every era. The mark represents visible allegiance to that system, opposed to the seal of God.' },
    ],
    crossRefs: ['Daniel 7:1–8', 'Daniel 3', 'Exodus 13:9', '2 Thessalonians 2:3–10'],
    questions: [
      'How does evil in Revelation tend to work by imitation of God rather than open opposition?',
      'Where do political power and religious pressure combine to demand ultimate loyalty today?',
    ],
  },
  {
    id: 'lamb-144-harvest',
    order: 11,
    title: 'The Lamb, the 144,000 & the Harvest',
    reference: 'Revelation 14',
    act: 'Act IV — The Cosmic Conflict',
    summary:
      'Over against the beast, the Lamb stands on Mount Zion with the 144,000, who bear his name and sing a new song. Three angels announce the eternal gospel, the fall of Babylon, and the doom of those who worship the beast, while a voice blesses those who die in the Lord. Then one like a son of man reaps the earth’s harvest, and the grapes of wrath are trodden in the great winepress.',
    bigIdea: 'The redeemed belong to the Lamb, the gospel goes out to all, and history moves toward a decisive harvest of salvation and judgment.',
    symbols: [
      { name: 'Mount Zion', meaning: 'The secure place of God’s redeemed people, over against the beast’s domain.' },
      { name: "The Lamb’s name on foreheads", meaning: 'The seal of belonging to God — the counter-mark to 666.' },
      { name: 'The three angels', meaning: 'The universal proclamation of gospel, judgment, and Babylon’s fall.' },
      { name: 'Harvest and winepress', meaning: 'The gathering of the saved and the treading out of judgment (Joel 3).' },
    ],
    themes: ['The redeemed of the Lamb', 'The eternal gospel to all nations', 'Harvest and judgment'],
    interpretations: [
      { school: 'preterist', text: 'The scene contrasts the faithful with beast-worshipers in the first-century crisis and announces the fall of "Babylon" (Rome or Jerusalem); the harvest anticipates the judgment falling in that generation.' },
      { school: 'historicist', text: "The three angels’ messages are often linked to movements of gospel recovery and reform in church history (some traditions tie them to specific renewal movements), with the harvest as the end of the age." },
      { school: 'futurist', text: 'The 144,000 are the sealed of chapter 7 preserved through the tribulation; the angelic proclamations and the harvest depict end-time evangelism and the final separation of the saved and the judged at Christ’s coming.' },
      { school: 'idealist', text: 'The chapter reassures the church of every age: the redeemed are eternally secure with the Lamb, the gospel reaches all nations, and history is surely moving toward a twofold harvest of redemption and judgment.' },
    ],
    crossRefs: ['Joel 3:13', 'Isaiah 63:1–6', 'Psalm 2:6', 'Matthew 13:37–43'],
    questions: [
      'How does the image of the Lamb’s name on the forehead answer the beast’s mark?',
      'What does "the eternal gospel" preached to every nation say about God’s purpose in judgment?',
    ],
  },
  {
    id: 'seven-bowls',
    order: 12,
    title: 'The Seven Bowls of Wrath',
    reference: 'Revelation 15–16',
    act: 'Act III — The Cycles of Judgment',
    summary:
      'The victorious sing the song of Moses and the Lamb, and seven angels pour out the final plagues — sores, sea and rivers to blood, scorching heat, darkness, the drying of the Euphrates, and a great earthquake at Armageddon. Unlike the seals and trumpets, these are unmitigated and complete ("the wrath of God is finished"). Still, people curse God rather than repent. A voice declares, "It is done."',
    bigIdea: 'God’s patience has a limit; the final, complete outpouring of just wrath brings history’s rebellion to its reckoning.',
    symbols: [
      { name: 'Seven bowls', meaning: 'The full, final, unrestrained judgments of God (no longer just "a third").' },
      { name: 'Song of Moses and the Lamb', meaning: 'The new Exodus — God’s people delivered through the sea, praising him.' },
      { name: 'Armageddon (Har-Magedon)', meaning: 'The symbolic gathering place for the final battle against God; the world’s doomed assault.' },
      { name: 'Drying of the Euphrates', meaning: 'The removal of barriers, preparing the way for judgment (as ancient armies crossed).' },
    ],
    themes: ['The finality of judgment', 'The justice of God', 'Persistent impenitence'],
    interpretations: [
      { school: 'preterist', text: 'The bowls complete the covenant judgment poured out on Jerusalem/Rome in the first century; "Armageddon" is read symbolically of the decisive defeat of God’s enemies in that historical crisis.' },
      { school: 'historicist', text: 'The bowls are the last outpourings of judgment on the anti-Christian powers late in history, sometimes tied to the upheavals surrounding the Reformation and the eventual collapse of hostile systems.' },
      { school: 'futurist', text: 'The bowls are literal, climactic tribulation judgments immediately preceding Christ’s return; Armageddon is a real end-time gathering of the nations for the last battle.' },
      { school: 'idealist', text: 'The bowls symbolize God’s complete and final judgment on unrepentant evil at the end of history — the same reality the seals and trumpets partially previewed, now brought to consummation. Armageddon depicts the ultimate, certain defeat of all that opposes God.' },
    ],
    crossRefs: ['Exodus 15', 'Exodus 7–10', 'Zechariah 14', 'Joel 3:2'],
    questions: [
      'How do the bowls differ from the seals and trumpets, and why might that matter?',
      'What does persistent refusal to repent, even under judgment, reveal about the human heart?',
    ],
  },
  {
    id: 'fall-babylon',
    order: 13,
    title: 'The Fall of Babylon',
    reference: 'Revelation 17–18',
    act: 'Act V — Two Cities & the Return of the King',
    summary:
      'An angel shows John "the great prostitute," Babylon, seated on a scarlet beast and on many waters, drunk on the blood of the saints, clothed in luxury. The beast will turn on her and destroy her. Heaven and earth’s merchants and kings mourn her sudden fall in a single hour, while heaven rejoices and the saints are told to "come out of her." Babylon the seductive world-city collapses under God’s judgment.',
    bigIdea: 'Every seductive, self-exalting world-system — economic, political, spiritual — is doomed to fall, and God’s people must not share its sins.',
    symbols: [
      { name: 'Babylon the great', meaning: 'The archetypal God-opposing city/civilization — seductive wealth, power, and idolatry (Rome for the first readers).' },
      { name: 'The prostitute', meaning: 'Spiritual unfaithfulness and the intoxicating allure of the world-system.' },
      { name: 'Seven heads / seven hills', meaning: 'Interpreted within the text as seven hills and kings — pointing to Rome and successive rulers.' },
      { name: '"Come out of her, my people"', meaning: 'The call to separation from complicity in the world’s sin.' },
    ],
    themes: ['Judgment on the world-system', 'The seduction of luxury and power', 'A call to come out'],
    interpretations: [
      { school: 'preterist', text: 'Babylon is Rome (the "seven hills," 17:9) — or, for some, apostate Jerusalem — whose fall John foresees; the merchants’ lament mirrors the collapse of the imperial economy that oppressed the saints.' },
      { school: 'historicist', text: 'Historicists have often identified Babylon with Rome as a religious-political system across the centuries, its fall the eventual collapse of that power under God’s judgment in history.' },
      { school: 'futurist', text: 'Babylon is a future world capital or global economic-religious system — literal or symbolic — destroyed in the end-time judgments; some await a rebuilt or revived Babylon, others read it as a coming apostate world order.' },
      { school: 'idealist', text: 'Babylon is the timeless symbol of human civilization organized against God — seductive, proud, and idolatrous — in every era. Its certain fall warns the church not to be intoxicated by the world and to "come out" in allegiance to God.' },
    ],
    crossRefs: ['Isaiah 13–14', 'Jeremiah 50–51', 'Ezekiel 27–28', 'Isaiah 47'],
    questions: [
      'What makes "Babylon" seductive rather than merely threatening?',
      'What might it look like to "come out of Babylon" while still living in the world?',
    ],
  },
  {
    id: 'return-christ',
    order: 14,
    title: 'The Rider on the White Horse',
    reference: 'Revelation 19',
    act: 'Act V — Two Cities & the Return of the King',
    summary:
      'Heaven roars "Hallelujah!" at Babylon’s fall and announces the marriage supper of the Lamb, whose bride has made herself ready. Then heaven opens and Christ appears on a white horse — called Faithful and True, the Word of God, King of kings — to judge and make war in righteousness. With the sword of his mouth he defeats the beast and false prophet, who are thrown into the lake of fire.',
    bigIdea: 'Christ returns not as a slain Lamb but as the conquering King and Word of God, ending the reign of the beast.',
    symbols: [
      { name: 'The marriage supper of the Lamb', meaning: 'The consummated union of Christ and his purified people.' },
      { name: 'Rider on the white horse', meaning: 'The returning Christ as righteous warrior-king (contrast the first horseman of ch. 6).' },
      { name: 'Robe dipped in blood', meaning: 'His own sacrifice and/or the blood of his defeated enemies — victory secured.' },
      { name: 'Sword from his mouth', meaning: 'He conquers by his word, not by conventional weapons.' },
    ],
    themes: ['The return of the King', 'The marriage of the Lamb', 'Righteous judgment'],
    interpretations: [
      { school: 'preterist', text: 'Many preterists read the rider as Christ coming in judgment against his first-century enemies (especially in the fall of Jerusalem), portrayed in vivid apocalyptic warfare imagery, though partial preterists still affirm a future bodily return.' },
      { school: 'historicist', text: 'The rider is often taken as the victorious progress of Christ and his gospel through history, culminating in the final overthrow of the anti-Christian powers at the end of the age.' },
      { school: 'futurist', text: 'This is the literal, visible second coming of Christ to defeat the Antichrist and false prophet at the end of the tribulation, immediately preceding the millennial reign of chapter 20.' },
      { school: 'idealist', text: 'The vision proclaims the certain, decisive triumph of Christ over all evil — the guaranteed end of the story — whether or not one presses every detail into a timeline. The Word of God finally overthrows every counterfeit.' },
    ],
    crossRefs: ['Isaiah 63:1–4', 'Psalm 2', 'Isaiah 11:4', '2 Thessalonians 1:7–10'],
    questions: [
      'How does the returning warrior-Christ relate to the slain Lamb of chapter 5?',
      'What does it mean that Christ conquers by "the sword of his mouth"?',
    ],
  },
  {
    id: 'millennium-judgment',
    order: 15,
    title: 'The Millennium & the Last Judgment',
    reference: 'Revelation 20',
    act: 'Act VI — Consummation',
    summary:
      'An angel binds Satan for a thousand years, during which the martyrs reign with Christ in "the first resurrection." When the thousand years end, Satan is loosed, gathers Gog and Magog, and is finally thrown into the lake of fire. Then the dead, great and small, stand before the great white throne; they are judged by their works and by the book of life. Death, Hades, and all not written in the book are cast into the lake of fire — the second death.',
    bigIdea: 'Satan’s doom is sealed, the dead are justly judged, and death itself is destroyed — the hinge chapter that most divides the interpretive schools.',
    symbols: [
      { name: 'The thousand years (millennium)', meaning: 'A reign of Christ and his saints — read as literal future, or symbolic of the whole church age.' },
      { name: 'The binding of Satan', meaning: 'The restraint of the devil’s power — either now (through Christ’s victory) or in a future epoch.' },
      { name: 'Gog and Magog', meaning: 'The final, worldwide rebellion against God (from Ezekiel 38–39), decisively crushed.' },
      { name: 'The great white throne / books', meaning: 'The final judgment of all people, by works and by the book of life.' },
    ],
    themes: ['The reign of Christ and the saints', 'The defeat of Satan', 'Final judgment', 'The second death'],
    interpretations: [
      { school: 'preterist', text: 'Preterists vary: many hold an amillennial-style reading of the thousand years as the present age begun in the first century, while affirming a still-future great white throne judgment (partial preterism).' },
      { school: 'historicist', text: 'Historically many read the millennium as a long period within church history — sometimes past, sometimes a hoped-for future age of gospel success — before the final loosing of Satan and the last judgment.' },
      { school: 'futurist', text: 'Premillennialists read this straightforwardly: after Christ’s return he binds Satan and reigns on earth for a literal thousand years, after which Satan is loosed, judged, and the great white throne judgment ends history.' },
      { school: 'idealist', text: 'Amillennial idealists read the thousand years symbolically as the entire present era between Christ’s comings, in which he reigns and the departed saints reign with him, ending with Satan’s final revolt, defeat, and the last judgment.' },
    ],
    crossRefs: ['Ezekiel 38–39', 'Daniel 12:1–2', 'Ezekiel 37:1–14', 'Matthew 25:31–46'],
    questions: [
      'Why do you think this chapter divides interpreters more than any other?',
      'How does the judgment "according to works" alongside "the book of life" fit together?',
    ],
  },
  {
    id: 'new-jerusalem',
    order: 16,
    title: 'New Heaven, New Earth & Epilogue',
    reference: 'Revelation 21–22',
    act: 'Act VI — Consummation',
    summary:
      'John sees a new heaven and new earth, and the New Jerusalem descending as a bride. God dwells with his people; he wipes away every tear, and death, mourning, and pain are no more. The city gleams with God’s glory, needs no temple or sun (for God and the Lamb are its light), and the river of life and the tree of life heal the nations. The book closes with promises of Christ’s soon coming, a final invitation — "Come!" — and a benediction of grace.',
    bigIdea: "The story ends not with escape from earth but with God dwelling with a renewed humanity in a restored creation — Eden fulfilled.",
    symbols: [
      { name: 'New Jerusalem as a bride', meaning: 'The redeemed people of God, perfected and united to Christ.' },
      { name: 'No more sea / no more temple', meaning: 'The end of chaos and separation; God’s unmediated presence fills everything.' },
      { name: 'River and tree of life', meaning: 'Eden restored and surpassed — life, healing, and abundance for the nations.' },
      { name: 'Cubed city of gold', meaning: 'The whole city as a Holy of Holies — God’s dwelling with his people, perfectly.' },
    ],
    themes: ['God dwelling with his people', 'New creation', 'The end of death and tears', 'Eden restored'],
    interpretations: [
      { school: 'preterist', text: 'Some preterists read the New Jerusalem as the new-covenant church age inaugurated in the first century — the present spiritual reality of God dwelling with his people — while most still anticipate a fully consummated future state.' },
      { school: 'historicist', text: 'Historicists generally take the new creation as the genuinely future, final state that follows the completion of the historical panorama the book has traced — the goal toward which all history moves.' },
      { school: 'futurist', text: 'The new heaven and new earth are the literal, eternal state after the millennium and last judgment — the final home of the redeemed in a physically renewed creation.' },
      { school: 'idealist', text: 'Idealists affirm this as the real, future consummation while also drawing out its present pull: the vision of God dwelling with humanity is the goal that shapes and comforts the church in every age.' },
    ],
    crossRefs: ['Isaiah 65:17–25', 'Ezekiel 47:1–12', 'Genesis 2:8–10', 'Isaiah 25:8'],
    questions: [
      'How does ending with a renewed creation (not disembodied heaven) shape Christian hope?',
      'What does it mean that the final word of the Bible is an invitation, "Come"?',
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────
 * Symbol glossary
 * ──────────────────────────────────────────────────────────────────────── */

export const SYMBOLS: SymbolEntry[] = [
  { id: 'seven', symbol: 'Seven', category: 'Numbers', meaning: 'Completeness and divine perfection. The book is built on sevens — seven churches, seals, trumpets, bowls, spirits — signaling wholeness and God’s fullness.', appears: 'Throughout (1:4; 5:1; 8:2; 15:7)' },
  { id: 'twelve', symbol: 'Twelve', category: 'Numbers', meaning: 'The people of God — twelve tribes and twelve apostles. Multiples (24 elders, 144,000, the city’s measurements) express the complete covenant community.', appears: '4:4; 7:4–8; 21:12–14' },
  { id: 'onethousand', symbol: 'A Thousand', category: 'Numbers', meaning: 'A vast, complete quantity (10 x 10 x 10). The "thousand years" and "144,000" use it for symbolic fullness rather than an exact count.', appears: '7:4; 20:2–7' },
  { id: 'threehalf', symbol: 'Three and a half (1,260 days / 42 months)', category: 'Numbers', meaning: 'A broken seven — a limited, bounded period of tribulation and faithful witness under God’s control, drawn from Daniel.', appears: '11:2–3; 12:6,14; 13:5' },
  { id: 'sixsixsix', symbol: '666', category: 'Numbers', meaning: 'The number of the beast — a man’s number that repeatedly falls short of seven. Often decoded as "Nero Caesar" via Hebrew gematria; a symbol of imperfection parading as ultimate.', appears: '13:18' },
  { id: 'white', symbol: 'White', category: 'Colors', meaning: 'Purity, righteousness, and victory — white robes, white horse, white throne. The color of the redeemed and of triumphant holiness.', appears: '1:14; 6:2; 7:9; 19:11; 20:11' },
  { id: 'scarlet', symbol: 'Scarlet & Purple', category: 'Colors', meaning: 'Luxury, decadence, and the intoxicating wealth of Babylon and the beast — opulence built on the blood of the saints.', appears: '17:3–4; 18:12,16' },
  { id: 'red', symbol: 'Red (fiery)', category: 'Colors', meaning: 'Bloodshed and violence — the second horseman’s war and the great red dragon.', appears: '6:4; 12:3' },
  { id: 'lamb', symbol: 'The Lamb', category: 'Creatures & Figures', meaning: 'Christ crucified and risen — the dominant title for Jesus in Revelation (28 times). He conquers by sacrifice, "standing as though slain."', appears: '5:6; 7:17; 14:1; 21:22' },
  { id: 'dragon', symbol: 'The Dragon', category: 'Creatures & Figures', meaning: 'Satan, "that ancient serpent" — the accuser and persecutor, already defeated by the Lamb’s blood.', appears: '12:3–9; 20:2' },
  { id: 'beast', symbol: 'The Beast(s)', category: 'Creatures & Figures', meaning: 'Coercive worldly power (from the sea) and deceptive false religion (from the land) — a satanic parody of Christ demanding worship.', appears: '13; 17; 19:20' },
  { id: 'horsemen', symbol: 'The Four Horsemen', category: 'Creatures & Figures', meaning: 'Conquest, war, famine, and death — the recurring judgments loosed on a rebellious world when the Lamb opens the seals.', appears: '6:1–8' },
  { id: 'harlot-bride', symbol: 'The Prostitute & the Bride', category: 'Creatures & Figures', meaning: 'Two women, two cities: Babylon the seductive world-system versus the New Jerusalem, the faithful people of God.', appears: '17:1–5; 19:7; 21:2,9' },
  { id: 'babylon', symbol: 'Babylon', category: 'Places', meaning: 'The archetypal God-opposing civilization — proud, idolatrous, luxurious (Rome for the first readers) — destined to fall.', appears: '14:8; 16:19; 17–18' },
  { id: 'newjerusalem', symbol: 'New Jerusalem', category: 'Places', meaning: 'The redeemed community and God’s eternal dwelling with humanity — a cube of gold, the whole city a Holy of Holies.', appears: '21:2–27' },
  { id: 'zion', symbol: 'Mount Zion', category: 'Places', meaning: 'The secure gathering place of the Lamb and the redeemed, set against the beast’s domain.', appears: '14:1' },
  { id: 'abyss', symbol: 'The Abyss / Lake of Fire', category: 'Places', meaning: 'The prison of demonic powers and the final destination of Satan, the beast, and death — "the second death."', appears: '9:1–2; 20:10–15' },
  { id: 'scroll', symbol: 'The Sealed Scroll', category: 'Objects', meaning: 'God’s plan for history and the world’s inheritance, which only the Lamb is worthy to open and enact.', appears: '5:1–7' },
  { id: 'seal-mark', symbol: 'The Seal of God vs. the Mark of the Beast', category: 'Objects', meaning: 'Two competing marks of ownership on the forehead — belonging to God, or allegiance to the beast. There is no neutral third option.', appears: '7:3; 13:16–17; 14:1' },
  { id: 'lampstands', symbol: 'The Golden Lampstands', category: 'Objects', meaning: 'The churches — called to be light-bearers — among whom the risen Christ walks.', appears: '1:12–20' },
  { id: 'tree-river', symbol: 'The Tree & River of Life', category: 'Objects', meaning: 'Eden restored and surpassed — God’s life, healing, and abundance flowing to the nations in the new creation.', appears: '22:1–2' },
];

/* ────────────────────────────────────────────────────────────────────────
 * Theological themes
 * ──────────────────────────────────────────────────────────────────────── */

export const THEMES: ThemeEntry[] = [
  {
    id: 'sovereignty',
    title: 'The Sovereignty of God',
    verse: '"After this I looked, and behold, a door standing open in heaven... and behold, a throne stood in heaven, with one seated on the throne."',
    reference: 'Revelation 4:1–2',
    body: 'The throne is the structural and theological center of Revelation, named some forty times. However chaotic history looks from below, the book insists that God reigns from an unshakeable throne. Every judgment, every rescue, every turn of the plot proceeds from his settled rule — which is precisely why a persecuted church can endure.',
  },
  {
    id: 'lamb',
    title: 'The Victory of the Slain Lamb',
    verse: '"Worthy is the Lamb who was slain, to receive power and wealth and wisdom and might and honor and glory and blessing!"',
    reference: 'Revelation 5:12',
    body: 'Revelation’s great reversal is that the Lion conquers as a Lamb who was slain. Christ wins not by force but by sacrificial love, and his people overcome the same way — "by the blood of the Lamb and the word of their testimony." This redefinition of power runs through the whole book and confronts every worldly notion of victory.',
  },
  {
    id: 'worship',
    title: 'Worship as Warfare',
    verse: '"Holy, holy, holy, is the Lord God Almighty, who was and is and is to come!"',
    reference: 'Revelation 4:8',
    body: 'Revelation is one of the most worship-saturated books in the Bible, punctuated by hymns and doxologies. In a world pressured to worship the beast and Caesar, the church’s worship of God and the Lamb is an act of allegiance and resistance — declaring who truly reigns and refusing every counterfeit.',
  },
  {
    id: 'endurance',
    title: 'The Perseverance of the Saints',
    verse: '"Here is a call for the endurance of the saints, those who keep the commandments of God and their faith in Jesus."',
    reference: 'Revelation 14:12',
    body: 'The book is fundamentally pastoral: it calls suffering believers to patient endurance and faithful witness, even to death. "The one who conquers" — a refrain in every letter — is not a triumphalist but a faithful sufferer who holds fast. Revelation arms the church to endure by showing it how the story ends.',
  },
  {
    id: 'judgment',
    title: 'Judgment and Justice',
    verse: '"Just are you, O Holy One, who is and who was, for you brought these judgments."',
    reference: 'Revelation 16:5',
    body: 'The martyrs’ cry "How long?" is answered: God will set the world right. Revelation takes evil, oppression, and the blood of the innocent with utter seriousness, and promises that the Judge of all the earth will do justice. Its judgment scenes are not divine cruelty but the vindication of the wronged and the end of impunity.',
  },
  {
    id: 'two-cities',
    title: 'Two Cities, Two Destinies',
    verse: '"Come out of her, my people, lest you take part in her sins."',
    reference: 'Revelation 18:4',
    body: 'The book sets Babylon — the seductive, idolatrous world-system — against the New Jerusalem, the faithful bride. Everyone belongs to one city or the other; there is no neutral ground. The call is to resist Babylon’s intoxication and to live even now as citizens of the city that is coming down from God.',
  },
  {
    id: 'presence',
    title: 'God Dwelling with His People',
    verse: '"Behold, the dwelling place of God is with man. He will dwell with them, and they will be his people."',
    reference: 'Revelation 21:3',
    body: 'The Bible’s storyline that began in a garden with God walking among his people, and was interrupted by exile, reaches its goal here: God dwelling unmediated with a renewed humanity, wiping away every tear. The end is not escape to heaven but heaven and earth joined — Eden restored and surpassed.',
  },
  {
    id: 'come',
    title: 'The Hope of Christ’s Coming',
    verse: '"He who testifies to these things says, ‘Surely I am coming soon.’ Amen. Come, Lord Jesus!"',
    reference: 'Revelation 22:20',
    body: 'Revelation ends the entire Bible on a note of longing and invitation. The Spirit and the Bride say "Come," and the risen Christ answers, "I am coming soon." Whatever one’s interpretive school, the book aims the church’s hope forward, teaching it to live watchfully and to pray for the consummation of all things.',
  },
];
