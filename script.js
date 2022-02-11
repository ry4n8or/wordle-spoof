document.addEventListener('DOMContentLoaded', () => {
	createLetterSpots(document.getElementById('letter-ctr'));

	const buttons = document.querySelectorAll('button');
	for (let button = 0; button < buttons.length; button++) {
		buttons[button].addEventListener('click', () => {
			console.log(buttons[button].value)
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