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
		stamina: {base: 3, bonus: 0},
		courage: {base: 3, bonus: 0},
		speed: {base: 3, bonus: 0},
		hand: [FOREST_ITEMS[1]],
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

	// Turn off Terror mode
	$scope.terrorMode = false;

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

	// Return the bonuses we apply during risks
	$scope.attributesString = "";
	$scope.updateItemBonuses = function() {
		// Reset bonuses
		$scope.character.stamina.bonus = 0;
		$scope.character.courage.bonus = 0;
		$scope.character.speed.bonus = 0;

		// Go through all the effects of all the items in our hand
		var hand = $scope.character.hand;
		for (var n = 0; n < hand.length; n++) {
			for (var m = 0; m < hand[n].effects.length; m++) {
				var effect = hand[n].effects[m];
				// If it's a bonus, track it
				if (effect[0] == 'bonus') {
					$scope.character[effect[1]].bonus += effect[2];
				}
			}
		}

		// Update the readable string
		var character = $scope.character;
		var string = "";
		var attribute = ['stamina', 'courage', 'speed'];
		for (var i = 0; i < 3; i++) {
			var bonus = character[attribute[i]].bonus;
			string += attribute[i][0].toUpperCase() + attribute[i].slice(1) + ": ";
			string += character[attribute[i]].base;
			if (bonus != 0) string += (bonus>0?"+":"")+bonus;
			if (i != 2) string += "; ";
		}
		$scope.attributesString = string;
	}

	// Apply any protection we might have to prevent damage
	function applyProtection(attribute, damage) {
		if (damage <= 0) return null;
		var array = []; // Return [remainingDamage, itemUseText, ...]
		// Go through all the appropriate protection of all the items in our hand
		var hand = $scope.character.hand;
		for (var n = 0; n < hand.length; n++) {
			var effects = hand[n].effects;
			for (var m = 0; m < effects.length; m++) {
				var effect = effects[m];
				// If it's the right protection, track it
				if (effect[0] == 'protect' && effect[1] == attribute) {
					// Soak the damage
					damage -= effect[2];
					array.push($scope.character.hand[n].useText);

					// Break the item
					$scope.character.hand.splice(n,1);

					// When we've protected it all, stop trying
					if (damage <= 0) {
						m = effects.length+1;
						n = hand.length+1;
					}
				}
			}
		}
		array.unshift(-damage);
		return array;
	}

	// Resolve the effects of a card
	function resolve(effect) {
		var NO_EFFECT = "";
		if (effect === null) return NO_EFFECT;

		// Define the changes we want to potentially make
		function changeAttribute(attribute, value) {
			if (value == 0) return NO_EFFECT;
			var string = "";

			// If it's damage, see if we have something to block it
			var protectionArray = applyProtection(attribute, -value);
			if (protectionArray != null) {
				value = protectionArray[0];
				for (var i = 1; i < protectionArray.length; i++) {
					string += protectionArray[i] + " ";
				}
			}

			// Change the attribute value if there's any damage left.
			if (value == 0) return string;
			else {
				$scope.character[attribute].base += value;
				attribute = attribute[0].toUpperCase() + attribute.slice(1); // Capitalize
				string += (value>0?"+":"")+value+" "+attribute+".";
			}
			return string;
		}
		// Item effects (later)
		// Status effects (later)

		// Determine which gets done
		var type = effect[1];
		var value = effect[2];
		switch(type) {
			case 'speed':
			case 'courage':
			case 'stamina':
				return changeAttribute(type, value);
			default:
				return NO_EFFECT;

		}
	}

	// Try your hand at a risk
	$scope.takeRisk = function(card) {
		// Roll the dice based on our appropriate attribute
		var roll = 0;
		var attribute = $scope.character[card.risk.attribute].base + $scope.character[card.risk.attribute].bonus;
		for (var i = 0; i < attribute; i++) {
			roll += rand(0,6)+1;
		}

		// Check for the best effect we succeeded in getting
		var succeeded = false;
		var effect = null;
		for (var n = 0; n < card.effects.length; n++) {
			var target = card.effects[n][0];
			if (roll >= target) {
				effect = card.effects[n];
				// Effects with a 0 target number are not successes
				if (target != 0) succeeded = true;
			}
		}

		// Resolve the mechanical effect
		var mechanics = resolve(effect);

		// Convert the success/failure into text
		if (succeeded) 	succeeded = card.risk.text[1];
		else 			succeeded = card.risk.text[2];

		// Replace the risk with its outcome
		// Also allow the player to continue
		$('.risk').hide();
		$('.outcome').html('<p>Rolled '+roll+'.</p><p>'+succeeded+'</p><p>'+mechanics+'</p>').show();
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
	$scope.redrawTiles(); // First pass

	// Animate a freshly revealed tile and draw its cards
	$scope.discoverNewTiles = function() {
		if (!$scope.tiles[4].isNew) return;
		$scope.tiles[4].isNew = false;

		// Callback to draw cards for the tile
		function drawCards() {
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
				if (draws[i]) nextCard();
			});
			nextCard();

			function nextCard() {
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
							drawCards();
						}
					);
				}, 1000);
			}
		);
	}

	// Discover and update when we move and the tiles change
	$scope.$watch(
		function() {
			return $scope.tiles;
		},
		function() {
			$scope.discoverNewTiles();
			$scope.updateItemBonuses();
		}
	);

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

			// If visited before
			if (position in currentBoard) {
				$scope.redrawTiles();
			}
			// If new tile
			else {
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
