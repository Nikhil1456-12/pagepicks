const mongoose = require('mongoose');
const Book = require('./models/Book');
const connectDB = require('./config/database');
require('dotenv').config();

const booksData = [
  // Fantasy Books
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    genre: 'fantasy',
    description: 'A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    story: 'Harry Potter lived with his cruel aunt and uncle, the Dursleys, who treated him poorly. On his eleventh birthday, he learned he was a wizard from Hagrid, the groundskeeper at Hogwarts. Harry embarked on a magical journey, making friends like Ron and Hermione, and facing the dark wizard Voldemort who killed his parents. At Hogwarts, he discovered his talent for Quidditch and learned spells, potions, and the history of magic. The story culminates in Harry protecting the Philosopher\'s Stone from Voldemort, proving his bravery and marking the beginning of his legendary adventures.'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'fantasy',
    description: 'A epic tale of adventure, friendship, and the battle against evil in Middle-earth.',
    coverImage: 'https://images.gr-assets.com/books/1411114164l/33.jpg',
    story: 'In the peaceful land of the Shire, hobbit Frodo Baggins inherits a mysterious ring from his uncle Bilbo. The ring, forged by the dark lord Sauron, threatens to enslave Middle-earth. Frodo, accompanied by a fellowship including Gandalf, Aragorn, Legolas, Gimli, Boromir, Merry, Pippin, and Sam, sets out to destroy the ring in Mount Doom. Along the way, they face orcs, trolls, and the treacherous Gollum. The epic journey tests their courage, friendship, and resolve, ultimately leading to the downfall of Sauron and the restoration of peace.'
  },
  {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'fantasy',
    description: 'The story of Kvothe, a gifted young man who grows to be the most notorious magician his world has ever seen.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Kvothe, a brilliant young man, recounts his life story to a scribe. Orphaned by a tragic event, he becomes a street urchin, learning sympathy from an actor troupe. His exceptional talent leads him to the University, where he studies sympathy and naming. Kvothe faces challenges, including poverty and rivalry, while uncovering secrets about the Chandrian and the Amyr. His journey is one of discovery, loss, and the pursuit of knowledge, shaping him into a legendary figure known as the Bloodless.'
  },
  {
    title: 'Mistborn: The Final Empire',
    author: 'Brandon Sanderson',
    genre: 'fantasy',
    description: 'A thief with a mysterious ability joins a crew to overthrow an immortal emperor.',
    coverImage: 'https://images.gr-assets.com/books/1437254833l/68428.jpg',
    story: 'In a world ruled by the immortal Lord Ruler, Vin, a street urchin with Allomantic powers, joins Kelsier\'s crew of thieves. They plan to overthrow the oppressive regime by stealing the Lord Ruler\'s atium and inciting a revolution. Vin discovers her unique ability to burn metals, becoming a powerful Mistborn. The crew faces betrayals, battles, and moral dilemmas. Through courage and sacrifice, they challenge the Final Empire, leading to a climactic confrontation that changes the world forever.'
  },
  {
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    genre: 'fantasy',
    description: 'A storm brings change to a war-torn land, revealing ancient secrets.',
    coverImage: 'https://images.gr-assets.com/books/1388184640l/7235533.jpg',
    story: 'On the storm-ravaged world of Roshar, Kaladin, a former soldier turned slave, discovers his ability to Surgebind. Dalinar Kholin, a highprince, experiences visions that challenge his beliefs. Shallan, a young scholar, seeks knowledge and power. Their paths converge in a land plagued by endless wars and ancient spren. As they uncover the secrets of the Knights Radiant and the Voidbringers, they must unite to face an impending catastrophe, exploring themes of honor, leadership, and the nature of war.'
  },
  {
    title: 'Stardust',
    author: 'Neil Gaiman',
    genre: 'fantasy',
    description: 'A young man ventures into a magical realm to retrieve a fallen star for his beloved.',
    coverImage: 'https://images.gr-assets.com/books/1459127484l/16793.jpg',
    story: 'Tristran Thorn promises to bring a fallen star to his love Victoria. Crossing into the magical realm of Faerie, he encounters witches, sky pirates, and the star Yvaine, who is actually a living being. Pursued by various factions seeking the star\'s heart for immortality, Tristran protects Yvaine. Along the way, he learns about courage, love, and the wonders of Faerie. The adventure transforms Tristran, leading to unexpected romance and self-discovery.'
  },

  // Sci-Fi Books
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'sci-fi',
    description: 'On the desert planet Arrakis, a young man becomes embroiled in a struggle for control of the universe\'s most valuable resource.',
    coverImage: 'https://images.gr-assets.com/books/1434908555l/234225.jpg',
    story: 'Paul Atreides, son of Duke Leto, arrives on Arrakis with his family. The planet, source of the spice melange, is vital for space travel. Betrayed by the Emperor and House Harkonnen, Paul\'s family is destroyed. Paul, trained by his mother Lady Jessica, embraces the Fremen culture and becomes Muad\'Dib. He leads a revolution against the oppressors, mastering the desert and the spice. The story explores politics, religion, and ecology in a vast interstellar empire.'
  },
  {
    title: 'Neuromancer',
    author: 'William Gibson',
    genre: 'sci-fi',
    description: 'A washed-up computer hacker is hired for one last job that could change the world.',
    coverImage: 'https://images.gr-assets.com/books/1167348726l/22328.jpg',
    story: 'Case, a cyberpunk hacker, has his nervous system damaged by his former employers. Hired by Armitage for a mysterious job, Case teams up with Molly, a street samurai. They navigate the digital underworld, encountering artificial intelligences and corporate conspiracies. The mission involves stealing data from a powerful AI. As they delve deeper, Case questions reality and his own identity in a world of cyberspace and biotechnology.'
  },
  {
    title: 'The Left Hand of Darkness',
    author: 'Ursula K. Le Guin',
    genre: 'sci-fi',
    description: 'An envoy is sent to a planet where the inhabitants can change their gender at will.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Genly Ai, an envoy from the Ekumen, arrives on Winter, a planet of ambisexual humans. He struggles to understand their culture, where people change gender seasonally. Accompanied by Estraven, a disgraced prime minister, they flee political intrigue. Through their journey across the icy planet, Ai learns about trust, gender, and humanity. The novel explores themes of identity and cultural differences in a science fiction setting.'
  },
  {
    title: 'Snow Crash',
    author: 'Neal Stephenson',
    genre: 'sci-fi',
    description: 'A pizza delivery driver discovers a conspiracy involving virtual reality and ancient Sumerian mythology.',
    coverImage: 'https://images.gr-assets.com/books/1477624625l/830.jpg',
    story: 'Hiro Protagonist, a hacker and pizza deliverer, encounters a mysterious drug called Snow Crash in the Metaverse. Teaming with Y.T., a skateboard courier, he uncovers a plot involving ancient Sumerian gods and a digital virus. The story blends virtual reality, cryptography, and mythology. Hiro races to stop the virus from destroying both the digital and physical worlds, exploring the intersection of technology and ancient lore.'
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'sci-fi',
    description: 'An astronaut stranded on Mars must use his ingenuity to survive and find a way home.',
    coverImage: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
    story: 'Mark Watney, an astronaut, is left for dead on Mars after a storm. Using his scientific knowledge, he grows potatoes, generates water, and signals Earth. NASA and a private company work to rescue him. Through logs and communications, Watney\'s humor and ingenuity shine. The story highlights human resilience, international cooperation, and the challenges of space exploration.'
  },
  {
    title: 'Foundation',
    author: 'Isaac Asimov',
    genre: 'sci-fi',
    description: 'A mathematician develops a science to predict the future of humanity.',
    coverImage: 'https://images.gr-assets.com/books/1417900846l/29579.jpg',
    story: 'Hari Seldon, a psychohistorian, predicts the Galactic Empire\'s fall. He establishes the Foundation on Terminus to shorten the dark age. Encyclopedists and traders preserve knowledge. Facing threats from neighboring kingdoms and internal strife, the Foundation uses Seldon\'s plans. The story explores the power of science, prediction, and the cycles of civilization.'
  },

  // Mystery Books
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genre: 'mystery',
    description: 'A journalist and a hacker investigate a disappearance that leads to dark family secrets.',
    coverImage: 'https://images.gr-assets.com/books/1327868566l/2429135.jpg',
    story: 'Mikael Blomkvist, a disgraced journalist, teams up with Lisbeth Salander, a brilliant hacker, to investigate the disappearance of Harriet Vanger. The case leads to the powerful Vanger family and their dark secrets. As they uncover incest, murder, and corruption, Lisbeth\'s troubled past intertwines with the investigation. The duo faces danger and betrayal, revealing a web of evil that spans generations.'
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'mystery',
    description: 'A man becomes the prime suspect when his wife goes missing on their fifth anniversary.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc97?w=400&h=600&fit=crop',
    story: 'Nick Dunne reports his wife Amy missing on their anniversary. As evidence points to him, Amy\'s diary reveals a troubled marriage. The story alternates between Nick\'s perspective and Amy\'s diary, uncovering lies and manipulations. Amy, presumed dead, has orchestrated an elaborate revenge. The novel explores media sensationalism, marriage, and the nature of truth.'
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'mystery',
    description: 'A woman refuses to speak after allegedly murdering her husband, and a psychotherapist tries to uncover the truth.',
    coverImage: 'https://images.gr-assets.com/books/1668782119l/40097951.jpg',
    story: 'Alicia Berenson, a famous painter, shoots her husband and stops speaking. Theo Faber, a psychotherapist, takes her case at the Grove. Through therapy sessions and investigations, Theo uncovers Alicia\'s past traumas. The story reveals layers of deception, jealousy, and mental illness. Theo\'s obsession with the case blurs professional boundaries, leading to shocking revelations.'
  },
  {
    title: 'Big Little Lies',
    author: 'Liane Moriarty',
    genre: 'mystery',
    description: 'Three women\'s lives unravel when a murder occurs at their children\'s school.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9e?w=400&h=600&fit=crop',
    story: 'Madeline, Celeste, and Jane navigate school politics and personal dramas in a wealthy suburb. A school trivia night ends in murder. Flashbacks reveal secrets: Madeline\'s ex-husband, Celeste\'s abusive marriage, Jane\'s assault. The women form bonds amid lies and betrayals. The story explores friendship, domestic violence, and the facades of perfect lives.'
  },
  {
    title: 'The Cuckoo\'s Calling',
    author: 'Robert Galbraith',
    genre: 'mystery',
    description: 'A private detective investigates the suspicious death of a supermodel.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc98?w=400&h=600&fit=crop',
    story: 'Cormoran Strike, a private detective, investigates supermodel Lula Landry\'s apparent suicide. Hired by her brother, Strike and his assistant Robin uncover inconsistencies. They delve into Lula\'s life, revealing affairs, addictions, and family secrets. The case involves high society and media scrutiny. Strike\'s military background and personal struggles add depth to the investigation.'
  },
  {
    title: 'Sharp Objects',
    author: 'Gillian Flynn',
    genre: 'mystery',
    description: 'A journalist returns to her hometown to cover a series of murders.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9f?w=400&h=600&fit=crop',
    story: 'Camille Preaker, a troubled journalist, returns to Wind Gap to cover child murders. Haunted by her past, she investigates while dealing with her mother and sister. The town\'s secrets and her own traumas surface. Camille\'s self-harm and family dysfunction complicate the case. The story builds to a chilling revelation about the killer and Camille\'s connection.'
  },

  // Romance Books
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'romance',
    description: 'Elizabeth Bennet navigates issues of manners, upbringing, morality, and marriage.',
    coverImage: 'https://images.gr-assets.com/books/1320399351l/1885.jpg',
    story: 'Elizabeth Bennet, a witty young woman, meets the proud Mr. Darcy at a ball. Initial misunderstandings and prejudices create tension. As they interact, Elizabeth learns of Darcy\'s true character. Through letters, dances, and family dramas, love blossoms. The novel satirizes society\'s marriage market while celebrating personal growth and genuine affection.'
  },
  {
    title: 'The Notebook',
    author: 'Nicholas Sparks',
    genre: 'romance',
    description: 'A man with a faded, well-worn notebook open to a drawing of a woman holding a rose.',
    coverImage: 'https://images.gr-assets.com/books/1385738917l/15931.jpg',
    story: 'Noah Calhoun reads from a notebook to Allie Nelson, who has Alzheimer\'s. The story flashes between their youth and present. Young Allie and Noah fall in love during a summer, but class differences separate them. Years later, they reunite, but Allie is engaged. Noah fights for their love, building a house and writing letters. The poignant tale explores enduring love and memory.'
  },
  {
    title: 'Outlander',
    author: 'Diana Gabaldon',
    genre: 'romance',
    description: 'A woman travels back in time to 18th-century Scotland and finds adventure and love.',
    coverImage: 'https://images.gr-assets.com/books/1451446835l/10964.jpg',
    story: 'Claire Randall, a WWII nurse, is transported to 1743 Scotland. She marries Jamie Fraser to survive. Torn between her husband Frank and Jamie, Claire navigates clan wars and time paradoxes. The story blends romance, history, and adventure. Claire\'s choices test loyalty and love across time.'
  },
  {
    title: 'Me Before You',
    author: 'Jojo Moyes',
    genre: 'romance',
    description: 'A young woman is hired to care for a wealthy, depressed man who decides to end his life.',
    coverImage: 'https://images.gr-assets.com/books/1357108762l/17347634.jpg',
    story: 'Louisa Clark cares for Will Traynor, paralyzed after an accident. Will, depressed, plans assisted suicide. Lou tries to change his mind through adventures. Their relationship evolves from caregiver-patient to deep love. The story explores disability, happiness, and the right to die, challenging preconceptions.'
  },
  {
    title: 'The Time Traveler\'s Wife',
    author: 'Audrey Niffenegger',
    genre: 'romance',
    description: 'A man with a genetic disorder that causes him to time travel unpredictably, and his wife who has to cope with his frequent absences.',
    coverImage: 'https://images.gr-assets.com/books/1438769591l/14050.jpg',
    story: 'Henry time travels unpredictably due to a genetic condition. Clare meets adult Henry as a child, then falls in love as adults. Their relationship faces challenges from Henry\'s absences and future knowledge. The nonlinear narrative explores love, loss, and the complexities of time. Clare\'s patience and Henry\'s struggles create a poignant love story.'
  },
  {
    title: 'Beach Read',
    author: 'Emily Henry',
    genre: 'romance',
    description: 'Two writers, one romance and one literary fiction, swap genres for the summer.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Romance writer January and literary fiction author Gus are neighbors and rivals. Struggling with writer\'s block, they swap genres for the summer. January writes literary fiction, Gus romance. As they share progress, attraction grows. The story explores creativity, grief, and love. Their collaboration leads to personal growth and romance.'
  },

  // Non-Fiction Books
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'non-fiction',
    description: 'A sweeping narrative of the history of our species from the Stone Age to the modern age.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Harari traces human history from the Cognitive Revolution to the present. He explains how Homo sapiens dominated through myths and cooperation. The Agricultural Revolution brought farming but also inequality. Scientific and industrial revolutions transformed society. Harari discusses happiness, meaning, and future challenges like AI and biotechnology. The book challenges assumptions about progress and human nature.'
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'non-fiction',
    description: 'A memoir about a woman who grows up in a survivalist family and eventually gets a PhD from Cambridge.',
    coverImage: 'https://images.gr-assets.com/books/1506026635l/35133922.jpg',
    story: 'Tara Westover grows up in rural Idaho with survivalist parents who reject formal education. She teaches herself and enters Brigham Young University. Despite family conflicts and lack of records, she earns scholarships. Tara faces identity crises, mental health issues, and family estrangement. Her journey to Cambridge represents triumph over adversity and the power of self-education.'
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'non-fiction',
    description: 'The former First Lady shares her life story and the tools she used to overcome challenges.',
    coverImage: 'https://images.gr-assets.com/books/1528206996l/38746485.jpg',
    story: 'Michelle Obama recounts her Chicago upbringing, Princeton education, and meeting Barack. She discusses marriage, motherhood, and political life. As First Lady, she advocates for education, health, and women\'s rights. The memoir explores identity, ambition, and resilience. Michelle shares personal struggles and triumphs, offering inspiration.'
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    genre: 'non-fiction',
    description: 'A counterintuitive approach to living a good life by embracing our limitations.',
    coverImage: 'https://images.gr-assets.com/books/1465761302l/28257707.jpg',
    story: 'Manson argues that constant positivity is harmful. He advocates choosing struggles wisely and accepting limitations. The book covers relationships, failure, and death. Manson uses stories and psychology to show that meaning comes from problems. He encourages responsibility and realistic expectations for happiness.'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'non-fiction',
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://images.gr-assets.com/books/1655988385l/40121378.jpg',
    story: 'Clear explains habit formation through the compound effect of small changes. He introduces the habit loop and four laws: make it obvious, attractive, easy, satisfying. The book uses stories of athletes, artists, and CEOs. Clear provides practical strategies for habit stacking, environment design, and tracking progress.'
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'non-fiction',
    description: 'A groundbreaking tour of the mind that reveals how we think and make decisions.',
    coverImage: 'https://images.gr-assets.com/books/1317793965l/11468377.jpg',
    story: 'Kahneman divides thinking into System 1 (fast, intuitive) and System 2 (slow, deliberate). He explores cognitive biases like anchoring and availability heuristic. The book covers prospect theory and loss aversion. Kahneman discusses happiness, confidence, and expert judgment. The work integrates psychology and economics for better decision-making.'
  },

  // Cooking Books
  {
    title: 'The Joy of Cooking',
    author: 'Irma S. Rombauer',
    genre: 'cooking',
    description: 'A comprehensive cookbook that has been a kitchen staple for generations.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'First published in 1931, this cookbook has taught millions how to cook with confidence. Irma Rombauer created this comprehensive guide to cover everything from basic techniques to complex recipes. The book includes detailed instructions, helpful tips, and variations for dietary needs. It covers appetizers, main courses, desserts, and everything in between. The Joy of Cooking remains a trusted reference for both novice and experienced cooks.'
  },
  {
    title: 'Mastering the Art of French Cooking',
    author: 'Julia Child',
    genre: 'cooking',
    description: 'The classic cookbook that brought French cuisine to American kitchens.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc99?w=400&h=600&fit=crop',
    story: 'Julia Child revolutionized American cooking with this masterpiece. Written with Simone Beck and Louisette Bertholle, this book demystifies French cooking techniques. It includes detailed instructions for bouillabaisse, coq au vin, and cassoulet. Child\'s enthusiasm and clear explanations made French cuisine accessible to home cooks. The book emphasizes fresh ingredients, proper techniques, and the joy of cooking.'
  },
  {
    title: 'Salt, Fat, Acid, Heat',
    author: 'Samin Nosrat',
    genre: 'cooking',
    description: 'A revolutionary approach to cooking based on four essential elements.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Chef Samin Nosrat breaks down cooking to four basic elements: salt, fat, acid, and heat. This innovative approach helps cooks understand why recipes work and how to fix them when they don\'t. The book includes recipes from around the world and teaches fundamental skills. Nosrat\'s philosophy emphasizes tasting, experimentation, and developing culinary intuition. It\'s become essential reading for aspiring chefs and home cooks.'
  },
  {
    title: 'The Food Lab',
    author: 'J. Kenji López-Alt',
    genre: 'cooking',
    description: 'A comprehensive guide to cooking based on science and experimentation.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Kenji López-Alt spent years testing and perfecting recipes in his home kitchen laboratory. This book explains the science behind cooking techniques and ingredients. It covers everything from perfect scrambled eggs to complex multi-day projects. The author\'s rigorous testing and clear explanations help readers understand cooking principles. The Food Lab has become a go-to reference for serious home cooks.'
  },
  {
    title: 'Essentials of Classic Italian Cooking',
    author: 'Marcella Hazan',
    genre: 'cooking',
    description: 'The definitive guide to authentic Italian home cooking.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Marcella Hazan brought authentic Italian cooking to American audiences. This book focuses on traditional recipes from various Italian regions. It includes simple pasta sauces, hearty meat dishes, and delicate desserts. Hazan emphasizes fresh ingredients and time-honored techniques. Her clear instructions and passion for Italian food culture shine through. The book remains a cornerstone of Italian cooking education.'
  },

  // Self-Motivation Books
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'self-motivation',
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'James Clear explains how small changes can make a big difference in our lives. The book introduces practical strategies for habit formation and breaking bad habits. Clear uses scientific research and real-world examples to illustrate his points. He emphasizes the compound effect of small daily improvements. The book provides a framework for continuous self-improvement and personal growth.'
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    genre: 'self-motivation',
    description: 'A holistic approach to personal and professional effectiveness.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Stephen Covey presents seven principles for personal and professional success. The habits range from being proactive to continuous learning. Covey emphasizes character development and paradigm shifts. The book has sold millions and influenced countless leaders. It provides a framework for personal change and interpersonal relationships.'
  },
  {
    title: 'Mindset: The New Psychology of Success',
    author: 'Carol S. Dweck',
    genre: 'self-motivation',
    description: 'How your mindset determines your success in life.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Carol Dweck introduces the concept of fixed vs. growth mindsets. People with growth mindsets embrace challenges and learn from failure. Those with fixed mindsets avoid challenges and give up easily. Dweck\'s research shows how mindset affects achievement in all areas of life. The book provides strategies for developing a growth mindset.'
  },
  {
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    genre: 'self-motivation',
    description: 'Timeless advice on building relationships and achieving success.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Dale Carnegie shares principles for improving interpersonal relationships. The book covers topics like making people feel important and winning arguments. Carnegie uses real-life examples and practical advice. The principles remain relevant in today\'s digital age. The book has helped millions improve their personal and professional relationships.'
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    genre: 'self-motivation',
    description: 'Understanding how habits work and how to change them.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Charles Duhigg explores the science of habit formation. He explains the habit loop: cue, routine, and reward. The book includes stories of individuals and organizations that changed habits. Duhigg shows how habits influence personal and business success. Readers learn strategies for replacing bad habits with good ones.'
  },

  // Drama Books
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'drama',
    description: 'A tale of wealth, love, and the American Dream in the Jazz Age.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Jay Gatsby throws lavish parties hoping to win back his lost love, Daisy Buchanan. Set in the summer of 1922, the novel explores themes of decadence and idealism. Narrated by Nick Carraway, the story reveals Gatsby\'s mysterious past and tragic fate. Fitzgerald critiques the corruption of the American Dream. The book remains a classic of American literature.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'drama',
    description: 'A story of racial injustice and childhood innocence in the American South.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Scout Finch grows up in Depression-era Alabama. Her father, Atticus, defends a black man accused of rape. Through Scout\'s eyes, we see prejudice and moral growth. The novel addresses racism, courage, and empathy. Harper Lee\'s only novel won the Pulitzer Prize. It remains a powerful statement against racial injustice.'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'drama',
    description: 'A teenager\'s journey through New York City as he struggles with growing up.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Holden Caulfield runs away from his boarding school before Christmas. He wanders New York City, encountering phoniness and hypocrisy. The novel explores teenage angst and alienation. Holden\'s voice captures adolescent rebellion and vulnerability. The book has become a symbol of teenage disillusionment.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'drama',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    story: 'Winston Smith lives in a totalitarian society ruled by Big Brother. The Party controls truth, history, and individual thought. Winston begins a forbidden affair and joins a resistance movement. Orwell\'s novel warns about totalitarianism and loss of freedom. The book introduced concepts like "Big Brother" and "thoughtcrime."'
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    genre: 'drama',
    description: 'British boys stranded on an island descend into savagery.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Schoolboys survive a plane crash on a deserted island. Without adult supervision, they attempt to govern themselves. The story explores human nature and civilization\'s fragility. Ralph represents order, Jack represents savagery. Golding\'s novel examines the dark side of human nature.'
  },

  // Adventure Books
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'adventure',
    description: 'A reluctant hobbit embarks on an unexpected journey.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Bilbo Baggins joins Gandalf and thirteen dwarves on a quest to reclaim a dragon\'s treasure. The journey takes them through dangerous lands filled with trolls, goblins, and spiders. Bilbo discovers courage and cleverness within himself. The adventure changes Bilbo forever. Tolkien\'s book serves as a prelude to The Lord of the Rings.'
  },
  {
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    genre: 'adventure',
    description: 'A young boy discovers a treasure map and sets sail for adventure.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Jim Hawkins finds a treasure map in Captain Flint\'s sea chest. He joins an expedition to find the buried treasure. The voyage is filled with pirates, mutiny, and danger. Long John Silver becomes a complex antagonist. Stevenson\'s tale of adventure on the high seas has captivated readers for generations.'
  },
  {
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    genre: 'adventure',
    description: 'A shipwrecked man survives alone on a deserted island.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Robinson Crusoe survives a shipwreck and finds himself alone on an island. He learns to provide food, shelter, and companionship for himself. After many years, he encounters Friday and other inhabitants. Defoe\'s novel is based on the real-life adventures of Alexander Selkirk. The book explores themes of survival, self-reliance, and colonialism.'
  },
  {
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    genre: 'adventure',
    description: 'A mischievous boy\'s adventures along the Mississippi River.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Tom Sawyer lives for adventure in a small Missouri town. He runs away to become a pirate, witnesses a murder, and finds buried treasure. Along with his friend Huckleberry Finn, Tom experiences various escapades. Twain\'s novel captures the spirit of boyhood adventure. The book provides social commentary on 19th-century America.'
  },
  {
    title: 'Around the World in Eighty Days',
    author: 'Jules Verne',
    genre: 'adventure',
    description: 'A Victorian gentleman bets he can circumnavigate the globe in eighty days.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9c?w=400&h=600&fit=crop',
    story: 'Phileas Fogg accepts a wager to travel around the world in eighty days. Accompanied by his valet Passepartout, he uses every means of transportation available. They face numerous obstacles and adventures along the way. Verne\'s novel celebrates human ingenuity and determination. The story captures the excitement of world exploration.'
  },

  // Art Books
  {
    title: 'The Story of Art',
    author: 'E.H. Gombrich',
    genre: 'art',
    description: 'A comprehensive history of art from prehistoric times to the present.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'E.H. Gombrich traces the development of art through the ages. The book covers major artists, movements, and cultural contexts. Gombrich explains complex concepts in accessible language. He explores how art reflects and shapes human experience. The Story of Art has educated generations about art history.'
  },
  {
    title: 'Ways of Seeing',
    author: 'John Berger',
    genre: 'art',
    description: 'A revolutionary look at how we interpret art and images.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'John Berger challenges traditional ways of looking at art. He examines how gender, class, and power influence art interpretation. The book includes discussions of oil painting, publicity images, and art history. Berger\'s insights remain relevant in today\'s visual culture. Ways of Seeing has influenced art criticism and cultural studies.'
  },
  {
    title: 'The Artist\'s Way',
    author: 'Julia Cameron',
    genre: 'art',
    description: 'A spiritual path to higher creativity and artistic recovery.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Julia Cameron provides a twelve-week program for unlocking creativity. The book includes exercises like morning pages and artist dates. Cameron addresses creative blocks and self-doubt. She draws on her experience as a writer and teacher. The Artist\'s Way has helped millions rediscover their creative potential.'
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    genre: 'art',
    description: 'Creative advice in a unique visual format.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Austin Kleon shares ten principles for creativity and originality. He encourages artists to steal ideas and make them their own. The book covers topics like productivity, sharing work, and creative careers. Kleon uses a distinctive black-and-white visual style. Steal Like an Artist has inspired a new generation of creators.'
  },
  {
    title: 'Color: A Natural History of the Palette',
    author: 'Victoria Finlay',
    genre: 'art',
    description: 'The fascinating stories behind artists\' colors throughout history.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Victoria Finlay travels the world to uncover the origins of artists\' colors. She explores the history and cultural significance of pigments. The book covers ochre, cochineal, ultramarine, and other colors. Finlay combines travelogue, history, and science. Color provides insight into art materials and their global trade.'
  },

  // Travel Books
  {
    title: 'Eat, Pray, Love',
    author: 'Elizabeth Gilbert',
    genre: 'travel',
    description: 'A woman\'s journey of self-discovery through Italy, India, and Indonesia.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Elizabeth Gilbert embarks on a year-long journey after a difficult divorce. She spends four months each in Italy, India, and Indonesia. In Italy, she indulges in pleasure and learns Italian. In India, she studies at an ashram and finds spirituality. In Indonesia, she seeks balance and love. The book explores themes of self-discovery and healing.'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'travel',
    description: 'A shepherd\'s journey across continents in search of treasure and destiny.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Santiago, an Andalusian shepherd, has a recurring dream about treasure in Egypt. He sells his flock and travels to Africa. Along the way, he meets various characters who teach him about omens and personal legends. The journey tests his faith and determination. Coelho\'s philosophical tale emphasizes following one\'s dreams.'
  },
  {
    title: 'Wild: From Lost to Found on the Pacific Crest Trail',
    author: 'Cheryl Strayed',
    genre: 'travel',
    description: 'A woman hikes over a thousand miles to heal from personal tragedy.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Cheryl Strayed hikes the Pacific Crest Trail after her mother\'s death and divorce. Unprepared and grieving, she faces physical and emotional challenges. The journey becomes a path to self-discovery and healing. Strayed encounters fellow hikers and confronts her past. The book explores themes of resilience and transformation.'
  },
  {
    title: 'In a Sunburned Country',
    author: 'Bill Bryson',
    genre: 'travel',
    description: 'A humorous exploration of Australia and its peculiarities.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Bill Bryson travels across Australia, from Sydney to the outback. He encounters unique wildlife, strange place names, and friendly Australians. Bryson combines humor, history, and personal anecdotes. The book covers Australia\'s natural wonders and cultural quirks. In a Sunburned Country showcases Bryson\'s signature witty travel writing.'
  },
  {
    title: 'A Walk in the Woods',
    author: 'Bill Bryson',
    genre: 'travel',
    description: 'Two friends attempt to hike the Appalachian Trail.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9b?w=400&h=600&fit=crop',
    story: 'Bill Bryson and his friend Stephen Katz attempt to hike the Appalachian Trail. They face bears, insects, and harsh weather conditions. Bryson provides historical context about the trail and its surroundings. The book combines humor, natural history, and social commentary. A Walk in the Woods highlights the beauty and challenges of America\'s wilderness.'
  },

  // Historical Books
  {
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    genre: 'historical',
    description: 'The poignant diary of a Jewish girl hiding from the Nazis.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Anne Frank chronicles two years in hiding during the Nazi occupation of the Netherlands. She writes about daily life, family tensions, and her dreams for the future. The diary ends abruptly when the family is discovered. Anne\'s words provide insight into the human cost of war and persecution. The book has become a symbol of hope and resilience.'
  },
  {
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    genre: 'historical',
    description: 'Why some civilizations advanced while others did not.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Jared Diamond explores why Eurasian civilizations developed advanced technology and conquered others. He examines the roles of geography, biology, and environment. The book challenges traditional explanations based on racial superiority. Diamond argues that environmental factors shaped human history. Guns, Germs, and Steel revolutionized historical scholarship.'
  },
  {
    title: 'The Rise and Fall of the Third Reich',
    author: 'William L. Shirer',
    genre: 'historical',
    description: 'A comprehensive history of Nazi Germany.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'William Shirer, a journalist who lived in Nazi Germany, chronicles the regime\'s rise and fall. He covers Hitler\'s early life, the Weimar Republic, and World War II. Shirer provides firsthand insights into Nazi propaganda and atrocities. The book draws on captured German documents. It remains a definitive account of the Nazi era.'
  },
  {
    title: 'A People\'s History of the United States',
    author: 'Howard Zinn',
    genre: 'historical',
    description: 'American history from the perspective of marginalized groups.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9d?w=400&h=600&fit=crop',
    story: 'Howard Zinn presents American history from the viewpoint of workers, women, and minorities. He challenges traditional narratives that focus on political leaders. The book covers Native Americans, slavery, labor movements, and social justice struggles. Zinn emphasizes the role of ordinary people in shaping history. A People\'s History has influenced how Americans understand their past.'
  },
  {
    title: 'The Silk Roads',
    author: 'Peter Frankopan',
    genre: 'historical',
    description: 'A new history of the world focusing on Central Asia.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Peter Frankopan reorients world history around the Silk Roads. He shows how Central Asia connected East and West for centuries. The book covers trade, religion, culture, and conquest. Frankopan argues that this region shaped global history. The Silk Roads provides a fresh perspective on historical events.'
  },

  // Poetry Books
  {
    title: 'The Complete Poems of Emily Dickinson',
    author: 'Emily Dickinson',
    genre: 'poetry',
    description: 'The collected works of one of America\'s greatest poets.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Emily Dickinson wrote nearly 1,800 poems during her lifetime. Most were discovered after her death and published posthumously. Her poems explore themes of death, immortality, nature, and love. Dickinson\'s unique style features unconventional punctuation and rhyme. She experimented with poetic form and language. Her work continues to influence modern poetry.'
  },
  {
    title: 'Leaves of Grass',
    author: 'Walt Whitman',
    genre: 'poetry',
    description: 'A groundbreaking collection of American poetry.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Walt Whitman published the first edition of Leaves of Grass in 1855. He continued revising and expanding it throughout his life. The collection celebrates democracy, nature, and the human body. Whitman\'s free verse style revolutionized American poetry. He wrote about ordinary people and everyday experiences. Leaves of Grass embodies the spirit of 19th-century America.'
  },
  {
    title: 'The Waste Land',
    author: 'T.S. Eliot',
    genre: 'poetry',
    description: 'A modernist poem reflecting post-World War I disillusionment.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'T.S. Eliot published The Waste Land in 1922. The poem depicts a fragmented, sterile modern world. It draws on mythology, literature, and various languages. Eliot explores themes of spiritual emptiness and cultural decay. The poem\'s complex structure and allusions challenged readers. The Waste Land became a landmark of modernist literature.'
  },
  {
    title: 'Sonnet 18',
    author: 'William Shakespeare',
    genre: 'poetry',
    description: 'One of Shakespeare\'s most famous love sonnets.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Shakespeare compares his beloved to a summer\'s day. He argues that his love is more beautiful and eternal than nature. The sonnet explores themes of love, beauty, and immortality. Shakespeare\'s language elevates the comparison to something transcendent. Sonnet 18 remains one of the most quoted poems in English literature.'
  },
  {
    title: 'Howl and Other Poems',
    author: 'Allen Ginsberg',
    genre: 'poetry',
    description: 'A revolutionary work of the Beat Generation.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Allen Ginsberg\'s Howl protests conformity and celebrates individuality. The poem\'s raw energy and social criticism shocked 1950s America. Ginsberg writes about madness, sexuality, and rebellion. The book also includes other poems like "A Supermarket in California." Howl became a manifesto for the counterculture movement.'
  },

  // Biography Books
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: 'biography',
    description: 'The definitive biography of Apple\'s co-founder.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Walter Isaacson chronicles Steve Jobs\' life from adoption to his death. The biography covers his work at Apple, NeXT, and Pixar. Isaacson explores Jobs\' complex personality and innovative vision. The book draws on interviews with Jobs and his associates. Steve Jobs provides insight into entrepreneurship and technology.'
  },
  {
    title: 'The Autobiography of Malcolm X',
    author: 'Malcolm X and Alex Haley',
    genre: 'biography',
    description: 'The life story of the influential civil rights leader.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'Malcolm X recounts his transformation from street hustler to Muslim minister. He describes his pilgrimage to Mecca and evolving views on race. The autobiography covers his work with the Nation of Islam and later independence. Alex Haley helped shape the manuscript. The book provides insight into 20th-century racial politics.'
  },
  {
    title: 'Churchill: A Life',
    author: 'Martin Gilbert',
    genre: 'biography',
    description: 'A comprehensive biography of Winston Churchill.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Martin Gilbert chronicles Winston Churchill\'s long and eventful life. The biography covers his military service, political career, and wartime leadership. Gilbert had access to Churchill\'s private papers and letters. The book explores Churchill\'s complex personality and historical impact. Churchill: A Life provides a detailed portrait of the 20th century\'s most famous statesman.'
  },
  {
    title: 'Einstein: His Life and Universe',
    author: 'Walter Isaacson',
    genre: 'biography',
    description: 'The life story of the world\'s most famous physicist.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Walter Isaacson explores Albert Einstein\'s life and scientific contributions. The biography covers his early struggles, miracle year, and later career. Isaacson examines Einstein\'s personal life and political views. The book explains complex physics concepts in accessible terms. Einstein provides insight into genius, creativity, and moral courage.'
  },
  {
    title: 'The Immortal Life of Henrietta Lacks',
    author: 'Rebecca Skloot',
    genre: 'biography',
    description: 'The story of a woman whose cells revolutionized medical science.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Rebecca Skloot tells the story of Henrietta Lacks, a poor black woman whose cancer cells were taken without consent. Her cells, known as HeLa, became crucial for medical research. The book explores ethical issues in medical research and racial injustice. Skloot connects Henrietta\'s story with her surviving family members. The Immortal Life of Henrietta Lacks raises important questions about consent and medical ethics.'
  },

  // Horror Books
  {
    title: 'The Shining',
    author: 'Stephen King',
    genre: 'horror',
    description: 'A family isolated in a haunted hotel descends into madness.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Jack Torrance takes a job as winter caretaker at the Overlook Hotel. He brings his wife Wendy and son Danny to the isolated resort. Danny has psychic abilities that awaken the hotel\'s evil forces. As winter progresses, Jack becomes increasingly unhinged. King\'s novel explores isolation, addiction, and supernatural horror.'
  },
  {
    title: 'It',
    author: 'Stephen King',
    genre: 'horror',
    description: 'A shape-shifting entity terrorizes children in a small town.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    story: 'A group of children in Derry, Maine, face an ancient evil that takes the form of a clown named Pennywise. The creature awakens every 27 years to feed on fear. The Losers\' Club bands together to fight the entity. King weaves together past and present narratives. The novel explores childhood trauma and the power of friendship.'
  },
  {
    title: 'Bird Box',
    author: 'Josh Malerman',
    genre: 'horror',
    description: 'Survivors must navigate a world where seeing mysterious creatures drives people mad.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    story: 'Malorie and her children live in a world where supernatural entities drive people to suicide. They must travel blindfolded to reach safety. The creatures\' appearance causes instant madness and violence. Malerman\'s novel builds tension through sensory deprivation. Bird Box explores parental love and human survival instincts.'
  },
  {
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    genre: 'horror',
    description: 'A woman travels to a remote mansion to check on her cousin.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    story: 'Noemí Taboada visits High Place, her cousin\'s decaying mansion in rural Mexico. The Doyle family exhibits strange behaviors and customs. Noemí uncovers dark family secrets and supernatural elements. Moreno-Garcia blends Gothic horror with Mexican cultural elements. The novel explores colonialism, eugenics, and family trauma.'
  },
  {
    title: 'The Haunting of Hill House',
    author: 'Shirley Jackson',
    genre: 'horror',
    description: 'A group investigates a notoriously haunted house.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    story: 'Dr. Montague invites people to Hill House to study its paranormal activity. Eleanor Vance, a lonely woman, becomes particularly affected by the house. The group experiences terrifying supernatural events. Jackson\'s novel explores psychological horror and isolation. The Haunting of Hill House influenced the modern horror genre.'
  }
];

const seedBooks = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing books
    await Book.deleteMany({});
    console.log('🗑️  Cleared existing books');

    // Insert new books
    const createdBooks = await Book.insertMany(booksData);
    console.log(`✅ Successfully seeded ${createdBooks.length} books`);

    // Display some sample books
    console.log('\n📚 Sample Books in Database:');
    const sampleBooks = await Book.find({}).limit(5);
    sampleBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author} (${book.genre})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    process.exit(1);
  }
};

// Run the seeding function
if (require.main === module) {
  seedBooks();
}

module.exports = seedBooks;