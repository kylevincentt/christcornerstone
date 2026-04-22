import type { Doctrine, ApologeticsQuestion, Quote, LibraryItem, Religion, ApologeticsCategory, DailyVerse } from '@/types';

export const DOCTRINES: Doctrine[] = [
  {
    id: '1', slug: 'trinity', tag: 'Theology Proper', name: 'The Trinity', sort_order: 1,
    verse: '"Go and make disciples… in the name of the Father and of the Son and of the Holy Spirit." — Matt 28:19',
    description: 'One God eternally existing in three co-equal, co-eternal persons: Father, Son, and Holy Spirit.',
    hover_verse_text: '"The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all."',
    hover_verse_citation: '2 Corinthians 13:14',
    full_content: `The doctrine of the Trinity is one of the most distinctive and essential teachings of Christianity. It affirms that God is one Being who exists eternally in three distinct Persons: the Father, the Son (Jesus Christ), and the Holy Spirit.

**Why It Matters**
The Trinity is not a mathematical puzzle — it is the revelation of who God actually is. A God who is eternally relational within himself is a God who is fundamentally love (1 John 4:8). The Father, Son, and Spirit exist in eternal fellowship, and humanity has been invited into that fellowship through Christ.

**Biblical Basis**
Though the word "Trinity" is not in the Bible, the concept is woven throughout both Testaments. At Jesus' baptism, all three Persons appear simultaneously (Matthew 3:16-17). The apostolic benediction invokes all three (2 Corinthians 13:14). The Great Commission commands baptism "in the name" (singular) of the three Persons (Matthew 28:19).

**Historical Development**
The early church councils, especially Nicaea (325 AD) and Constantinople (381 AD), clarified and defended Trinitarian theology against various heresies. The Nicene Creed remains the ecumenical statement of Trinitarian faith across Catholic, Orthodox, and Protestant traditions.

**Common Objections**
*"Isn't this polytheism?"* No — the Trinity affirms one God, not three. The three Persons share one divine essence or nature.
*"Wasn't this invented at Nicaea?"* No — Nicaea clarified existing belief. The New Testament data that supports Trinitarian theology predates the council by centuries.`
  },
  {
    id: '2', slug: 'salvation-by-grace', tag: 'Soteriology', name: 'Salvation by Grace', sort_order: 2,
    verse: '"For by grace you have been saved through faith. And this is not your own doing; it is the gift of God." — Eph 2:8',
    description: 'Salvation is a free gift from God, received through faith in Jesus Christ alone — not earned by works.',
    hover_verse_text: '"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."',
    hover_verse_citation: 'John 3:16',
    full_content: `At the center of the Christian gospel is a scandalous claim: salvation cannot be earned. It is given freely by God to those who trust in Christ, apart from any merit of their own.

**Grace Defined**
Grace is God's unmerited favor — his choosing to bless those who deserve judgment. Unlike karma or earned merit, grace flows from God's nature and character, not from anything in us.

**Faith Alone (Sola Fide)**
The Reformation recovered the biblical truth that justification — being declared righteous before God — comes through faith alone (Romans 3:28). This doesn't mean works are unimportant; rather, works are the fruit of genuine faith, not its root.

**The Atonement**
Jesus' death on the cross was the means by which God could justify the ungodly without compromising his justice. Christ bore the penalty for sin (penal substitution) and his righteousness is credited to all who believe (imputation).

**Assurance**
Because salvation rests on God's grace rather than human performance, the believer can have real assurance. "I write these things to you who believe in the name of the Son of God, that you may know that you have eternal life" (1 John 5:13).`
  },
  {
    id: '3', slug: 'resurrection', tag: 'Christology', name: 'The Resurrection', sort_order: 3,
    verse: '"If Christ has not been raised, your faith is futile and you are still in your sins." — 1 Cor 15:17',
    description: 'The bodily resurrection of Jesus is the cornerstone of Christian hope and the vindication of his claims.',
    hover_verse_text: '"I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live."',
    hover_verse_citation: 'John 11:25',
    full_content: `The resurrection of Jesus Christ is not a peripheral belief — Paul places it at the absolute center of Christian faith. Without a real, bodily resurrection, Christianity collapses entirely.

**The Historical Case**
Virtually all historians, including skeptics, accept four minimal facts: Jesus died by crucifixion, his tomb was found empty, his disciples claimed to have seen him alive afterward, and those disciples were willing to die for this claim. The resurrection is the best historical explanation for all four facts.

**What "Resurrection" Means**
The resurrection was not a resuscitation (returning to ordinary mortal life) nor a spiritual vision. It was a transformation into a new, glorified, physical existence — the first fruits of what God promises for all believers (1 Corinthians 15:20-23).

**Why It Changes Everything**
The resurrection vindicates Jesus' identity claims. It confirms that his sacrifice was accepted. It defeats the power of death. And it inaugurates the new creation — God's project of restoring and glorifying all things.

**Evidence & Apologetics**
Gary Habermas has documented that the majority of critical scholars — even those who do not believe in the resurrection — accept the four minimal facts. The disciples' willingness to die for their eyewitness testimony is especially powerful: people die for things they believe, not for things they know to be fabricated.`
  },
  {
    id: '4', slug: 'scripture', tag: 'Bibliology', name: 'Scripture', sort_order: 4,
    verse: '"All Scripture is breathed out by God and profitable for teaching, for reproof…" — 2 Tim 3:16',
    description: 'The Bible is the inspired, inerrant Word of God — our supreme guide for faith and life.',
    hover_verse_text: '"Your word is a lamp to my feet and a light to my path."',
    hover_verse_citation: 'Psalm 119:105',
    full_content: `The Christian claim about Scripture is extraordinary: that the 66 books of the Bible are uniquely and divinely inspired — "breathed out by God" (2 Timothy 3:16). This is the doctrine of biblical inspiration and inerrancy.

**What Inspiration Means**
Inspiration does not mean God dictated every word mechanically. Rather, the Holy Spirit superintended human authors — using their personalities, writing styles, and historical contexts — to produce exactly what God intended. The result is both fully human and fully divine in authorship.

**Inerrancy**
Inerrancy holds that Scripture, in its original manuscripts, is without error in all that it affirms. This includes matters of faith, practice, history, and science (when properly interpreted). Apparent contradictions resolve under careful study of genre, context, and original language.

**The Canon**
How do we know which books belong? The church recognized — rather than determined — the canon based on apostolic authorship or connection, widespread use, and consistency with established doctrine. The 27 New Testament books were universally recognized by 367 AD.

**Manuscript Evidence**
No other ancient document comes close to the New Testament in manuscript evidence: over 5,800 Greek manuscripts, thousands more in other languages, with the earliest fragments dating to within decades of the originals. Classical works like Caesar's Gallic Wars survive in fewer than 10 manuscripts.`
  },
  {
    id: '5', slug: 'sin-and-the-fall', tag: 'Hamartiology', name: 'Sin & The Fall', sort_order: 5,
    verse: '"For all have sinned and fall short of the glory of God." — Romans 3:23',
    description: 'Through Adam\'s fall, all humanity inherited a sinful nature, creating a separation from a holy God.',
    hover_verse_text: '"Therefore, just as sin came into the world through one man, and death through sin, so death spread to all men."',
    hover_verse_citation: 'Romans 5:12',
    full_content: `Understanding sin is essential to understanding why Jesus came. The doctrine of sin — and specifically the Fall — explains the brokenness of the world and the depth of humanity's need for redemption.

**The Fall**
Genesis 3 records humanity's original act of rebellion against God. Adam and Eve chose their own wisdom over God's word. The consequences were catastrophic: spiritual death (broken relationship with God), physical death, moral corruption, and disorder in creation itself.

**Original Sin**
The Fall did not just affect Adam and Eve personally. The Christian doctrine of original sin holds that all their descendants are born with a corrupted nature — inclined toward self rather than God. This is not merely behavioral; it is a condition of the will and heart (Jeremiah 17:9).

**The Universality of Sin**
"All have sinned and fall short of the glory of God" (Romans 3:23). This universality is crucial: no one is exempt. Sin is not just an external act but an internal orientation — pride, self-sufficiency, and idolatry (putting anything before God).

**Why This Matters for the Gospel**
The doctrine of sin establishes why humanity needs a Savior. A partial problem needs a partial solution; a total problem requires a total rescue. The gospel is glorious precisely because the need is dire. Christ came not to help good people be better, but to give life to the spiritually dead.`
  },
  {
    id: '6', slug: 'holy-spirit', tag: 'Pneumatology', name: 'The Holy Spirit', sort_order: 6,
    verse: '"But the Helper, the Holy Spirit, whom the Father will send in my name, he will teach you all things." — John 14:26',
    description: 'The Holy Spirit indwells every believer, convicting, sanctifying, gifting, and empowering for life.',
    hover_verse_text: '"Do you not know that you are God\'s temple and that God\'s Spirit dwells in you?"',
    hover_verse_citation: '1 Corinthians 3:16',
    full_content: `The Holy Spirit is the third Person of the Trinity — fully God, co-equal with the Father and Son. Far from being an impersonal force, the Spirit is a Person who thinks, wills, loves, and grieves.

**The Spirit's Work in Salvation**
The Spirit convicts the world of sin, righteousness, and judgment (John 16:8). He regenerates the believer — bringing them from spiritual death to life (John 3:5-8). He seals every believer as God's own possession (Ephesians 1:13-14).

**The Indwelling Spirit**
Every Christian is indwelt by the Holy Spirit (Romans 8:9). This is the promise of the New Covenant — not merely God's presence among his people, but God's Spirit within each individual. The body of the believer is a temple of the Holy Spirit (1 Corinthians 6:19).

**Sanctification**
The Spirit is the agent of sanctification — progressively conforming believers to the image of Christ. The fruit of the Spirit (love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control — Galatians 5:22-23) is evidence of the Spirit's work.

**Spiritual Gifts**
The Spirit distributes gifts to believers for the building up of the church (1 Corinthians 12). Christians hold various views on the continuation of miraculous gifts today, but all agree that every believer is gifted by the Spirit for service.`
  },
  {
    id: '7', slug: 'second-coming', tag: 'Eschatology', name: 'The Second Coming', sort_order: 7,
    verse: '"For the Lord himself will descend from heaven with a cry of command…" — 1 Thess 4:16',
    description: 'Jesus Christ will return bodily and visibly to judge the living and the dead and consummate his kingdom.',
    hover_verse_text: '"Behold, he is coming with the clouds, and every eye will see him."',
    hover_verse_citation: 'Revelation 1:7',
    full_content: `The Christian hope is not escape from the world but its transformation. The Second Coming of Christ is the culmination of God's redemptive plan — the day when Jesus returns to judge, restore, and reign.

**Certainty and Imminence**
Jesus himself promised to return (John 14:3). The angels at the Ascension confirmed it (Acts 1:11). Paul, Peter, and John all wrote with expectation of Christ's return. While no one knows the day or hour (Matthew 24:36), Christians are called to live with constant readiness.

**The Bodily Return**
The Second Coming will be personal, bodily, and visible — not metaphorical. "Every eye will see him" (Revelation 1:7). This is not a spiritual event but a cataclysmic, cosmic one.

**Judgment and Resurrection**
At his return, Christ will raise the dead — believers to eternal life, unbelievers to judgment (John 5:28-29). The Great White Throne judgment (Revelation 20) will render final verdicts based on what each person has done.

**The New Creation**
The ultimate goal is not heaven as a disembodied realm, but the new heaven and new earth — the full renewal of creation (Revelation 21-22). God will dwell with his people, and death, mourning, and pain will be no more.

**Eschatological Views**
Christians hold different views on the millennium (Revelation 20) — premillennialism, amillennialism, and postmillennialism — but are united in their belief in Christ's personal, bodily return and final judgment.`
  },
  {
    id: '8', slug: 'the-church', tag: 'Ecclesiology', name: 'The Church', sort_order: 8,
    verse: '"On this rock I will build my church, and the gates of hell shall not prevail against it." — Matt 16:18',
    description: 'The Church is the body of Christ — called to worship, disciple, and serve the world in his name.',
    hover_verse_text: '"And let us consider how to stir up one another to love and good works, not neglecting to meet together."',
    hover_verse_citation: 'Hebrews 10:24–25',
    full_content: `The Church is not a human institution — it is the body of Christ, the dwelling place of the Spirit, and the primary vehicle of God's mission in the world.

**The Church Universal and Local**
There is one Church — all who have been united to Christ by faith across all times and places. This universal Church is expressed in local congregations, which are the visible manifestations of Christ's body in specific places and times.

**The Marks of the Church**
The Reformers identified two essential marks: the Word of God rightly preached, and the sacraments (baptism and the Lord's Supper) rightly administered. Some traditions add church discipline as a third mark.

**The Mission of the Church**
Jesus gave the Church the Great Commission: "Go therefore and make disciples of all nations, baptizing them…and teaching them to observe all that I have commanded you" (Matthew 28:19-20). The church exists to worship God, build up believers, and reach the lost.

**Community, Not Just Attendance**
The New Testament picture of church is intensely relational. The "one another" commands in the epistles (love one another, serve one another, bear one another's burdens) are impossible to obey in isolation. Biblical Christianity is inherently communal.

**The Church's Future**
Christ's return will consummate the church's story. The church is described in Revelation as "the bride of Christ" — and the wedding feast of the Lamb is the ultimate reunion. The church on earth is a foretaste of that eternal community.`
  },
];

export const APOLOGETICS_QUESTIONS: ApologeticsQuestion[] = [
  {
    id: '1', category: 'philosophical', sort_order: 1,
    question: 'If God exists, why is there evil and suffering?',
    objection: 'A good, all-powerful God would eliminate evil. Since evil exists, God cannot.',
    response: 'God permits suffering because he values free will and works through suffering for greater goods. The cross itself is the greatest evil producing the greatest good — God doesn\'t merely observe suffering, in Christ he entered it.',
    go_deeper: 'C.S. Lewis, The Problem of Pain · Alvin Plantinga\'s Free Will Defense'
  },
  {
    id: '2', category: 'scientific', sort_order: 2,
    question: 'Hasn\'t science disproven the need for God?',
    objection: 'Science explains the natural world through natural causes — God is an unnecessary hypothesis.',
    response: 'Science explains how the universe operates, not why it exists at all. Fine-tuning of physical constants, the origin of life, and consciousness all point beyond matter. Many of history\'s greatest scientists were devout Christians.',
    go_deeper: 'John Lennox, God\'s Undertaker · Francis Collins, The Language of God'
  },
  {
    id: '3', category: 'historical', sort_order: 3,
    question: 'Was Jesus really resurrected from the dead?',
    objection: 'The resurrection is a legend invented by grieving disciples. Dead men don\'t rise.',
    response: 'Four minimal facts accepted by virtually all historians — death of Jesus, empty tomb, post-resurrection appearances, and disciples willing to die for this claim — are best explained by an actual resurrection.',
    go_deeper: 'Gary Habermas, The Case for the Resurrection · N.T. Wright, The Resurrection of the Son of God'
  },
  {
    id: '4', category: 'historical', sort_order: 4,
    question: 'Is the Bible reliable or full of contradictions?',
    objection: 'The Bible was written by men, copied through centuries, and is full of errors.',
    response: 'The New Testament has more manuscript evidence than any other ancient document — over 5,800 Greek manuscripts. Archaeological discoveries have repeatedly confirmed biblical accounts. Apparent contradictions resolve under careful reading.',
    go_deeper: 'F.F. Bruce, The New Testament Documents · Josh McDowell, Evidence That Demands a Verdict'
  },
  {
    id: '5', category: 'philosophical', sort_order: 5,
    question: 'Can you prove God exists?',
    objection: 'Belief in God is blind faith — there is no evidence for a Creator.',
    response: 'The cosmological argument (everything that begins has a cause), the teleological argument (the universe exhibits extraordinary fine-tuning), and the moral argument (objective morality requires an objective standard) all provide compelling evidence for theism.',
    go_deeper: 'William Lane Craig, Reasonable Faith · Alvin Plantinga, God and Other Minds'
  },
  {
    id: '6', category: 'personal', sort_order: 6,
    question: 'Why doesn\'t God answer my prayers?',
    objection: 'If God is real and loves me, why does he seem absent when I cry out to him?',
    response: 'God\'s silence is not absence, and his "no" is not abandonment. He answers every prayer — sometimes with yes, sometimes no, sometimes wait — according to what he knows is best. Jesus himself experienced divine silence on the cross (Mark 15:34), yet was not forsaken.',
    go_deeper: 'Tim Keller, Prayer · Philip Yancey, Disappointment with God'
  },
  {
    id: '7', category: 'comparative', sort_order: 7,
    question: 'Aren\'t all religions basically the same?',
    objection: 'Every religion teaches love and goodness — they\'re just different paths up the same mountain.',
    response: 'The world\'s religions make mutually exclusive, irreconcilable claims about God, salvation, human nature, and eternity. Jesus claimed to be "the way, the truth, and the life" (John 14:6) — not one option among many. The differences are not superficial but fundamental.',
    go_deeper: 'Ravi Zacharias, Jesus Among Other Gods · Timothy Keller, The Reason for God'
  },
  {
    id: '8', category: 'scientific', sort_order: 8,
    question: 'Doesn\'t evolution disprove creation?',
    objection: 'Darwin\'s theory of evolution explains the diversity of life without any need for a Creator.',
    response: 'Evolution addresses biological change over time — it does not address the origin of life, the origin of the universe, the fine-tuning of physical constants, or the emergence of consciousness. Many committed Christians accept some form of evolution while maintaining that God is the ultimate Creator.',
    go_deeper: 'Francis Collins, The Language of God · C.S. Lewis, Mere Christianity (ch. 2)'
  },
];

export const APOLOGETICS_CATEGORIES: ApologeticsCategory[] = [
  { id: '1', slug: 'philosophical', icon: '🧠', title: 'Philosophical', description: 'God\'s existence, moral argument, fine-tuning, consciousness' },
  { id: '2', slug: 'historical', icon: '📄', title: 'Historical', description: 'Reliability of Scripture, resurrection evidence, canon formation' },
  { id: '3', slug: 'scientific', icon: '🔬', title: 'Scientific', description: 'Creation, evolution, miracles, origin of life, cosmology' },
  { id: '4', slug: 'comparative', icon: '🌍', title: 'Comparative', description: 'Christianity vs. Islam, Mormonism, New Age, Atheism' },
  { id: '5', slug: 'personal', icon: '📚', title: 'Personal', description: 'Doubt, suffering, unanswered prayer, feeling far from God' },
  { id: '6', slug: 'quick', icon: '⚡', title: 'Quick Defense', description: '2-sentence answers for real conversations' },
];

export const QUOTES: Quote[] = [
  { id: '1', text: 'You have made us for yourself, O Lord, and our heart is restless until it rests in you.', author: 'Augustine of Hippo', era: '354–430 AD · Confessions', avatar_emoji: '✠', sort_order: 1 },
  { id: '2', text: 'I believe in Christianity as I believe that the sun has risen — not only because I see it, but because by it I see everything else.', author: 'C.S. Lewis', era: '1898–1963 · Is Theology Poetry?', avatar_emoji: '🦁', sort_order: 2 },
  { id: '3', text: 'Here I stand, I can do no other. God help me. Amen.', author: 'Martin Luther', era: '1483–1546 · Diet of Worms', avatar_emoji: '⛓', sort_order: 3 },
  { id: '4', text: 'God is most glorified in us when we are most satisfied in him.', author: 'John Piper', era: '1946–present · Desiring God', avatar_emoji: '🔥', sort_order: 4 },
  { id: '5', text: 'The Christian does not think God will love us because we are good, but that God will make us good because He loves us.', author: 'C.S. Lewis', era: '1898–1963 · Mere Christianity', avatar_emoji: '🦁', sort_order: 5 },
  { id: '6', text: 'Grace is not simply leniency when we have sinned. Grace is the enabling gift of God not to sin.', author: 'John Piper', era: '1946–present', avatar_emoji: '🔥', sort_order: 6 },
  { id: '7', text: 'To be a Christian means to forgive the inexcusable because God has forgiven the inexcusable in you.', author: 'C.S. Lewis', era: '1898–1963 · The Weight of Glory', avatar_emoji: '🦁', sort_order: 7 },
  { id: '8', text: 'The Bible is alive, it speaks to me; it has feet, it runs after me; it has hands, it lays hold of me.', author: 'Martin Luther', era: '1483–1546', avatar_emoji: '⛓', sort_order: 8 },
  { id: '9', text: 'We are not necessarily doubting that God will do the best for us; we are wondering how painful the best will turn out to be.', author: 'C.S. Lewis', era: '1898–1963', avatar_emoji: '🦁', sort_order: 9 },
  { id: '10', text: 'The sovereign God wants to be loved for himself and honored for his nobility. The insipid god of popular Christianity is frankly not worth our worship.', author: 'A.W. Tozer', era: '1897–1963 · The Pursuit of God', avatar_emoji: '✦', sort_order: 10 },
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  { id: '1', tab: 'bibles', icon: '📖', name: 'Bible Gateway', description: 'Read and search the Bible in over 200 versions and 70+ languages. Excellent for parallel Bible study.', url: 'https://www.biblegateway.com', link_text: 'Visit →', sort_order: 1 },
  { id: '2', tab: 'bibles', icon: '🔵', name: 'Blue Letter Bible', description: 'Deep word studies with Strong\'s concordance, original Greek and Hebrew, and commentaries.', url: 'https://www.blueletterbible.org', link_text: 'Visit →', sort_order: 2 },
  { id: '3', tab: 'bibles', icon: '📱', name: 'YouVersion', description: 'The most widely used Bible app worldwide. Reading plans, devotionals, and audio Bible.', url: 'https://www.youversion.com', link_text: 'Visit →', sort_order: 3 },
  { id: '4', tab: 'study', icon: '🏕', name: 'Logos Bible Software', description: 'The gold standard of digital Bible study — thousands of commentaries and original language tools.', url: 'https://www.logos.com', link_text: 'Visit →', sort_order: 4 },
  { id: '5', tab: 'study', icon: '🔗', name: 'Bible Hub', description: 'Free interlinear Bible, concordances, commentaries, and parallel translations side by side.', url: 'https://biblehub.com', link_text: 'Visit →', sort_order: 5 },
  { id: '6', tab: 'study', icon: '✠', name: 'ESV Bible Online', description: 'The English Standard Version — a highly regarded word-for-word translation with study notes and audio.', url: 'https://www.esv.org', link_text: 'Visit →', sort_order: 6 },
  { id: '7', tab: 'theologians', icon: '🦁', name: 'C.S. Lewis', description: 'Went from atheist to the 20th century\'s most beloved Christian apologist. Start with Mere Christianity.', url: 'https://www.cslewis.com', link_text: 'Explore Works →', sort_order: 7 },
  { id: '8', tab: 'theologians', icon: '🌊', name: 'Tim Keller', description: 'Intellectual, compassionate, and deeply accessible. His work bridges faith and the skeptical modern mind.', url: 'https://www.timothykeller.com', link_text: 'Explore Works →', sort_order: 8 },
  { id: '9', tab: 'theologians', icon: '⛓', name: 'R.C. Sproul', description: 'Made Reformed theology accessible to millions. Founder of Ligonier Ministries.', url: 'https://www.ligonier.org', link_text: 'Explore Works →', sort_order: 9 },
  { id: '10', tab: 'media', icon: '🍞', name: 'The Bible Project', description: 'Stunning animated videos walking through every book and major themes of the Bible with depth and clarity.', url: 'https://bibleproject.com', link_text: 'Watch →', sort_order: 10 },
  { id: '11', tab: 'media', icon: '🎙', name: 'Unbelievable?', description: 'Premier Christian Radio\'s apologetics show — Christians and skeptics in rigorous, fair conversation.', url: 'https://www.premierchristianradio.com', link_text: 'Listen →', sort_order: 11 },
  { id: '12', tab: 'media', icon: '⚔', name: 'Reasonable Faith', description: 'William Lane Craig\'s apologetics ministry — debates, lectures, and articles defending Christian truth claims.', url: 'https://www.reasonablefaith.org', link_text: 'Explore →', sort_order: 12 },
];

export const RELIGIONS: Religion[] = [
  {
    id: '1', slug: 'islam', icon: '☪', name: 'Islam', adherents: '1.9 Billion Adherents', sort_order: 1,
    description: 'Islam and Christianity share Abrahamic roots and reverence for Jesus — but differ decisively on his identity, death, and resurrection.',
    comparison_points: [
      'Islam denies the Trinity; Christianity affirms one God in three persons',
      'Islam says Jesus was a prophet; Christianity says he is the Son of God',
      'Islam denies the crucifixion; Christianity calls it the central event of history',
      'Salvation by works vs. salvation by grace through faith'
    ],
    full_content: `Islam is the world's second-largest religion, with nearly 2 billion adherents globally. Both Islam and Christianity trace their roots to Abraham, revere Jesus, and hold to monotheism — yet their differences are profound and irreconcilable.

**The Nature of God**
Islam teaches strict Tawhid (divine unity) — God is absolutely one, indivisible, and singular. The Trinity is considered shirk (associating partners with God), the gravest of sins. Christianity holds that God is one Being in three Persons, revealed progressively through Scripture and finally in Christ.

**The Identity of Jesus**
This is the central divergence. Islam honors Isa (Jesus) as one of the greatest prophets, born of a virgin, performing miracles, and taken to heaven — but not crucified, not divine, and certainly not the Son of God. Christianity holds that Jesus is the eternal Son of God, fully divine and fully human, who died for our sins and rose from the dead.

**The Crucifixion**
The Quran explicitly states that Jesus was not crucified: "They did not kill him, nor did they crucify him, but it was made to appear so" (Surah 4:157). Christianity stakes everything on the cross — without the crucifixion and resurrection, there is no atonement and no gospel.

**Salvation**
Islam teaches that salvation is achieved through submission (islam) to Allah, performing the Five Pillars, and accumulating good works to outweigh bad ones on the Day of Judgment. Christianity teaches that no amount of works can satisfy a holy God — salvation is a gift received through faith in Christ's finished work.

**The Gospel Response to Islam**
Muslims often have tremendous reverence for the divine and are deeply committed to prayer and moral seriousness. The gospel invitation is not to abandon reverence for God but to receive the love of God through Christ — to know not merely a Master but a Father.`
  },
  {
    id: '2', slug: 'judaism', icon: '✡', name: 'Judaism', adherents: '15 Million Adherents', sort_order: 2,
    description: 'Christianity grew from Jewish soil. Both share the Hebrew Scriptures — but differ profoundly on whether Jesus fulfilled the Messianic prophecies.',
    comparison_points: [
      'Judaism awaits the Messiah; Christianity says he has come in Jesus',
      'Over 300 Old Testament prophecies Christians see fulfilled in Christ',
      'Atonement through temple sacrifice vs. the final sacrifice of Christ',
      'The New Covenant foretold in Jeremiah 31 — fulfilled or future?'
    ],
    full_content: `Of all world religions, Judaism has the most intimate relationship with Christianity. Jesus was Jewish. The apostles were Jewish. The entire New Testament was written by Jewish authors. Christianity is not a replacement of Judaism but its fulfillment — or so Christians claim.

**Shared Heritage**
Both Christianity and Judaism share the Hebrew Scriptures (what Christians call the Old Testament). Both affirm one God, the covenant relationship, the moral law, and the hope of redemption. The God of Abraham, Isaac, and Jacob is the God and Father of Jesus Christ.

**The Messianic Question**
The central dividing issue is Jesus of Nazareth. Did he fulfill the Messianic prophecies of the Hebrew Scriptures? Christians point to prophecies in Isaiah 53 (the Suffering Servant), Psalm 22, Micah 5:2, Daniel 9 (the 70 weeks), and Zechariah 9:9 as specific, verifiable predictions fulfilled in Jesus. Jewish scholars interpret these passages differently or see them as yet unfulfilled.

**The Temple and Atonement**
The Jerusalem Temple — destroyed in 70 AD — was the center of Israel's atonement system. The sacrificial system pointed forward to a final, ultimate sacrifice. Christians see this fulfilled in Christ: "For Christ, our Passover lamb, has been sacrificed" (1 Corinthians 5:7).

**A Message of Completion**
The Christian message to Jewish people is not that they must abandon their heritage but that their own Scriptures point to Jesus. The New Covenant promised in Jeremiah 31:31-34 — "I will put my law within them, and I will write it on their hearts" — Christians believe was inaugurated by Christ.`
  },
  {
    id: '3', slug: 'hinduism', icon: '🕉', name: 'Hinduism', adherents: '1.2 Billion Adherents', sort_order: 3,
    description: 'Hinduism is one of the world\'s oldest religions — richly diverse, with a very different view of God, self, and salvation than Christianity offers.',
    comparison_points: [
      'Pantheism / many gods vs. one personal, relational God',
      'Karma and reincarnation vs. one life, resurrection, and judgment',
      'Liberation through knowledge or ritual vs. grace through Christ',
      'The self as divine vs. the self as creature before Creator'
    ],
    full_content: `Hinduism is one of the world's oldest religious traditions, encompassing an extraordinary diversity of beliefs and practices. From devotional theism to non-dualist philosophy, Hinduism resists simple definition — yet certain core themes allow comparison with Christianity.

**The Nature of God**
Hinduism includes numerous views: strict monotheism (worshiping Brahma, Vishnu, or Shiva as the supreme God), polytheism (many distinct deities), and monism (all reality is ultimately one divine consciousness, Brahman). Christianity affirms one personal God — Creator distinct from creation, known by name, and knowable in relationship.

**The Human Condition**
In Advaita Vedanta (one prominent school), the individual self (Atman) is ultimately identical with Brahman — "the divine is within you." Christianity holds that humans are creatures made in God's image — genuinely distinct from God, designed for relationship with him, and in need of redemption rather than realization.

**Karma and Reincarnation**
Hinduism teaches that the soul undergoes many lives, accumulating karma (moral consequence), with the goal of moksha (liberation from the cycle). Christianity teaches that "it is appointed for man to die once, and after that comes judgment" (Hebrews 9:27) — one life, one death, and resurrection.

**Grace and Works**
While bhakti (devotional) Hinduism includes a concept of divine grace, the dominant framework involves self-effort: study, ritual, devotion, and right action. Christianity offers radical grace: God himself entering history to rescue those who cannot rescue themselves.`
  },
  {
    id: '4', slug: 'buddhism', icon: '☸', name: 'Buddhism', adherents: '500 Million Adherents', sort_order: 4,
    description: 'Buddhism is a philosophical and spiritual tradition focused on ending suffering — but its view of self, God, and ultimate reality contrasts sharply with Christianity.',
    comparison_points: [
      'Buddhism is largely non-theistic; Christianity is rooted in a personal God',
      'The self is an illusion vs. you are made in the image of God',
      'Nirvana as the cessation of desire vs. eternal life in relationship with God',
      'Salvation by self-effort vs. salvation as a gift received'
    ],
    full_content: `Buddhism was founded in the 5th century BC by Siddhartha Gautama in what is now Nepal. It spread across Asia to become one of the world's great religious traditions. While many Westerners are drawn to Buddhist meditation practices, the full worldview differs dramatically from Christianity.

**The Buddha and Jesus**
The Buddha was a man who claimed to have achieved enlightenment and taught others the path to follow. Jesus claimed to be the Son of God — not showing the way, but being the way. The Buddha pointed to himself as an example; Jesus said, "I am the way, the truth, and the life" (John 14:6).

**The Self**
Much of Buddhist teaching, especially in its Theravada form, holds that the self (atman) is an illusion. What we call "I" is a flux of impermanent aggregates with no permanent core. Christianity holds that each human is uniquely made in the image of God — a real, enduring person of infinite worth and dignity, known by name by their Creator.

**The Problem and the Solution**
Buddhism identifies craving/attachment (tanha) as the root of suffering, and prescribes the Noble Eightfold Path as the means to liberation. Christianity identifies sin (rebellion against God) as the root problem, and the solution is not self-cultivation but the atoning work of Christ received through faith.

**Nirvana and Eternal Life**
Buddhist nirvana is the extinction of craving and the cessation of the personal self — liberation from the cycle of rebirth. Christianity's vision of eternity is radically different: the resurrection of the body, the restoration of all things, and eternal life in conscious, joyful relationship with a personal God.`
  },
  {
    id: '5', slug: 'mormonism', icon: '♧', name: 'Mormonism', adherents: '17 Million Members', sort_order: 5,
    description: 'Mormonism uses Christian language but teaches a fundamentally different theology — a different God, a different Jesus, and a different gospel.',
    comparison_points: [
      'God was once a man and is now exalted vs. God is eternal and uncreated',
      'Jesus and Lucifer are spirit brothers vs. Jesus is the eternal Son of God',
      'Humans can become gods vs. creation is forever distinct from Creator',
      'Salvation requires temple ordinances vs. faith alone in Christ alone'
    ],
    full_content: `The Church of Jesus Christ of Latter-day Saints (LDS), commonly called Mormonism, was founded in 1830 by Joseph Smith. It uses Christian vocabulary and venerates the Bible, but its underlying theology differs substantially from historic Christianity.

**A Different God**
Historic Christianity teaches that God is eternal, uncreated, and immaterial — the Creator of all things, without beginning or end. LDS theology teaches that God was once a man who progressed to divinity: "As man now is, God once was; as God now is, man may become" (Lorenzo Snow couplet). This is a fundamentally different God.

**A Different Jesus**
LDS theology teaches that Jesus and Lucifer are spirit brothers — both offspring of Heavenly Father and Heavenly Mother. Historic Christianity teaches that Jesus is the eternal, uncreated Son of God, the second Person of the Trinity, through whom all things were made (John 1:3).

**A Different Gospel**
The LDS concept of salvation is multi-tiered. While Christ's atonement is acknowledged, full exaltation (eternal life in the highest degree of glory) requires baptism in the LDS church, temple ordinances (including proxy baptism for the dead), celestial marriage, and ongoing obedience. This differs from the Reformation principle of sola fide — salvation by faith alone.

**Human Deification**
LDS theology teaches the doctrine of eternal progression: faithful Latter-day Saints can become gods, creating spirit children and populating worlds of their own. This contrasts sharply with the Christian doctrine that the Creator-creature distinction is permanent and that humans, while glorified, never become God.`
  },
  {
    id: '6', slug: 'atheism', icon: '🚫', name: 'Atheism & Secularism', adherents: 'A Growing Worldview', sort_order: 6,
    description: 'Atheism denies the existence of God; secular humanism seeks meaning without transcendence. Christianity offers direct answers to both at the deepest level.',
    comparison_points: [
      'No God vs. the cosmological and fine-tuning arguments for a Creator',
      'Morality as social construct vs. objective morality grounded in God',
      'Consciousness as matter vs. consciousness as evidence of the immaterial',
      'Meaning from self vs. meaning as found in relationship with your Maker'
    ],
    full_content: `Atheism — the lack of belief in God or gods — has grown significantly in the West over recent decades, particularly among younger generations. Secular humanism attempts to build an ethical, meaningful worldview without reference to the divine.

**The Cosmological Argument**
The universe had a beginning (confirmed by the Big Bang). Everything that begins to exist has a cause. Therefore the universe has a cause. That cause must be outside space, time, and matter — and must be extraordinarily powerful. This points strongly to a Creator. The atheist must explain how "nothing" became everything.

**The Fine-Tuning Argument**
The fundamental constants of physics are calibrated to astonishing precision for life to be possible. Physicists acknowledge this "fine-tuning" — even slight variations in the gravitational constant, the cosmological constant, or the ratio of electromagnetism to gravity would make life impossible. The probability against this arising by chance is staggering.

**The Moral Argument**
Atheism struggles to ground objective morality. If there is no God, moral claims reduce to evolutionary pressure, social convention, or personal preference. Yet nearly everyone believes that the Holocaust was objectively wrong — not merely "not to our preference." Objective moral facts are best explained by a moral lawgiver.

**The Meaning Question**
Secular humanism offers meaning through human flourishing, relationships, and achievement. But if the universe is ultimately indifferent and death ends everything, these meanings are self-constructed and temporary. Christianity claims meaning is discovered, not invented — that you are known, loved, and purposefully made by the God who is there.

**Engaging Respectfully**
Many atheists and agnostics are thoughtful, sincere people motivated by genuine intellectual honesty. The Christian response should not be defensiveness but engagement — meeting questions with questions, evidence with evidence, and above all, lives that commend the gospel.`
  },
];

export const DAILY_VERSES: DailyVerse[] = [
  { id: '1', text: 'For I am convinced that neither death nor life shall separate us from the love of God.', reference: 'Romans 8:38' },
  { id: '2', text: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.', reference: 'Ephesians 2:8' },
  { id: '3', text: 'Trust in the Lord with all your heart, and do not lean on your own understanding.', reference: 'Proverbs 3:5' },
  { id: '4', text: 'I can do all things through him who strengthens me.', reference: 'Philippians 4:13' },
  { id: '5', text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1' },
  { id: '6', text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.', reference: 'John 3:16' },
  { id: '7', text: 'Be still, and know that I am God.', reference: 'Psalm 46:10' },
  { id: '8', text: 'Come to me, all who labor and are heavy laden, and I will give you rest.', reference: 'Matthew 11:28' },
  { id: '9', text: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.', reference: 'Philippians 4:6' },
  { id: '10', text: 'Your word is a lamp to my feet and a light to my path.', reference: 'Psalm 119:105' },
  { id: '11', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', reference: 'John 1:1' },
  { id: '12', text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.', reference: 'Numbers 6:24-25' },
  { id: '13', text: 'But seek first the kingdom of God and his righteousness, and all these things will be added to you.', reference: 'Matthew 6:33' },
  { id: '14', text: 'Fear not, for I am with you; be not dismayed, for I am your God.', reference: 'Isaiah 41:10' },
];

export function getDailyVerse(): DailyVerse {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export const BIBLE_BOOKS = {
  old: ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'],
  new: ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'],
};
