import Lib from '../utils/libs';
import nlp from 'compromise';
import levenshteinDistance from '../utils/levenshtein';
import { supabase } from '../../supabase';

export default function useLib() {
	const uploadLib = async (title: string, body: string) => {
		const lib = parseTextToLib(body);
		const { data, error } = await supabase.from('libs').insert({ ...lib, title });
		if (error !== null) throw error;
		return data;
	};

	const deleteLib = async (id: string) => {
		const { data, error } = await supabase.from('libs').delete().eq('id', id);
		if (error !== null) throw error;
		return data;
	};

	const getPrompt = (item: Lib, pointer: number) => {
		try {
			return Object.keys(item.parsed_prompts[pointer])[0];
		} catch {
			return '';
		}
	};

	const getPromptDescription = (prompt: string): string => {
		if (!prompt) return '';

		const explanations: { [key: string]: string } = {
			adjective: 'A word that describes something.',
			verb: 'A word that shows action or being.',
			'verb -ing': 'An action ending in -ing: laughing, jumping, etc.',
			'verb -ed': 'An action ending in -ed: laughed, jumped, etc.',
			verbing: 'An action ending in -ing: laughing, jumping, etc.',
			verbed: 'An action ending in -ed: laughed, jumped, etc.',
			'verb with -ing ending': 'An action ending in -ing: laughing.',
			'verb ending in -ed': 'An action ending in -ed: laughed, jumped, etc.',
			'verb ending in ing': 'An action ending in -ing: laughing, jumping, etc.',
			'verb ending in ed': 'An action ending in -ed: laughed, jumped, etc.',
			adverb:
				'A word or phrase that modifies or qualifies an adjective or verb: gently, quite, then, there, etc.',
			'movement verb': 'A verb that describes a movement: run, walk, jumped, etc.',
			noun: 'A thing, something you can see or touch.',
			'Plural Noun': 'Things, something you can see or touch.',
			object: 'A person, place, or thing.',
			'proper noun': 'Name for specific things, people, and places.',
			superlative: 'Superlative: fastest, best, etc.',
			occupation: 'Occupation: job title.',
			profession: 'Profession: job title.',
			place: 'A location: school, garden, etc.',
			name: 'A name: John, Sizzle, Bubbles etc.',
			town: 'The name of a small city: Townsville, Florence, etc.',
			weather: 'The state of the weather at a particular time: rain, wind, etc.',
			emotion: 'A feeling: sad, happy, cheerful, etc.',
			material: 'What something is made of: sand, wood, etc.',
			sound:
				'A noise or auditory event that can be heard, such as ring, boom, quack etc.',
			subject: 'What we learn or teach.',
			'historical figure': 'Someone from the past who did something important.',
			'book name': 'What a book is called.',
			destination: 'Where someone or something is going.',
			snack: 'A small amount of food.',
			'book genre': 'A type of book.',
			food: 'What we eat to live and grow.',
			beverage: 'Something we drink that is not water.',
			instrument: 'A tool, often for science.',
			festival: 'A special time of celebration.',
			superhero: 'A made-up hero with special powers.',
			villain: 'A bad character in a story.',
			animal: 'A living organism: cat, elephant, etc.',
			'animal plural': 'A group of the same animals.',
			'noun plural': 'More than one person, place, or thing.',
			ingredient: 'What is used to make a dish.',
			spice: 'Something used to give flavor to food.',
			city: 'A big place where lots of people live.',
			color: 'What we see like red, blue, or yellow.',
			'dog breed': 'A type of dog: labrador, chihuahua, poodle.',
			'cooking technique': 'A way to prepare food: frying, baking, boiling.',
			dish: 'A specific food; pasta, soup, cake.',
			'kitchen appliance': 'A tool for preparing food; toaster, blender.',
			topic: 'Anything you can talk about; weather, videogames.',
			'last name': 'A family name: Smith, Jones etc.',
			surname: 'A family name: Smith, Jones etc.',
			'feminine name': 'A name traditionally given to a female person',
			'female name': 'A name traditionally given to a female person',
			'pet animal': 'An animal kept for companionship: dog, cat, horse etc.',
			number: 'A numerical value used to represent quantity: 1, twenty, 83, etc.',
			'body part': 'A physical part of a living organism: arm, leg, etc.',
			'body parts': 'Parts of a living organism: arms, legs, etc.',
			'body part plural': 'Parts of a living organism: arms, legs, etc.',
			'cooking Technique -ing ending':
				'A method of preparing food: grilling, roasting etc.',
			year: 'A period of 365 days: 2023, 1776, etc.',
			'superlative Adjective':
				'Describes the highest degree of a quality: brightest, strongest, etc.',
			relative: 'A family member: mother, uncle, etc.',
			country:
				'A nation with its own government and territory: USA, Canada, Norway, etc.',
			'word beginning with N': 'Any word starting with the letter N.',
			'word beginning with A': 'Any word starting with the letter A.',
			'word beginning with S': 'Any word starting with the letter S.',
			tool: 'An instrument or device used to perform a task: hammer, saw, etc.',
			'type of car': 'A specific brand of car: Ford, Tesla, etc.',
			car: 'A specific brand of car: Ford, Tesla, etc.',
			Ability: 'Skill or power, often magical: invisibility, flight, etc.',
			'Random Word': 'Any word, sometimes unpredictable or fictional.',
		};

		prompt = prompt.replace(/[0-9]/g, '');
		const baseForm = nlp(prompt).out('root' as any);

		let closestKey = '';
		let minDistance = Infinity;

		for (const key in explanations) {
			if (key.includes(baseForm)) {
				const distance = levenshteinDistance(baseForm, key);
				if (distance < minDistance) {
					minDistance = distance;
					closestKey = key;
				}
			}
		}

		return explanations[closestKey] || ' ';
	};

	type FillType = {
		[key: string]: string[];
	};

	const getPromptFill = (prompt: string): string => {
		if (prompt === "NaN" || prompt === null || prompt === "") return "";
		const fill: FillType = {
			"adjective": ["blue", "tacky", "sassy", "groovy", "fantabulous", "awesome", "snazzy", "goofy", "dope", "stellar", "wacky", "zany", "bizarre", "funky", "quirky", "spiffy", "gnarly", "epic", "radical", "fabulous", "bubbly", "silly", "crazy", "gigantic", "marvelous", "hilarious", "fierce", "chill", "tubular", "hilarious", "nifty", "smashing", "chillaxing", "stellar", "swell"],
			"verb": ["drink", "jump", "fly", "dance", "sing", "frolic", "laugh", "skate", "surf", "chillax", "yodel", "dab", "moonwalk", "boogie", "twerk", "high-five", "whoop", "floss", "swoosh", "wobble", "gallop", "belly-flop", "sizzle", "bamboozle", "splish-splash", "wiggle", "twirl", "giggle", "noodle", "snicker", "shimmer", "zest", "glide", "shuffle", "exclaim"],
			"movement verb": ["jump", "fly", "dance", "frolic", "skate", "surf", "dab", "moonwalk", "boogie", "twerk", "high-five", "floss", "swoosh", "wobble", "gallop", "belly-flop", "splish-splash", "wiggle", "twirl", "shimmer", "glide", "shuffle"],
			"verb -ing": ["drinking", "jumping", "flying", "dancing", "singing", "frolicing", "laughing", "skating", "surfing", "chillaxing", "yodeling", "dabing", "moonwalking", "boogiing", "twerking", "high-fiving", "whooping", "flossing", "swooshing", "wobbling", "galloping", "belly-floping", "sizzling", "bamboozling", "splish-splashing", "wiggling", "twirling", "giggling", "noodling", "snickering", "shimmering", "zesting", "gliding", "shuffling", "exclaiming"],
			"verb -ed": ["drinked", "jumped", "flied", "danced", "singed", "froliced", "laughed", "skated", "surfed", "chillaxed", "yodeled", "dabed", "moonwalked", "boogied", "twerked", "high-fived", "whooped", "flossed", "swooshed", "wobbled", "galloped", "belly-floped", "sizzled", "bamboozled", "splish-splashed", "wiggled", "twirled", "giggled", "noodled", "snickered", "shimmered", "zested", "glided", "shuffled", "exclaimed"],
			"noun": ["cat", "hat", "banana", "penguin", "unicorn", "narwhal", "taco", "donut", "pickle", "rainbow", "marshmallow", "sneaker", "pineapple", "jellybean", "toaster", "koala", "bumblebee", "flamingo", "ninja", "giraffe", "cupcake", "chinchilla", "panda", "robot", "sushi", "lollipop", "bubblegum", "rocket", "watermelon", "gummy bear", "doodle", "wonderland", "glimmer", "munchkin", "chatter", "magic"],
			"object": ["cat", "hat", "banana", "penguin", "unicorn", "narwhal", "taco", "donut", "pickle", "rainbow", "marshmallow", "sneaker", "pineapple", "jellybean", "toaster", "koala", "bumblebee", "flamingo", "ninja", "giraffe", "cupcake", "chinchilla", "panda", "robot", "sushi", "lollipop", "bubblegum", "rocket", "watermelon", "gummy bear", "doodle", "wonderland", "glimmer", "munchkin", "chatter", "magic"],
			"plural noun": ["friends", "wizards", "unicorns", "narwhals", "tacos", "donuts", "pickles", "rainbows", "marshmallows", "sneakers", "pineapples", "jellybeans", "koalas", "bumblebees", "flamingos", "ninjas", "giraffes", "cupcakes", "chinchillas", "pandas", "robots", "sushis", "lollipops", "bubblegums", "rockets", "watermelons", "gummy bears", "doodles", "wonderlands", "glimmers", "munchkins", "chatters", "magics", "whimsies", "dazzles", "fizzles", "zaps"],
			"noun plural": ["friends", "wizards", "unicorns", "narwhals", "tacos", "donuts", "pickles", "rainbows", "marshmallows", "sneakers", "pineapples", "jellybeans", "koalas", "bumblebees", "flamingos", "ninjas", "giraffes", "cupcakes", "chinchillas", "pandas", "robots", "sushis", "lollipops", "bubblegums", "rockets", "watermelons", "gummy bears", "doodles", "wonderlands", "glimmers", "munchkins", "chatters", "magics", "whimsies", "dazzles", "fizzles", "zaps"],
			"nouns": ["adventures", "jubilation", "mischief", "whimsy", "happiness", "laughter", "wonders", "shenanigans", "dreams", "fantasies", "frolics", "silliness", "delights", "bliss", "thrills", "giggles", "wanderlust", "curiosity", "sparkle", "jazz", "charm", "glitter", "glimpse", "snickers", "gadgets", "wonderment", "merriment", "zestiness", "gusto", "wittiness", "quirkiness", "snuggles", "tickles", "bubbles", "whispers", "wobbles"],
			"proper noun": ["Zorg", "Nebula", "Mystique", "Waldo", "Bumblewump", "Whimsydale", "Bamboozleton", "Fizzleton", "Sprocket", "Twizzlebottom", "Snickerdoodle", "Zippity", "Kazoink", "Wobbleworth", "Fluffernutter", "Wigglesworth", "Peachbottom", "Sassafras", "Snicklefritz", "Muffinpuff", "Whifflepuff", "Zazzlebee", "Wiggletail", "Skedoodle", "Glimmerglen", "Fiddlesticks", "Bumblewhiff", "Dazzlefoot", "Sizzlepop", "Wigglesnort", "Glimmerwump", "Snickerwhip", "Bamboozlewump", "Fluffernoodle", "Zanytooth", "Whimsysnort", "Sprocketwhip"],
			"superlative": ["craziest", "largest", "silliest", "happiest", "zaniest", "greatest", "funkiest", "coolest", "sparkliest", "weirdest", "wildest", "grooviest", "fiercest", "fluffiest", "bounciest", "swooshiest", "snazziest", "snuggliest", "quickest", "zappiest", "giganticest", "marvelousest", "tastiest", "dreamiest", "proudest", "splashiest", "bamboozliest", "awesome-est", "dazzliest", "swell-est", "spiffiest", "quirkiest", "giggle-tastic", "glimmerific", "zestiest"],
			"occupation": ["accountant", "teacher", "pirate", "astronaut", "ninja", "superhero", "wizard", "space cowboy", "fashion designer", "detective", "pop star", "mad scientist", "juggler", "clown", "chocolatier", "treasure hunter", "time traveler", "dragon trainer", "toymaker", "circus performer", "taco taste tester", "unicorn wrangler", "robotic engineer", "candy alchemist", "cookie inspector", "bubbleologist", "inventor of rainbows", "chief laughter officer", "official tickle monster", "fantasy author", "chief adventure architect", "happiness ambassador", "chief of wizardry", "professor of silliness", "mirth maker", "director of dreams"],
			"profession": ["firewatch", "assistant to the regional manager", "time travel consultant", "director of fun and games", "chief meme officer", "wizarding supplies specialist", "chief unicorn herder", "chief mischief officer", "master of pranks", "head of bubble wrap design", "supreme pizza critic", "chief adventure officer", "executive doodler", "celestial cartographer", "vibe curator", "supreme happiness engineer", "ambassador of laughter", "chief of whimsy", "master of chill vibes", "chief of silliness", "professor of awesomeness", "chief of shenanigans", "head of dream weaving", "captain of the laughter brigade", "supreme doodle artist", "chief of imagination", "commander of the dance floor", "architect of joy", "chief of wonderment", "executive dreamweaver", "captain of cheerfulness", "sultan of sparkle", "jester of joy", "champion of laughter", "czar of curiosity"],
			"animal": ["penguin", "narwhal", "koala", "bumblebee", "flamingo", "giraffe", "chinchilla", "panda", "sloth", "elephant", "octopus", "kangaroo", "zebra", "polar bear", "chameleon", "hedgehog", "jellyfish", "peacock", "lemur", "platypus", "pangolin", "butterfly", "meerkat", "dolphin", "otter", "cheetah", "gorilla", "unicorn", "dragon", "griffin", "phoenix", "mermaid", "sphinx", "yeti", "centaur"],
			"animal plural": ["penguins", "narwhals", "koalas", "bumblebees", "flamingos", "giraffes", "chinchillas", "pandas", "sloths", "elephants", "octopuses", "kangaroos", "zebras", "polar bears", "chameleons", "hedgehogs", "jellyfish", "peacocks", "lemurs", "platypuses", "pangolins", "butterflies", "meerkats", "dolphins", "otters", "cheetahs", "gorillas", "unicorns", "dragons", "griffins", "phoenixes", "mermaids", "sphinxes", "yetis", "centaurs"],
			"animals": ["penguins", "narwhals", "koalas", "bumblebees", "flamingos", "giraffes", "chinchillas", "pandas", "sloths", "elephants", "octopuses", "kangaroos", "zebras", "polar bears", "chameleons", "hedgehogs", "jellyfish", "peacocks", "lemurs", "platypuses", "pangolins", "butterflies", "meerkats", "dolphins", "otters", "cheetahs", "gorillas", "unicorns", "dragons", "griffins", "phoenixes", "mermaids", "sphinxes", "yetis", "centaurs"],
			"place": ["enchanted forest", "wonderland", "dreamscape", "candyland", "whimsical garden", "magic castle", "cosmic realm", "laughing meadow", "serendipity square", "jubilation junction", "fairy tale land", "merry-go-round", "chocolate factory", "giggle mountain", "rainbow valley", "whimsyville", "bubblegum beach", "unicorn meadow", "wonder world", "chuckle town", "glimmer glen", "joyful island", "sparkle city", "laughing lagoon", "fantastic falls", "giggleopolis", "gleeful galaxy", "blissful bay", "sugarplum skies"],
			"name": ["Whimsy", "Bubbles", "Sunny", "Twinkle", "Jazz", "Chuckles", "Fable", "Ziggy", "Glimmer", "Frost", "Breezy", "Misty", "Zephyr", "Fizz", "Snicker", "Pip", "Zigzag", "Zest", "Zany", "Zigzag", "Wiggles", "Woozy", "Fluffy", "Dazzle", "Whiffle", "Sizzle", "Nibbles", "Zippy", "Giggle", "Doodle", "Jolly", "Giggle", "Snoozy", "Sunny", "Whiffy", "Wiggle"],
			"city": ["Whimsyville", "Giggletown", "Mirthburg", "Chuckleburg", "Laughington", "Smilesville", "Joyopolis", "Gleeville", "Blissburgh", "Giggleton", "Jovialburg", "Chortleburg", "Cheerland", "Wonderville", "Merryburg", "Charmville", "Jubilant City", "Delightville", "Jollityville", "Witburg", "Jesterville", "Jocundburg", "Ecstasyburg", "Feliciton", "Gaietyburg", "Jubilopolis", "Merrimenton", "Glamourburg", "Frolicburg", "Serenityburg", "Pleasureville", "Guffawburg", "Merrymakington", "Radiantburg", "Cheerfulburg"],
			"material": ["glitter", "sparkle", "rainbows", "bubblegum", "cotton candy", "pixie dust", "stardust", "sugar", "marshmallow", "magic", "dreams", "whimsy", "chocolate", "gumdrops", "laughter", "fairy lights", "confetti", "wishes", "jelly beans", "happiness", "unicorns", "glimmer", "fizz", "zest", "fluff", "sprinkles", "bubbles", "snickers", "silliness", "delights", "bliss", "glamour", "giggle", "dazzle", "sizzle", "whispers"],
			"emotion": ["joy", "bliss", "happiness", "giggles", "glee", "delight", "mirth", "exhilaration", "jubilation", "euphoria", "ecstasy", "merriment", "glee", "elation", "enthusiasm", "jolliness", "gusto", "hilarity", "gaiety", "joviality", "euphoria", "zest", "felicity", "rapture", "cheerfulness", "jocundity", "frolicsomeness", "rapture", "mirthfulness", "blitheness", "jollity", "exuberance", "radiance", "cheeriness", "guffaw"],
			"body part": ["heart", "soul", "smile", "arms", "foot", "head", "toe", "tooth", "tongue", "eye", "nose", "tummy", "hair", "skin", "elbow", "thigh", "nail", "pinky", "finger", "ear", "toenail", "back", "chests"],
			"body parts": ["hearts", "souls", "smiles", "arms", "feet", "heads", "toes", "teeth", "tongues", "eyes", "noses", "tummies", "hairs", "skin", "elbows", "thigh", "nails", "pinkies", "fingers", "ears", "toenails", "backs", "chests"],
			"famous person": ["Willy Wonka", "Mary Poppins", "Frodo Baggins", "Elvis Presley", "Marilyn Monroe", "Mr. Bean", "Charlie Chaplin", "Fred Astaire", "Lucille Ball", "Charlie Brown", "Homer Simpson", "Wonder Woman", "Sherlock Holmes", "Yoda", "Indiana Jones", "Captain Jack Sparrow", "Superman", "Beyoncé", "Michael Jackson", "Albert Einstein", "Harry Potter", "Captain America", "Mickey Mouse", "Dumbledore", "Spider-Man", "James Bond", "Winnie the Pooh", "SpongeBob SquarePants", "Darth Vader", "Madonna", "Marie Curie", "Leonardo da Vinci", "Daffy Duck", "Oprah Winfrey"],
			"weather": ["rain", "wind", "sun", "clouds", "cold", "dry"],
			"color": ["red", "blue", "orange", "yellow", "brown", "black", "white", "pink", "lime", "teal", "purple", "magenta", "gray"],
			"sound": ["rustle", "chirp", "boom", "babble", "roar", "howl", "ring", "thunder", "splash", "buzz", "crunch", "quack"],
			"subject": ["Mathematics", "History", "Biology", "Physics", "Chemistry", "Literature", "Art", "Music", "Geography", "Computer Science", "Philosophy", "Psychology", "Economics", "Political Science", "Sociology", "Astronomy", "Environmental Science", "Linguistics", "Theology", "Physical Education"],
			"historical figure": ["Albert Einstein", "Cleopatra", "Mahatma Gandhi", "Martin Luther King Jr.", "Marie Curie", "Nelson Mandela", "Winston Churchill", "Leonardo da Vinci", "Abraham Lincoln", "Joan of Arc", "Socrates", "Christopher Columbus", "William Shakespeare", "Thomas Edison", "Adolf Hitler", "Mao Zedong", "Napoleon Bonaparte", "Charles Darwin", "Queen Victoria", "Genghis Khan"],
			"book name": ["To Kill a Mockingbird", "1984", "The Great Gatsby", "The Catcher in the Rye", "Harry Potter and the Sorcerer's Stone", "Moby-Dick", "Pride and Prejudice", "The Lord of the Rings", "The Hobbit", "Brave New World", "Jane Eyre", "The Chronicles of Narnia", "The Da Vinci Code", "The Hunger Games", "The Grapes of Wrath", "Wuthering Heights", "Frankenstein", "The Handmaid's Tale", "The Little Prince", "Alice's Adventures in Wonderland"],
			"destination": ["Paris", "New York", "Tokyo", "London", "Rome", "Sydney", "Cairo", "Rio de Janeiro", "Beijing", "Barcelona", "Amsterdam", "Istanbul", "Bangkok", "Cape Town", "Jerusalem", "Venice", "San Francisco", "Dubai", "Athens", "Machu Picchu"],
			"snack": ["Chips", "Popcorn", "Cookies", "Pretzels", "Nuts", "Crackers", "Granola Bar", "Cheese", "Fruit", "Yogurt", "Ice Cream", "Chocolate", "Candy", "Trail Mix", "Muffin", "Croissant", "Donut", "Pastry", "Pudding", "Gelato"],
			"book genre": ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Historical Fiction", "Non-Fiction", "Biography", "Autobiography", "Horror", "Drama", "Comedy", "Poetry", "Adventure", "Classic", "Graphic Novel", "Short Story", "Young Adult", "Children's", "Literary Fiction"],
			"food": ["Pizza", "Pasta", "Burger", "Sushi", "Salad", "Steak", "Sandwich", "Soup", "Tacos", "Fried Chicken", "Rice", "Noodles", "Fish", "Seafood", "Vegetables", "Fruits", "Bread", "Cheese", "Eggs", "Bacon"],
			"beverage": ["Water", "Tea", "Coffee", "Milk", "Juice", "Soda", "Lemonade", "Hot Chocolate", "Smoothie", "Wine", "Beer", "Cocktail", "Whiskey", "Vodka", "Rum", "Champagne", "Gin", "Brandy", "Liqueur", "Sports Drink"],
			"instrument": ["Piano", "Guitar", "Violin", "Drums", "Flute", "Cello", "Trumpet", "Saxophone", "Clarinet", "Harp", "Trombone", "Accordion", "Banjo", "Ukulele", "Mandolin", "Synthesizer", "Harmonica", "Bass Guitar", "Viola", "Percussion"],
			"festival": ["Christmas", "Diwali", "Easter", "Halloween", "Thanksgiving", "Hanukkah", "Chinese New Year", "Holi", "Carnival", "Oktoberfest", "Mardi Gras", "Ramadan", "St. Patrick's Day", "Valentine's Day", "New Year's Eve", "Day of the Dead", "Independence Day", "Songkran", "La Tomatina", "Burning Man"],
			"superhero": ["Superman", "Batman", "Spider-Man", "Iron Man", "Wonder Woman", "Captain America", "Thor", "Hulk", "Black Widow", "Doctor Strange", "Flash", "Green Lantern", "Aquaman", "Black Panther", "Ant-Man", "Daredevil", "Wolverine", "Deadpool", "Harley Quinn", "Supergirl"],
			"villain": ["Joker", "Thanos", "Lex Luthor", "Green Goblin", "Loki", "Magneto", "Doctor Octopus", "Red Skull", "Kingpin", "Ultron", "Two-Face", "Venom", "Darkseid", "Penguin", "Catwoman", "Sandman", "Ra's al Ghul", "Black Manta", "Mysterio", "Doctor Doom"],
			"verb ending in -ed": ["jumped", "danced", "laughed", "sang", "ran", "slept", "talked", "walked", "worked", "played", "cooked", "cleaned", "watched", "read", "wrote", "studied", "listened", "painted", "swam", "climbed"],
			"verb with -ing ending": ["jumping", "dancing", "laughing", "singing", "running", "sleeping", "talking", "walking", "working", "playing", "cooking", "cleaning", "watching", "reading", "writing", "studying", "listening", "painting", "swimming", "climbing"],
			"ingredient": ["Flour", "Sugar", "Salt", "Eggs", "Milk", "Butter", "Baking Powder", "Vanilla Extract", "Cocoa Powder", "Honey", "Yeast", "Olive Oil", "Water", "Cream", "Cheese", "Lemon Juice", "Garlic", "Onion", "Tomato", "Cinnamon"],
			"spice": ["Pepper", "Cinnamon", "Cumin", "Ginger", "Garlic Powder", "Paprika", "Nutmeg", "Turmeric", "Cardamom", "Cloves", "Coriander", "Chili Powder", "Oregano", "Thyme", "Rosemary", "Sage", "Basil", "Mint", "Fennel", "Saffron"],
			"dog breed": ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "German Shorthaired Pointer", "Siberian Husky", "Dachshund", "Great Dane", "Doberman Pinscher", "Australian Shepherd", "Boxer", "Cavalier King Charles Spaniel", "Shih Tzu", "Pembroke Welsh Corgi", "Yorkshire Terrier", "Miniature Schnauzer", "Chihuahua"],
			"cooking technique": ["Fry", "Boil", "Stir", "Bake", "Grill", "Roast", "Marinate", "Microwave", "Deep fry", "Caramelize"],
			"dish": ["Lasagna", "Curry", "Paella", "Sushi", "Tacos", "Pizza", "Burger", "Quiche", "Risotto", "Chowder", "Barbecue Ribs", "Pad Thai", "Falafel", "Carbonara", "Beef Stroganoff", "Ratatouille", "Gumbo", "Fish and Chips", "Tiramisu", "Shepherd's Pie"],
			"kitchen appliance": ["Refrigerator", "Oven", "Microwave", "Blender", "Toaster", "Dishwasher", "Coffee Maker", "Electric Kettle", "Food Processor", "Slow Cooker", "Rice Cooker", "Air Fryer", "Grill", "Juicer", "Mixer", "Pressure Cooker", "Deep Fryer", "Hand Blender", "Induction Cooktop", "Bread Maker"],
			"topic": ["Technology", "Art", "History", "Science", "Travel", "Sports", "Music", "Literature", "Cinema", "Fashion", "Cuisine", "Politics", "Economics", "Education", "Environment", "Health", "Psychology", "Philosophy", "Astronomy", "Gaming", "Gardening", "Photography", "Theater", "Dance", "Languages", "Engineering", "Mathematics", "Physics", "Biology", "Chemistry", "Sociology", "Anthropology", "Religion", "Mythology", "Archaeology", "Geography", "Meteorology", "Oceanography", "Zoology", "Botany", "Ethics", "Legal Studies", "Media Studies", "Entrepreneurship", "Human Resources", "Marketing", "Finance", "International Relations", "Public Health", "Veterinary Science", "Nursing", "Medicine", "Architecture", "Urban Planning", "Graphic Design", "Web Development", "Software Engineering", "Cybersecurity", "Data Science", "Artificial Intelligence", "Robotics", "Sustainable Energy", "Space Exploration"],
			"last name": ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Albertsen", "Kardashian", "Biden", "Trump", "Washington"],
			"feminine name": ["Emily", "Sophia", "Amelia", "Isabella", "Mia", "Ava", "Olivia", "Emma", "Kayleigh", "Christine"],
			"female name": ["Emily", "Sophia", "Amelia", "Isabella", "Mia", "Ava", "Olivia", "Emma", "Kayleigh", "Christine"],
			"pet animal": ["dog", "cat", "parrot", "rabbit", "fish", "turtle", "hamster", "lizard", "spider", "snake"],
			"number": ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "three hundred", "10 billion", "one quadrillion", "one quintillion", "one septillion", "a hundred", "1", "2", "3", "4,", "10", "42", "3.14"],
			"year": ["1990", "2000", "2010", "2020", "1985", "1970", "1955", "1900", "2023"],
			"superlative adjective": ["best", "worst", "largest", "smallest", "fastest", "slowest", "strongest", "tallest"],
			"relative": ["mother", "father", "sister", "brother", "aunt", "uncle", "grandmother", "grandfather"],
			"country": ["Norway", "USA", "Canada", "Mexico", "France", "Germany", "Italy", "Japan", "Australia"],
			"word beginning with N": ["night", "nature", "noise", "network", "normal", "novel", "narrow", "noble"],
			"word beginning with A": ["apple", "animal", "answer", "angle", "art", "area", "atom", "adventure"],
			"word beginning with S": ["sun", "sea", "sand", "snow", "star", "space", "song", "story"],
			"tool": ["hammer", "screwdriver", "wrench", "saw", "drill", "pliers", "chisel", "level"],
			"car": ["sedan", "SUV", "hatchback", "convertible", "coupe", "station wagon", "sports car", "pickup truck", "minivan", "electric car", "hybrid", "compact", "luxury vehicle", "roadster", "limousine"],
			"type of car": ["sedan", "SUV", "hatchback", "convertible", "coupe", "station wagon", "sports car", "pickup truck", "minivan", "electric car", "hybrid", "compact", "luxury vehicle", "roadster", "limousine"],
			"ability": ["teleportation", "invisibility", "time travel", "telekinesis", "flight", "shape-shifting", "mind reading", "super strength", "fire manipulation", "ice manipulation", "healing", "electrokinesis", "illusion creation", "gravity control", "speed", "intangibility", "energy blasts", "water manipulation", "animal communication", "weather control"],
			"random word": ["quartz", "wobble", "zephyr", "marmalade", "juxtapose", "kaleidoscope", "quandary", "serendipity", "flibbertigibbet", "labyrinth", "whimsical", "gargantuan", "nebula", "vortex", "alchemy", "brouhaha", "crescendo", "doodle", "ephemeral", "fandango", "gizmo", "hullabaloo", "iconoclast", "jamboree", "kismet", "loquacious", "maverick", "nirvana", "oscillate", "paradox"],
		};

		// Use compromise to get the base form of the word
		prompt = prompt.replace(/[0-9]/g, '');
		const baseForm = nlp(prompt).out('root' as any);

		let closestKey = "";
		let minDistance = Infinity;

		for (const key in fill) {
			if (key.includes(baseForm)) {
				const distance = levenshteinDistance(baseForm, key);
				if (distance < minDistance) {
					minDistance = distance;
					closestKey = key;
				}
			}
		}

		if (fill[closestKey] === undefined) return "";
		return fill[closestKey][Math.floor(Math.random() * fill[closestKey].length)] || " ";
	}

	const parseTextToLib = (text: string) => {
		const parsed_text = [];
		const parsed_prompts = [];
		const regex = /\(([^)]+)\)/g;

		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null) {
			parsed_text.push(text.slice(lastIndex, match.index));
			parsed_prompts.push({ [match[1]]: [parsed_text.length] });
			parsed_text.push('');
			lastIndex = regex.lastIndex;
		}

		parsed_text.push(text.slice(lastIndex));

		return { parsed_text, parsed_prompts };
	};

	const parseLibToText = (lib: any) => {
		let result = '';
		lib.parsed_text.map((text: string, index: number) => {
			if (index % 2 === 0) result += text;
			if (index % 2 !== 0) {
				let highlighted_word = text;
				if (lib.user_input) {
					try {
						for (let i = 0; i < lib.parsed_prompts.length; i++) {
							if (
								lib.parsed_prompts[i][Object.keys(lib.parsed_prompts[i])[0]].includes(
									index,
								)
							) {
								highlighted_word =
									lib.user_input[i] || Object.keys(lib.parsed_prompts[i])[0];
								break;
							}
						}
					} catch (error) { }
				}
				result += highlighted_word;
			}
		});
		return result;
	};

	return {
		parseTextToLib,
		parseLibToText,
		getPromptDescription,
		getPromptFill,
		getPrompt,
		uploadLib,
		deleteLib,
	};
}
