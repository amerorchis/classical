// composer-bios.js
// This module provides a system for displaying composer biographies in a popup format.
// It includes functions to initialize the system, create the popup container, add buttons to composer labels,
// handle popup events, and apply styles.

// Enable debug mode
const DEBUG = false;

function log(...args) {
  if (DEBUG) {
    console.log('%c[ComposerBios]', 'color: #4338ca; font-weight: bold;', ...args);
  }
}

// Database of composer biographies
const composerBios = {
  "hildegard": {
    name: "Hildegard von Bingen",
    years: "1098-1179",
    image: "composerPics/Hildegard_von_Bingen.jpg",
    bio: `Hildegard von Bingen was a remarkable 12th-century Benedictine abbess whose multifaceted contributions to music, theology, medicine, and natural philosophy earned her the title "Sibyl of the Rhine." Born to noble parents in Bermersheim (modern Germany), she was dedicated to the church at age eight and began experiencing mystical visions from childhood that informed her diverse works. At age 38, she became abbess of the Disibodenberg monastery and later founded her own abbey at Rupertsberg. Her musical compositions, collected in "Symphonia armonie celestium revelationum," feature monophonic chants with unusually wide ranges and leaps, making her one of the most important early medieval composers. Her most famous work, "Ordo Virtutum," is considered the oldest surviving morality play with music. Beyond music, she wrote theological texts like "Scivias," medical and scientific treatises including "Physica" and "Causae et Curae," and invented her own language called "Lingua Ignota." Pope Benedict XVI named her a Doctor of the Church in 2012, recognizing her enduring intellectual and spiritual legacy across multiple disciplines.`
  },
  "leonin": {
    name: "Léonin & Pérotin",
    years: "c.1150-c.1201 & c.1160-c.1230",
    image: "",
    bio: `Léonin (also known as Leoninus) was a pioneering French composer and the first known significant composer associated with the Notre Dame school of polyphony. Active in Paris during the 12th century, he served as the principal composer at the Cathedral of Notre Dame. His most significant contribution was the "Magnus Liber Organi" (Great Book of Organum), which contains two-part polyphonic settings of Gregorian chants for the major feasts of the church year. Léonin revolutionized Western music by developing the organum style, in which the original chant melody (tenor) is sung in extended notes while a more elaborate, free-flowing line (duplum) is performed above it. This innovation represented one of the earliest systematic approaches to writing polyphonic music and established rhythmic patterns that would influence Western musical notation. Though biographical details remain sparse, Léonin was also reportedly a renowned poet, and his musical innovations laid crucial groundwork for his successor Pérotin and the further development of polyphonic composition in Western music history.

        Pérotin (or Perotinus Magnus) was a European composer, likely French, who served as the magister cantus (master of the chant) at the Notre Dame Cathedral in Paris following Léonin. He represents the culmination of the Notre Dame school of polyphony and is considered one of the most innovative composers of the medieval period. Pérotin's revolutionary contribution was the expansion of organum from two voices to three and four voices, creating the first known significant pieces of polyphonic music with more than two independent parts. His compositions, particularly "Viderunt omnes" and "Sederunt principes," feature complex rhythmic structures using the rhythmic modes system and showcase remarkable architectural planning. Pérotin refined the discant clausula style, which allowed for more rhythmically defined sections within larger works. He also expanded the motet form from its liturgical origins. English music theorist Anonymous IV (c. 1280) extensively documented Pérotin's work, noting that he "edited" and improved upon Léonin's Magnus Liber Organi. His innovations in rhythm, harmony, and musical structure dramatically advanced Western musical development, establishing foundations for polyphonic composition that would influence composers for centuries.`
  },
  "machaut": {
    name: "Guillaume de Machaut",
    years: "c.1300-1377",
    image: "composerPics/Machaut_1.jpg",
    bio: `Guillaume de Machaut was a medieval French composer and poet who stands as the most celebrated musician of the 14th century and a pivotal figure in the Ars Nova movement. Born in the Champagne region of France, Machaut served as secretary to John I, King of Bohemia, before holding prestigious ecclesiastical positions including a canonry at Reims Cathedral. Unlike many medieval composers, a remarkably large body of Machaut's work has survived, carefully preserved in manuscripts he personally supervised. His most famous composition, the "Messe de Nostre Dame," is the earliest known complete setting of the Ordinary of the Mass by a single composer. As a musical innovator, Machaut developed complex polyphonic secular forms like the lai, virelai, rondeau, and ballade, employing rhythmic innovations including syncopation and polyrhythms. His poetry, including the narrative "Le Voir Dit," blended autobiographical elements with courtly love traditions. Machaut's work bridged medieval and Renaissance aesthetics, influencing generations of composers and poets. His dual expertise in music and literature makes him one of the most important cultural figures of the Late Middle Ages, representing the sophisticated artistic expression of the French royal court tradition.`
  },
  "josquin": {
    name: "Josquin des Prez",
    years: "c.1450-1521",
    image: "composerPics/Josquin_woodcut.jpg",
    bio: `Josquin des Prez was a Franco-Flemish composer of the Renaissance who is widely regarded as the first master of the high Renaissance style of polyphonic vocal music. Born in the region of modern Belgium or northern France, Josquin served in prestigious positions across Europe, including the papal chapel in Rome, the courts of Cardinal Ascanio Sforza in Milan, King Louis XII of France, and Ercole I d'Este in Ferrara. His contemporary fame was unparalleled; Martin Luther proclaimed, "Josquin is the master of the notes, which must express what he desires." Josquin's approximately 18 masses, 100 motets, and 70 secular pieces showcase his revolutionary approach to composition, characterized by unprecedented text expressivity, structural clarity, and balanced imitative counterpoint. His innovations included pervasive imitation (where each voice enters with the same melodic idea), paired duets technique, and strategic use of homophony for textual emphasis. Josquin was among the first composers to benefit from music printing technology, with Ottaviano Petrucci publishing three volumes dedicated solely to his masses. His expressive handling of dissonance, motivic development, and rhetorical text setting fundamentally changed Western composition, influencing generations of composers including Palestrina, Lassus, and even Bach. Musicologists consider Josquin the central figure in the transition from medieval to modern musical thinking.`
  },
  "palestrina": {
    name: "Giovanni Pierluigi da Palestrina",
    years: "c.1525-1594",
    image: "composerPics/Giovanni_Pierluigi_da_Palestrina.jpg",
    bio: `Giovanni Pierluigi da Palestrina, the preeminent Italian Renaissance composer, created what many consider the definitive sacred polyphonic style of the Counter-Reformation era. Born in the town of Palestrina near Rome, he spent most of his career in Rome serving various churches, including St. Peter's Basilica, where he became maestro di cappella. His prolific output includes 104 authenticated masses, over 375 motets, 68 offertories, 72 hymns, 35 magnificats, and numerous secular madrigals. The "Pope Marcellus Mass" is his most famous work, surrounded by the (likely apocryphal) legend that it saved polyphonic church music during the Council of Trent's reforms by demonstrating that complex music could maintain textual clarity. Palestrina's compositional style—now known as the "Palestrina style"—features seamless counterpoint with carefully controlled dissonance, smooth voice leading, clear text setting, and balanced sonorities that create a sense of serene perfection. He established rules for counterpoint that became the foundation of music education for centuries, as codified by Johann Joseph Fux in his influential 1725 treatise "Gradus ad Parnassum." As the leading composer of the Roman School, Palestrina created the musical embodiment of Counter-Reformation Catholic ideals, balancing Renaissance humanism with sacred expression. His music represents the culmination of Renaissance polyphonic techniques and remains the gold standard of contrapuntal vocal writing.`
  },
  "tallis": {
    name: "Thomas Tallis",
    years: "c.1505-1585",
    image: "composerPics/Tallis_crop.png",
    bio: `Thomas Tallis was an English composer who masterfully navigated the turbulent religious changes of Tudor England, serving under four monarchs (Henry VIII, Edward VI, Mary I, and Elizabeth I) while adapting his compositional style to their varying religious policies. Beginning as organist at Dover Priory, Tallis later held positions at Waltham Abbey, Canterbury Cathedral, and ultimately became a Gentleman of the Chapel Royal. His remarkable ability to compose effectively in both Catholic and Protestant styles—from elaborate Continental polyphony to austere English-texted anthems—made him indispensable to the English court despite the religious upheavals of the time. Tallis's landmark compositions include the 40-voice motet "Spem in alium," considered one of the greatest achievements of Renaissance polyphony; the dramatic "Lamentations of Jeremiah"; and the concise "If ye love me," a perfect example of English Protestant simplicity. In 1575, Queen Elizabeth granted Tallis and his pupil William Byrd a monopoly on music printing in England, resulting in their joint publication "Cantiones Sacrae." Tallis's innovative use of harmony, particularly false relations and unexpected cadences, created a distinctive "English" sound that influenced generations of composers. His experimentations with texture and mood established foundations for the English choral tradition that continues to this day. As a composer, teacher, businessman, and royal servant, Tallis stands as a towering figure in Tudor music, successfully balancing artistic integrity with political survival.`
  },
  "lasso": {
    name: "Orlando di Lasso",
    years: "1532-1594",
    image: "composerPics/Orlande_de_Lassus.jpg",
    bio: `Orlando di Lasso (also Orlande de Lassus or Roland de Lassus) was a Franco-Flemish composer who became one of the most versatile, prolific, and internationally influential musicians of the late Renaissance. Born in Mons (modern Belgium), Lasso's remarkable musical abilities reportedly led to his kidnapping as a boy to serve in a choir. After early travels throughout Italy and France, he settled in Munich in 1556, serving the Bavarian court of Duke Albrecht V and later Wilhelm V for nearly four decades. His cosmopolitan career resulted in an extraordinary output of over 2,000 works in virtually every genre of his time, including masses, motets, magnificats, madrigals, chansons, lieder, and psalm settings in multiple languages. Lasso's compositional style uniquely synthesized influences from across Europe, combining Franco-Flemish contrapuntal techniques with Italian expressivity and German text sensitivity. His secular works display vivid text painting and often humorous characterization, while his sacred music ranges from penitential severity to ecstatic expressiveness. The "Lagrime di San Pietro" (Tears of St. Peter), completed just weeks before his death, represents his spiritual and technical culmination. Contemporary accounts describe Lasso as witty, sociable, and multilingual, contributing to his legendary status across Europe, where he was known as the "prince of musicians." His psychological depth in expressing textual meaning, harmonic adventurousness, and ability to compose in different national styles made him one of the most published composers of his era and established him as a defining figure of Renaissance music.`
  },
  "byrd": {
    name: "William Byrd",
    years: "c.1540-1623",
    image: "composerPics/William_Byrd_(1543-1623).jpg",
    bio: `William Byrd stands as the foremost English composer of the Renaissance, whose remarkable longevity and adaptability allowed him to master virtually every musical form of his era. Born in Lincolnshire, Byrd studied under Thomas Tallis before assuming positions as organist and choirmaster at Lincoln Cathedral and later the Chapel Royal. A devout Catholic in Protestant England, Byrd navigated the dangerous religious tensions of Elizabethan and Jacobean society while maintaining royal favor—Queen Elizabeth I granted him and Tallis a monopoly on music printing in 1575. Byrd's compositional range was extraordinary: his three settings of the Latin Mass (for three, four, and five voices) represent the height of English Catholic music; his Anglican service music established standards for the English church; his Latin motets, especially those published in the "Cantiones Sacrae" collections, display intense emotional and spiritual depth; while his secular output includes over 100 works for voice and for virginals (keyboard). His contribution to instrumental music was equally significant, helping establish the English traditions of consort music, variations, and keyboard writing. His keyboard works in "My Ladye Nevells Booke" and the "Fitzwilliam Virginal Book" showcase his virtuosic command of variation technique. Byrd's contrapuntal mastery was matched by his gift for melodic expressiveness and his innovative harmonic language, which often employed dissonance for emotional effect. Living to the age of 83, Byrd's long career bridged late Renaissance and early Baroque styles, profoundly influencing English music for generations.`
  },
  "monteverdi": {
    name: "Claudio Monteverdi",
    years: "1567-1643",
    image: "composerPics/Monteverdi.jpg",
    bio: `Claudio Monteverdi was an Italian composer who stands as the most crucial transitional figure between the Renaissance and Baroque eras in Western music. Born in Cremona, he began his professional career at the court of Mantua, where he served for over 20 years before becoming maestro di cappella at St. Mark's Basilica in Venice in 1613, a prestigious position he held until his death. Monteverdi's revolutionary approach to music is encapsulated in his concept of the seconda pratica (second practice), which prioritized text expression over traditional contrapuntal rules. This new aesthetic was outlined in his response to critic Giovanni Artusi, where he defended his unconventional treatment of dissonance in service of emotional expression. His nine books of madrigals document his stylistic evolution from Renaissance polyphony to dramatic Baroque monody with basso continuo. Monteverdi's surviving operas—"L'Orfeo" (1607), "Il ritorno d'Ulisse in patria" (1640), and "L'incoronazione di Poppea" (1643)—represent the first masterpieces of the genre, establishing the dramatic and musical conventions that would define opera for centuries. His sacred music, particularly the 1610 "Vespers of the Blessed Virgin," demonstrates his ability to combine the old polyphonic style (stile antico) with the new dramatic techniques. Monteverdi expanded orchestration and pioneered new instrumental effects like pizzicato and tremolo. His conception of music as dramatic expression through the affetti (emotional states) fundamentally changed Western music, establishing the rhetorical and theatrical approach that would characterize the Baroque era. Monteverdi's fusion of intellectual depth with visceral emotional power makes him one of music's true revolutionaries.`
  },
  "purcell": {
    name: "Henry Purcell",
    years: "1659-1695",
    image: "composerPics/Henry_Purcell_Closterman.jpg",
    bio: `Henry Purcell, despite his tragically short life, is widely regarded as the greatest English composer before the 20th century. Born in Westminster, London, Purcell received his musical training as a chorister in the Chapel Royal and later became organist at Westminster Abbey. He served three successive Stuart monarchs—Charles II, James II, and William and Mary—as composer for the court's violins and organist of the Chapel Royal. Purcell's compositional output spans virtually every genre of his time, including the semi-opera "Dido and Aeneas" (c.1688), considered his masterpiece and the first great English opera. His other dramatic works, like "King Arthur" and "The Fairy Queen," feature innovative incidental music and masque scenes. His instrumental compositions include fantasias for viol consort, keyboard works, and sonatas that blend Continental influences (particularly Italian and French) with distinctly English elements. Purcell's sacred music encompasses full anthems, verse anthems, services, and odes for royal occasions like "Come ye Sons of Art." His secular songs, published posthumously in "Orpheus Britannicus," showcase his extraordinary gift for text-setting in English. Purcell's compositional style features distinctive chromatic harmony, supple melodic lines that perfectly accommodate English prosody, innovative ground bass techniques, and a remarkable ability to express profound emotion within compact forms. His music combines technical sophistication with immediate expressivity and often displays a characteristically English melancholy. Though he died at just 35 (possibly from pneumonia), Purcell's influence on English music was profound and long-lasting, with Benjamin Britten and others centuries later acknowledging their debt to his uniquely English musical voice.`
  },
  "handel": {
    name: "George Frideric Handel",
    years: "1685-1759",
    image: "composerPics/Handel.jpg",
    bio: `George Frideric Handel was a German-born composer who became a naturalized British citizen and developed into one of the most cosmopolitan, entrepreneurial, and influential composers of the late Baroque period. Born in Halle the same year as J.S. Bach, Handel studied briefly in Italy before settling permanently in London in 1712, where he found favor with the British monarchy and aristocracy. His operatic career began with "Rinaldo" (1711), the first Italian opera specifically composed for London, and continued with approximately 40 operas including masterpieces like "Giulio Cesare," "Rodelinda," and "Alcina" that combined virtuosic vocal writing with psychological insight. When Italian opera fell from London's favor, Handel innovatively developed the English oratorio, a genre that maintained theatrical drama without staging costs. His oratorio "Messiah" (1741), composed in just 24 days, became one of Western music's most enduring works, though it was only one among many successful oratorios including "Israel in Egypt," "Saul," and "Judas Maccabaeus." Handel's instrumental output includes the famous "Water Music" and "Music for the Royal Fireworks," organ concertos (which he often performed during oratorio intermissions), and numerous concerti grossi. Despite suffering a stroke and later blindness, Handel remained active until his death, after which he received the honor of burial in Westminster Abbey. His compositional style combined German contrapuntal solidity, Italian melodic grace, and French rhythmic vitality with an English choral tradition, all inflected by his genius for dramatic pacing and memorable melody. Known for his quick composition, adaptive business sense, and philanthropic activities (particularly supporting London's Foundling Hospital), Handel created music of tremendous emotional range that has maintained uninterrupted popularity for nearly three centuries.`
  },
  "bach": {
    name: "Johann Sebastian Bach",
    years: "1685-1750",
    image: "composerPics/Bach.jpg",
    bio: `Johann Sebastian Bach, born in Eisenach, Germany, is revered as one of the greatest musical geniuses in Western history and the culminating figure of the Baroque era. From a family of musicians spanning generations, Bach held positions as organist, concertmaster, and cantor throughout central Germany, most notably serving as Thomaskantor in Leipzig from 1723 until his death. Though primarily employed to compose church music, Bach's vast output of over 1,100 surviving works encompasses virtually every Baroque form except opera: sacred cantatas (approximately 200 survive of an estimated 300), Passions (including the monumental St. Matthew and St. John Passions), the Mass in B Minor, organ works, harpsichord pieces (including the Well-Tempered Clavier, Goldberg Variations, and Italian Concerto), orchestral suites, concertos (including the Brandenburg Concertos), and chamber music. Bach's compositional style represents the pinnacle of contrapuntal writing, combining rigorous German technique with melodic influences from Italian and French music. His ability to create complex structures while maintaining expressive clarity resulted in works of unparalleled intellectual depth and emotional power. Though he was better known in his lifetime as an organist than composer and his music was considered old-fashioned by his sons' generation, the 19th-century "Bach Revival" beginning with Mendelssohn's 1829 performance of the St. Matthew Passion led to the recognition of Bach's profound importance. His systematic exploration of harmony, counterpoint, and form became foundational for Western musical development, with musicians from Mozart and Beethoven to Schumann, Brahms, and Stravinsky acknowledging their debt to his work. Beyond his musical achievements, Bach fathered 20 children, including composers Wilhelm Friedemann, Carl Philipp Emanuel, and Johann Christian Bach, extending his musical legacy through multiple generations.`
  },
  "vivaldi": {
    name: "Antonio Vivaldi",
    years: "1678-1741",
    image: "composerPics/Vivaldi.jpg",
    bio: `Antonio Vivaldi, nicknamed "The Red Priest" for his red hair and clerical status, was an Italian composer, virtuoso violinist, teacher, and impresario who became one of the most innovative and influential composers of the late Baroque period. Born in Venice, Vivaldi was ordained as a priest in 1703 but was soon excused from active priestly duties due to his asthma (though he continued to say Mass privately). That same year, he began his four-decade association with the Ospedale della Pietà, a Venetian institution for orphaned and abandoned girls, where he taught violin and composed hundreds of works for the institution's renowned all-female orchestra and choir. Vivaldi's approximately 500 concertos (including 230 for violin) revolutionized the genre, establishing the fast-slow-fast three-movement structure and developing ritornello form, where orchestral sections alternate with virtuosic solo passages. His most famous work, "The Four Seasons," exemplifies his programmatic approach, translating visual images and natural phenomena into musical effects with remarkable specificity. Beyond concertos, Vivaldi composed sacred music (including the Gloria RV 589), chamber works, and approximately 50 operas that he often produced himself as an entrepreneurial impresario. His music is characterized by rhythmic energy, striking thematic material, bold harmonies, and innovative string techniques. Though immensely successful in his early career, Vivaldi died in poverty in Vienna while seeking imperial patronage. His music fell into obscurity after his death until the early 20th century, when the rediscovery of his manuscripts sparked a major revival. Vivaldi's clear formal structures and idiomatic instrumental writing influenced composers across Europe, including J.S. Bach, who transcribed several of Vivaldi's concertos. His contributions to instrumental color, virtuosic technique, and programmatic expression make him one of the most distinctive and vital composers of his era.`
  },
  "mozart": {
    name: "Wolfgang Amadeus Mozart",
    years: "1756-1791",
    image: "composerPics/Mozart.jpg",
    bio: `Wolfgang Amadeus Mozart was an Austrian composer whose prodigious talent, prolific output, and profound musical innovations have established him as the quintessential classical composer and one of music history's towering geniuses. Born in Salzburg, Mozart displayed extraordinary musical abilities from earliest childhood, performing as a keyboard and violin virtuoso throughout Europe from age six and composing his first symphonies at eight. After years of European tours with his father Leopold, Mozart worked under the Archbishop of Salzburg before settling in Vienna in 1781 as a freelance composer, performer, and teacher. Despite financial instability and his early death at 35, Mozart's output encompasses over 600 works of remarkable quality across every contemporary genre: approximately 41 symphonies, 27 piano concertos, 23 string quartets, 35 violin sonatas, 18 masses, and 22 operas—including his crowning operatic achievements "The Marriage of Figaro," "Don Giovanni," "Così fan tutte," and "The Magic Flute." The unfinished Requiem, commissioned anonymously, became his final composition. Mozart's musical style represents the height of Classical period aesthetics, combining pristine formal architecture with profound emotional depth. His music features graceful, perfectly proportioned melodies; sophisticated yet transparent textures; seamless modulations; and an unmatched gift for operatic characterization through music. While embracing the balanced structures of the Classical era, Mozart infused them with chromatic harmonic subtleties, contrapuntal complexity (influenced by his study of Bach), and an extraordinary range of expression from comic effervescence to tragic intensity. Despite persistent myths about his poverty and the circumstances of his burial, historical research has clarified that Mozart lived a socially connected, professionally active life in Vienna until his final illness, likely rheumatic fever. His ability to create works of both immediate appeal and inexhaustible complexity ensures that his music remains both universally beloved and endlessly studied.`
  },
  "haydn": {
    name: "Joseph Haydn",
    years: "1732-1809",
    image: "composerPics/Haydn.jpg",
    bio: `Joseph Haydn, often called the "Father of the Symphony" and "Father of the String Quartet," was an Austrian composer whose long, productive career proved foundational for the Classical style and its most important forms. Born to humble parents in the village of Rohrau, Haydn received his musical training as a choirboy at St. Stephen's Cathedral in Vienna. After years of struggle as a freelance musician, in 1761 he began his nearly three-decade employment with the wealthy Hungarian Esterházy family, where he directed a private orchestra and opera company, composing prolifically for both. This relatively isolated position, which Haydn described as forcing him to "become original," provided ideal circumstances for musical experimentation. Following Prince Nikolaus Esterházy's death in 1790, Haydn gained new freedom, making two triumphant visits to London where he composed his final twelve "London" symphonies. Haydn's vast output includes 104 authenticated symphonies, in which he developed the four-movement structure and sophisticated thematic development that defined the genre; 68 string quartets that transformed chamber music from light entertainment to profound artistic expression; numerous piano sonatas and trios; concertos; masses; oratorios including "The Creation" and "The Seasons"; and 14 operas. His compositional style combines clarity of structure with endless inventiveness, often incorporating folk elements and displaying a characteristic wit with unexpected pauses, sudden dynamic contrasts, and musical jokes. Haydn's innovations in sonata form, thematic development, and dramatic use of key relationships established procedures that Mozart refined and Beethoven expanded. Despite his international fame and artistic accomplishments, contemporaries described Haydn as modest, good-humored, and devoutly religious. His musical influence extended directly through his teaching of Beethoven and indirectly through his codification of Classical forms that would govern Western art music for generations. Haydn's remarkable musical legacy combines formal mastery with emotional depth and an irrepressible creative spirit.`
  },
  "beethoven": {
    name: "Ludwig van Beethoven",
    years: "1770-1827",
    image: "composerPics/Beethoven.jpg",
    bio: `Ludwig van Beethoven was a German composer and pianist whose revolutionary compositions bridged the Classical and Romantic eras while profoundly expanding music's emotional and structural possibilities. Born in Bonn to a musical family, Beethoven received early training from his alcoholic father before studying briefly with Mozart and later Haydn in Vienna, where he settled permanently in 1792. He quickly established himself as a keyboard virtuoso and innovative composer, gaining aristocratic patronage and public acclaim. Beethoven's career is traditionally divided into three periods: the early period (to c.1802) showing Classical influences from Mozart and Haydn while developing his own voice; the heroic middle period (c.1803-1814) featuring works of unprecedented scale, energy, and emotional intensity; and the visionary late period (c.1815-1827) characterized by highly personal, introspective works of profound spiritual depth and formal innovation. His compositional output includes nine symphonies that transformed the genre, notably the revolutionary "Eroica" Symphony (No. 3), the victory-themed Fifth Symphony with its iconic opening motif, and the choral Ninth Symphony with its "Ode to Joy"; 32 piano sonatas that collectively document his stylistic evolution; 16 string quartets, including the forward-looking late quartets that perplexed contemporaries but influenced composers for generations; the opera "Fidelio"; numerous concertos, overtures, chamber works, songs, and the monumental "Missa Solemnis." Beethoven's progressive hearing loss, beginning in his late twenties and leading to total deafness by 1818, adds a profoundly poignant dimension to his biography, as his greatest works were composed without the ability to hear them performed. His compositional innovations include expanded harmonic language, unprecedented dynamic range, motivic development (building large structures from compact musical ideas), and a new conception of music as personal expression and philosophical statement. His sketches reveal his painstaking compositional process, constantly revising toward an ideal. Beyond his musical achievements, Beethoven embodied the Romantic image of the artist as hero—independent, struggling against fate, creating deeply personal work that transcended social convention—thereby establishing a model of artistic identity that influenced generations of artists across all media.`
  },
  "schubert": {
    name: "Franz Schubert",
    years: "1797-1828",
    image: "composerPics/Schubert.jpg",
    bio: `Franz Schubert was an Austrian composer whose short life yielded an astonishing body of work that bridged Classical forms and Romantic expression, establishing him as the first true master of the German Lied (art song) and an innovative instrumental composer. Born in Vienna to a schoolteacher father, Schubert displayed remarkable musical gifts from childhood, earning a position in the imperial court chapel choir and studying composition with Antonio Salieri. Despite his prodigious output and the admiration of a close circle of friends, Schubert achieved limited public recognition during his lifetime, publishing relatively few works and never securing a significant musical position. He lived modestly, often dependent on friends, and died at just 31, possibly from complications of syphilis or typhoid fever. Schubert's approximately 600 Lieder represent his most influential contribution, transforming the art song from a minor genre into a profound medium of poetic expression. Songs like "Erlkönig," "Gretchen am Spinnrade," and the cycles "Die schöne Müllerin" and "Winterreise" feature sophisticated piano accompaniments that function as equal partners to the voice, with harmony and texture directly expressing the text's psychological and dramatic content. His instrumental works include nine symphonies—notably the "Unfinished" Symphony No. 8 and the majestic "Great" Symphony No. 9; fifteen string quartets, including the intense D minor "Death and the Maiden"; the "Trout" Piano Quintet; numerous piano sonatas and shorter piano pieces like the Impromptus and Moments Musicaux; and a vast quantity of dance music, much for piano four-hands. Schubert's distinctive compositional style features soaring lyricism, innovative harmonic shifts (including his signature modulations to unexpected keys), introspective expression, and a masterful balance of Classical structure with emotional immediacy. Though working contemporaneously with Beethoven in Vienna, Schubert developed an entirely individual musical language characterized by songful melodic invention and an uncanny ability to shift between major and minor modes to create nuanced emotional effects. Despite his early death, Schubert's prolific output contains some of the most beloved works in the Western canon, with a singing quality that earned him the nickname "the most poetic musician who ever lived."`
  },
  "chopin": {
    name: "Frédéric Chopin",
    years: "1810-1849",
    image: "composerPics/Chopin.jpeg",
    bio: `Frédéric Chopin was a Polish composer and virtuoso pianist of the Romantic era whose poetic genius transformed piano music through unprecedented levels of technical refinement, harmonic sophistication, and emotional nuance. Born near Warsaw to a French father and Polish mother, Chopin displayed extraordinary musical talent from earliest childhood. After initial success in Warsaw and Vienna, he settled in Paris in 1831 following the suppression of the Polish November Uprising, never to return to his homeland despite his deep Polish identity. In Paris, Chopin established himself as an elite teacher and salon performer rather than a concertizing virtuoso, charging high fees for lessons sought by aristocrats and fellow musicians. His circle included major cultural figures like Franz Liszt, Eugène Delacroix, and his nine-year romantic partner, the novelist George Sand (Aurore Dudevant). Chopin composed almost exclusively for solo piano, with rare exceptions like his two piano concertos and a few chamber works. His approximately 230 surviving compositions include 21 nocturnes that advanced this form to new levels of introspective lyricism; 27 études that fused technical challenges with musical poetry; 24 preludes that explored diverse emotional states in miniature form; 58 mazurkas and 17 polonaises that elevated Polish dance forms to sophisticated concert works; 20 waltzes that transcended their dance origins; four ballades and four scherzos that expanded single-movement structures to accommodate narrative-like drama; and three piano sonatas. Chopin's distinctive compositional style features ornate, vocally-inspired melody lines; innovative chromatic harmony; nuanced tempo flexibility (rubato); and layered textures that exploit the full coloristic potential of the piano. His meticulously notated works require technical mastery yet demand interpretive flexibility. Despite chronic health problems (likely tuberculosis) leading to his early death at 39, Chopin's compositions permanently expanded the piano's expressive and technical vocabulary, influencing generations of composers from Debussy to Scriabin while establishing the instrument's central place in 19th-century musical culture. As both composer and performer, Chopin embodied the Romantic ideal of poetic expression, creating works of extraordinary sensitivity, refinement, and originality.`
  },
  "mendelssohn": {
    name: "Felix Mendelssohn",
    years: "1809-1847",
    image: "composerPics/Mendelssohn.jpg",
    bio: `Felix Mendelssohn was a German composer, pianist, organist, and conductor whose remarkable gifts produced a significant body of work that balanced Romantic expressiveness with Classical clarity and formal mastery. Born into a wealthy, culturally sophisticated Jewish family (later converted to Lutheranism), Mendelssohn was recognized as a prodigy comparable to Mozart. His artistic education was complemented by extensive general studies and European travels documented in his skilled drawings and watercolors. At 17, he composed his Overture to "A Midsummer Night's Dream," a work of astonishing maturity later expanded into a complete incidental score. Mendelssohn's achievements included conducting the 1829 Berlin performance of Bach's St. Matthew Passion, which revitalized interest in Bach's music; founding the Leipzig Conservatory; and serving as music director of the renowned Gewandhaus Orchestra, helping establish the modern conducting tradition. His major compositions include five symphonies, notably the "Scottish" (No. 3) and "Italian" (No. 4); the violin concerto in E minor, which remains one of the most performed concertos in the repertoire; two piano concertos; the oratorios "St. Paul" and "Elijah"; chamber music including the Octet composed at age 16; and numerous piano works like the "Songs Without Words," which established a new genre of expressive character pieces. Mendelssohn's compositional style combines melodic grace, contrapuntal skill derived from his Bach studies, orchestral color, and structural balance. Though critics sometimes characterized his music as too polished or conservative compared to more overtly revolutionary contemporaries, his synthesis of Baroque contrapuntal techniques, Classical forms, and Romantic expression created a distinctive voice that influenced the development of German Romanticism. His exhausting schedule of conducting, performing, composing, and administration likely contributed to his early death at 38, cutting short a career of remarkable accomplishment.`
  },
  "liszt": {
    name: "Franz Liszt",
    years: "1811-1886",
    image: "composerPics/Liszt.jpg",
    bio: `Franz Liszt was a Hungarian-born composer, pianist, conductor, and teacher whose revolutionary approach to piano technique, innovative compositional forms, and magnetic personality made him the quintessential Romantic artist and arguably the greatest piano virtuoso in history. Born in the Kingdom of Hungary (now part of Austria), Liszt received early piano training from his father before studying in Vienna and Paris. His career was catalyzed in 1831 when he heard Paganini perform, inspiring Liszt to develop a comparable transcendent virtuosity on the piano. From 1839-1847, he undertook a performing career of unprecedented success, creating the modern piano recital (a term he coined) and driving audiences to such heights of enthusiasm that the phenomenon was dubbed "Lisztomania." In 1848, he settled in Weimar as court Kapellmeister, focusing on composing, conducting, and championing progressive composers like Wagner and Berlioz through performances and essays. His final years were divided between Rome, Weimar, and Budapest, where he helped establish the Hungarian Academy of Music. Liszt took minor religious orders in 1865, becoming known as the Abbé Liszt. His vast compositional output includes pioneering orchestral works like the "Faust" and "Dante" symphonies and 13 symphonic poems that established this programmatic genre; sacred works including the innovative oratorio "Christus"; songs and choral pieces; and an enormous body of piano music spanning approximately 700 compositions. These include the groundbreaking Sonata in B minor; the technically demanding "Transcendental Etudes"; the evocative "Years of Pilgrimage" suites inspired by literature and visual art; "Hungarian Rhapsodies" incorporating Romani musical elements; and approximately 200 transcriptions of orchestral works, operas, and songs by other composers. Liszt's compositional innovations included thematic transformation (developing and metamorphosing themes throughout multi-movement works), experiments with unconventional harmony that anticipated 20th-century developments, and new approaches to musical structure driven by literary or pictorial content. As a teacher, he mentored countless pianists in his free master classes, revolutionizing piano pedagogy. His multifaceted musical personality—combining showmanship, spiritual depth, technical innovation, and artistic foresight—made him one of the 19th century's most influential musical figures.`
  },
  "wagner": {
    name: "Richard Wagner",
    years: "1813-1883",
    image: "composerPics/Wagner.jpg",
    bio: `Richard Wagner was a German composer, conductor, theater director, and polemicist whose revolutionary operas and aesthetic theories transformed musical drama and profoundly influenced Western music, literature, philosophy, and politics. Born in Leipzig, Wagner developed his theatrical and musical interests largely through self-study. After early conducting positions and initial operas, he was forced to flee Germany following his participation in the failed Dresden uprising of 1849. During his Swiss exile, Wagner articulated his ambitious artistic vision in influential essays including "The Artwork of the Future" and "Opera and Drama," while beginning composition of his monumental four-opera cycle "Der Ring des Nibelungen" (The Ring of the Nibelung). With the patronage of Bavaria's King Ludwig II beginning in 1864, Wagner realized his concept of the Gesamtkunstwerk (total artwork) that synthesized music, poetry, drama, visual arts, and stagecraft. This culminated in the construction of the Bayreuth Festspielhaus, a theater designed specifically for his works, which opened in 1876 with the complete Ring cycle. Wagner's major operas include "The Flying Dutchman," "Tannhäuser," and "Lohengrin" from his middle period; and his mature music dramas: "Tristan und Isolde," which pushed tonal harmony to its limits through its famous "Tristan chord" and influenced composers for generations; "Die Meistersinger von Nürnberg," his only comedy; the four operas of the approximately 15-hour Ring cycle ("Das Rheingold," "Die Walküre," "Siegfried," and "Götterdämmerung"); and his final work, the sacred festival play "Parsifal." Wagner's compositional innovations included the extensive use of leitmotifs (recurring musical themes associated with characters, objects, or ideas); continuous musical development without traditional aria/recitative divisions; expanded chromaticism that stretched tonal boundaries; and massive orchestral forces with innovative instrumentation. Beyond his musical achievements, Wagner remains a controversial figure for his virulent antisemitism expressed in essays like "Judaism in Music" and his appropriation by Nazi Germany decades after his death. His complex legacy encompasses both his revolutionary artistic achievements and the problematic aspects of his ideology, making him one of music history's most polarizing yet undeniably influential figures.`
  },
  "verdi": {
    name: "Giuseppe Verdi",
    years: "1813-1901",
    image: "composerPics/Verdi.jpg",
    bio: `Giuseppe Verdi was an Italian composer whose 26 operas revolutionized the genre through their dramatic power, memorable melodies, and psychological insight, making him the preeminent Italian composer of the 19th century and a symbol of Italian unification. Born to a family of modest means in the small village of Le Roncole near Busseto, Verdi overcame early rejections from the Milan Conservatory to achieve his first success with the biblical drama "Nabucco" (1842), whose chorus "Va, pensiero" became an unofficial Italian national anthem. After early personal tragedies including the deaths of his first wife and two young children, Verdi entered his productive "galley years," composing 14 operas in eight years, including increasingly accomplished works like "Ernani," "Macbeth," and "Luisa Miller." His three middle-period masterpieces—"Rigoletto," "Il trovatore," and "La traviata"—premiered within a two-year span (1851-1853) and remain among the world's most performed operas. Verdi's later works show increasing musical sophistication and dramatic depth, including "Un ballo in maschera," "La forza del destino," "Don Carlos," and "Aida," commissioned for the opening of the Cairo Opera House. After an apparent retirement, Verdi collaborated with librettist Arrigo Boito on his final two masterpieces: "Otello," which many consider the finest Italian opera ever composed, and the comic "Falstaff," completed when he was 80. Beyond operas, Verdi composed his powerful Requiem Mass, the "Quattro pezzi sacri" (Four Sacred Pieces), and a small body of instrumental works. Verdi's compositional style evolved from the bel canto tradition to a more through-composed approach, but always maintained his distinctive musical language characterized by sweeping melodies, rhythmic vitality, and an unerring sense of drama. His development of ensembles that combined musical complexity with dramatic momentum, his psychological portrayal of characters through music, and his fusion of vocal beauty with dramatic truth fundamentally transformed Italian opera. As a cultural figure, Verdi acquired political significance during Italy's Risorgimento (unification movement), with his very name becoming an acronym for the movement (Vittorio Emanuele Re D'Italia). His state funeral in Milan drew 300,000 mourners, and his enduring popularity demonstrates his unique achievement in creating works that combine artistic sophistication with powerful emotional directness.`
  },
  "tchaikovsky": {
    name: "Pyotr Illyich Tchaikovsky",
    years: "1840-1893",
    image: "composerPics/Tchaikovsky.jpg",
    bio: `Pyotr Ilyich Tchaikovsky was a Russian composer whose emotionally expressive music bridged Western European traditions and Russian nationalist elements, creating some of the most popular works in the classical repertoire. Born to a middle-class family in Votkinsk, Tchaikovsky initially pursued a career in civil service before entering the newly established St. Petersburg Conservatory at age 22. Despite criticism from Russian nationalist composers (the "Mighty Five") who viewed his conservatory training as too Western, Tchaikovsky developed a distinctively Russian yet cosmopolitan style. His professional life was punctuated by personal crises, including his disastrous 1877 marriage to Antonina Milyukova, which lasted only weeks before a nervous breakdown led him to attempt suicide. That same year began his unusual 14-year relationship with his patroness, Nadezhda von Meck, who supported him financially with the stipulation that they never meet. Tchaikovsky's major works include six numbered symphonies, notably the fatalistic Symphony No. 4, the popular Symphony No. 5, and the autobiographical "Pathétique" Symphony No. 6, completed just days before his death; the enduringly popular ballets "Swan Lake," "The Sleeping Beauty," and "The Nutcracker"; the Piano Concerto No. 1 and Violin Concerto; ten operas including "Eugene Onegin" and "The Queen of Spades"; orchestral fantasies like "Romeo and Juliet" and "Francesca da Rimini"; the "1812 Overture"; and numerous chamber works, piano pieces, and songs. Tchaikovsky's compositional style combines soaring melodies, luxurious orchestration, rhythmic vitality, and intense emotional expression ranging from melancholy to exuberance. His symphonic works often explore existential themes of fate and mortality, while his ballets revolutionized the genre with their symphonic approach and psychological depth. Though personally tormented by his homosexuality in a repressive society and prone to depression, Tchaikovsky found international success, including an American tour where he conducted at the opening of New York's Carnegie Hall. His sudden death at 53, officially attributed to cholera but surrounded by theories of suicide or enforced suicide, cut short a career that had established him as Russia's greatest composer and one of music's most beloved melodists. Tchaikovsky's music, with its unique combination of technical mastery, emotional directness, and distinctive Russian character, continues to maintain an exceptional place in the standard repertoire.`
  },
  "brahms": {
    name: "Johannes Brahms",
    years: "1833-1897",
    image: "composerPics/Brahms.jpg",
    bio: `Johannes Brahms was a German composer and pianist whose works synthesized Classical formal principles with Romantic expressiveness, establishing him as one of the most significant and influential composers of the 19th century and a pillar of the Central European tradition. Born in Hamburg to a double bassist father and a seamstress mother, Brahms supplemented the family's modest income by playing piano in dance halls and theaters from his early teens. His career was launched when violinist Joseph Joachim introduced him to Robert and Clara Schumann, with Robert's enthusiastic article "New Paths" proclaiming the 20-year-old Brahms a genius. Following Robert's mental collapse and death, Brahms maintained a close, complex relationship with Clara Schumann throughout his life. After appointments in Detmold and Hamburg, Brahms settled permanently in Vienna in 1869, where his works achieved increasing recognition despite his rivalry with Wagner and the "New German School." Brahms's carefully crafted compositional output includes four symphonies, completed only after years of preparation due to the intimidating precedent of Beethoven; two piano concertos that expanded the scale and technical demands of the genre; the dramatic "German Requiem" based on biblical texts rather than the Latin liturgy; the elegiac Violin Concerto written for Joseph Joachim; chamber works of extraordinary quality including three string quartets, three piano quartets, the Piano Quintet, the Clarinet Quintet, and sonatas for various instruments; approximately 200 songs; and numerous piano works ranging from the virtuosic early sonatas to the introspective late Intermezzi. Despite his popular image as a bearded, conservative traditionalist, Brahms was an innovative composer who developed "developing variation" techniques that transformed his thematic material through subtle motivic manipulation, creating dense, intricate musical structures of great organic unity. Brahms also frequently employed rhythmic complexity, including hemiola, cross-rhythms, and irregular groupings, that added sophisticated tension to his music. His harmonic language, while rooted in tonality, featured rich chromatic inflections and creative voice leading. Personally, Brahms cultivated a gruff exterior that masked a generous, complex personality; he never married despite several attachments to women, lived modestly despite his success, and was known for supporting young musicians and anonymously helping those in need. As both a preserver of Classical traditions and an innovator within them, Brahms created a body of work that balances intellectual rigor, technical mastery, and profound emotional depth.`
  },
  "dvorak": {
    name: "Antonín Dvořák",
    years: "1841-1904",
    image: "composerPics/Dvorak.jpg",
    bio: `Antonín Dvořák was a Czech composer who synthesized folk elements from his native Bohemia with Classical forms, creating distinctively national music that achieved international success and influenced the development of musical nationalism worldwide. Born in a village near Prague to a butcher and innkeeper father, Dvořák received his early musical training in organ, violin, and viola before studying at the Prague Organ School. After years playing viola in the Prague Provisional Theatre Orchestra under Bedřich Smetana, Dvořák gradually established himself as a composer, receiving crucial early support from Johannes Brahms, who recommended him to his own publisher, Simrock. International recognition followed, particularly in England where his choral works were enthusiastically received. From 1892 to 1895, Dvořák served as director of the National Conservatory of Music in New York, where he encouraged American composers to develop their own national style based on indigenous materials—advice he followed himself in works composed in America. Dvořák's major compositions include nine symphonies, notably the popular Symphony No. 9 "From the New World," which incorporated influences from African American spirituals and Native American themes; ten operas including the folk-based "Rusalka" with its famous "Song to the Moon"; the Cello Concerto, considered the greatest concerto for the instrument; the "American" String Quartet and "Dumky" Piano Trio; Slavonic Dances for piano four-hands and orchestra; the Stabat Mater and Requiem; and numerous other chamber, orchestral, and vocal works. Dvořák's compositional style combines formal mastery derived from his study of Classical models with melodic richness, colorful orchestration, and rhythmic vitality often inspired by Czech folk music. While not directly quoting folk material, he absorbed its characteristic intervals, rhythms, and structures into his musical language. A dedicated teacher, Dvořák trained many important Czech composers as professor and later director at the Prague Conservatory. Personally modest despite his international fame, Dvořák maintained his connections to rural Czech life, spending summers in the village of Vysoká where he indulged his passions for raising pigeons, trains, and steamships. As both a Czech nationalist and a cosmopolitan figure, Dvořák created music that successfully balanced folk-inspired elements with sophisticated compositional techniques, establishing a model for other composers seeking to express national identity through classical forms.`
  },
  "mahler": {
    name: "Gustav Mahler",
    years: "1860-1911",
    image: "composerPics/Mahler.jpg",
    bio: `Gustav Mahler was an Austrian composer and conductor whose expansive, emotionally intense symphonies bridged late Romanticism and modernism, creating a unique musical world that explored profound existential questions through monumental orchestral works. Born to a Jewish family in Bohemia (then part of the Austrian Empire), Mahler studied at the Vienna Conservatory before embarking on a conducting career that took him to increasingly prestigious posts, culminating in his directorship of the Vienna Court Opera (1897-1907), where his exacting standards and innovative productions revolutionized operatic performance. His final conducting positions were at the Metropolitan Opera and the New York Philharmonic, where he continued his interpretive innovations. Because his demanding conducting schedule limited composition to summer vacations, Mahler created relatively few works, but of extraordinary scale and ambition: nine completed symphonies plus the unfinished Tenth; "Das Lied von der Erde" (The Song of the Earth), a symphony in all but name; and approximately 50 songs, many of which provided thematic material for his symphonies. Mahler's symphonies expanded the genre's boundaries in every dimension—length, orchestral forces, emotional range, and philosophical scope. They integrate vocal elements (soloists and choruses appear in the Second, Third, Fourth, and Eighth Symphonies), folk-inspired materials, funeral marches, nature sounds, and references to music from dance halls to military bands in a complex, often ironic musical discourse. The massive Eighth Symphony ("Symphony of a Thousand") requires enormous performing forces, while "Das Lied von der Erde" meditates on mortality through Chinese poetry in a more intimate framework. His final completed work, the Ninth Symphony, is widely viewed as his farewell to life. Mahler's musical language features extreme contrasts of mood, complex contrapuntal textures, innovative orchestration, and an expanded harmonic palette that pushes at the boundaries of tonality. His works often juxtapose the sublime and the banal, the tragic and the ironic, creating a multifaceted sound world of extraordinary psychological complexity. Though Mahler faced antisemitism throughout his career (converting to Catholicism to secure the Vienna position) and his music was initially controversial, his symphonies gained increasing acceptance after World War II through advocates like Leonard Bernstein. His later works, particularly the Ninth Symphony and the unfinished Tenth, anticipate 20th-century developments in their dissonance and formal innovation. Mahler's marriage to Alma Schindler, 19 years his junior, brought both inspiration and turmoil, particularly after her affair with architect Walter Gropius. His famous comment to Sibelius that "the symphony must be like the world—it must embrace everything" encapsulates his expansive vision that created one of the most powerful and distinctive bodies of work in symphonic literature.`
  },
  "strauss": {
    name: "Richard Strauss",
    years: "1864-1949",
    image: "composerPics/Strauss.jpg",
    bio: `Richard Strauss was a German composer and conductor who pushed late Romantic orchestral writing to its expressive and technical limits before developing a more refined neoclassical style in his later years, creating a diverse body of work that spans opera, orchestral music, lieder, and chamber compositions. Born in Munich to Franz Strauss, the principal horn player of the Munich Court Orchestra and a noted musician who gave his son thorough musical training, Strauss showed precocious talent, composing his first pieces at age six. After early success with works in traditional forms, Strauss entered his revolutionary period in the 1880s and 1890s, creating a series of orchestrally brilliant tone poems including "Don Juan," "Death and Transfiguration," "Till Eulenspiegel's Merry Pranks," "Thus Spoke Zarathustra" (whose opening became famous through "2001: A Space Odyssey"), "Don Quixote," and "A Hero's Life." These works developed program music to new heights of narrative sophistication and orchestral virtuosity. Strauss then turned primarily to opera, collaborating with librettist Hugo von Hofmannsthal on a series of works that remain central to the repertoire: the scandalous "Salome" with its dissonant harmonies and erotic "Dance of the Seven Veils"; the psychological drama "Elektra"; the comedy "Der Rosenkavalier," his most popular opera; and the mythological "Ariadne auf Naxos," "Die Frau ohne Schatten," and "Arabella." Later operas include "Capriccio," a philosophical conversation piece about the relationship between words and music. Beyond these major works, Strauss composed important lieder throughout his career, culminating in the "Four Last Songs"; concertos for horn, violin, and oboe; and various chamber works. As a conductor, Strauss held major posts in Berlin, Vienna, and Munich, and was known for his interpretations of Mozart, Wagner, and his own works. His complex relationship with the Nazi regime—he initially accepted a position as president of the Reich Music Chamber but later fell from favor and protected his Jewish daughter-in-law—has complicated his legacy. Strauss's compositional style evolved from Romantic expansiveness to a more refined, transparent approach, but always featured his characteristic orchestral virtuosity, harmonic sophistication, and gift for soaring melody. His ability to create vividly descriptive orchestral textures, his psychological insight in character portrayal, and his balance of intellectual complexity with immediate emotional appeal have established him as one of the most significant composers of the late Romantic and early modern eras.`
  },
  "debussy": {
    name: "Claude Debussy",
    years: "1862-1918",
    image: "composerPics/Debussy.jpg",
    bio: `Claude Debussy was a French composer whose revolutionary approach to harmony, color, and form created a distinctively modern musical language that liberated Western music from traditional Germanic models and exerted profound influence on 20th-century music. Born to a family of modest means in Saint-Germain-en-Laye, Debussy entered the Paris Conservatoire at age ten, where his unconventional approaches often conflicted with academic traditions. His musical development was influenced by Russian composers he encountered while working as a pianist for Nadezhda von Meck (Tchaikovsky's patroness); the Javanese gamelan he heard at the 1889 Paris Exhibition; literary symbolism from poets like Mallarmé and Verlaine; and impressionist painters, though he rejected the "impressionist" label applied to his music. After early works showing Wagnerian and Russian influences, Debussy developed his mature style in the 1890s with his String Quartet and the orchestral Prélude à l'après-midi d'un faune, a revolutionary work that Boulez called the beginning of modern music. His major compositions include the revolutionary opera "Pelléas et Mélisande," which abandoned traditional operatic structure for a continuous, subtly inflected musical fabric perfectly matched to Maeterlinck's symbolist drama; orchestral works like the three-part "Nocturnes," the immersive "La Mer," and the ballet "Jeux," which anticipates later developments in fragmentation and motivic development; piano works including two books of Préludes, the technically demanding Études, and evocative pieces like "Suite bergamasque" (containing "Clair de lune"), "Estampes," and "Images"; chamber music including the innovative Sonatas for various instruments composed near the end of his life; and numerous songs setting texts by symbolist poets. Debussy's compositional approach featured innovative techniques including whole-tone and pentatonic scales, parallel harmonies, unresolved dissonances, new approaches to musical form based on contrast of colors and textures rather than thematic development, and an extraordinarily refined approach to timbre and instrumental color. His piano writing exploited the instrument's coloristic possibilities through pedaling effects and widely spaced textures. Despite a sometimes chaotic personal life, including scandals surrounding his relationships with women and his battle with rectal cancer that led to his death at 55, Debussy created a body of work that fundamentally altered Western music's course. By liberating harmony from its traditional functional role, emphasizing color and atmosphere, and developing new approaches to form, Debussy established aesthetic principles that influenced composers from Stravinsky and Bartók to jazz musicians and minimalists, making him one of the most significant musical innovators in history.`
  },
  "schoenberg": {
    name: "Arnold Schoenberg",
    years: "1874-1951",
    image: "composerPics/Schoenberg.jpg",
    bio: `Arnold Schoenberg was an Austrian-American composer, music theorist, and painter whose development of the twelve-tone technique revolutionized Western art music and profoundly influenced compositional practice throughout the 20th century. Born to a Jewish family in Vienna, Schoenberg was largely self-taught as a composer, though he received guidance from Alexander von Zemlinsky, whose sister Mathilde became Schoenberg's first wife. Schoenberg's compositional evolution proceeded with remarkable speed: early works like the string sextet "Verklärte Nacht" (Transfigured Night) and the massive cantata "Gurre-Lieder" extended late Romantic chromaticism; around 1908, he entered his "free atonal" period with revolutionary works like the Three Piano Pieces Op. 11, "Five Orchestral Pieces" Op. 16, and the melodrama "Pierrot Lunaire," which abandoned traditional tonality while developing new principles of motivic development and structural coherence. After several years of reduced compositional output, Schoenberg formulated his twelve-tone method around 1923, creating a systematic approach where compositions are based on orderings of all twelve chromatic pitches (tone rows) subject to specific transformational procedures. Major twelve-tone works include the Suite for Piano Op. 25, "Variations for Orchestra," the opera "Moses und Aron," the Violin and Piano Concertos, and the String Quartet No. 4. In 1933, Schoenberg was forced to flee Nazi Germany, eventually settling in Los Angeles, where he taught at UCLA and continued composing until his death. Beyond composition, Schoenberg made significant contributions as a music theorist through books like "Theory of Harmony" and "Structural Functions of Harmony"; as a teacher who mentored Alban Berg, Anton Webern, John Cage, and many others; and as a painter associated with the German Expressionist movement. Schoenberg's compositional approach emphasized the concept of "developing variation," where musical ideas undergo continuous transformation, and "Klangfarbenmelodie" (tone-color melody), where timbre becomes a structural element. Though his music faced hostile reception during much of his lifetime, Schoenberg was convinced of its historical necessity, viewing himself as preserving the German musical tradition rather than destroying it. His innovations in pitch organization, treatment of dissonance, formal procedures, and instrumental techniques established fundamental principles that influenced composers ranging from Stravinsky and Bartók to the postwar avant-garde. Despite later returning to tonal elements in some late works, Schoenberg's primary legacy remains his decisive break with traditional tonality and the creation of new organizational principles that permanently altered the course of Western music.`
  },
  "stravinsky": {
    name: "Igor Stravinsky",
    years: "1882-1971",
    image: "composerPics/Stravinsky.jpg",
    bio: `Igor Stravinsky was a Russian-born composer, pianist, and conductor whose stylistic versatility, rhythmic innovation, and reinvention of musical traditions established him as arguably the most influential composer of the 20th century. Born near St. Petersburg to a noted opera bass, Stravinsky studied with Rimsky-Korsakov after reluctantly abandoning law studies. His international breakthrough came when Sergei Diaghilev commissioned him to compose ballets for the Ballets Russes in Paris, resulting in three early masterpieces that revolutionized music: "The Firebird" (1910), which transformed Russian musical nationalism; "Petrushka" (1911), with its innovative bitonality and brilliant orchestration; and most dramatically, "The Rite of Spring" (1913), whose premiere famously caused a riot and whose savage rhythms, dissonant harmonies, and primitive energy redefined modern music. World War I and the Russian Revolution forced Stravinsky to remain in Switzerland, where he created theater pieces like "L'Histoire du Soldat" for smaller forces. After settling in France in the 1920s, Stravinsky entered his neoclassical period, reinterpreting historical forms and styles through his modernist sensibility in works like the opera-oratorio "Oedipus Rex," the ballet "Apollo," the Symphony of Psalms, the Violin Concerto, and the opera "The Rake's Progress." Following his immigration to the United States in 1939 and the death of his collaborator Diaghilev, Stravinsky surprised the musical world by adopting serialist techniques in his final creative phase, creating works like "Agon," "Threni," and the Requiem Canticles that integrated twelve-tone methods with his distinctive rhythmic energy and textural clarity. Beyond composing, Stravinsky was active as a pianist and conductor of his own works, making numerous recordings that remain valuable interpretive documents. Stravinsky's compositional style is characterized by its rhythmic vitality and innovation (including asymmetrical meters and displacement of accents), brilliant orchestration that treated instruments in novel ways, clear formal structures, and an extraordinary ability to absorb and transform diverse musical influences. His willingness to reinvent himself stylistically while maintaining his distinctive musical personality made him a model for later composers navigating the complex currents of 20th-century music. Though initially controversial, his works now form the cornerstone of the modern repertoire, and his influence extends beyond classical music to jazz, film scores, and popular music, cementing his position as one of music history's most transformative figures.`
  },
  "bartok": {
    name: "Bela Bartok",
    years: "1881-1945",
    image: "composerPics/Bartok.jpg",
    bio: `Béla Bartók was a Hungarian composer, pianist, and ethnomusicologist whose integration of folk music research with modernist compositional techniques created a distinctive musical language that made him one of the most significant composers of the 20th century. Born in the small town of Nagyszentmiklós (now Sânnicolau Mare, Romania), Bartók showed precocious musical ability and received training from his mother before studying at the Budapest Academy of Music. His early compositions showed Romantic influences, particularly Liszt and Richard Strauss, but his musical direction changed decisively when he and his colleague Zoltán Kodály began collecting folk music throughout Hungary and neighboring regions in 1906. This fieldwork, involving thousands of recordings made on primitive phonograph cylinders, expanded to Romania, Slovakia, Bulgaria, Turkey, and North Africa, laying foundations for the scholarly discipline of ethnomusicology. Bartók's mature compositional style emerged from his synthesis of this folk material with contemporary techniques, creating music characterized by asymmetrical rhythms, modal and octatonic scales, percussive textures, and innovative formal structures. His major works include six string quartets that document his stylistic evolution and rank among the century's greatest chamber music; the opera "Bluebeard's Castle"; the ballets "The Wooden Prince" and "The Miraculous Mandarin"; the Concerto for Orchestra, commissioned by conductor Serge Koussevitzky during Bartók's American exile; piano works including the Allegro barbaro, the suite "Out of Doors," Mikrokosmos (a six-volume collection of progressive piano pieces), and three piano concertos; two violin concertos; the Music for Strings, Percussion and Celesta; and numerous arrangements of folk songs. In 1940, as World War II engulfed Europe and Hungary allied with Nazi Germany, Bartók reluctantly emigrated to the United States, where he faced financial difficulties and declining health. Despite being diagnosed with leukemia and struggling to establish himself in America, Bartók composed several masterpieces in his final years, including the Concerto for Orchestra, Third Piano Concerto, and the incomplete Viola Concerto. Beyond his compositions, Bartók made significant contributions as a concert pianist (premiering many of his own works), as a piano teacher, and through his scholarly publications on folk music. His integration of rural musical traditions with sophisticated compositional techniques created a model for nationalist modernism, while his exploration of alternative tonal systems, innovative textures, and rhythmic complexity established principles that influenced composers throughout the 20th century and beyond.`
  },
  "shostakovich": {
    name: "Dmitri Shostakovich",
    years: "1906-1975",
    image: "composerPics/Shostakovich.jpg",
    bio: `Dmitri Shostakovich was a Soviet composer and pianist whose extraordinary body of work, created under the pressures of Stalin's totalitarian regime, encompasses both public statements of Soviet ideals and deeply personal expressions of suffering, irony, and resistance. Born in St. Petersburg just before the Russian Revolution, Shostakovich showed prodigious musical talent from childhood and entered the Petrograd Conservatory at age 13. His graduation piece, the First Symphony (1926), brought him immediate international recognition at age 19. Shostakovich's early career coincided with the relatively liberal period of Soviet arts policy in the 1920s, allowing him to experiment with modernist techniques in works like the satirical opera "The Nose." His fortunes changed dramatically in 1936 when his successful opera "Lady Macbeth of Mtsensk" was denounced in Pravda (likely with Stalin's approval) as "formalist" and "coarse," beginning a lifelong pattern of alternating official favor and condemnation. During the Stalinist purges and the Second World War, Shostakovich created works that could be interpreted as patriotic, including the Fifth Symphony (described as "a Soviet artist's response to just criticism") and the monumental Seventh Symphony ("Leningrad"), composed during the Nazi siege of his home city and becoming a worldwide symbol of resistance to fascism. After a second official denunciation in 1948, Shostakovich kept many compositions "for the drawer" until Stalin's death in 1953 permitted their performance. Shostakovich's major works include 15 symphonies that range from the accessible Fifth to the deeply personal Tenth (believed to portray Stalin's terror) and the vocally innovative Thirteenth ("Babi Yar") and Fourteenth; 15 string quartets that grow increasingly introspective and autobiographical; concertos for piano, violin, and cello; the preludes and fugues for piano; chamber works including the Piano Quintet and Piano Trio No. 2; film scores; and large-scale vocal works. His compositional style blends traditional tonal structures with modernist elements, including sharp dissonance, grotesque effects, intense climaxes, sardonic marches, and passages of haunting, bleak simplicity. Though outwardly conforming to Soviet expectations, particularly by joining the Communist Party in 1960, Shostakovich embedded layers of meaning in his music through quotations, musical ciphers, and ironic juxtapositions that could escape official censors but speak to informed listeners. His posthumously published "Testimony" (whose authenticity remains debated) portrays him as a secret dissident, though the full complexity of his relationship with the Soviet system remains a subject of scholarly discussion. Regardless of political interpretations, Shostakovich's music stands as one of the most powerful artistic testimonies to the human experience under totalitarianism and a body of work of extraordinary emotional range, technical mastery, and communicative power.`
  },
  "copland": {
    name: "Aaron Copland",
    years: "1900-1990",
    image: "composerPics/Copland.jpg",
    bio: `Aaron Copland was an American composer, teacher, writer, and conductor whose accessible, distinctively American musical language helped define the sound of American classical music while building bridges between serious and popular traditions. Born in Brooklyn to Jewish immigrants from Lithuania, Copland studied piano before traveling to Paris in 1921 to study with Nadia Boulanger, who shaped his emerging compositional voice. Upon returning to America, Copland sought to create music that reflected American life and could reach broader audiences than traditional classical music, experimenting with jazz elements in works like the Piano Concerto (1926) and modernist techniques in the spiky Piano Variations (1930). During the Great Depression and World War II, Copland adopted a more accessible style that incorporated American folk materials, creating his most popular works: the ballets "Billy the Kid," "Rodeo" (featuring the instantly recognizable "Hoe-Down"), and "Appalachian Spring," for which he won the Pulitzer Prize; orchestral works like "El Salón México," "Fanfare for the Common Man," and "Lincoln Portrait"; and film scores including "Of Mice and Men," "Our Town," and "The Heiress," which won an Academy Award. After the war, Copland returned to a more complex style in works like the Piano Quartet and Piano Fantasy while experimenting with serial techniques in compositions like "Connotations" and "Inscape." Beyond composing, Copland made substantial contributions as an educator at institutions including the Berkshire Music Center at Tanglewood; as a conductor of his own works; as an author of influential books including "What to Listen for in Music" and "Music and Imagination"; and as a champion of contemporary music through his involvement with the League of Composers, Yaddo, and other organizations. His musical style is characterized by clear textures, angular melodies often derived from American folk music, open harmonies suggesting the American landscape (particularly the open fifth "Copland chord"), shifting meters, and syncopated rhythms reflecting jazz and Latin American influences. Though his leftist political views led to problems during the McCarthy era, including the cancellation of his "Lincoln Portrait" from Eisenhower's inaugural concert, Copland eventually received numerous honors including the Presidential Medal of Freedom. Through his uniquely American musical voice, his tireless advocacy for contemporary music, and his ability to create works that communicate with both sophistication and immediate appeal, Copland fundamentally shaped American musical identity in the 20th century, creating sounds that continue to evoke the American experience for listeners worldwide.`
  },
  "messiaen": {
    name: "Olivier Messiaen",
    years: "1908-1992",
    image: "composerPics/Messiaen.jpg",
    bio: `Olivier Messiaen was a French composer, organist, ornithologist, and teacher whose deeply religious musical language incorporated birdsong, rhythmic innovation, color-based harmony, and non-Western musical elements to create some of the 20th century's most distinctive and influential compositions. Born in Avignon to a Shakespearean scholar father and a poet mother, Messiaen showed extraordinary musical gifts from childhood, entering the Paris Conservatoire at age 11. In 1931, he became the organist at the Church of the Trinity in Paris, a position he held for over 60 years, where his improvisations during services became legendary. Captured as a French soldier during World War II, Messiaen composed his "Quatuor pour la fin du temps" (Quartet for the End of Time) in a German prisoner-of-war camp, premiering it with fellow prisoners in 1941 in conditions of extreme hardship. After the war, Messiaen developed a highly original compositional approach based on what he called "modes of limited transposition" (synthetic scales with specific intervallic patterns) and non-retrogradable rhythms (palindromic rhythmic structures). His devout Catholic faith informed virtually all his works, which often seek to express mystical or theological concepts through music. Messiaen's fascination with birdsong, which he considered "God's own musicians," led him to notate thousands of bird calls worldwide, incorporating them into works like "Réveil des oiseaux," "Oiseaux exotiques," and the massive "Catalogue d'oiseaux" for piano. His major compositions include the orchestral "Turangalîla-Symphonie," blending sacred and profane love in an epic ten-movement structure; "Vingt regards sur l'enfant-Jésus" for piano; "La Nativité du Seigneur" and "Livre du Saint Sacrement" for organ; the opera "Saint François d'Assise"; and "Des canyons aux étoiles," inspired by Utah's natural landscapes. As professor of harmony, analysis, and later composition at the Paris Conservatoire from 1941 to 1978, Messiaen influenced generations of composers through his innovative teaching methods and analysis of rhythm, bird songs, and non-Western music. His students included Pierre Boulez, Karlheinz Stockhausen, Iannis Xenakis, and many other leading figures. Messiaen's compositional approach features extreme contrasts of dynamics and texture, innovative harmonies derived from his modes, complex rhythmic structures influenced by ancient Greek and Hindu rhythms, and an extraordinary approach to orchestration based on his synesthesia, which caused him to perceive specific colors when hearing certain harmonies. He documented this system in his treatise "Technique de mon langage musical." Through his unique synthesis of mystical Catholic theology, birdsong, non-Western influences, and innovative harmonic and rhythmic practices, Messiaen created one of the most original and influential musical voices of the 20th century, expanding the expressive and technical possibilities of Western art music while pursuing a deeply personal spiritual vision.`
  },
  "stockhausen": {
    name: "Karlheinz Stockhausen",
    years: "1928-2007",
    image: "composerPics/Stockhausen.jpg",
    bio: `Karlheinz Stockhausen was a German composer and theorist whose radical innovations in electronic music, serial techniques, musical form, and performance practice established him as one of the most visionary and influential figures in avant-garde music after World War II. Born near Cologne, Stockhausen survived a traumatic childhood during the Nazi era, losing both parents (his father in combat, his mother to a Nazi euthanasia program). After initially training as a pianist and studying music education, Stockhausen encountered the serial techniques of Schoenberg and Webern through his studies with composers Franck Martin and Olivier Messiaen in Cologne and Paris. In the early 1950s, Stockhausen began working at the electronic music studio of West German Radio (WDR) in Cologne, where he created pioneering electronic compositions like "Studie I & II" and "Gesang der Jünglinge," which integrated electronic sounds with processed recordings of a boy's voice, establishing new possibilities for timbre and spatial distribution of sound. His landmark work "Kontakte" exists in versions for both electronic sounds alone and for electronics with piano and percussion, bridging electronic and acoustic worlds. Throughout his career, Stockhausen continuously expanded his compositional approach. "Gruppen" requires three orchestras and conductors performing simultaneously; "Stimmung" explores the harmonic series through vocal overtone singing; "Mantra" applies serial principles to every musical parameter; while works like "Tierkreis" (Zodiac) demonstrate his ability to create more accessible music based on memorable melodies. His monumental seven-part cycle "LICHT" (Light), composed between 1977 and 2003, comprises seven operas (one for each day of the week), each lasting between 3 and 5 hours, featuring electronic and acoustic sounds, elaborate staging, and sometimes extreme performance requirements, including a string quartet performing in four separate helicopters ("Helikopter-Streichquartett"). Stockhausen's innovations extended to musical notation, spatial distribution of sound, intuitive music (guided improvisation), moment form (where segments can be performed in various orders), and formula composition (deriving entire works from core melodic-rhythmic cells). As a teacher at the Darmstadt Summer Courses and worldwide, Stockhausen influenced generations of composers and performers. His theoretical writings articulated new approaches to musical parameters, particularly timbre and spatial presentation. Though controversial for both his musical radicalism and sometimes eccentric personal beliefs (including claims of extraterrestrial origins), Stockhausen's fearless experimentation, conceptual sophistication, and exploration of music's spiritual dimensions created an expansive body of work that continues to challenge conventional boundaries of music. His influence extends beyond classical avant-garde to experimental rock, electronic dance music, and jazz, establishing him as one of the defining artistic visionaries of his era.`
  },
  "britten": {
    name: "Benjamin Britten",
    years: "1913-1976",
    image: "composerPics/Britten.jpg",
    bio: `Benjamin Britten was an English composer, conductor, and pianist whose distinctive musical voice revitalized British music in the mid-20th century through operas, vocal works, and instrumental compositions that combined technical sophistication with emotional directness and accessibility. Born in Suffolk on St. Cecilia's Day (the patron saint of music), Britten showed extraordinary musical precocity, studying with composer Frank Bridge before attending the Royal College of Music. In the late 1930s, Britten and his lifelong partner, tenor Peter Pears, moved to America, partly in response to mounting European political tensions and partly due to the difficulties of being gay in conservative pre-war Britain. Britten's reading of George Crabbe's poem "The Borough" while in America inspired his return to England in 1942 to compose his first major opera, "Peter Grimes," whose 1945 premiere marked a turning point in British musical history. The opera's complex portrayal of its troubled protagonist, evocative orchestration, and sophisticated use of lyrical and dramatic elements established Britten as the leading British composer of his generation. Following this success, Britten co-founded the English Opera Group and the Aldeburgh Festival, creating an artistic environment that supported his creative work. Britten's major compositions include numerous operas ranging from grand-scale works like "Billy Budd" and "Gloriana" to chamber operas like "The Turn of the Screw" and "Death in Venice"; the monumental "War Requiem," which juxtaposes the Latin Mass for the Dead with Wilfred Owen's war poetry; orchestral works including the "Four Sea Interludes" from "Peter Grimes," the "Young Person's Guide to the Orchestra," and the "Sinfonia da Requiem"; song cycles like "Les Illuminations," "Serenade for Tenor, Horn and Strings," and the "Nocturne"; and instrumental works including three string quartets, the Cello Symphony for Mstislav Rostropovich, and numerous compositions for Pears. Many of Britten's works address themes of innocence corrupted or destroyed, the isolation of the outsider figure, and the complexity of human relationships, often reflecting his experiences as a pacifist and a gay man in a society where homosexuality was illegal until 1967. Britten's compositional style combines traditional tonal structures with modernist elements, featuring distinctive orchestration, motivic development, psychological insight into character, and an exceptional sensitivity to text setting that made him one of the greatest composers for the voice. He had a particular gift for writing music for children and amateur performers without compromising artistic quality, as seen in works like "Noye's Fludde" and "The Little Sweep." Despite recurring ill health culminating in heart problems that ended his life at 63, Britten created a body of work remarkable for its craftsmanship, expressive range, and ability to communicate with both musical sophistication and immediate emotional impact, reestablishing British music as a vital force in the international musical landscape.`
  },
  "glass": {
    name: "Philip Glass",
    years: "1937-",
    image: "composerPics/Glass.jpg",
    bio: `Philip Glass is an American composer whose pioneering minimalist works revolutionized contemporary classical music through their hypnotic repetitive structures, gradually evolving patterns, and distinctive harmonic language, while achieving unusual crossover success in popular culture. Born in Baltimore to Jewish immigrants, Glass received early training in flute and violin before studying at the University of Chicago, the Juilliard School, and with pedagogue Nadia Boulanger in Paris. While in Paris, his encounter with Indian musicians Ravi Shankar and Alla Rakha transformed his approach to rhythm and structure. After returning to New York in the late 1960s, Glass formed his own ensemble and developed his characteristic style of repeating melodic and harmonic cells with subtle, gradual changes—a technique he called "music with repetitive structures" rather than minimalism. His breakthrough works included "Music in Twelve Parts," an epic four-hour composition exploring his additive rhythmic approach, and the five-hour opera "Einstein on the Beach" (1976), created with director Robert Wilson, which brought Glass international attention through its non-narrative structure, repetitive text, and distinctive instrumental writing. This began Glass's "Portrait Trilogy" of operas about transformative figures, completed by "Satyagraha" (about Gandhi) and "Akhnaten" (about the Egyptian pharaoh). Over subsequent decades, Glass has been extraordinarily prolific, composing more than 25 operas; 12 symphonies; numerous concertos and works for the Philip Glass Ensemble; solo piano music; string quartets and other chamber works; and influential film scores including "Koyaanisqatsi," "The Hours," "The Truman Show," and "Mishima," several receiving Academy Award nominations. His collaborators have ranged from pop musicians David Bowie and Paul Simon to choreographers Twyla Tharp and Jerome Robbins to filmmakers Martin Scorsese and Errol Morris. Glass's musical style evolved from the strict process-based approach of his early works to more varied harmonic progressions and orchestration in later compositions, though his music remains recognizable for its arpeggiated figures, additive rhythmic structures, and often meditative quality. Despite initial resistance from traditional classical music establishments, Glass has achieved extraordinary mainstream success, with his music featured in films, advertisements, and popular culture. He continues composing prolifically into his 80s, maintaining a rigorous performance schedule and expanding his compositional approach while remaining one of the most distinctive and influential musical voices of our time. His ability to create music that combines intellectual rigor with emotional accessibility has made him one of the few contemporary classical composers whose work has entered the broader cultural consciousness, fundamentally changing perceptions about what contemporary classical music can be.`
  },
  "adams": {
    name: "John Adams",
    years: "1947-",
    image: "composerPics/Adams.jpg",
    bio: `John Adams is an American composer and conductor whose work blends minimalist processes with complex orchestration, expressive harmony, and engaging narrative, creating a distinctive musical voice that has made him one of the most performed and influential contemporary classical composers. Born in Worcester, Massachusetts, Adams grew up in a musical family, learning clarinet from his father and playing in local orchestras before studying composition at Harvard with Leon Kirchner. After moving to California in the 1970s, Adams taught at the San Francisco Conservatory and served as composer-in-residence with the San Francisco Symphony, where his orchestral work "Harmonium" (1981) first brought him widespread attention. Though initially influenced by minimalism, Adams developed a more eclectic approach sometimes termed "post-minimalism," incorporating elements of jazz, pop, electronic music, and the Western classical tradition. Adams achieved international recognition with his opera "Nixon in China" (1987), a collaboration with director Peter Sellars and librettist Alice Goodman that used a contemporary historical event as the basis for a work that combined minimalist techniques with nineteenth-century operatic traditions. This began Adams's exploration of politically and socially charged subjects in his stage works, continued in "The Death of Klinghoffer" (1991), which sparked controversy with its treatment of the Achille Lauro hijacking; "Doctor Atomic" (2005), about J. Robert Oppenheimer and the first atomic bomb test; and "Girls of the Golden West" (2017), examining the California Gold Rush. Beyond his operas, Adams has composed numerous orchestral works that have entered the standard repertoire, including "Short Ride in a Fast Machine," "The Chairman Dances," "Naive and Sentimental Music," and the Pulitzer Prize-winning "On the Transmigration of Souls," commemorating the victims of the September 11, 2001 attacks. His violin concerto and two piano concertos showcase his ability to reimagine traditional forms, while chamber works like "Shaker Loops" and "Chamber Symphony" display his rhythmic vitality and structural ingenuity. As a conductor, Adams regularly leads performances of his own works and twentieth-century classics with major orchestras worldwide. Adams's compositional style features pulsing rhythmic energy, slowly evolving harmonic progressions, expansive orchestral colors, and a lyrical, often cinematic quality. Unlike the strict processes of early minimalism, Adams employs a more intuitive approach that accommodates emotional expression and narrative development. His music balances accessibility with sophistication, intellectual rigor with sensual appeal, establishing him as a central figure in contemporary classical music. Through his ability to engage with social and political themes while creating works of immediate appeal and lasting artistic value, Adams has helped redefine American classical music in the post-minimalist era, building bridges between contemporary composition and broader audiences.`
  }
};

// Keep track of preloaded images
const preloadedImages = {};

/**
 * Initialize the composer bio system
 */
function initComposerBios() {
  log('Initializing composer bio system');

  try {
    createBioPopupContainer();
    addBioButtonsToComposers();
    setupBioPopupHandlers();
    addBioPopupStyles();
    preloadComposerImages();
    log('Initialization complete');
  } catch (error) {
    console.error('Error initializing composer bio system:', error);
  }
}

/**
 * Preloads all composer images in the background
 */
function preloadComposerImages() {
  log('Preloading composer images');
  
  Object.keys(composerBios).forEach(composerId => {
    const composerData = composerBios[composerId];
    
    if (composerData.image && composerData.image.trim() !== '') {
      log(`Preloading image for ${composerId}: ${composerData.image}`);
      
      const img = new Image();
      img.src = composerData.image;
      
      // Store the preloaded image
      preloadedImages[composerId] = img;
      
      // Log when image is loaded
      img.onload = () => {
        log(`Image for ${composerId} preloaded successfully`);
      };
      
      img.onerror = () => {
        log(`ERROR: Failed to preload image for ${composerId}`);
      };
    }
  });
}

/**
 * Creates the shared bio popup container and adds it to the document body
 */
function createBioPopupContainer() {
  log('Creating bio popup container');

  // Check if container already exists
  if (document.getElementById('composer-bio-popup')) {
    log('Bio popup container already exists, skipping creation');
    return;
  }

  // Create container
  const popupContainer = document.createElement('div');
  popupContainer.id = 'composer-bio-popup';
  popupContainer.className = 'bio-popup rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hidden';
  popupContainer.innerHTML = `
    <div class="p-5 max-h-96 overflow-y-auto">
      <div class="flex justify-between items-start mb-3">
        <h3 id="bio-popup-title" class="font-bold text-indigo-800 dark:text-indigo-300 text-lg"></h3>
        <button id="close-bio" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <img id="bio-popup-image" src="" alt="" class="float-left mr-4 mb-2 rounded-lg w-24 h-24 object-cover hidden" />
      <div id="bio-popup-content" class="text-gray-700 dark:text-gray-300 text-m"></div>
    </div>
  `;

  // Add to document
  document.body.appendChild(popupContainer);
  log('Bio popup container created and added to document body', popupContainer);
}

/**
 * Adds bio buttons to all composer labels with the data-composer attribute
 */
function addBioButtonsToComposers() {
  log('Adding bio buttons to composer labels');

  // Find all composer labels
  const composerLabels = document.querySelectorAll('label[data-composer]');
  log(`Found ${composerLabels.length} composer labels with data-composer attribute`);

  if (composerLabels.length === 0) {
    log('WARNING: No composer labels found with data-composer attribute');
  }

  composerLabels.forEach((label, index) => {
    const composerId = label.dataset.composer;
    log(`Processing label for composer: ${composerId}`);

    // Skip if no matching composer or button already exists
    if (!composerBios[composerId]) {
      log(`WARNING: No composer data found for ID "${composerId}"`);
      return;
    }

    if (label.nextElementSibling?.querySelector('.composer-bio-btn')) {
      log(`Button already exists for composer ${composerId}, skipping`);
      return;
    }

    // Create bio button container
    const bioButtonContainer = document.createElement('div');
    bioButtonContainer.className = 'ml-4 relative';
    bioButtonContainer.innerHTML = `
      <button class="composer-bio-btn text-sm text-indigo-600 hover:text-indigo-800 flex items-center focus:outline-none px-3 py-1 border border-indigo-200 rounded-md shadow-sm hover:shadow-md transition-all duration-200 dark:bg-white dark:bg-opacity-40" data-composer="${composerId}">
        <svg class="w-4 h-4 mr-2" fill="currentColor" stroke="currentColor" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M111.001 82.058c-4.921-1.406-13.503-1.382-19.757.436-12.727 3.709-21.114 13.309-18.739 21.454 2.376 8.145 14.618 11.757 27.345 8.048 11.709-3.394 19.757-11.854 19.03-19.563V0L47.973 16.387v80.216c-4.921-1.406-13.503-1.382-19.757.436-12.727 3.709-21.114 13.309-18.739 21.454 2.376 8.145 14.618 11.757 27.345 8.048 11.709-3.394 19.757-11.854 19.03-19.563V34.423l55.15-13.284v60.919z" />
        </svg>
        <span>Composer Bio</span>
      </button>
    `;

    // Find the parent flex container and append the button
    const parentFlex = label.parentElement;
    if (parentFlex && parentFlex.classList.contains('flex')) {
      parentFlex.appendChild(bioButtonContainer);
      log(`Added bio button for composer ${composerId}`, bioButtonContainer);
    } else {
      log(`WARNING: Parent element for ${composerId} is not a flex container or doesn't exist:`, parentFlex);
    }
  });
}

/**
 * Sets up event handlers for the bio popup
 */
function setupBioPopupHandlers() {
  log('Setting up bio popup event handlers');

  const bioPopup = document.getElementById('composer-bio-popup');
  if (!bioPopup) {
    console.error('Bio popup element not found, cannot set up handlers');
    return;
  }

  const bioPopupTitle = document.getElementById('bio-popup-title');
  const bioPopupImage = document.getElementById('bio-popup-image');
  const bioPopupContent = document.getElementById('bio-popup-content');
  const closeBioButton = document.getElementById('close-bio');

  log('Popup elements found:', {
    popup: bioPopup,
    title: bioPopupTitle,
    image: bioPopupImage,
    content: bioPopupContent,
    closeButton: closeBioButton
  });

  // Hide popup function
  function hidePopup() {
    log('Hiding popup');
    bioPopup.classList.add('hidden');
    
    // Clear the image src when hiding the popup
    bioPopupImage.src = '';
    bioPopupImage.alt = '';
    bioPopupImage.classList.add('hidden');
    
    log('Image cleared and hidden');
  }

  // Show popup when bio button is clicked
  document.addEventListener('click', function (event) {
    const bioButton = event.target.closest('.composer-bio-btn');

    if (bioButton) {
      log('Bio button clicked', bioButton);
      event.stopPropagation();

      const composerId = bioButton.dataset.composer;
      log(`Composer ID: ${composerId}`);

      const composerData = composerBios[composerId];

      if (composerData) {
        log(`Found composer data for ${composerId}:`, composerData);

        // Fill the popup with composer data
        bioPopupTitle.textContent = `${composerData.name} (${composerData.years})`;
        
        // Handle the image - first hide it, then set source and show when ready
        bioPopupImage.classList.add('hidden');
        
        if (composerData.image && composerData.image.trim() !== '') {
          // Use the preloaded image if available
          if (preloadedImages[composerId] && preloadedImages[composerId].complete) {
            log(`Using preloaded image for ${composerId}`);
            bioPopupImage.src = composerData.image;
            bioPopupImage.alt = composerData.name;
            bioPopupImage.classList.remove('hidden');
          } else {
            // If not preloaded, set the source and add an onload event
            log(`Setting image source for ${composerId}`);
            bioPopupImage.src = composerData.image;
            bioPopupImage.alt = composerData.name;
            
            // Wait for the image to load before displaying it
            bioPopupImage.onload = function() {
              log(`Image for ${composerId} loaded, displaying now`);
              bioPopupImage.classList.remove('hidden');
            };
            
            bioPopupImage.onerror = function() {
              log(`ERROR: Failed to load image for ${composerId}`);
              bioPopupImage.classList.add('hidden');
            };
          }
        } else {
          // Hide the image element if no image provided
          log(`No image for ${composerId}, keeping image hidden`);
          bioPopupImage.classList.add('hidden');
        }

        // Convert bio text to paragraphs with typographic quotes
        const withTypographicQuotes = composerData.bio
          .replace(/(\s|^)"(\S)/g, '$1&ldquo;$2')  // Opening quotes at start of words
          .replace(/(\S)"(\s|$|[,.;:!?])/g, '$1&rdquo;$2')  // Closing quotes at end of words
          .replace(/(\s|^)'(\S)/g, '$1&lsquo;$2')  // Opening single quotes at start of words
          .replace(/(\S)'(\s|$|[,.;:!?])/g, '$1&rsquo;$2'); // Closing single quotes/apostrophes

        const paragraphs = withTypographicQuotes.split('\n\n').map(p => `<p class="mb-3">${p}</p>`).join('');
        bioPopupContent.innerHTML = paragraphs;

        // Position the popup near the button
        const buttonRect = bioButton.getBoundingClientRect();
        log('Button position:', buttonRect);

        bioPopup.style.position = 'absolute';
        bioPopup.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        bioPopup.style.left = `${buttonRect.left + window.scrollX}px`;
        bioPopup.style.zIndex = '100';

        log('Setting popup position:', {
          top: `${buttonRect.bottom + window.scrollY + 10}px`,
          left: `${buttonRect.left + window.scrollX}px`
        });

        // Show the popup
        bioPopup.classList.remove('hidden');
        log('Popup should now be visible');
      } else {
        log(`WARNING: No composer data found for ID "${composerId}"`);
      }
    }
  });

  log('Added click listener for bio buttons');

  // Close popup when close button is clicked
  closeBioButton.addEventListener('click', function (event) {
    log('Close button clicked');
    event.stopPropagation();
    hidePopup();
  });

  // Close popup when clicking outside
  document.addEventListener('click', function (event) {
    if (!bioPopup.classList.contains('hidden') &&
      !bioPopup.contains(event.target) &&
      !event.target.closest('.composer-bio-btn')) {
      log('Clicked outside popup, hiding');
      hidePopup();
    }
  });

  // Close popup when pressing Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !bioPopup.classList.contains('hidden')) {
      log('Escape key pressed, hiding popup');
      hidePopup();
    }
  });

  // Prevent clicks inside popup from closing it
  bioPopup.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  log('All popup event handlers set up successfully');
}

/**
 * Adds the required styles for the bio popup
 */
function addBioPopupStyles() {
  log('Adding bio popup styles');

  // Check if styles already exist
  if (document.getElementById('composer-bio-styles')) {
    log('Bio popup styles already exist, skipping');
    return;
  }

  const styleEl = document.createElement('style');
  styleEl.id = 'composer-bio-styles';
  styleEl.textContent = `
    .bio-popup {
      position: absolute;
      width: 750px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .bio-popup::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 20px;
      border-width: 0 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent #ffffff transparent;
      filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
      z-index: 10;
    }
    
    .dark .bio-popup::before {
      border-color: transparent transparent #1e293b transparent;
    }

    /* Explicitly define these to override any conflicting styles */
    .hidden {
      display: none !important;
    }
    
    #composer-bio-popup:not(.hidden) {
      display: block !important;
    }
    
    /* Add a placeholder for image to prevent layout shift */
    #bio-popup-image {
      min-height: 24px;
      min-width: 24px;
    }
  `;

  document.head.appendChild(styleEl);
  log('Added bio popup styles to document head');
}

// When the module loads, immediately log presence
log('Composer bios module loaded', {
  availableComposers: Object.keys(composerBios)
});

// Export the initialization function
export { initComposerBios, composerBios };