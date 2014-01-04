/*
Target numbers planned from [attr]d6 and anydice.com
trivial: 	4
easy: 		8
medium: 	12
hard: 		16
unlikely: 	20
*/
/*
will-o-wisp
bridge
flowers and thorns

*/

/*
Base on the hero's journey, initiation phase
2.2.1 The Road of Trials
2.2.2 The Meeting With the Goddess
2.2.3 Woman as Temptress
2.2.4 Atonement with the Father
2.2.5 Apotheosis
2.2.6 The Ultimate Boon
*/

FOREST_EVENTS = [
	/*{
		type: "event",
		name: 'Watching You',
		header: 'What was that sound?',
		text: [
			"I swear something followed me here. I can feel the gaze on the back of my neck, raising my hairs. Shadows dart in the corner of my eyes.",
			"I think I can ditch them in the ravine ahead if I'm fast enough..."
		],
		risk: {
			text: [ // choice, success, failure
				"Run for it (Stamina Medium)",
				"Everything happens in a blur. On the other side everything is silent save for my pounding heart.",
				"Something pushes me to the ground as I run. I don't feel the presence anymore but my hands won't stop shaking."
			],
			optional: false,
			attribute: 'stamina'
		},
		effects: [
			[0,'courage',-1],
			[10,'courage',0]
		]
	},*/
	{
		type: "event",
		name: 'The River',
		header: 'Rushing water blocks my path.',
		text: [
			"I take a sip and the water is freezing. It's running pretty strong but there's a shallow part I could probably make my way across.",
			"Of course, I don't have to. It's going to be a pretty long detour to reach a bridge though."
		],
		risk: {
			text: [ // choice, success, failure
				"Ford the river (Speed Medium)",
				"I take off my shocks and shoes and carefully traverse the river. That wasn't too hard.",
				"I jump from stone to stone and slip. I get to the other side, drenched and shivering."
			],
			optional: true,
			attribute: 'speed'
		},
		effects: [
			[0,'stamina',-1],
			[10,'stamina',1]
		]
	}
];

OCEAN_EVENTS = [];

/*
,
	{
		type: "event",
		name: '',
		header: '',
		text: [
			"",
			""
		],
		test: {
			text: [ // choice, success, failure
				"",
				"",
				""
			],
			optional: true,
			attribute: 'stamina'
		},
		effects: [
			[20,'stamina',-1]
		]
	}
*/
