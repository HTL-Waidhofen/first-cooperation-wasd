document.addEventListener("DOMContentLoaded", function () {

	function TicTacToe (element) {
		var current = 0,
			players = [ "x", "o" ],
			field = document.createElement("table"),
			caption = document.createElement("caption"),
			labels = [
				["oben links", "oben mittig", "oben rechts"],
				["Mitte links", "Mitte mittig", "Mitte rechts"],
				["unten links", "unten mittig", "unten rechts"]
			],
			messages = {
				"o's-turn": "Spieler O ist am Zug.",
				"x's-turn": "Spieler X ist am Zug.",
				"o-wins": "Spieler O gewinnt.",
				"x-wins": "Spieler X gewinnt.",
				"draw": "Das Spiel endet unentschieden.",
				"instructions": "Zum Spielen bitte abwechselnd in die Spielfelder klicken/tappen!",
				"select": "wählen",
				"new game?": "Neues Spiel?"
			},
			finished, games, b, c, i, r, tr;

		function check () {
			var tds = field.getElementsByTagName("td"),
				full = true,
				buttons, i, winner;

			tds = field.getElementsByTagName("td");

			for (i = 0; i < tds.length; i++) {

				if (tds[i].className == "") {
					full = false;
				}
			}

			for (i = 0; i < 3; i++) {

				if (tds[0 + i].className != ""
					&& tds[0 + i].className == tds[3 + i].className
					&& tds[3 + i].className == tds[6 + i].className
				) {
					winner = tds[0 + i].className;

					highlightCells([
						tds[i], tds[3 + i], tds[6 + i]
					]);
				}

				if (tds[i*3 + 0].className != ""
					&& tds[i*3 + 0].className == tds[i*3 + 1].className
					&& tds[i*3 + 1].className == tds[i*3 + 2].className
				) {
					winner = tds[i*3].className;

					highlightCells([
						tds[i*3], tds[i*3 + 1], tds[i*3 + 2]
					]);
				}
			}

			if (tds[0].className != ""
				&& tds[0].className == tds[4].className
				&& tds[4].className == tds[8].className
			) {
				winner = tds[0].className;

				highlightCells([
					tds[0], tds[4], tds[8]
				]);
			}

			if (tds[2].className != ""
				&& tds[2].className == tds[4].className
				&& tds[4].className == tds[6].className
			) {
				winner = tds[2].className;

				highlightCells([
					tds[2], tds[4], tds[6]
				]);
			}

			if (full || winner) {

				finished = true;

				field.className = "game-over";

				if (winner) {

					caption.innerHTML = messages[
						players[current] + "-wins"
					];

				} else {

					caption.innerHTML = messages["draw"];
				}

				buttons = field.getElementsByTagName("button");

				while (buttons.length) {
					buttons[0].parentNode.removeChild(buttons[0]);
				}

				buttons = document.createElement("button");
				buttons.innerHTML = messages["new game?"];

				caption.appendChild(document.createTextNode(" "));
				caption.appendChild(buttons);

				buttons.addEventListener("click", function (event) {
					var cells = field.getElementsByTagName("td"),
						button, cell;

					current = 0;
					finished = false;
					field.removeAttribute("class");

					for (r = 0; r < 3; r++) {
						for (c = 0; c < 3; c++) {
							cell = cells[r * 3 + c];
							cell.removeAttribute("class");
							cell.innerHTML = "";

							
							button = document.createElement("button");
							button.innerHTML = labels[r][c] + " " + messages["select"];

							cell.appendChild(button);
						}
					}

					caption.innerHTML = messages[
						players[current] + "'s-turn"
					];
				});
			}
		}

		function highlightCells (cells) {
			cells.forEach(function (node) {
				var el = document.createElement("strong");

				el.innerHTML = node.innerHTML;

				node.innerHTML = "";
				node.appendChild(el);
				node.classList.add("highlighted");
			});
		}

		function mark (event) {
			var td = event.target;

			while (td.tagName.toLowerCase() != "td"
				&& td != field
			) {
				td = td.parentNode;
			}

			if (!finished
				&& td.tagName.toLowerCase() == "td"
				&& td.className.length < 1
			) {

				td.className = players[current]; 
				td.innerHTML = players[current];

				check(); 

				if (!finished) {

					current = 1 - current; 
					
					caption.innerHTML = messages[
						players[current] + "'s-turn"
					];
				}
			}
		}

		b = document.createElement("p");
		b.innerHTML = messages["instructions"];
		element.appendChild(b);

		element.appendChild(field);

		field.appendChild(caption); 
		field.appendChild(document.createElement("tbody"));

		caption.innerHTML = messages[
			players[current] + "'s-turn"
		];

		for (r = 0; r < 3; r++) {
			tr = document.createElement("tr");

			field.lastChild.appendChild(tr);

			for (c = 0; c < 3; c++) {
				tr.appendChild(document.createElement("td"));

				b = document.createElement("button");
				b.innerHTML = labels[r][c] + " " + messages["select"];

				tr.lastChild.appendChild(b);
			}
		}

		field.addEventListener("click", mark);
	}

	games = document.querySelectorAll(".tic-tac-toe");

	for (i = 0; i < games.length; i++) {
		TicTacToe(games[i]); 
	}
});