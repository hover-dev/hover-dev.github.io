/* 
compass, voodoo charm, sailor's charm,
sailor's sword, sailor's cap, gold coin,
tiki torch, pineapple, missing locket,
cannon ball
tribal mask, stone idol, boar tusk,

+sailor item set bonus!
*/
var no_take = "Item has no effect when taken.";
var no_use = "Item has no effect when used.";
OCEAN_ITEMS = [
	{
		name: "Compass",
		header: "A constant comfort in a strange world, always pointing North.",
		text: [
			"Painted to look like a real, royal sailor's compass. It looks a bit worn but the needle is as keen as ever.",
			"When you get Lost, this can help you get your bearings again and keep pushing forward."
		],
		take: function() { throw no_take; },
		use: function() {
			// remove Lost and discard if you are Lost
		},
		type: "item-compass"
	},
	{
		name: "Voodoo Charm",
		header: "Crafted from strange feathers, ancient wood, and what you hope is paint...",
		text: [
			"This "
		],
		take: function() { throw no_take; },
		use: function() {
			// success if in an event
			// throw otherwise
		},
		type: "item-voodoo-charm"
	}
];

/*
20 items, 40 events, 20 omens. probably half for single-player to start with




,
	{
		name: "",
		header: "",
		text: [
			""
		],
		take: function() {},
		use: function() {}
	}


*/