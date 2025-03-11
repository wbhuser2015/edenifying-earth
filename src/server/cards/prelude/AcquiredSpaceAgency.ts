import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class AcquiredSpaceAgency extends PreludeCard {
  constructor() {
    super({
      name: CardName.ACQUIRED_SPACE_AGENCY,

      behavior: {
        stock: {prayer: 6},
        drawCard: {count: 2, tag: Tag.SPACE},
      },

      metadata: {
        cardNumber: 'P35',
        renderData: CardRenderer.builder((b) => {
          b.prayer(6, {digit}).br.br; // double break intentional
          b.cards(2, {secondaryTag: Tag.SPACE});
        }),
        description: 'Gain 6 prayer. Reveal cards until you reveal two cards with Space Tags. Take them into your hand, discard the rest.',
      },
    });
  }
}

