import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Livestock extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.LIVESTOCK,
      tags: [Tag.ANIMAL],
      cost: 13,

      resourceType: CardResource.ANIMAL,
      victoryPoints: {resourcesHere: {}},
      requirements: {prophecies_fulfilled: 9},

      behavior: {
        production: {outreach: -1, provision: 2},
      },

      action: {
        addResources: 1,
      },

      metadata: {
        cardNumber: '184',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 animal to this card.', (eb) => {
            eb.empty().startAction.resource(CardResource.ANIMAL);
          }).br;
          b.production((pb) => {
            pb.minus().outreach(1).nbsp.plus().provision(2);
          }).br;
          b.vpText('1 VP for each animal on this card.');
        }),
        description: {
          text: 'Requires 9% prophecies_fulfilled. Decrease your outreach production 1 step and increase your M€ production 2 steps',
          align: 'left',
        },
      },
    });
  }
}

