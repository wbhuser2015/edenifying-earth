const fs = require('fs');
const path = require('path');

// Get card name from arguments
const cardName = process.argv[2];
if (!cardName) {
  console.error("❌ Usage: node removeCard.js <Card Name from CardName.ts>");
  process.exit(1);
}

// Convert to different formats
const CARD_CONSTANT = cardName.toUpperCase().replace(/\s/g, '_'); // ABOMINATION_OF_DESOLATION
const CLASS_NAME = cardName.replace(/\s/g, ''); // AbominationOfDesolation
const CARD_FILENAME = CLASS_NAME + '.ts';

// Define file paths
const baseCardPath = path.join(__dirname, `src/server/cards/base/${CARD_FILENAME}`);
const communityCardPath = path.join(__dirname, `src/server/cards/community/${CARD_FILENAME}`);
const cardNamePath = path.join(__dirname, `src/common/cards/CardName.ts`);
const baseManifestPath = path.join(__dirname, `src/server/cards/StandardCardManifests.ts`);
const communityManifestPath = path.join(__dirname, `src/server/cards/community/CommunityCardManifest.ts`);
const activeCardSortingPath = path.join(__dirname, `src/client/utils/ActiveCardsSortingOrder.ts`);

// **1. Remove the TypeScript Card File**
const removeCardFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted card file: ${filePath}`);
  }
};

// **2. Remove Entry from CardName.ts**
let cardNameContent = fs.readFileSync(cardNamePath, 'utf8');
const cardNameRegex = new RegExp(`\\s*${CARD_CONSTANT}\\s*=\\s*['"].*['"],?\\s*`, 'g');
if (cardNameRegex.test(cardNameContent)) {
  cardNameContent = cardNameContent.replace(cardNameRegex, '');
  fs.writeFileSync(cardNamePath, cardNameContent);
  console.log(`✅ Removed ${CARD_CONSTANT} from CardName.ts`);
}

// **3. Remove Import & Factory Reference from Manifests**
const removeCardFromManifest = (manifestPath, folder) => {
  if (fs.existsSync(manifestPath)) {
    let manifestContent = fs.readFileSync(manifestPath, 'utf8');
    
    // Remove the import statement
    const importRegex = new RegExp(`import\\s*{\\s*${CLASS_NAME}\\s*}\\s*from\\s*['"].*/${CLASS_NAME}['"];?\\s*`, 'g');
    manifestContent = manifestContent.replace(importRegex, '');

    // Remove the factory reference
    const factoryRegex = new RegExp(`\\[CardName.${CARD_CONSTANT}\\]:\\s*{\\s*Factory:\\s*${CLASS_NAME}.*?},?\\s*`, 'g');
    manifestContent = manifestContent.replace(factoryRegex, '');

    fs.writeFileSync(manifestPath, manifestContent);
    console.log(`✅ Removed ${CLASS_NAME} from ${folder} manifest.`);
  }
};
// **4. Remove Card from ActiveCardsSortingOrder.ts**
if (fs.existsSync(activeCardSortingPath)) {
  let activeCardsContent = fs.readFileSync(activeCardSortingPath, 'utf8');

  // Remove from the sorting order array
  const sortingRegex = new RegExp(`\\s*CardName\\.${CARD_CONSTANT},?\\s*`, 'g');
  activeCardsContent = activeCardsContent.replace(sortingRegex, '');

  fs.writeFileSync(activeCardSortingPath, activeCardsContent);
  console.log(`✅ Removed ${CARD_CONSTANT} from ActiveCardsSortingOrder.ts`);
}
// Check and delete from the correct location
if (fs.existsSync(baseCardPath)) {
  removeCardFile(baseCardPath);
  removeCardFromManifest(baseManifestPath, "BASE");
} else if (fs.existsSync(communityCardPath)) {
  removeCardFile(communityCardPath);
  removeCardFromManifest(communityManifestPath, "Community");
} else {
  console.error(`❌ Card file not found. Check spelling or location.`);
  process.exit(1);
}

// **4. Build the Project to Ensure Removal**
console.log("🚀 Running TypeScript build...");
require('child_process').execSync('npm run build', { stdio: 'inherit' });

console.log(`🎉 Card '${cardName}' successfully removed!`);
