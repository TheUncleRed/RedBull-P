const { dbNumbers } = require('../../index.js');

function generateNumberTempCase() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

async function generateNumberUniqueTempCase() {
let isUnique = false;
let randomNumber;

while (!isUnique) {
randomNumber = generateNumberTempCase();
        
let existingNumbers = dbNumbers.get('dataNumbers-TempCase');

if (!Array.isArray(existingNumbers)) {
existingNumbers = [];
dbNumbers.push('dataNumbers-TempCase', existingNumbers);
}

if (!existingNumbers.includes(randomNumber)) {
isUnique = true;
existingNumbers.push(randomNumber);
dbNumbers.set('dataNumbers-TempCase', existingNumbers);
} else {
console.log(`${randomNumber}`);
}
}

return randomNumber;
}

module.exports = { generateNumberUniqueTempCase, generateNumberTempCase  };