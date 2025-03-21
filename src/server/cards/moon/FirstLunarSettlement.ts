import {CardName} from '../../../common/cards/CardName';
import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';

export class FirstLunarSettlement extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.FIRST_LUNAR_SETTLEMENT,
      tags: [Tag.CITY, Tag.MOON],

      behavior: {
        production: {provision: 1},
        moon: {habitatTile: {}},
      },

      metadata: {
        description: 'Place a habitat tile on The Moon and raise the habitat rate 1 step. Increase your M€ production 1 step.',
        cardNumber: 'MP1',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1)).moonHabitat({secondaryTag: AltSecondaryTag.MOON_HABITAT_RATE});
        }),
      },
    });
  }
}
