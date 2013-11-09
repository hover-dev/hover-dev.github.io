/**
* Psuedo typees because I'm too lazy to strictly define them:
*
* Cards:
*   - Name
*   - Header
*   - Text (array of paragraphs)
*   - take (fn)
*   - use (fn)
*   - type (css)
*
* Tiles:
*   - type (css)
*
* Will probably want to refactor these as time goes on.
* Maybe even bring them into proper typees and instances?
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
			name: "Open Water",
			type: "start"
		},
		"1,0": {
			name: "Buoy",
			type: "buoy"
		},
		"2,0": {
			name: "Large Island",
			type: "shore"
		}
	},
	{ // shore
		"0,0": {
			name: "Old Docks",
			type: "docks"
		}
	}];
	UNEXPLORED_TILE = {
		type: "unexplored"
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

	// Clicking a tile and moving
	$scope.clickedTile = function(index, type) {
		if (index == 1 || index == 3 || index == 5 || index == 7 || index == 4) {
			switch (index) {
				// Move compass directions
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
				// Move into the other board
				case 4:
					// if middle tile is a transition tile between maps
					break;
			}

			// On arriving at the next tile
			var currentBoard = $scope.map[$scope.character.board];
			var position = $scope.character.position.x+","+$scope.character.position.y;
			if (position in currentBoard) {
				// Draw all the changes
				$scope.redrawTiles();
			}
			else {
				// New tile
				var tiles = $scope.theme.tiles[$scope.character.board];
				var newTile = tiles[rand(0,tiles.length)];
				$scope.map[$scope.character.board][position] = newTile;

				// Draw all the changes
				$scope.redrawTiles();

				// Flash tile to give us a chance to see it before we get cards
				$($('.tile')[4]).animate({transform: 'scaleX(2) scaleY(2)'});
				// Draw cards for the tile
				for (var i = 0; i < newTile.events; i++) {

				}
				for (var i = 0; i < newTile.fears; i++) {

				}
				for (var i = 0; i < newTile.items; i++) {
					$scope.drawItem();
				}
			}
		}
	}
}
