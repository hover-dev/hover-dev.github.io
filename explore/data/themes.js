/* 
ocean, forest, chinese mountains
*/

// Adventure themes
//	name - unique id
//	intro/arrival event cards:
//		header - hook the reader to the story
//		text - paragraphs explaining the current position
//		choices - pick a knowledge, speed, or courage character
//		arrival
//	items - items available in this theme
//	tiles - the tiles available to draw [first, second, both]
//	cards - the cards available to draw [first, second, both]
/*,
{
	name: "forest",
	header: "The trail still feels oddly alien after hundreds of expeditions. The familiar foliage rustles underfoot as you probe deeper.",
	text: "",
	choices: []
}*/
THEMES = [
{
	name: "forest", // lost, stalked
	intro: {
		header: "Familiar foliage rustles underfoot but you've lost the trail.",
		text: [
			"This part of the forest seems suddenly alien. The trees seem to shift around me and paths end as quickly as they begin. The sunlight pours dimly through the suffocating canopy. I can't help but think of the scary stories about travellers in the forest.",
			"Deep breaths, I'm sure it picks up just around this corner. Mom and Dad are expecting me for dinner and I musn't keep them waiting."
			],
		choices: [
			"Consult my guidebook, the shared wisdom of explorers.",
			"Stretch and warm up for what's ahead.",
			"Sing a song to raise the spirits."
		]
	},
	items: FOREST_ITEMS,
	tiles: FOREST_TILES,
	events: FOREST_EVENTS,
	startMap: {
		"0,0": {
			name: "Covered Path",
			css: "forest-start" // ending path
		},
		"1,0": {
			name: "Foliage",
			css: "foliage"
		}
	}
},
{
	name: "ocean",
	intro: {
		header: "You breathe in the salty sea air as your small boat glides its course. Finally, the islands are within reach.",
		text: [
			"They've always sparked your imagination, just out of reach. Dreaming of their beautiful sandy shores and the 		creatures that call them home. You've heard the stories but now you're old enough to explore them and tell stories of your own.",
			"Your mother handed you a packed lunch and saw you off. Your father unmoored the boat he helped you build. Your house shrinks in the distance."
			],
		choices: [
			"Consult your guidebook, the shared wisdom of explorers.",
			"Stretch and prepare for the adventure ahead.",
			"Sing a sailor's song to raise the spirits."
		]
	},
	arrival: {
		header: "You breathe in the salty sea air as your small boat glides its course. Finally, the islands are within reach.",
		text: [
			"They've always sparked your imagination, just out of reach. Dreaming of their beautiful sandy shores and the 		creatures that call them home. You've heard the stories but now you're old enough to explore them and tell stories of your own.",
			"Your mother handed you a packed lunch and saw you off. Your father unmoored the boat he helped you build. Your house shrinks in the distance."
			],
		choices: [
			"land ho!"
		]
	},
	items: OCEAN_ITEMS,
	tiles: OCEAN_TILES,
	events: OCEAN_EVENTS,
	startMap: {
		"0,0": {
			name: "Open Water",
			css: "ocean-start"
		},
		"1,0": {
			name: "Buoy",
			css: "buoy"
		},
		"2,0": {
			name: "Large Island",
			css: "shore"//,
			//transition: {board: 1, x: 0, y:0} //to land
		}
	}
}
];