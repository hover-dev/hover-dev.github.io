function GameCntl($scope) {
	function rand(low, high) {
		return Math.floor((Math.random()*high)+low);
	}

	/**
	* GAME
	*/

	// The state the game is currently in
	$scope.States = {
		MENU: "menu.html",			// Pre-game
		ARRIVE: "map.html",			// Finding the map
		EXPLORE: "journey.html",	// The path there
		LEAVE: "start.html",		// Kicking off your journey
	};
	$scope.state = $scope.States.EXPLORE; // read-only!

	// Functions to change the game state
	$scope.newGame = function() {
		$scope.state = $scope.States.ARRIVE;
	};
	$scope.startExploring = function() {
		$scope.state = $scope.States.EXPLORE;
	};
	$scope.stateChanged = function() {
		if ($scope.state === $scope.States.EXPLORE) {
			//$('#popup').modal("show");
		}
	};

	/**
	* INITIAL DATA
	*/

	// Values for the explorer character
	// values from 1-5
	$scope.character = {
		knowledge: 2,
		speed: 2,
		courage: 2,
		hand: [OCEAN_ITEMS[rand(0,2)],OCEAN_ITEMS[rand(0,2)],OCEAN_ITEMS[rand(0,2)],OCEAN_ITEMS[rand(0,2)],OCEAN_ITEMS[rand(0,2)],OCEAN_ITEMS[rand(0,2)]]
	};
	$scope.pickTrait = function(name) {
		$scope.character[name] += 1;
		$scope.startExploring();
		$scope.drawItem();
	};

	$scope.tiles = [];
	for (var i = 0; i < 9; i++) {
		$scope.tiles.push({
			name: i,
			class: "tile"+rand(1,3)
		});
	}

	// Set the theme
	$scope.theme = THEMES[rand(0,THEMES.length)];

	// Phobias and disabilities that help define our character
	// TODO: rethink this mechanics
	$scope.Flaws = [

	];

	/**
	* HELPERS
	*/

	// Popup for a given card
	$scope.showCard = function(card) {
		$scope.popup = card;
		$('#popup').modal("show");
	};

	// Draw a random item
	$scope.drawItem = function() {
		var items = $scope.theme.items;
		$scope.showCard(items[rand(0,items.length)]);
	};
}