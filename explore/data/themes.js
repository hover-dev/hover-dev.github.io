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

THEMES = [
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
	tiles: OCEAN_TILES
}/*,
{
	name: "forest",
	header: "The trail still feels oddly alien after hundreds of expeditions. The familiar foliage rustles underfoot as you probe deeper.",
	text: "",
	choices: []
}*/
];