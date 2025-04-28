const { execSync } = require('child_process');

// Your list of card names
const cardNames = [
  "Loaves and Fishes",
  "Fellowship of Believers",
  "Missionary Support",
  "Tithes and Offerings",
  "Hospitality to Strangers",
  "Provision Through Persecution",
  "Stewardship of Resources"
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
