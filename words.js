// Read words from external file
const fs = require('fs');
const WORDS = fs.readFileSync('words.txt', 'utf8')
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0); 