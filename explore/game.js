/**
* Psuedo classes because I'm too lazy to strictly define them:
*
* Cards:
*   - Name
*   - Header
*   - Text (array of paragraphs)
*   - take (fn)
*   - use (fn)
*   - Class (css)
*
* Tiles:
*   - Class (css)
*
* Will probably want to refactor these as time goes on.
* Maybe even bring them into proper classes and instances?
*/

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
		hand: [OCEAN_ITEMS[0], OCEAN_ITEMS[1]],
		board: 0,
		position: {x: 0, y: 0}
	};
	$scope.pickTrait = function(name) {
		$scope.character[name] += 1;
		$scope.startExploring();
		$scope.drawItem();
	};

	// Set the theme
	$scope.theme = THEMES[rand(0,THEMES.length)];

	// Initial map data
	// TODO: make start tiles depend on theme
	$scope.map = [{ // ocean
		"0,0": {
			class: "start"
		},
		"1,0": {
			class: "buoy"
		},
		"2,0": {
			class: "shore"
		}
	},
	{ // shore
		"0,0": {
			class: "dock"
		}
	}];
	UNEXPLORED_TILE = {
		class: "unexplored"
	}

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

	// Redraw tiles on a given coordinate
	$scope.redrawTiles = function() {
		// Clear the tiles
		$scope.tiles = [];
		// Redraw it based on the map and character position
		var character = $scope.character;
		for (var ymod = 1; ymod > -2; ymod--) {
			for (var xmod = -1; xmod < 2; xmod++) {
				// Grab character position and board
				var pos = (character.position.x+xmod)+","+(character.position.y+ymod);
				var map = $scope.map[character.board];

				// Update the corresponding tile
				if (pos in map) {
					$scope.tiles.push(map[pos]);
				}
				else {
					$scope.tiles.push(UNEXPLORED_TILE);
				}
			}
		}
	}
	$scope.redrawTiles();

	$scope.clickedTile = function(index) {
		if (index == 1 || index == 3 || index == 5 || index == 7) {
			switch (index) {
				case 1:
					$scope.character.position.y += 1;
					break;
				case 3:
					$scope.character.position.x -= 1;
					break;
				case 5:
					$scope.character.position.x += 1;
					break;
				case 7:
					$scope.character.position.y -= 1;
					break;
			}
			$scope.redrawTiles();
		}
	}
}