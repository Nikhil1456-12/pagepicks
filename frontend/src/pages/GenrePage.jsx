import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { bookService, libraryService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const GenrePage = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const genreTitles = {
    'fantasy': 'Fantasy Books',
    'sci-fi': 'Sci-Fi Books',
    'mystery': 'Mystery Books',
    'romance': 'Romance Books',
    'non-fiction': 'Non-Fiction Books',
    'drama': 'Drama Books',
    'adventure': 'Adventure Books',
    'horror': 'Horror Books',
    'biography': 'Biography Books',
    'self-motivation': 'Self-Motivation Books',
    'poetry': 'Poetry Books',
    'historical': 'Historical Books',
    'cooking': 'Cooking Books',
    'travel': 'Travel Books',
    'art': 'Art Books'
  };

  const genreDescriptions = {
    'fantasy': 'Step into magical worlds full of adventure and wonder',
    'sci-fi': 'Explore futuristic worlds and thrilling adventures',
    'mystery': 'Unravel thrilling secrets and hidden truths',
    'romance': 'Fall in love with these heartwarming stories',
    'non-fiction': 'Learn, explore, and get inspired by true stories',
    'drama': 'Experience emotional stories and compelling narratives',
    'adventure': 'Embark on thrilling journeys and epic quests',
    'horror': 'Dive into chilling tales that will keep you up at night',
    'biography': 'Inspiring life stories of remarkable people',
    'self-motivation': 'Boost your mindset and achieve your goals',
    'poetry': 'Immerse yourself in beautiful verses and timeless poems',
    'historical': 'Explore the stories of the past and significant events',
    'cooking': 'Discover recipes and culinary inspiration from top chefs',
    'travel': 'Explore the world through captivating travel stories',
    'art': 'Explore creativity and artistic expression through these masterpieces'
  };

  const genreImages = {
    'fantasy': 'https://i.pinimg.com/736x/7c/47/5a/7c475a3b3ebca27a0ff42dbe6fb6d598.jpg',
    'sci-fi': 'https://i.pinimg.com/736x/53/d1/a5/53d1a5c4d0b705c714e0cec6ebe582e3.jpg',
    'mystery': 'https://i.pinimg.com/736x/14/c8/97/14c897924d355958a269debc88b711d9.jpg',
    'romance': 'https://i.pinimg.com/736x/1d/4c/93/1d4c93d761649778856cf9df30cd1833.jpg',
    'non-fiction': 'https://i.pinimg.com/736x/8d/42/2e/8d422e76bf7a6f106ce67c30f99bcf44.jpg',
    'drama': 'https://i.pinimg.com/1200x/b1/3c/3d/b13c3d8c3f4e78fcb6c5f81a1b52b029.jpg',
    'adventure': 'https://i.pinimg.com/736x/4f/9c/cd/4f9ccd9990570f659deb81a4435dfe60.jpg',
    'horror': 'https://i.pinimg.com/736x/f8/5b/7e/f85b7e81801b1a3e0a60ecf8e4de21c6.jpg',
    'biography': 'https://i.pinimg.com/1200x/e1/31/e6/e131e672b2eaf83cb121b9a3c3769d73.jpg',
    'self-motivation': 'https://i.pinimg.com/736x/ff/20/25/ff20256cf7d1929453e04ad4711a49cd.jpg',
    'poetry': 'https://i.pinimg.com/1200x/b1/25/ef/b125ef4ca2993f29b56ecac567ce451d.jpg',
    'historical': 'https://i.pinimg.com/1200x/b3/57/24/b357249fe14adb04353dcc7a6719dbca.jpg',
    'cooking': 'https://i.pinimg.com/1200x/c8/fd/b7/c8fdb718286dfab585b1ea44dd4b46a8.jpg',
    'travel': 'https://i.pinimg.com/1200x/8d/e0/9f/8de09fdf3ff6b9d24a4a0113af41d524.jpg',
    'art': 'https://i.pinimg.com/1200x/4a/a8/9f/4aa89f925443ffcc59607ac00bbcf34c.jpg'
  };

  useEffect(() => {
    fetchBooksByGenre();
  }, [genre]);

  const booksData = {
    'fantasy': [
      {
        __id: '1',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        description: 'A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
        coverImage: 'https://images.gr-assets.com/books/1170803558l/3.jpg',
        story: 'Harry Potter lived with his cruel aunt and uncle, the Dursleys, who treated him poorly. On his eleventh birthday, he learned he was a wizard from Hagrid, the groundskeeper at Hogwarts. Harry embarked on a magical journey, making friends like Ron and Hermione, and facing the dark wizard Voldemort who killed his parents. At Hogwarts, he discovered his talent for Quidditch and learned spells, potions, and the history of magic. The story culminates in Harry protecting the Philosopher\'s Stone from Voldemort, proving his bravery and marking the beginning of his legendary adventures.'
      },
      {
        _id: 2,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        description: 'A epic tale of adventure, friendship, and the battle against evil in Middle-earth.',
        coverImage: 'https://images.gr-assets.com/books/1411114164l/33.jpg',
        story: 'In the peaceful land of the Shire, hobbit Frodo Baggins inherits a mysterious ring from his uncle Bilbo. The ring, forged by the dark lord Sauron, threatens to enslave Middle-earth. Frodo, accompanied by a fellowship including Gandalf, Aragorn, Legolas, Gimli, Boromir, Merry, Pippin, and Sam, sets out to destroy the ring in Mount Doom. Along the way, they face orcs, trolls, and the treacherous Gollum. The epic journey tests their courage, friendship, and resolve, ultimately leading to the downfall of Sauron and the restoration of peace.'
      },
      {
        _id: 3,
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        description: 'The story of Kvothe, a gifted young man who grows to be the most notorious magician his world has ever seen.',
        coverImage: 'https://images.gr-assets.com/books/1270352123l/1869.jpg',
        story: 'Kvothe, a brilliant young man, recounts his life story to a scribe. Orphaned by a tragic event, he becomes a street urchin, learning sympathy from an actor troupe. His exceptional talent leads him to the University, where he studies sympathy and naming. Kvothe faces challenges, including poverty and rivalry, while uncovering secrets about the Chandrian and the Amyr. His journey is one of discovery, loss, and the pursuit of knowledge, shaping him into a legendary figure known as the Bloodless.'
      },
      {
        _id: 4,
        title: 'Mistborn: The Final Empire',
        author: 'Brandon Sanderson',
        description: 'A thief with a mysterious ability joins a crew to overthrow an immortal emperor.',
        coverImage: 'https://images.gr-assets.com/books/1437254833l/68428.jpg',
        story: 'In a world ruled by the immortal Lord Ruler, Vin, a street urchin with Allomantic powers, joins Kelsier\'s crew of thieves. They plan to overthrow the oppressive regime by stealing the Lord Ruler\'s atium and inciting a revolution. Vin discovers her unique ability to burn metals, becoming a powerful Mistborn. The crew faces betrayals, battles, and moral dilemmas. Through courage and sacrifice, they challenge the Final Empire, leading to a climactic confrontation that changes the world forever.'
      },
      {
        _id: 5,
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        description: 'A storm brings change to a war-torn land, revealing ancient secrets.',
        coverImage: 'https://images.gr-assets.com/books/1388184640l/7235533.jpg',
        story: 'On the storm-ravaged world of Roshar, Kaladin, a former soldier turned slave, discovers his ability to Surgebind. Dalinar Kholin, a highprince, experiences visions that challenge his beliefs. Shallan, a young scholar, seeks knowledge and power. Their paths converge in a land plagued by endless wars and ancient spren. As they uncover the secrets of the Knights Radiant and the Voidbringers, they must unite to face an impending catastrophe, exploring themes of honor, leadership, and the nature of war.'
      },
      {
        _id: 6,
        title: 'Stardust',
        author: 'Neil Gaiman',
        description: 'A young man ventures into a magical realm to retrieve a fallen star for his beloved.',
        coverImage: 'https://images.gr-assets.com/books/1459127484l/16793.jpg',
        story: 'Tristran Thorn promises to bring a fallen star to his love Victoria. Crossing into the magical realm of Faerie, he encounters witches, sky pirates, and the star Yvaine, who is actually a living being. Pursued by various factions seeking the star\'s heart for immortality, Tristran protects Yvaine. Along the way, he learns about courage, love, and the wonders of Faerie. The adventure transforms Tristran, leading to unexpected romance and self-discovery.'
      }
    ],
    'sci-fi': [
      {
        _id: 1,
        title: 'Dune',
        author: 'Frank Herbert',
        description: 'On the desert planet Arrakis, a young man becomes embroiled in a struggle for control of the universe\'s most valuable resource.',
        coverImage: 'https://images.gr-assets.com/books/1434908555l/234225.jpg',
        story: 'Paul Atreides, son of Duke Leto, arrives on Arrakis with his family. The planet, source of the spice melange, is vital for space travel. Betrayed by the Emperor and House Harkonnen, Paul\'s family is destroyed. Paul, trained by his mother Lady Jessica, embraces the Fremen culture and becomes Muad\'Dib. He leads a revolution against the oppressors, mastering the desert and the spice. The story explores politics, religion, and ecology in a vast interstellar empire.'
      },
      {
        _id: 2,
        title: 'Neuromancer',
        author: 'William Gibson',
        description: 'A washed-up computer hacker is hired for one last job that could change the world.',
        coverImage: 'https://images.gr-assets.com/books/1167348726l/22328.jpg',
        story: 'Case, a cyberpunk hacker, has his nervous system damaged by his former employers. Hired by Armitage for a mysterious job, Case teams up with Molly, a street samurai. They navigate the digital underworld, encountering artificial intelligences and corporate conspiracies. The mission involves stealing data from a powerful AI. As they delve deeper, Case questions reality and his own identity in a world of cyberspace and biotechnology.'
      },
      {
        _id: 3,
        title: 'The Left Hand of Darkness',
        author: 'Ursula K. Le Guin',
        description: 'An envoy is sent to a planet where the inhabitants can change their gender at will.',
        coverImage: 'https://images.gr-assets.com/books/1488213619l/18423.jpg',
        story: 'Genly Ai, an envoy from the Ekumen, arrives on Winter, a planet of ambisexual humans. He struggles to understand their culture, where people change gender seasonally. Accompanied by Estraven, a disgraced prime minister, they flee political intrigue. Through their journey across the icy planet, Ai learns about trust, gender, and humanity. The novel explores themes of identity and cultural differences in a science fiction setting.'
      },
      {
        _id: 4,
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        description: 'A pizza delivery driver discovers a conspiracy involving virtual reality and ancient Sumerian mythology.',
        coverImage: 'https://images.gr-assets.com/books/1477624625l/830.jpg',
        story: 'Hiro Protagonist, a hacker and pizza deliverer, encounters a mysterious drug called Snow Crash in the Metaverse. Teaming with Y.T., a skateboard courier, he uncovers a plot involving ancient Sumerian gods and a digital virus. The story blends virtual reality, cryptography, and mythology. Hiro races to stop the virus from destroying both the digital and physical worlds, exploring the intersection of technology and ancient lore.'
      },
      {
        _id: 5,
        title: 'The Martian',
        author: 'Andy Weir',
        description: 'An astronaut stranded on Mars must use his ingenuity to survive and find a way home.',
        coverImage: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
        story: 'Mark Watney, an astronaut, is left for dead on Mars after a storm. Using his scientific knowledge, he grows potatoes, generates water, and signals Earth. NASA and a private company work to rescue him. Through logs and communications, Watney\'s humor and ingenuity shine. The story highlights human resilience, international cooperation, and the challenges of space exploration.'
      },
      {
        _id: 6,
        title: 'Foundation',
        author: 'Isaac Asimov',
        description: 'A mathematician develops a science to predict the future of humanity.',
        coverImage: 'https://images.gr-assets.com/books/1417900846l/29579.jpg',
        story: 'Hari Seldon, a psychohistorian, predicts the Galactic Empire\'s fall. He establishes the Foundation on Terminus to shorten the dark age. Encyclopedists and traders preserve knowledge. Facing threats from neighboring kingdoms and internal strife, the Foundation uses Seldon\'s plans. The story explores the power of science, prediction, and the cycles of civilization.'
      }
    ],
    'mystery': [
      {
        _id: 1,
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        description: 'A journalist and a hacker investigate a disappearance that leads to dark family secrets.',
        coverImage: 'https://images.gr-assets.com/books/1327868566l/2429135.jpg',
        story: 'Mikael Blomkvist, a disgraced journalist, teams up with Lisbeth Salander, a brilliant hacker, to investigate the disappearance of Harriet Vanger. The case leads to the powerful Vanger family and their dark secrets. As they uncover incest, murder, and corruption, Lisbeth\'s troubled past intertwines with the investigation. The duo faces danger and betrayal, revealing a web of evil that spans generations.'
      },
      {
        _id: 2,
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        description: 'A man becomes the prime suspect when his wife goes missing on their fifth anniversary.',
        coverImage: 'https://images.gr-assets.com/books/1339533690l/19288043.jpg',
        story: 'Nick Dunne reports his wife Amy missing on their anniversary. As evidence points to him, Amy\'s diary reveals a troubled marriage. The story alternates between Nick\'s perspective and Amy\'s diary, uncovering lies and manipulations. Amy, presumed dead, has orchestrated an elaborate revenge. The novel explores media sensationalism, marriage, and the nature of truth.'
      },
      {
        _id: 3,
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        description: 'A woman refuses to speak after allegedly murdering her husband, and a psychotherapist tries to uncover the truth.',
        coverImage: 'https://images.gr-assets.com/books/1668782119l/40097951.jpg',
        story: 'Alicia Berenson, a famous painter, shoots her husband and stops speaking. Theo Faber, a psychotherapist, takes her case at the Grove. Through therapy sessions and investigations, Theo uncovers Alicia\'s past traumas. The story reveals layers of deception, jealousy, and mental illness. Theo\'s obsession with the case blurs professional boundaries, leading to shocking revelations.'
      },
      {
        _id: 4,
        title: 'Big Little Lies',
        author: 'Liane Moriarty',
        description: 'Three women\'s lives unravel when a murder occurs at their children\'s school.',
        coverImage: 'https://images.gr-assets.com/books/1440319315l/19486412.jpg',
        story: 'Madeline, Celeste, and Jane navigate school politics and personal dramas in a wealthy suburb. A school trivia night ends in murder. Flashbacks reveal secrets: Madeline\'s ex-husband, Celeste\'s abusive marriage, Jane\'s assault. The women form bonds amid lies and betrayals. The story explores friendship, domestic violence, and the facades of perfect lives.'
      },
      {
        _id: 5,
        title: 'The Cuckoo\'s Calling',
        author: 'Robert Galbraith',
        description: 'A private detective investigates the suspicious death of a supermodel.',
        coverImage: 'https://images.gr-assets.com/books/1389648417l/18214414.jpg',
        story: 'Cormoran Strike, a private detective, investigates supermodel Lula Landry\'s apparent suicide. Hired by her brother, Strike and his assistant Robin uncover inconsistencies. They delve into Lula\'s life, revealing affairs, addictions, and family secrets. The case involves high society and media scrutiny. Strike\'s military background and personal struggles add depth to the investigation.'
      },
      {
        _id: 6,
        title: 'Sharp Objects',
        author: 'Gillian Flynn',
        description: 'A journalist returns to her hometown to cover a series of murders.',
        coverImage: 'https://images.gr-assets.com/books/1423241485l/18045891.jpg',
        story: 'Camille Preaker, a troubled journalist, returns to Wind Gap to cover child murders. Haunted by her past, she investigates while dealing with her mother and sister. The town\'s secrets and her own traumas surface. Camille\'s self-harm and family dysfunction complicate the case. The story builds to a chilling revelation about the killer and Camille\'s connection.'
      }
    ],
    'romance': [
      {
        _id: 1,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'Elizabeth Bennet navigates issues of manners, upbringing, morality, and marriage.',
        coverImage: 'https://images.gr-assets.com/books/1320399351l/1885.jpg',
        story: 'Elizabeth Bennet, a witty young woman, meets the proud Mr. Darcy at a ball. Initial misunderstandings and prejudices create tension. As they interact, Elizabeth learns of Darcy\'s true character. Through letters, dances, and family dramas, love blossoms. The novel satirizes society\'s marriage market while celebrating personal growth and genuine affection.'
      },
      {
        _id: 2,
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        description: 'A man with a faded, well-worn notebook open to a drawing of a woman holding a rose.',
        coverImage: 'https://images.gr-assets.com/books/1385738917l/15931.jpg',
        story: 'Noah Calhoun reads from a notebook to Allie Nelson, who has Alzheimer\'s. The story flashes between their youth and present. Young Allie and Noah fall in love during a summer, but class differences separate them. Years later, they reunite, but Allie is engaged. Noah fights for their love, building a house and writing letters. The poignant tale explores enduring love and memory.'
      },
      {
        _id: 3,
        title: 'Outlander',
        author: 'Diana Gabaldon',
        description: 'A woman travels back in time to 18th-century Scotland and finds adventure and love.',
        coverImage: 'https://images.gr-assets.com/books/1451446835l/10964.jpg',
        story: 'Claire Randall, a WWII nurse, is transported to 1743 Scotland. She marries Jamie Fraser to survive. Torn between her husband Frank and Jamie, Claire navigates clan wars and time paradoxes. The story blends romance, history, and adventure. Claire\'s choices test loyalty and love across time.'
      },
      {
        _id: 4,
        title: 'Me Before You',
        author: 'Jojo Moyes',
        description: 'A young woman is hired to care for a wealthy, depressed man who decides to end his life.',
        coverImage: 'https://images.gr-assets.com/books/1357108762l/17347634.jpg',
        story: 'Louisa Clark cares for Will Traynor, paralyzed after an accident. Will, depressed, plans assisted suicide. Lou tries to change his mind through adventures. Their relationship evolves from caregiver-patient to deep love. The story explores disability, happiness, and the right to die, challenging preconceptions.'
      },
      {
        _id: 5,
        title: 'The Time Traveler\'s Wife',
        author: 'Audrey Niffenegger',
        description: 'A man with a genetic disorder that causes him to time travel unpredictably, and his wife who has to cope with his frequent absences.',
        coverImage: 'https://images.gr-assets.com/books/1438769591l/14050.jpg',
        story: 'Henry time travels unpredictably due to a genetic condition. Clare meets adult Henry as a child, then falls in love as adults. Their relationship faces challenges from Henry\'s absences and future knowledge. The nonlinear narrative explores love, loss, and the complexities of time. Clare\'s patience and Henry\'s struggles create a poignant love story.'
      },
      {
        _id: 6,
        title: 'Beach Read',
        author: 'Emily Henry',
        description: 'Two writers, one romance and one literary fiction, swap genres for the summer.',
        coverImage: 'https://images.gr-assets.com/books/1589881197l/53241581.jpg',
        story: 'Romance writer January and literary fiction author Gus are neighbors and rivals. Struggling with writer\'s block, they swap genres for the summer. January writes literary fiction, Gus romance. As they share progress, attraction grows. The story explores creativity, grief, and love. Their collaboration leads to personal growth and romance.'
      }
    ],
    'non-fiction': [
      {
        _id: 1,
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        description: 'A sweeping narrative of the history of our species from the Stone Age to the modern age.',
        coverImage: 'https://images.gr-assets.com/books/1420585954l/23632296.jpg',
        story: 'Harari traces human history from the Cognitive Revolution to the present. He explains how Homo sapiens dominated through myths and cooperation. The Agricultural Revolution brought farming but also inequality. Scientific and industrial revolutions transformed society. Harari discusses happiness, meaning, and future challenges like AI and biotechnology. The book challenges assumptions about progress and human nature.'
      },
      {
        _id: 2,
        title: 'Educated',
        author: 'Tara Westover',
        description: 'A memoir about a woman who grows up in a survivalist family and eventually gets a PhD from Cambridge.',
        coverImage: 'https://images.gr-assets.com/books/1506026635l/35133922.jpg',
        story: 'Tara Westover grows up in rural Idaho with survivalist parents who reject formal education. She teaches herself and enters Brigham Young University. Despite family conflicts and lack of records, she earns scholarships. Tara faces identity crises, mental health issues, and family estrangement. Her journey to Cambridge represents triumph over adversity and the power of self-education.'
      },
      {
        _id: 3,
        title: 'Becoming',
        author: 'Michelle Obama',
        description: 'The former First Lady shares her life story and the tools she used to overcome challenges.',
        coverImage: 'https://images.gr-assets.com/books/1528206996l/38746485.jpg',
        story: 'Michelle Obama recounts her Chicago upbringing, Princeton education, and meeting Barack. She discusses marriage, motherhood, and political life. As First Lady, she advocates for education, health, and women\'s rights. The memoir explores identity, ambition, and resilience. Michelle shares personal struggles and triumphs, offering inspiration.'
      },
      {
        _id: 4,
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        description: 'A counterintuitive approach to living a good life by embracing our limitations.',
        coverImage: 'https://images.gr-assets.com/books/1465761302l/28257707.jpg',
        story: 'Manson argues that constant positivity is harmful. He advocates choosing struggles wisely and accepting limitations. The book covers relationships, failure, and death. Manson uses stories and psychology to show that meaning comes from problems. He encourages responsibility and realistic expectations for happiness.'
      },
      {
        _id: 5,
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'An easy and proven way to build good habits and break bad ones.',
        coverImage: 'https://images.gr-assets.com/books/1655988385l/40121378.jpg',
        story: 'Clear explains habit formation through the compound effect of small changes. He introduces the habit loop and four laws: make it obvious, attractive, easy, satisfying. The book uses stories of athletes, artists, and CEOs. Clear provides practical strategies for habit stacking, environment design, and tracking progress.'
      },
      {
        _id: 6,
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        description: 'A groundbreaking tour of the mind that reveals how we think and make decisions.',
        coverImage: 'https://images.gr-assets.com/books/1317793965l/11468377.jpg',
        story: 'Kahneman divides thinking into System 1 (fast, intuitive) and System 2 (slow, deliberate). He explores cognitive biases like anchoring and availability heuristic. The book covers prospect theory and loss aversion. Kahneman discusses happiness, confidence, and expert judgment. The work integrates psychology and economics for better decision-making.'
      }
    ],
    'drama': [
      {
        _id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic American novel about the Jazz Age and the American Dream.',
        coverImage: 'https://images.gr-assets.com/books/1490528560l/4671.jpg',
        story: 'Nick Carraway moves to West Egg and meets Jay Gatsby, his mysterious neighbor. Gatsby throws lavish parties to win back Daisy Buchanan. The story explores the American Dream\'s corruption, wealth, and love. Fitzgerald critiques the Roaring Twenties\' excess. Gatsby\'s pursuit of the past leads to tragedy.'
      },
      {
        _id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A young girl learns about racism and injustice in the American South.',
        coverImage: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
        story: 'Scout Finch grows up in Maycomb, Alabama, with brother Jem and father Atticus, a lawyer. Atticus defends Tom Robinson, a black man accused of raping a white woman. The children learn about prejudice and empathy. Boo Radley, the reclusive neighbor, saves them. The novel addresses racial injustice and moral growth.'
      },
      {
        _id: 3,
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        description: 'A controversial novel about teenage angst and alienation.',
        coverImage: 'https://images.gr-assets.com/books/1398034300l/5107.jpg',
        story: 'Holden Caulfield, expelled from prep school, wanders New York City. He reflects on phoniness and loss of innocence. Holden visits his sister Phoebe and imagines catching children in a rye field. The story explores teenage rebellion, depression, and identity. Holden\'s voice captures adolescent turmoil.'
      },
      {
        _id: 4,
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel about totalitarianism and surveillance.',
        coverImage: 'https://images.gr-assets.com/books/1348990566l/5470.jpg',
        story: 'Winston Smith lives in Oceania under Big Brother\'s rule. He works at the Ministry of Truth, altering records. Winston rebels by starting a diary and affair with Julia. They join the Brotherhood against the Party. Captured and tortured, Winston learns the Party\'s power. The novel warns of authoritarianism and truth manipulation.'
      },
      {
        _id: 5,
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
        description: 'A Pulitzer Prize-winning novel about the Great Depression and migrant workers.',
        coverImage: 'https://images.gr-assets.com/books/1352912927l/18114322.jpg',
        story: 'The Joad family loses their Oklahoma farm during the Dust Bowl. They migrate to California seeking work. Facing exploitation and poverty, they struggle. Tom Joad becomes radicalized. The novel depicts migrant workers\' hardships and calls for social justice. Steinbeck portrays human resilience amid economic despair.'
      },
      {
        _id: 6,
        title: 'East of Eden',
        author: 'John Steinbeck',
        description: 'A multi-generational family saga set in California\'s Salinas Valley.',
        coverImage: 'https://images.gr-assets.com/books/1441540565l/4406.jpg',
        story: 'The Trask family saga spans generations in Salinas Valley. Adam Trask and sons Caleb and Aron embody good and evil. Cathy Ames, evil incarnate, influences the family. The story explores free will, morality, and inheritance. Steinbeck draws parallels to Cain and Abel. The novel examines human nature and redemption.'
      }
    ],
    'adventure': [
      {
        _id: 1,
        title: 'The Adventures of Huckleberry Finn',
        author: 'Mark Twain',
        description: 'A boy and a runaway slave travel down the Mississippi River.',
        coverImage: 'https://images.gr-assets.com/books/1405973850l/2956.jpg',
        story: 'Huck Finn and Jim, a runaway slave, raft down the Mississippi. They encounter con artists, feuds, and moral dilemmas. Huck grapples with societal norms and friendship. The journey exposes antebellum South\'s hypocrisies. Twain satirizes racism and adventure, highlighting human complexity.'
      },
      {
        _id: 2,
        title: 'Treasure Island',
        author: 'Robert Louis Stevenson',
        description: 'A young boy finds a treasure map and sets sail for adventure.',
        coverImage: 'https://images.gr-assets.com/books/1485248909l/295.jpg',
        story: 'Jim Hawkins finds a treasure map at the Admiral Benbow Inn. He joins Captain Smollett, Squire Trelawney, and Dr. Livesey to find the treasure. Pirates, including Long John Silver, complicate the voyage. Jim faces mutiny and danger. The story celebrates courage and treasure hunting.'
      },
      {
        _id: 3,
        title: 'Into the Wild',
        author: 'Jon Krakauer',
        description: 'The true story of Christopher McCandless, who ventured into the Alaskan wilderness.',
        coverImage: 'https://images.gr-assets.com/books/1403173986l/1845.jpg',
        story: 'Chris McCandless graduates and donates his savings, then disappears. He hitchhikes to Alaska to live off the land. Krakauer investigates Chris\'s journey and death. The book explores idealism, wilderness, and human limits. Chris\'s story inspires and warns about unprepared adventures.'
      },
      {
        _id: 4,
        title: 'The Call of the Wild',
        author: 'Jack London',
        description: 'A domesticated dog is stolen and sold into the brutal life of an Alaskan sled dog.',
        coverImage: 'https://images.gr-assets.com/books/1452291694l/1852.jpg',
        story: 'Buck, a pampered dog, is kidnapped and sold as a sled dog in the Yukon. He adapts to the wild, learning survival. Buck joins a wolf pack, embracing instincts. The story symbolizes the call of the wild and natural law over civilization.'
      },
      {
        _id: 5,
        title: 'Life of Pi',
        author: 'Yann Martel',
        description: 'A young boy survives a shipwreck and shares a lifeboat with a Bengal tiger.',
        coverImage: 'https://images.gr-assets.com/books/1320562005l/4214.jpg',
        story: 'Pi Patel\'s family zoo ship sinks. Pi survives with Richard Parker, a tiger. They drift in the Pacific, facing starvation and storms. Pi uses faith and ingenuity. The story explores survival, faith, and storytelling. Two versions challenge reality.'
      },
      {
        _id: 6,
        title: 'Around the World in 80 Days',
        author: 'Jules Verne',
        description: 'Phileas Fogg attempts to circumnavigate the globe in 80 days.',
        coverImage: 'https://images.gr-assets.com/books/1308811578l/54479.jpg',
        story: 'Phileas Fogg bets he can circle the world in 80 days. With Passepartout, he travels by train, ship, and elephant. Delays and Detective Fix complicate the journey. Fogg overcomes obstacles, winning the bet. The novel celebrates adventure and Victorian ingenuity.'
      }
    ],
    'horror': [
      {
        _id: 1,
        title: 'The Shining',
        author: 'Stephen King',
        description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father.',
        coverImage: 'https://images.gr-assets.com/books/1353277730l/11588.jpg',
        story: 'Jack Torrance takes a winter caretaker job at the Overlook Hotel with wife Wendy and son Danny. Danny has psychic abilities revealing the hotel\'s evil. The hotel\'s malevolent spirits drive Jack insane. Wendy and Danny fight for survival. King builds tension through isolation and supernatural horror.'
      },
      {
        _id: 2,
        title: 'Dracula',
        author: 'Bram Stoker',
        description: 'The classic vampire novel that introduced Count Dracula to the world.',
        coverImage: 'https://images.gr-assets.com/books/1387151694l/17245.jpg',
        story: 'Jonathan Harker visits Count Dracula in Transylvania. Mina Murray and friends investigate vampire attacks. Van Helsing leads the hunt. Dracula spreads terror in England. The group uses science and faith against the undead. Stoker creates gothic horror with epistolary style.'
      },
      {
        _id: 3,
        title: 'Frankenstein',
        author: 'Mary Shelley',
        description: 'A scientist creates a monster that turns against its creator.',
        coverImage: 'https://images.gr-assets.com/books/1381512375l/18490.jpg',
        story: 'Victor Frankenstein creates life from corpses, but rejects his monster. The creature seeks revenge, killing Victor\'s loved ones. Victor pursues the monster across Europe. The story explores creation, responsibility, and humanity. Shelley\'s tale questions science and isolation.'
      },
      {
        _id: 4,
        title: 'It',
        author: 'Stephen King',
        description: 'A group of children face a terrifying entity that takes the form of a clown.',
        coverImage: 'https://images.gr-assets.com/books/1334416842l/830502.jpg',
        story: 'In Derry, children face Pennywise, an ancient evil appearing as a clown. The Losers\' Club fights It every 27 years. As adults, they return. King weaves horror with coming-of-age. Fear, friendship, and trauma define the battle against cosmic evil.'
      },
      {
        _id: 5,
        title: 'The Haunting of Hill House',
        author: 'Shirley Jackson',
        description: 'Four people participate in a paranormal study at a haunted mansion.',
        coverImage: 'https://images.gr-assets.com/books/1327871335l/89717.jpg',
        story: 'Dr. Montague studies Hill House with Eleanor, Theodora, and Luke. The house affects Eleanor psychologically. Ambiguous events blur reality and madness. Jackson creates psychological horror through suggestion. The house\'s influence leads to tragedy.'
      },
      {
        _id: 6,
        title: 'Mexican Gothic',
        author: 'Silvia Moreno-Garcia',
        description: 'A young woman travels to a mysterious house in Mexico to investigate her cousin\'s strange letter.',
        coverImage: 'https://images.gr-assets.com/books/1603191321l/53152636.jpg',
        story: 'Noemí Taboada investigates cousin Cat\'s disturbing letter from High Place. She encounters the oppressive house and family. Fungal horror and family secrets unfold. Noemí fights supernatural threats. Moreno-Garcia blends gothic horror with Mexican folklore.'
      }
    ],
    'biography': [
      {
        _id: 1,
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        description: 'The definitive biography of Apple\'s co-founder.',
        coverImage: 'https://images.gr-assets.com/books/1327861368l/11084145.jpg',
        story: 'Isaacson chronicles Jobs\' life from adoption to Apple\'s rise. Jobs\' perfectionism and vision created revolutionary products. He co-founded Apple, was ousted, then returned. Jobs battled cancer, launching iPhone and iPad. The biography reveals his complex personality and innovation legacy.'
      },
      {
        _id: 2,
        title: 'The Autobiography of Malcolm X',
        author: 'Malcolm X',
        description: 'The life story of the controversial civil rights activist.',
        coverImage: 'https://images.gr-assets.com/books/1438680321l/92057.jpg',
        story: 'Malcolm Little becomes Malcolm X in prison, converting to Islam. He leads Nation of Islam, advocating black nationalism. A pilgrimage to Mecca changes his views. Malcolm criticizes civil rights movement, then breaks with NOI. Assassinated in 1965, his autobiography inspires black empowerment.'
      },
      {
        _id: 3,
        title: 'Born a Crime',
        author: 'Trevor Noah',
        description: 'The comedian shares stories from his childhood in apartheid South Africa.',
        coverImage: 'https://images.gr-assets.com/books/1473867911l/29780253.jpg',
        story: 'Trevor Noah, mixed-race in apartheid South Africa, navigates racial laws. His mother\'s defiance shapes him. Trevor deals with poverty, abuse, and identity. He becomes a comedian, hosting The Daily Show. The memoir explores race, resilience, and humor.'
      },
      {
        _id: 4,
        title: 'Alexander Hamilton',
        author: 'Ron Chernow',
        description: 'The life of America\'s Founding Father, as told through the eyes of Lin-Manuel Miranda.',
        coverImage: 'https://images.gr-assets.com/books/1456674084l/16130.jpg',
        story: 'Alexander Hamilton rises from Caribbean poverty to American Founding Father. He serves as Washington\'s aide, writes Federalist Papers, establishes financial system. Political rivalries lead to duel with Aaron Burr. Chernow\'s biography details Hamilton\'s contributions to democracy.'
      },
      {
        _id: 5,
        title: 'Educated',
        author: 'Tara Westover',
        description: 'A woman raised in isolation by survivalists eventually earns a PhD.',
        coverImage: 'https://images.gr-assets.com/books/1506026635l/35133922.jpg',
        story: 'Tara Westover grows in Idaho mountains with conspiracy-believing parents. No formal education until 17. She teaches herself, attends college, earns PhD. Family conflicts and identity crises ensue. The memoir celebrates education\'s transformative power.'
      },
      {
        _id: 6,
        title: 'The Glass Castle',
        author: 'Jeannette Walls',
        description: 'A memoir about growing up in a dysfunctional family.',
        coverImage: 'https://images.gr-assets.com/books/1400930551l/7445.jpg',
        story: 'Jeannette Walls recounts chaotic childhood with alcoholic father and nomadic mother. Despite poverty and instability, she escapes to New York. The family\'s dysfunction includes homelessness and abuse. Walls reflects on forgiveness and resilience.'
      }
    ],
    'self-motivation': [
      {
        _id: 1,
        title: 'The Power of Habit',
        author: 'Charles Duhigg',
        description: 'Why we do what we do in life and business, and how to change it.',
        coverImage: 'https://images.gr-assets.com/books/1366758683l/12609433.jpg',
        story: 'Duhigg explores habit formation through cue, routine, reward. He shows how habits shape lives and organizations. Examples include P&G, Starbucks, and personal change. Readers learn to identify and alter habits for success.'
      },
      {
        _id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'Tiny changes, remarkable results - an easy and proven way to build good habits.',
        coverImage: 'https://images.gr-assets.com/books/1655988385l/40121378.jpg',
        story: 'Clear emphasizes small habit improvements compound over time. He provides four laws: obvious, attractive, easy, satisfying. Stories of athletes and CEOs illustrate principles. Readers get practical strategies for habit change.'
      },
      {
        _id: 3,
        title: 'Mindset: The New Psychology of Success',
        author: 'Carol S. Dweck',
        description: 'The power of believing that you can improve.',
        coverImage: 'https://images.gr-assets.com/books/1436227012l/40745.jpg',
        story: 'Dweck contrasts fixed and growth mindsets. Fixed mindset avoids challenges; growth embraces them. She shows mindsets affect success in school, sports, business. Changing mindset leads to greater achievement.'
      },
      {
        _id: 4,
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey',
        description: 'Powerful lessons in personal change.',
        coverImage: 'https://images.gr-assets.com/books/1421842784l/36072.jpg',
        story: 'Covey outlines seven habits for effectiveness: proactive, begin with end, first things first, win-win, understand then understood, synergize, sharpen saw. Paradigm shifts lead to personal and professional growth.'
      },
      {
        _id: 5,
        title: 'How to Win Friends and Influence People',
        author: 'Dale Carnegie',
        description: 'The only book you need to lead you to success in your professional and personal life.',
        coverImage: 'https://images.gr-assets.com/books/1442726934l/4865.jpg',
        story: 'Carnegie teaches principles for better relationships: smile, remember names, listen, avoid criticism. He provides techniques for influencing others and handling people. The book remains a classic for interpersonal skills.'
      },
      {
        _id: 6,
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        description: 'A counterintuitive approach to living a good life.',
        coverImage: 'https://images.gr-assets.com/books/1465761302l/28257707.jpg',
        story: 'Manson argues chasing happiness leads to misery. He advocates choosing struggles wisely and accepting limitations. Through stories and philosophy, he shows meaning comes from problems. Embrace imperfection for better life.'
      }
    ],
    'poetry': [
      {
        _id: 1,
        title: 'The Complete Poems',
        author: 'Emily Dickinson',
        description: 'A collection of poems by the reclusive American poet.',
        coverImage: 'https://images.gr-assets.com/books/1327878595l/122963.jpg',
        story: 'Emily Dickinson\'s poems explore death, immortality, nature, and love. Her unconventional punctuation and slant rhyme innovate poetry. Themes of spirituality and introspection define her work. Dickinson\'s reclusive life adds mystery to her verses.'
      },
      {
        _id: 2,
        title: 'Leaves of Grass',
        author: 'Walt Whitman',
        description: 'The seminal work of American poetry.',
        coverImage: 'https://images.gr-assets.com/books/1418765176l/27424.jpg',
        story: 'Whitman celebrates democracy, nature, and the self in free verse. "Song of Myself" explores identity and connection. The collection evolves, reflecting American life. Whitman\'s bold style influences modern poetry.'
      },
      {
        _id: 3,
        title: 'The Waste Land and Other Poems',
        author: 'T.S. Eliot',
        description: 'Modernist poetry that changed the literary world.',
        coverImage: 'https://images.gr-assets.com/books/1386933647l/15247.jpg',
        story: 'Eliot\'s "The Waste Land" depicts post-WWI disillusionment with allusions and fragmentation. Other poems like "The Love Song of J. Alfred Prufrock" explore alienation. Eliot\'s work revolutionizes poetry with modernist techniques.'
      },
      {
        _id: 4,
        title: 'Milk and Honey',
        author: 'Rupi Kaur',
        description: 'A collection of poetry and prose about survival, healing, and love.',
        coverImage: 'https://images.gr-assets.com/books/1483795634l/23513349.jpg',
        story: 'Kaur\'s debut explores abuse, love, loss, and femininity. Illustrated poems address healing and self-love. The book empowers women through raw, honest expression. Kaur\'s accessible style resonates widely.'
      },
      {
        _id: 5,
        title: 'The Sun and Her Flowers',
        author: 'Rupi Kaur',
        description: 'A journey through love, loss, trauma, healing, and femininity.',
        coverImage: 'https://images.gr-assets.com/books/1494424461l/30688435.jpg',
        story: 'Kaur\'s second collection journeys through wilting, falling, rooting, rising, blooming. Themes of trauma, healing, and growth unfold. Illustrated poems celebrate resilience and femininity. Kaur continues empowering readers.'
      },
      {
        _id: 6,
        title: 'Ariel',
        author: 'Sylvia Plath',
        description: 'A collection of poems written during Plath\'s most productive period.',
        coverImage: 'https://images.gr-assets.com/books/1425592949l/16791.jpg',
        story: 'Plath\'s Ariel poems, written before her death, explore identity, death, and rebirth. Confessional style reveals personal struggles. "Daddy" and "Lady Lazarus" showcase intense emotion. The collection cements Plath\'s poetic legacy.'
      }
    ],
    'historical': [
      {
        _id: 1,
        title: 'The Pillars of the Earth',
        author: 'Ken Follett',
        description: 'A epic tale of 12th-century England and the building of a cathedral.',
        coverImage: 'https://images.gr-assets.com/books/1578998618l/5043.jpg',
        story: 'In 12th-century England, Tom Builder pursues his dream of building a cathedral. Political intrigue and war surround the project. Characters navigate ambition, love, and faith. Follett weaves historical detail with compelling drama.'
      },
      {
        _id: 2,
        title: 'The Book Thief',
        author: 'Markus Zusak',
        description: 'A story of a young girl living in Nazi Germany, narrated by Death.',
        coverImage: 'https://images.gr-assets.com/books/1390053681l/19063.jpg',
        story: 'Liesel steals books in Nazi Germany, finding solace in words. Narrated by Death, the story explores humanity amid horror. Liesel\'s courage and love shine through war\'s darkness.'
      },
      {
        _id: 3,
        title: 'All the Light We Cannot See',
        author: 'Anthony Doerr',
        description: 'A story of a blind French girl and a German boy whose paths collide in occupied France.',
        coverImage: 'https://images.gr-assets.com/books/1451446835l/18143977.jpg',
        story: 'Marie-Laure, blind French girl, and Werner, German orphan, connect through radio waves during WWII. Their stories intertwine in occupied France. Doerr explores science, history, and human connection.'
      },
      {
        _id: 4,
        title: 'The Nightingale',
        author: 'Kristin Hannah',
        description: 'Two sisters in France during World War II make different choices to survive.',
        coverImage: 'https://images.gr-assets.com/books/1408332106l/21853621.jpg',
        story: 'Vianne and Isabelle survive WWII differently. Vianne stays home; Isabelle joins Resistance. Their choices test sisterhood and courage. Hannah portrays war\'s impact on women.'
      },
      {
        _id: 5,
        title: 'The Help',
        author: 'Kathryn Stockett',
        description: 'Three women in 1960s Mississippi work together to change their lives.',
        coverImage: 'https://images.gr-assets.com/books/1344373987l/4669.jpg',
        story: 'In 1960s Mississippi, Skeeter, Aibileen, and Minny challenge racism. They write book exposing maids\' experiences. Risks and friendships drive the story. Stockett addresses civil rights era.'
      },
      {
        _id: 6,
        title: 'Code Name Verity',
        author: 'Elizabeth Wein',
        description: 'A story of friendship and bravery during World War II.',
        coverImage: 'https://images.gr-assets.com/books/1355178475l/17898036.jpg',
        story: 'Verity, captured spy, tells Maddie\'s story under duress. Their friendship and bravery unfold in WWII. Wein explores loyalty, sacrifice, and female heroism.'
      }
    ],
    'cooking': [
      {
        _id: 1,
        title: 'The Joy of Cooking',
        author: 'Irma S. Rombauer',
        description: 'The classic cookbook that has been a staple in American kitchens for generations.',
        coverImage: 'https://images.gr-assets.com/books/1386925114l/168668.jpg',
        story: 'Rombauer\'s comprehensive cookbook covers basics to advanced. Practical recipes for home cooks. Updated editions maintain relevance. Iconic for American cooking.'
      },
      {
        _id: 2,
        title: 'Mastering the Art of French Cooking',
        author: 'Julia Child',
        description: 'The definitive guide to French cuisine.',
        coverImage: 'https://images.gr-assets.com/books/1388340757l/1169.jpg',
        story: 'Child demystifies French cooking for Americans. Detailed techniques and recipes. Inspired TV show. Revolutionized home cooking.'
      },
      {
        _id: 3,
        title: 'The Barefoot Contessa Cookbook',
        author: 'Ina Garten',
        description: 'Recipes from the famous specialty food store.',
        coverImage: 'https://images.gr-assets.com/books/1386925114l/168668.jpg',
        story: 'Garten shares store recipes. Emphasis on quality ingredients. Accessible for home cooks. Focus on entertaining.'
      },
      {
        _id: 4,
        title: 'River Cottage Veg',
        author: 'Hugh Fearnley-Whittingstall',
        description: 'Over 200 inspired vegetarian recipes.',
        coverImage: 'https://images.gr-assets.com/books/1344373987l/4669.jpg',
        story: 'Whittingstall promotes seasonal, local vegetarian cooking. Creative recipes. Sustainable approach. Inspires plant-based eating.'
      },
      {
        _id: 5,
        title: 'Plenty',
        author: 'Yotam Ottolenghi',
        description: 'Vibrant vegetable cooking from London\'s Ottolenghi.',
        coverImage: 'https://images.gr-assets.com/books/1355178475l/17898036.jpg',
        story: 'Ottolenghi celebrates vegetables with global flavors. Stunning photography. Innovative combinations. Elevates vegetarian cuisine.'
      },
      {
        _id: 6,
        title: 'Love and Lemons',
        author: 'Jeanine Donofrio',
        description: 'A plant-based cookbook with beautiful photography.',
        coverImage: 'https://images.gr-assets.com/books/1451446835l/18143977.jpg',
        story: 'Donofrio offers fresh, plant-based recipes. Vibrant photos. Seasonal focus. Encourages healthy, delicious eating.'
      }
    ],
    'travel': [
      {
        _id: 1,
        title: 'On the Road',
        author: 'Jack Kerouac',
        description: 'The classic American road trip novel.',
        coverImage: 'https://images.gr-assets.com/books/1411037977l/11297.jpg',
        story: 'Sal Paradise and Dean Moriarty cross America in spontaneous journeys. Beat Generation spirit. Freedom and adventure. Kerouac\'s stream-of-consciousness style.'
      },
      {
        _id: 2,
        title: 'Eat Pray Love',
        author: 'Elizabeth Gilbert',
        description: 'A woman\'s journey of self-discovery through Italy, India, and Indonesia.',
        coverImage: 'https://images.gr-assets.com/books/1503066414l/19501.jpg',
        story: 'Gilbert travels post-divorce. Italy for pleasure, India for spirituality, Indonesia for balance. Self-discovery through food, meditation, love.'
      },
      {
        _id: 3,
        title: 'The Beach',
        author: 'Alex Garland',
        description: 'A young man discovers a secret beach in Thailand.',
        coverImage: 'https://images.gr-assets.com/books/1327871335l/89717.jpg',
        story: 'Richard finds paradise beach via map. Idyllic at first, then dark. Explores utopia\'s flaws. Garland\'s debut novel.'
      },
      {
        _id: 4,
        title: 'Into the Wild',
        author: 'Jon Krakauer',
        description: 'The true story of a man who ventures into the Alaskan wilderness.',
        coverImage: 'https://images.gr-assets.com/books/1403173986l/1845.jpg',
        story: 'Chris McCandless seeks wilderness truth. Dies in Alaska. Krakauer investigates motivations. Explores freedom and risk.'
      },
      {
        _id: 5,
        title: 'Wild',
        author: 'Cheryl Strayed',
        description: 'A woman hikes the Pacific Crest Trail to find herself.',
        coverImage: 'https://images.gr-assets.com/books/1453189881l/12262741.jpg',
        story: 'Strayed hikes PCT after loss. Physical and emotional journey. Solitude and nature heal. Memoir of resilience.'
      },
      {
        _id: 6,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description: 'A shepherd boy\'s journey to find his personal legend.',
        coverImage: 'https://images.gr-assets.com/books/1483412266l/865.jpg',
        story: 'Santiago follows dream to treasure. Learns omens and soul. Journey of self-discovery. Coelho\'s philosophical tale.'
      }
    ],
    'art': [
      {
        _id: 1,
        title: 'The Story of Art',
        author: 'E.H. Gombrich',
        description: 'A comprehensive history of art from prehistoric times to the present.',
        coverImage: 'https://images.gr-assets.com/books/1387740288l/222078.jpg',
        story: 'Gombrich traces art history accessibly. From cave paintings to modern art. Explains styles and techniques. Essential for art lovers.'
      },
      {
        _id: 2,
        title: 'Ways of Seeing',
        author: 'John Berger',
        description: 'A groundbreaking book on art criticism and visual culture.',
        coverImage: 'https://images.gr-assets.com/books/1327878595l/122963.jpg',
        story: 'Berger challenges traditional art viewing. TV series and book. Examines how we see art. Influential on visual culture.'
      },
      {
        _id: 3,
        title: 'The Art Book',
        author: 'Phaidon Press',
        description: 'A comprehensive guide to art through the ages.',
        coverImage: 'https://images.gr-assets.com/books/1387151694l/17245.jpg',
        story: 'Phaidon\'s visual guide to art. 500 artists, 1000 works. From ancient to contemporary. Portable art history.'
      },
      {
        _id: 4,
        title: 'Steal Like an Artist',
        author: 'Austin Kleon',
        description: '10 things nobody told you about being creative.',
        coverImage: 'https://images.gr-assets.com/books/1404588136l/13099738.jpg',
        story: 'Kleon encourages creative theft. Learn from others, remix ideas. Practical advice for artists. Inspirational for creativity.'
      },
      {
        _id: 5,
        title: 'Bird by Bird',
        author: 'Anne Lamott',
        description: 'Some instructions on writing and life.',
        coverImage: 'https://images.gr-assets.com/books/1386925114l/12543.jpg',
        story: 'Lamott shares writing wisdom. Overcome blocks, embrace imperfection. Memoir-style advice. Beloved by writers.'
      },
      {
        _id: 6,
        title: 'The Artist\'s Way',
        author: 'Julia Cameron',
        description: 'A spiritual path to higher creativity.',
        coverImage: 'https://images.gr-assets.com/books/1387740288l/615570.jpg',
        story: 'Cameron\'s 12-week program for creativity. Morning pages, artist dates. Unblock creative self. Millions inspired.'
      }
    ]
  };

  const fetchBooksByGenre = async () => {
    try {
      setLoading(true);
      // Use the optimized API call with genre parameter
      const response = await bookService.getBooksByGenre(genre);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (book) => {
    try {
      await libraryService.addToLibrary(book._id);
      alert('Book added to your library successfully!');
    } catch (error) {
      console.error('Error adding book to library:', error);
      if (error.response?.status === 409) {
        alert('Book is already in your library!');
      } else {
        alert('Failed to add book to library. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '76px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 text-center text-white"
        style={{
          background: `url('${genreImages[genre] || 'https://images.unsplash.com/photo-1512820790803-83ca734da794'}') center/cover no-repeat`,
          marginTop: '76px'
        }}
      >
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '60px' }}>
          <h1 className="fw-bold">{genreTitles[genre] || 'Genre Books'}</h1>
          <p>{genreDescriptions[genre] || 'Explore amazing books in this genre'}</p>
        </div>
      </section>

      {/* Books Section */}
      <section className="container py-5">
        <h2 className="section-title">Top {genreTitles[genre]?.replace(' Books', '') || genre} Picks</h2>
        <Row className="g-4">
          {books.length > 0 ? (
            books.map((book, index) => (
              <Col key={index} md={3} sm={6}>
                <BookCard book={book} onAddToLibrary={handleAddToLibrary} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <Alert variant="info">
                No books found for this genre.
              </Alert>
            </Col>
          )}
        </Row>
      </section>
    </>
  );
};

export default GenrePage;