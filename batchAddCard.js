const { execSync } = require('child_process');

// Your list of card names
const cardNames = [
  "Messiah Born in Bethlehem",
  "A Suffering Servant",
  "Shoot from the Stump of Jesse",
  "Light to the Gentiles",
  "The King on a Colt",
  "Betrayed for Thirty Pieces of Silver",
  "Silent Before His Accusers",
  "Pierced for Our Transgressions",
  "With the Rich in His Death",
  "Weeping in Ramah",
  "A Voice in the Wilderness"
];


// Path to your addCard.js script
const addCardScript = 'node addCard.js';

// Loop through each card and run the script
for (const cardName of cardNames) {
  console.log(`🚀 Adding card: ${cardName}`);
  
  try {
    execSync(`${addCardScript} "${cardName}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Failed to add card: ${cardName}`);
    console.error(err.message);
  }
}

console.log('🎉 All cards processed!');
// You can manually run `npm run build` afterward.
