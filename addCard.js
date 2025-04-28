const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

// Get card name from arguments
const cardName = process.argv[2];
if (!cardName) {
  console.error("Usage: node addCard.js <CardName>");
  process.exit(1);
}

// Format card names
const CARD_CONSTANT = cardName.toUpperCase().replace(/\s/g, '_');
const CARD_FILENAME = cardName.replace(/\s/g, '') + '.ts';
const CLASS_NAME = cardName.replace(/\s/g, '');

// Define paths
const cardPath = `src/server/cards/community/${CARD_FILENAME}`;
const manifestPath = `src/server/cards/community/CommunityCardManifest.ts`;
const cardNamePath = `src/common/cards/CardName.ts`;

// **1. Generate the new card file with constructor logic**
const cardTemplate = `import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class ${CLASS_NAME} extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.${CARD_CONSTANT},
      cost: 12, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6},

      behavior: {
        production: { provision: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1));
        }),
        description: 'Increase your Provision production 1 step.',
      },
    });
  }
}`;


fs.writeFileSync(cardPath, cardTemplate);
console.log(`✅ Created card file: ${cardPath}`);

// **2. Open the newly created file in Notepad++**
const notepadPath = `"C:\\Program Files\\Notepad++\\notepad++.exe"`; // Adjust path if needed
exec(`${notepadPath} ${cardPath}`, (err) => {
  if (err) {
    console.error("⚠️ Notepad++ failed to open. Check the file path.");
  }
});

// **3. Add the card to CommunityCardManifest.ts**
let manifestContent = fs.readFileSync(manifestPath, 'utf8');

// ✅ Ensure import is added at the top
const importStatement = `import { ${CLASS_NAME} } from './${CLASS_NAME}';\n`;
if (!manifestContent.includes(importStatement)) {
  manifestContent = importStatement + manifestContent;
}

// ✅ Add entry to `projectCards` section
const manifestInsert = `  [CardName.${CARD_CONSTANT}]: { Factory: ${CLASS_NAME} },\n`;
const projectCardsRegex = /(projectCards:\s*\{)/;
if (!manifestContent.includes(manifestInsert)) {
  manifestContent = manifestContent.replace(projectCardsRegex, `$1\n${manifestInsert}`);
}

fs.writeFileSync(manifestPath, manifestContent);
console.log(`✅ Updated ${manifestPath}`);

// **4. Register the card in CardName.ts**
let cardNameContent = fs.readFileSync(cardNamePath, 'utf8');
const cardNameInsert = `  ${CARD_CONSTANT} = '${cardName}',\n`;
if (!cardNameContent.includes(cardNameInsert)) {
  cardNameContent = cardNameContent.replace(/(export enum CardName \{)/, `$1\n${cardNameInsert}`);
}

fs.writeFileSync(cardNamePath, cardNameContent);
console.log(`✅ Updated ${cardNamePath}`);

