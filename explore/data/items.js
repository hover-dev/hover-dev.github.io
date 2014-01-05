FOREST_ITEMS = [
	{
		type: "item",
		name: "Walking Stick",
		header: "A sturdy branch to lean on when you're tired.",
		text: [
			"The rough bark feels good in my grip. It really helps to take some of the burden off my feet.",
			"+1 Stamina for Risks."
		],
		effects: [
			['bonus','stamina',1]
		],
		uses: null,
		useText: "",
		optionalUse: false,
		css: "item-walking-stick"
	},
	{
		type: "item",
		name: "Wooden Shield",
		header: "Forgotten from a time long ago.",
		text: [
			"This might be able to protect me in a pinch. It's starting to come apart but it could probably still take a good blow.",
			"It's a bit heavy though.",
			"-1 Speed for Risks, prevent up to 2 Stamina damage."
		],
		effects: [
			['bonus','speed',-1],
			['protect','stamina',1]
		],
		uses: 1, // BUG: All protect items are 1 use
		useText: "My shield breaks apart, absorbing 1 Stamina damage.",
		optionalUse: false, // protect and bonus effects currently can not be optional
		css: "item-wooden-shield"
	},
	{
		type: "item",
		name: "Big Mushroom",
		header: "I wonder what it tastes like?",
		text: [
			"It's as big as my head! Stories say that Gnomes live in these things. I wonder how that changes the flavour.",
			"3 Uses of +1 Stamina for Risks."
		],
		effects: [
			['bonus','stamina',1]
		],
		uses: 3,
		useText: "",
		optionalUse: true,
		useText: "Nibble my mushroom (+1 Stamina)",
		css: "item-big-mushroom"
	},
	{
		type: "item",
		name: "Peppy Sprite",
		header: "You've made a friend!",
		text: [
			"A small, delicate creature dances around my head, shimmering like crystal in the light.",
			"I feel more courageous with her beside me! She wouldn't leave, right?",
			"3 Uses of +3 Courage for Risks, -1 Courage permanently."
		],
		effects: [
			['permanent','courage',-1],
			['bonus','courage',3]
		],
		uses: 5,
		useText: "",
		optionalUse: false,
		css: "item-peppy-sprite"
	}
	/*
	For later, when we have status effects
	{
		type: "item",
		name: "Compass",
		header: "A comfort in a strange world.",
		text: [
			"It looks old, like someone left it here a long time ago. The needle is as keen as ever though.",
			"When you get Lost, this can help you get your bearings again."
		],
		effects: null,
		uses: null,
		optionalUse: false,
		css: "item-compass"
	}

	For later, when we have items causing risks
	{
		type: "item",
		name: "Locked Box",
		header: "Who left it and what did they hide away?",
		text: [
			"A rusted iron lock holds this cold chest closed. The royal crest is painted on top in bright colours.",
			"You could try to pick the lock. Otherwise it's a very handsome paperweight."
		],
		effects: null,
		uses: null,
		optionalUse: false,
		css: "item-locked-box"
	}*/
];

/*
compass, voodoo charm, sailor's charm,
sailor's sword, sailor's cap, gold coin,
tiki torch, pineapple, missing locket,
cannon ball
tribal mask, stone idol, boar tusk,

+sailor item set bonus!
*/
OCEAN_ITEMS = [
	{
		type: "item",
		name: "Compass",
		header: "A constant comfort in a strange world, always pointing North.",
		text: [
			"Painted to look like a real, royal sailor's compass. It looks a bit worn but the needle is as keen as ever.",
			"When you get Lost, this can help you get your bearings again and keep pushing forward."
		],
		css: "item-compass"
	},
	{
		type: "item",
		name: "Voodoo Charm",
		header: "Crafted from strange feathers, ancient wood, and what you hope is paint...",
		text: [
			"This "
		],
		css: "item-voodoo-charm"
	}
];

/*
20 items, 40 events, 20 omens. probably half for single-player to start with




,
	{
		type: "item",
		name: "",
		header: "",
		text: [
			""
		],
		effects: [
			["stamina",-1]
		],
		uses: null,
		useText: "",
		optionalUse: null,
		take: function() {},
		use: function() {}
	}


	during play, optionalUse goes "null" when it has been used that turn

	BUG WORKAROUND: always-on use items get used 2 turns faster than I want. Rather than mess up code to fix it, just add 2 use

*/
