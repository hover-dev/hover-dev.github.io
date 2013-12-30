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

function GameCntl($scope, $timeout) {
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
		LEAVE: "start.html"		// Kicking off your journey
	};
	$scope.state = $scope.States.EXPLORE;

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
			type: "shore",
			transition: {board: 1, x: 0, y:0} //to land
		}
	},
	{ // shore
		"0,0": {
			name: "Old Docks",
			type: "docks",
			transition: {board: 0, x: 2, y:0} //to ocean
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

	$scope.update = function() {
		// Dummy function to trigger Angular's apply on click
	}

	// Get a tile's dynamic classes
	$scope.getTileClass = function(tile) {
		// Logic for classes
		var classes = [tile.type];
		if (tile.transition) classes.push('transition');

		// Compile and return classes
		var classString = '';
		for (var x = 0; x < classes.length; x++) {
			classString += classes[x]+' ';
		}
		return classString;
	};

	// Popup for a given card
	$scope.showCard = function(card) {
		//gControlsLocked = false;
		$scope.popup = card;
		$('#popup').modal("show");
		$scope.$apply();
	};

	// Add a given card to the character's hand
	$scope.addCard = function(card) {
		$scope.character.hand.push(card);
	}

	// Draw a random item
	$scope.drawItem = function() {
		var items = $scope.theme.items;
		var card = items[rand(0,items.length)];
		$scope.addCard(card);
		$scope.showCard(card);
	};

	// Remove current item
	$scope.dropItem = function(card) {
		var hand = $scope.character.hand;
		var index = hand.indexOf(card);
		// Remove the item and copy it back
		hand.splice(index, 1);
	}

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

	// Animate a freshly revealed tile and draw its cards
	$scope.discoverNewTiles = function() {
		if (!$scope.tiles[4].isNew) return;
		$scope.tiles[4].isNew = false;

		// Callback to draw cards for the tile
		function resolve() {
			for (var i = 0; i < $scope.tiles[4].events; i++) {

			}
			for (var i = 0; i < $scope.tiles[4].fears; i++) {

			}
			for (var i = 0; i < $scope.tiles[4].items; i++) {
				$scope.drawItem();
			}
		}

		// Flash tile to give us a chance to see it before we resolve effects
		gControlsLocked = true;
		var tile = $($('.tile')[4]);
		tile.css('z-index','100');
		tile.animate(
			{transform: 'scaleX(2.5) scaleY(2.5)'},
			'normal',
			function() {
				$timeout(function() {
					tile.animate(
						{transform: 'scaleX(1) scaleY(1)'},
						'normal',
						function() {
							tile.css('z-index','0');
							gControlsLocked = false;
							resolve();
						}
					);
				}, 1000);
			}
		);
	}

	/**
	* CONTROLS
	*/

	gControlsLocked = false;

	// Clicking a tile and moving
	$scope.clickedTile = function(index, tile) {
		if (gControlsLocked) return;
		if (index == 1 || index == 3 || index == 4 || index == 5 || index == 7 || index == 4) {
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

				// Move to another board
				case 4:
					if (tile.transition) {
						$scope.character.board = tile.transition.board;
						$scope.character.position.x = tile.transition.x;
						$scope.character.position.y = tile.transition.y;
					}
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

				// Mark the new tile as such
				$scope.tiles[4].isNew = true;
			}

		}
	}
}
