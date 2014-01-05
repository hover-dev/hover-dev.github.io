FOREST_TERRORS = [
	{
		type: "terrorIntro",
		intro: "My ring is starting to get heavy. It just told me not to worry.",
		warnings: [
			"The ring is too tight to take off.",
			"The voice is getting angrier."
		],
		event: {
			type: "terror",
			name: "Voices",
			header: "Maybe I should just stay in the forest with my precious ring.",
			target: 10,
			text: [
				"The ring has been a good companion to me so far. It really has helped me through this tough time. All it wants in return is for me to spend a bit more time here.",
				"That's more than my family ever did for me. It's their fault that they live so far away. I wouldn't be in this damn forest if not for them!",
				"Uh oh."
			],
			staminaRisk: [
				"I didn't need that finger. (Stamina)",
				"I use what I have to sever the finger. My mind clears as the ring drops and I quickly wrap the clean cut.",
				"The ring drops, stained thick with blood. I sit next to it as I clench my bleeding wound."
			],
			speedRisk: [
				"Rip the ring off! (Speed)",
				"I quickly get it off before it tightens more. My finger is black where the ring was but at least it's off.",
				"The more I pull the tighter it feels. My finger is purple now and I stop trying."
			],
			courageRisk: [
				"Defy the creeping voice. (Courage)",
				"I yell loudly in defiance. I'm not afraid of the voice and it knows it. The forest goes silent and I remove the ring.",
				"My shouts become more panicked, and each one causes the voice to grow louder. It is not impressed."
			]
		}
	}
]