function NameCtrl($scope) {
	$scope.names = [
		{name: "Aban",			meaning: "the world forgives daring"},
		{name: "Abazai",		meaning: "the cherry blossoms fall"},
		{name: "Abendago",		meaning: "the unforgotten song"},
		{name: "Abhaz",			meaning: "born in the northern snows"},
		{name: "Aby",			meaning: "the river's memory"},
		{name: "Alanya", 		meaning: "protector of the home"},
		{name: "Alexai", 		meaning: "the hands and the sword"},
		{name: "Ashla", 		meaning: "rest here"},
		{name: "Asvil", 		meaning: "born of light"},
		{name: "Atami", 		meaning: "thoughtful"},
		{name: "Ato", 			meaning: "first born son"},
		{name: "Bajinoth", 		meaning: "the wind whispers"},
		{name: "Cavala", 		meaning: "worthy of love"},
		{name: "Chayan", 		meaning: "born of the marsh"},
		{name: "Cosette", 		meaning: "peace of heart"},
		{name: "Dagul", 		meaning: "father of many"},
		{name: "Ddwyer", 		meaning: "hold fast"},
		{name: "Deta", 			meaning: "white and fair"},
		{name: "Davan", 		meaning: "tall and large"},
		{name: "Dara", 			meaning: "in my arms, be born again"},
		{name: "Dosajee", 		meaning: "in the Suaven I trust"},
		{name: "Dranna", 		meaning: "the heavens in my eyes"},
		{name: "Drial", 		meaning: "I am your friend"},
		{name: "Durt", 			meaning: "worthy of love"},
		{name: "Ecc", 			meaning: "Shanri's mysteries in my heart"},
		{name: "Feyla", 		meaning: "cheerful eyes"},
		{name: "Fyx", 			meaning: "I am alive"},

		{name: "Godfren", 		meaning: "devoted guardian"},
		{name: "Gryndil", 		meaning: "illuminating the darkness"},
		{name: "Gwanal", 		meaning: "my love will give you no rest"},
		{name: "Halia", 		meaning: "the hawk's white wing"},
		{name: "Haroon", 		meaning: "my father rejoices"},
		{name: "Icusalia", 		meaning: "cottage under the moon"},
		{name: "Illudyll", 		meaning: "the soul of the sun"},
		{name: "Isla", 			meaning: "ever watchful"},
		{name: "Jana", 			meaning: "my truth in you"},
		{name: "Jorja", 		meaning: "white hands"},
		{name: "Kavamadil", 	meaning: "purity and grace"},
		{name: "Kyocera", 		meaning: "I cannot be known"},
		{name: "Lisle", 		meaning: "appointed one"},
		{name: "Lonor", 		meaning: "I am the rival"},
		{name: "Lura", 			meaning: "brightest star"},
		{name: "Maja", 			meaning: "laughter heals"},
		{name: "Maura", 		meaning: "the red widow"},
		{name: "Maurevel", 		meaning: "keeper of the woods"},
		{name: "Meza", 			meaning: "where berries grow"},
		{name: "Moryandal", 	meaning: "inevitable victory"},
		{name: "Mxura", 		meaning: "master of the house"},
		{name: "Myri", 			meaning: "full of hope"},
		{name: "No", 			meaning: "forbidden kiss"},
		{name: "Olivama", 		meaning: "I will fool them with desire"},
		{name: "Niassa", 		meaning: "the ungentle night"},
		{name: "Rajh", 			meaning: "I will die on your grave"},

		{name: "Rali", 			meaning: "my meal will be wine"},
		{name: "Regana", 		meaning: "slender stem"},
		{name: "Ryandual", 		meaning: "the abandoned plan"},
		{name: "Sagay", 		meaning: "adviser to power"},
		{name: "Shajar", 		meaning: "little rose"},
		{name: "Shanina", 		meaning: "roots of the tallest tree"},
		{name: "Shara", 		meaning: "veiled rose"},
		{name: "Sitthydeth", 	meaning: "sweetest song"},
		{name: "Sorio", 		meaning: "the warrior brings peace"},
		{name: "Suahavan", 		meaning: "the harp"},
		{name: "Szazs", 		meaning: "the unrepentant heart"},
		{name: "Tasha", 		meaning: "the green meadow"},
		{name: "Tatjan", 		meaning: "friend of the mountain"},
		{name: "Tjan", 			meaning: "most earnest"},
		{name: "Torr", 			meaning: "iron does not bend"},
		{name: "Trixauna", 		meaning: "daughter of the Sword"},
		{name: "Tshanja", 		meaning: "the education of experience"},
		{name: "Tzao", 			meaning: "born of fire"},
		{name: "Ul", 			meaning: "spiced wine"},
		{name: "Uthandaye", 	meaning: "small stone"},
		{name: "Van", 			meaning: "little one"},
		{name: "Vangalio", 		meaning: "my deeds will inspire"},
		{name: "Vanglia", 		meaning: "my family will not forget"},
		{name: "Vrdj", 			meaning: "joined in harmony"},
		{name: "Weatha", 		meaning: "the elder tree"},
		{name: "Wyel", 			meaning: "I pledge"},
		{name: "Zrudura", 		meaning: "my heart aches"}
	];

	$scope.houses = [
		{name: "Burghe",		meaning: "Alone, we stand together",		house: "Bear",		virtue: "Strength"},
		{name: "Steele",		meaning: "I have never surrendered",		house: "Elk",		virtue: "Cunning"},
		{name: "Thorne",		meaning: "I am the land",					house: "Falcon",	virtue: "Courage"},
		{name: "Yvarai",		meaning: "Desire is tamed with a kiss",		house: "Fox",		virtue: "Beauty"},
		{name: "Mwnn",			meaning: "I bear Wisdom's price",			house: "Serpent",	virtue: "Wisdom"},
		{name: "Adrente",		meaning: "My weapon is myself",				house: "Wolf",		virtue: "Prowess"}
	];

	$scope.random = {
		name: $scope.names[Math.floor(Math.random() * $scope.names.length)].name,
		meaning: $scope.names[Math.floor(Math.random() * $scope.names.length)].meaning
	};

	$scope.searchString = "";
	$scope.nameSearch = function(searchString) {
		return $scope.names.filter(function(data) {
			searchString = searchString.toLowerCase();
			return ( data.name.toLowerCase().match(new RegExp(searchString, 'g')) );
		});
	};
}