class Game {
    constructor() {
        this.initializeGrid();
        this.initializeKeyboard();
        this.currentRow = 0;
        this.currentTile = 0;
        this.targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        this.setupInput();
        console.log("Target word:", this.targetWord); // For testing
    }

    initializeGrid() {
        const grid = document.getElementById('grid');
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < 5; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                row.appendChild(tile);
            }
            grid.appendChild(row);
        }
    }

    initializeKeyboard() {
        const keyboard = document.getElementById('keyboard');
        const layout = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
        ];

        layout.forEach(row => {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard-row';
            row.forEach(key => {
                const button = document.createElement('button');
                button.textContent = key;
                button.onclick = () => this.handleInput(key);
                keyboardRow.appendChild(button);
            });
            keyboard.appendChild(keyboardRow);
        });
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.handleInput(e.key);
        });
    }

    handleInput(key) {
        if (key === 'Enter') {
            this.checkWord();
        } else if (key === 'Backspace') {
            this.deleteLetter();
        } else if (/^[a-zA-Z]$/.test(key)) {
            this.addLetter(key);
        }
    }

    addLetter(letter) {
        if (this.currentTile < 5) {
            const currentRow = document.getElementsByClassName('row')[this.currentRow];
            const tile = currentRow.children[this.currentTile];
            tile.textContent = letter.toUpperCase();
            this.currentTile++;
        }
    }

    deleteLetter() {
        if (this.currentTile > 0) {
            this.currentTile--;
            const currentRow = document.getElementsByClassName('row')[this.currentRow];
            const tile = currentRow.children[this.currentTile];
            tile.textContent = '';
        }
    }

    checkWord() {
        if (this.currentTile !== 5) return;

        const currentRow = document.getElementsByClassName('row')[this.currentRow];
        const guess = Array.from(currentRow.children)
            .map(tile => tile.textContent.toLowerCase())
            .join('');

        if (!WORDS.includes(guess)) {
            alert('Word not in list!');
            return;
        }

        // Check letters
        for (let i = 0; i < 5; i++) {
            const tile = currentRow.children[i];
            if (guess[i] === this.targetWord[i]) {
                tile.style.backgroundColor = '#6aaa64';
                tile.style.color = 'white';
            } else if (this.targetWord.includes(guess[i])) {
                tile.style.backgroundColor = '#c9b458';
                tile.style.color = 'white';
            } else {
                tile.style.backgroundColor = '#787c7e';
                tile.style.color = 'white';
            }
        }

        if (guess === this.targetWord) {
            alert('Congratulations!');
            return;
        }

        this.currentRow++;
        this.currentTile = 0;

        if (this.currentRow >= 6) {
            alert(`Game Over! The word was ${this.targetWord.toUpperCase()}`);
        }
    }
}

// Start the game when the page loads
window.onload = () => new Game();