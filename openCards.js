const { exec } = require('child_process');
const path = require('path');

// List of card class names (match filenames without spaces)
const cardNames = [
  'StewardshipOfResources',
  'ProvisionThroughPersecution',
  'HospitalityToStrangers',
  'TithesAndOfferings',
  'MissionarySupport',
  'FellowshipOfBelievers',
  'LoavesAndFishes',
  'HarvestFestival',
  'TheWidowsOil',
  'BlessingsOfObedience',
  'BuildingTheTabernacle',
  'RuthsRedemption',
  'StorehousesOfJoseph',
];

// Base path to where your card files are stored
const basePath = path.join(__dirname, 'src/server/cards/community');

// Path to Notepad++
const notepadPath = `"C:\\Program Files\\Notepad++\\notepad++.exe"`; // Adjust if installed somewhere else

// Open each card file
cardNames.forEach(cardName => {
  const filePath = path.join(basePath, `${cardName}.ts`);
  exec(`${notepadPath} "${filePath}"`, (err) => {
    if (err) {
      console.error(`⚠️ Failed to open file: ${cardName}`);
      console.error(err.message);
    } else {
      console.log(`✅ Opened: ${cardName}`);
    }
  });
});
