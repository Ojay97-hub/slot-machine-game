const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

let SYMBOL_VALUES;

const ROWS = 3;
const COLS = 3;
let balance = 0;
let totalWon = 0;
let totalLost = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('setOddsBtn').addEventListener('click', setOdds);
    document.getElementById('depositBtn').addEventListener('click', deposit);
    document.getElementById('spinBtn').addEventListener('click', spinReels);
    document.getElementById('playAgainBtn').addEventListener('click', playAgain);
});

const setOdds = () => {
    const odds = document.getElementById('odds').value;
    switch (odds) {
        case 'low':
            SYMBOL_VALUES = {"A": 5, "B": 6, "C": 10, "D": 20};
            break;
        case 'medium':
            SYMBOL_VALUES = {"A": 10, "B": 12, "C": 20, "D": 40};
            break;
        case 'high':
            SYMBOL_VALUES = {"A": 20, "B": 24, "C": 40, "D": 80};
            break;
        default:
            alert("Please select a valid option.");
            return;
    }

    // Display odds breakdown
    const oddsBreakdownDiv = document.getElementById('oddsBreakdown');
    oddsBreakdownDiv.innerHTML = "<h3>Odds Breakdown</h3><ul>";
    for (const symbol in SYMBOL_VALUES) {
        oddsBreakdownDiv.innerHTML += `<li>${symbol}: ${SYMBOL_VALUES[symbol]}</li>`;
    }
    oddsBreakdownDiv.innerHTML += "</ul>";

    alert(`Betting values/odds set to ${odds}`);
};

const deposit = () => {
    const depositAmount = document.getElementById('depositAmount').value;
    const numberDepositAmount = parseInt(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        alert("Please enter a valid amount.");
    } else {
        balance += numberDepositAmount;
        updateBalance();
        document.getElementById('spinBtn').disabled = false;
    }
};

const spinReels = () => {
    const betAmount = parseInt(document.getElementById('betAmount').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Please enter a valid bet amount.");
        return;
    }

    balance -= betAmount;
    totalLost += betAmount;
    updateBalance();

    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    const rows = transpose(reels);
    displayReels(rows);

    const winnings = getWinnings(rows, betAmount);
    balance += winnings;
    totalWon += winnings;
    updateBalance();
    displayMessage(`You won $${winnings}`);

    if (balance <= 0) {
        displayMessage("You have run out of money. Game over.");
        document.getElementById('spinBtn').disabled = true;
        document.getElementById('playAgainBtn').style.display = 'inline-block';
    }
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const displayReels = (rows) => {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            document.getElementById(`reel${j + 1}`).innerText = rows[i][j];
        }
    }
};

const getWinnings = (rows, betAmount) => {
    let winnings = 0;
    for (let row = 0; row < ROWS; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += betAmount * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const updateBalance = () => {
    document.getElementById('balance').innerText = `Balance: $${balance}`;
    document.getElementById('won').innerText = `Total Won: $${totalWon}`;
    document.getElementById('lost').innerText = `Total Lost: $${totalLost}`;
};

const displayMessage = (message) => {
    const messageDiv = document.getElementById('messages');
    messageDiv.innerText = message;
};

const playAgain = () => {
    balance = 0;
    totalWon = 0;
    totalLost = 0;
    updateBalance();
    document.getElementById('spinBtn').disabled = true;
    document.getElementById('playAgainBtn').style.display = 'none';
    displayMessage('');
};








// // 1. Deposit some money
// // 2. Determine number of lines to bet on 
// // 3. Collect a bet amount
// // 4. Spin the slot machine
// // 5. Check if user won or lost
// // 6. Give user their winnings
// // 7. Play again 

// const prompt = require('prompt-sync')();

// const ROWS = 3;
// const COLS = 3;

// const SYMBOLS_COUNT = {
//     "A": 2,
//     "B": 4,
//     "C": 6,
//     "D": 8
// }

// const setDifficulty = () => {
//     while (true) {
//         const difficulty = prompt("Please select level of betting values (low, medium, high): ");
//         switch (difficulty) {
//             case 'low':
//                 return {
//                     "A": 5,
//                     "B": 6,
//                     "C": 10,
//                     "D": 20
//                 };
//             case 'medium':
//                 return {
//                     "A": 10,
//                     "B": 12,
//                     "C": 20,
//                     "D": 40
//                 };
//             case 'high':
//                 return {
//                     "A": 20,
//                     "B": 24,
//                     "C": 40,
//                     "D": 80
//                 };
//             default:
//                 console.log("Please enter a valid difficulty.");
//         }
//     }
//     let SYMBOL_VALUES = setDifficulty();

// };

// const deposit = () => {
//     while (true) {
//         const depositAmount = prompt("Please deposit some money: ");
//         const numberDepositAmount = parseInt(depositAmount);

//         if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
//             console.log("Please enter a valid amount.");
//         } else {
//             return numberDepositAmount;
//         }
//     }
// };

// const getNumberOfLines = () => {   
//         while (true) {
//             const lines = prompt("Please enter number of lines to bet on (1-3): ");
//             const numberOfLines = parseInt(lines);
    
//             if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
//                 console.log("Please enter a valid amount of lines.");
//             } else {
//                 return numberOfLines;
//             }
//         }
// }

// const getBetAmount = (balance, lines) => {
//     while (true) {
//         const betAmount = prompt("Please enter your bet amount per line: ");
//         const numberBetAmount = parseInt(betAmount);

//         if (isNaN(numberBetAmount) || numberBetAmount <= 0 || numberBetAmount > balance / lines) {
//             console.log("Please enter a valid amount.");
//         } else {
//             return numberBetAmount;
//         }
//     }

// }

// const spin = () => {
//     const symbols = [];
//     for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
//         for (let i = 0; i < count; i++) {
//             symbols.push(symbol);
//         }
//     }
    
//     const reels = [];
//     for (let i = 0; i < COLS; i++) {
//         reels.push([]);
//         const reelSymbols = [...symbols];
//         for (let j = 0; j < ROWS; j++) {
//             const randomIndex = Math.floor(Math.random() * reelSymbols.length);
//             const selectedSymbol = reelSymbols[randomIndex];
//             reels[i].push(selectedSymbol);
//             reelSymbols.splice(randomIndex, 1);
//         }
//     }

//     return reels;
// };

// const transpose = (reels) => {
//     const rows = [];

//     for (let i = 0; i < ROWS; i++) {
//         rows.push([]);
//         for (let j = 0; j < COLS; j++) {
//             rows[i].push(reels[j][i]);
//         }
//     }

//     return rows; 
// };

// const printRows = (rows) => {
//    for (const row of rows) {
//       let rowString = "";
//       for (const [i, symbol] of row.entries()) {
//          rowString += symbol;
//          if (i != row.length - 1){
//             rowString += " | ";
//          }
//       }
//       console.log(rowString);
//    }
// };

// const getWinnings = (rows, betAmount, lines) => {
//     let winnings = 0;

//     for (let row = 0; row < lines; row++) {
//         const symbols = rows[row];
//         let allSame = true;

//         for (const symbol of symbols) {
//             if (symbol !== symbols[0]) {
//                 allSame = false;
//                 break;
//             }
//         }

//         if (allSame) {
//             winnings += betAmount * SYMBOL_VALUES[symbols[0]]
//         }
//     }

//     return winnings; 
// }



// const game = () => {
//     SYMBOL_VALUES = setDifficulty();
//     let balance = deposit();
//     let totalWon = 0;
//     let totalLost = 0;

//     while (true) {
//         console.log("You have a balance of $" + balance);  
//         const numberOfLines = getNumberOfLines();
//         const betAmount = getBetAmount(balance, numberOfLines);
//         balance -= betAmount * numberOfLines;
//         totalLost += betAmount * numberOfLines;    
//         const reels = spin();
//         const rows = transpose(reels);
//         printRows(rows);
//         const winnings = getWinnings(rows, betAmount, numberOfLines);
//         balance += winnings;
//         totalWon += winnings;
//         console.log("You won, $" + winnings.toString());

//         if (balance <= 0) {
//             console.log("You have run out of money.");
//             break;
//         } else {
//             const playAgain = prompt("Would you like to play again? (yes/no): ");
//             if (playAgain === "no") {
//                 break;
//             }
//         }
//     }

//     displayResults(totalWon, totalLost);
// };

// const displayResults = (totalWon, totalLost) => {
//     const difference = totalWon - totalLost;
//     console.log("Total amount won: $" + totalWon);
//     console.log("Total amount lost: $" + totalLost);
//     console.log("Difference: $" + difference);
//     if (totalWon > totalLost) {
//         console.log("You won overall!");
//     } else {
//         console.log("You lost overall.");
//     }
// };

// game();



 

