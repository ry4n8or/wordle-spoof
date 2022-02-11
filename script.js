document.addEventListener('DOMContentLoaded', () => {
	createLetterSpots(document.getElementById('letter-ctr'));

	let row = 0;
	let column = 0;
	const theWord = 'ULCER';

	const buttons = document.querySelectorAll('button');
	for (let button = 0; button < buttons.length; button++) {
		buttons[button].addEventListener('click', () => {
			if (buttons[button].value === 'ENTER' && column === 5) {
				checkWord(theWord, row);
				row++;
				column = 0;
			}
			else if (buttons[button].value === 'DELETE' && column > 0) {
				column--;
				gamedelete(row, column);
			}
			else if ((buttons[button].value !== 'DELETE' && buttons[button].value !== 'ENTER') && row <= 5 && column <= 4) {
				game(row, column, buttons[button].value);
				column++;
			}
		});
	}
});

function createLetterSpots(container) {
	for (let row = 0; row < 6; row++) {
		for(let spot = 0; spot < 5; spot++) {
			createSpot(row, spot);
		}
	}
}

function createSpot(row, spot) {
	const currentRow = document.getElementById(`row-${row}`);
	const Ltr = document.createElement('div');

	Ltr.setAttribute('id', `r${row}c${spot}`);
	Ltr.textContent = '#';

	currentRow.appendChild(Ltr);
}

function game(row, column, ltr) {
	const piece = document.getElementById(`r${row}c${column}`);
	piece.textContent = ltr;
	piece.style.color = '#ffffff';
}

function gamedelete(row, column) {
	const piece = document.getElementById(`r${row}c${column}`);
	piece.textContent = '#';
	piece.style.color = '#000000';
}

function checkWord(theWord, row) {
	let correct = 0;
	const words = document.querySelectorAll(`#row-${row} div`);
	const word = `${words[0].textContent}${words[1].textContent}${words[2].textContent}${words[3].textContent}${words[4].textContent}`;
	console.log(word)
	const wordOb = {};
	for (let i = 0; i < 5; i++) {
		if (theWord[i] in wordOb) {
			wordOb[theWord[i]]++;
		}
		else {
			wordOb[theWord[i]] = 1;
		}
	}

	// green check
	for (let j = 0; j < 5; j++) {
		if (word[j] === theWord[j]) {
			words[j].style.background = 'green';
			words[j].style.color = 'black';
			correct++;
			document.getElementById(word[j]).style.backgroundColor = 'green';
			if (wordOb[word[j]] === 1) {
				delete wordOb[word[j]];
			}
			else {
				wordOb[word[j]]--;
			}
		}
	}

	if (correct === 5) {
		alert('YOU WIN');
	}

	// yellow or black check
	for (let k = 0; k < 5; k++) {
		if (word[k] in wordOb) {
			words[k].style.background = 'yellow';
			words[k].style.color = 'black';
			if (document.getElementById(word[k]).style.backgroundColor !== 'green') {
				document.getElementById(word[k]).style.backgroundColor = 'yellow';
			}
			if (wordOb[word[k]] === 1) {
				delete wordOb[word[k]];
			}
			else {
				wordOb[word[k]]--;
			}
		}
		else {
			if (document.getElementById(word[k]).style.backgroundColor !== 'green' && document.getElementById(word[k]).style.backgroundColor !== 'yellow') {
				document.getElementById(word[k]).style.backgroundColor = 'black';
				document.getElementById(word[k]).style.color = 'white';
			}
		}
	}
}