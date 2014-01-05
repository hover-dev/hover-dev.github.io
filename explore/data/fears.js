/*
Fears are items with a terrorIndex that relates to their Terror
*/

FOREST_FEARS = [
	{
		type: "fear",
		name: "Terrible Ring",
		header: "There's something odd about this one.",
		text: [
			"What a find! The inscriptions around the band are pretty amazing and it fits snugly on my finger.",
			"It feels oddly warm to the touch though, like someone was just wearing it. No matter, it's one of the best rings I've ever owned and it feels right.",
			"-1 Courage for Risks, prevent up to 2 Courage damage."
		],
		effects: [
			['protect','courage',1],
			['bonus','courage',-2]
		],
		uses: null,
		useText: "My ring speaks to me, absorbing 1 Courage damage.",
		optionalUse: false,
		terrorIndex: 0,
		css: "item-terrible-ring"
	},
	{
		type: "fear",
		name: "Strange Flask",
		header: "Anything's good when you're thirsty enough.",
		text: [
			"Desperate, I clawed at the lid of this flask. Even just a drop of something would keep me going.",
			"It tasted fine, the bubbles were refreshing, and it quenched my thirst. Were my limbs always this heavy? At least there's another sip left.",
			"1 Use of +1 Stamina for Risks, -1 Speed permanently."
		],
		effects: [
			['permanent','speed',-1],
			['bonus','stamina',1]
		],
		uses: 1,
		useText: "Drink from my flask (+1 Stamina)",
		optionalUse: true,
		terrorIndex: 0,
		css: "item-strange-flask"
	}
]