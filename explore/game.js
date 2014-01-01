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
		stamina: 3,
		courage: 3,
		knowledge: 3,
		hand: [],
		board: 0,
		position: {x: 0, y: 0}
	};
	$scope.pickTrait = function(name) {
		$scope.character[name] += 1;
		$scope.startExploring();
		$scope.drawItem();
	};

	// Set the theme
	$scope.theme = THEMES[0];//[rand(0,THEMES.length)];

	// Initial map data
	$scope.map = $scope.theme.startMap;
	UNEXPLORED_TILE = {
		css: "unexplored"
	}

	/**
	* HELPERS
	*/

	$scope.update = function() {
		// Dummy function to trigger Angular's apply on click
	}

	// Get a tile's dynamic classes
	$scope.getTileClass = function(tile) {
		// Logic for classes
		return tile.css;
		/*var classes = [tile.css];
		if (tile.transition) classes.push('transition');

		// Compile and return classes
		var classString = '';
		for (var x = 0; x < classes.length; x++) {
			classString += classes[x]+' ';
		}
		return classString;*/
	};

	// Popup for a given card
	$scope.showCard = function(card) {
		//gControlsLocked = false;

		// Reset the buttons
		$('.risk').show();
		$('.outcome').hide();
		if (card.type != 'item' && card.risk && !card.risk.optional) $('.continue').hide();
		
		// Show the modal
		$scope.popup = card;
		$('#popup').modal("show");
	};

	// Add a given card to the character's hand
	$scope.addCard = function(card) {
		$scope.character.hand.push(card);
	}

	// Draw a random item
	$scope.drawItem = function() {
		var items = $scope.theme.items;
		var card = items[rand(0,items.length)];
		return card;
		//$scope.addCard(card);
		//$scope.showCard(card);
	};

	// Remove current item
	$scope.dropItem = function(card) {
		var hand = $scope.character.hand;
		var index = hand.indexOf(card);
		// Remove the item and copy it back
		hand.splice(index, 1);
	}

	// Draw a random event
	$scope.drawEvent = function() {
		var events = $scope.theme.events;
		var card = events[rand(0,events.length)];
		return card;
		//$scope.showCard(card);
	};

	// Resolve the effects of a card
	function resolve(effect) {
		// Attribute effects
		// Item effects (later)
		// Status effects (later)
	}

	// Try your hand at a risk
	$scope.takeRisk = function(card) {
		// Roll the dice based on our appropriate attribute
		var roll = 0;
		var attribute = $scope.character[card.risk.attribute];
		for (var i = 0; i < attribute; i++) {
			roll += rand(0,6)+1;
		}
		
		// Check for the best effect we succeeded in getting
		var succeeded = false;
		var effect = null;
		for (var n = 0; n < card.effects.length; n++) {
			var target = card.effects[n][0];
			if (target <= roll) {
				effect = card.effects[n];
				// Effects with a 0 target number are not successes
				if (target != 0) succeeded = true;
			}
		}

		// Resolve the mechanical effect
		// TODO: display the mechanical outcomes
		if (effect) {
			resolve(effect);
		}

		// Convert the success/failure into text
		if (succeeded) 	succeeded = card.risk.text[1];
		else 			succeeded = card.risk.text[2];

		// Replace the risk with its outcome
		// Also allow the player to continue
		$('.risk').hide();
		$('.outcome').html('<p>Rolled '+roll+'.</p><p>'+succeeded+'</p>').show();
		$('.continue').show();
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
				var map = $scope.map;//[character.board];

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
			// Collect the cards we're drawing
			var draws = [];
			for (var i = 0; i < $scope.tiles[4].events; i++) {
				draws.push($scope.drawEvent());
			}
			for (var i = 0; i < $scope.tiles[4].fears; i++) {

			}
			for (var i = 0; i < $scope.tiles[4].items; i++) {
				draws.push($scope.drawItem());
			}

			// Make the next card in the queue open when a card closes
			var i = 0;
			$('#popup').on('hidden.bs.modal', function () {
				nextCard();
			});
			nextCard();

			console.log(draws);
			function nextCard() {
				console.log(i);
				console.log(draws[i]);
				if (draws[i].type == 'item') {
					$scope.addCard(draws[i]);
				}
				$scope.showCard(draws[i]);
				$scope.$apply();
				i++;
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
				/*case 4:
					if (tile.transition) {
						$scope.character.board = tile.transition.board;
						$scope.character.position.x = tile.transition.x;
						$scope.character.position.y = tile.transition.y;
					}
					break;*/
			}

			// On arriving at the next tile
			var currentBoard = $scope.map;//[$scope.character.board];
			var position = $scope.character.position.x+","+$scope.character.position.y;
			if (position in currentBoard) {
				// Draw all the changes
				$scope.redrawTiles();
			}
			else {
				// New tile
				var tiles = $scope.theme.tiles;//[$scope.character.board];
				var newTile = tiles[rand(0,tiles.length)];
				$scope.map[position]/*[$scope.character.board][position]*/ = newTile;

				// Draw all the changes
				$scope.redrawTiles();

				// Mark the new tile as such
				$scope.tiles[4].isNew = true;
			}

		}
	}
}
