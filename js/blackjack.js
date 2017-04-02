function deal() {
    var card = Math.floor(Math.random() * 52 + 1);  // select random card
    return card;
}

function getCards(game) {
    var card = deal();
    while(game.cards[card] != 0) {  //check if card is already used
        card = deal();		
    }
    game.cards[card] = 1;  // mark card as used
    return card;
}

function reset(game) {
    var i;
    for(i = 0; i < 52; i++) game.cards.push(0);  //make all cards unused
}

function convert(card) {
    if(card % 13 == 0 || card % 13 == 11 || card % 13 == 12) return 10;
    else if(card % 13 == 1) return 11;
    else return card % 13;
}

function getSymbolType(card) {
    var x = Math.floor((card - 1) / 13);
	if(x == 0) return "hearts";
	else if(x == 1) return "diamonds";
	else if(x == 2) return "clubs";
	else return "spades"
}

function getCardType(card) {
	if(card % 13 == 0) return "K";
	else if(card % 13 == 12) return "Q";
	else if(card % 13 == 11) return "J";
	else if(card % 13 == 1) return "A";
	else return card % 13;
}

function addCardPlayer(game, numPlayerCards) {
	game.playerCards.push(getCards(game));  //add card
	game.playerScore+=convert(game.playerCards[numPlayerCards - 1]);
	
	//setting card
	var cardType = getCardType(game.playerCards[numPlayerCards - 1]);
	var symbolType = getSymbolType(game.playerCards[numPlayerCards - 1]);
	$(".player .card:nth-child(" + numPlayerCards + ") .front p").text(cardType);  //set card type
	$(".player .card:nth-child(" + numPlayerCards + ") .front div").addClass(symbolType);  //set card symbol
	$(".player .card:nth-child(" + numPlayerCards + ")").css('display', 'inline-block').hide().fadeIn();
	$(".player .card:nth-child(" + numPlayerCards + ")").addClass("flip");
	$(".player .card:nth-child(" + numPlayerCards + ") .front").addClass("zindex");
}

function newgame() {
	var game = {
		playerScore: 0,
		cpuScore: 0,
        cards: [],
        playerCards: [],
        cpuCards: []
	};
	var gameIsOver = 0;
	var numPlayerCards = 2, numCpuCards = 2;
	var	winLoseMessage;
    reset(game);
	
	//add 2 cards for player and cpu
    game.playerCards.push(getCards(game));
    game.playerCards.push(getCards(game));
    game.cpuCards.push(getCards(game));
    game.cpuCards.push(getCards(game));
    game.playerScore = convert(game.playerCards[0]) + convert(game.playerCards[1]);
	game.cpuScore = convert(game.cpuCards[0]) + convert(game.cpuCards[1]);
	
	//set first and second card for player
	var cardType = getCardType(game.playerCards[0]);
	var symbolType = getSymbolType(game.playerCards[0]);
	$(".player .card:nth-child(1) .front p").text(cardType);
	$(".player .card:nth-child(1) .front div").addClass(symbolType);
	$(".player .card:nth-child(1)").css('display', 'inline-block').hide().fadeIn();
	$(".player .card:nth-child(1)").addClass("flip");
	$(".player .card:nth-child(1) .front").addClass("zindex");
	
	var cardType = getCardType(game.playerCards[1]);
	var symbolType = getSymbolType(game.playerCards[1]);
	$(".player .card:nth-child(2) .front p").text(cardType);
	$(".player .card:nth-child(2) .front div").addClass(symbolType);
	$(".player .card:nth-child(2)").css('display', 'inline-block').hide().fadeIn();
	$(".player .card:nth-child(2)").addClass("flip");
	$(".player .card:nth-child(2) .front").addClass("zindex");
	
	//set first and second card for cpu
	
	var cardType = getCardType(game.cpuCards[0]);
	var symbolType = getSymbolType(game.cpuCards[0]);
	$(".dealer .card:nth-child(1) .front p").text(cardType);
	$(".dealer .card:nth-child(1) .front div").addClass(symbolType);
	$(".dealer .card:nth-child(1)").css('display', 'inline-block').hide().fadeIn();
	
	var cardType = getCardType(game.cpuCards[1]);
	var symbolType = getSymbolType(game.cpuCards[1]);
	$(".dealer .card:nth-child(2) .front p").text(cardType);
	$(".dealer .card:nth-child(2) .front div").addClass(symbolType);
	$(".dealer .card:nth-child(2)").css('display', 'inline-block').hide().fadeIn();
	$(".dealer .card:nth-child(2)").addClass("flip");
	$(".dealer .card:nth-child(2) .front").addClass("zindex");
	
	
		$(".buttons .hit").click(function() {
			numPlayerCards++;
			addCardPlayer(game, numPlayerCards);
			if(game.playerScore > 21){  //player has more than 21 points
				$(".dealer .card:nth-child(1)").addClass("flip");
				$(".dealer .card:nth-child(1) .front").addClass("zindex");
				winLoseMessage = "You lost!";
				gameIsOver = 1;
				$(".hit").hide();
				$(".stand").hide();
				$(".new").css('display','inline-block');
				$(".message").addClass("isvisible");
				$(".message .info").text(winLoseMessage);
			}
		});
		
		$(".buttons .stand").click(function() {
			$(".dealer .card:nth-child(1)").addClass("flip");
			$(".dealer .card:nth-child(1) .front").addClass("zindex");
			while(gameIsOver == 0) {
				if(game.cpuScore < 17) {  //cpu has less than 17 points
					numCpuCards++;
					game.cpuCards.push(getCards(game));  //adding a new card to cpu
					game.cpuScore+=convert(game.cpuCards[numCpuCards - 1]);
					var cardType = getCardType(game.cpuCards[numCpuCards - 1]);		
					var symbolType = getSymbolType(game.cpuCards[numCpuCards - 1]);		
					$(".dealer .card:nth-child(" + numCpuCards + ") .front p").text(cardType);  //set card type
					$(".dealer .card:nth-child(" + numCpuCards + ") .front div").addClass(symbolType);  //set card symbol
					//flip animation
					$(".dealer .card:nth-child(" + numCpuCards + ")").css('display', 'inline-block').hide().fadeIn();
					$(".dealer .card:nth-child(" + numCpuCards + ")").addClass("flip");
					$(".dealer .card:nth-child(" + numCpuCards + ") .front").addClass("zindex");
				}							
				else {	 
					if(game.cpuScore >= 17 && game.cpuScore <= 21) {
						if(game.cpuScore == 21 && game.playerScore == 21) {
							if(game.numCpuCards == 2 && game.playerCards == 2) winLoseMessage = "It's a draw!";  //if both cpu and player have blackjack
							else if(game.numCpuCards == 2) winLoseMessage = "You lost!";  //if cpu has blackjack
							else winLoseMessage = "You won!";  //if player has blackjack
							gameIsOver = 1;
						}
						else {
							if(game.playerScore >= game.cpuScore) winLoseMessage = "You won!";  //player score is greater than cpu score
							else winLoseMessage = "You lost!";  //cpu score is greater than player score
							gameIsOver = 1;
						}
					}
					else if(game.cpuScore > 21) {
						winLoseMessage = "You won!";  //if cpu has more than 21 points
						gameIsOver = 1;
					}
				}
			}
			if(gameIsOver) {
				//hide hit and stand buttons
				$(".hit").hide();	
				$(".stand").hide();
				$(".new").css('display','inline-block');  //show newgame button
				$(".message").addClass("isvisible");
				$(".message .info").text(winLoseMessage);
			}
		});
		$(".new").click(function() {
			location.reload();
		});
		
}

$(document).ready(function(){
	newgame();
	$(".message").click(function(){
		$(this).hide();
	});
});

