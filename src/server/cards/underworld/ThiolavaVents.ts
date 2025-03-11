import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';

export class ThiolavaVents extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.THIOLAVA_VENTS,
      cost: 13,
      tags: [Tag.MICROBE],
      resourceType: CardResource.MICROBE,

      requirements: {Unreached: 1},

      victoryPoints: {resourcesHere: {}, per: 3},

      behavior: {
        production: {missions: 2},
        addResources: 2, // This is the "includes this".
      },

      metadata: {
        cardNumber: 'U90',
        renderData: CardRenderer.builder((b) => {
          b.effect('Each time you increase your missions production, including this, put 1 microbe on this card.',
            (eb) => eb.production((pb) => pb.missions(1)).startEffect.resource(CardResource.MICROBE));
          b.br;
          b.production((pb) => pb.missions(2));
        }),
        description: 'Requires an Unreached. Increase your missions production 2 steps. ' +
          '1 VP per 3 microbes on this card.',
      },
    });
  }

  public onProductionGain(player: IPlayer, resource: Resource, amount: number) {
    if (amount <= 0 || resource !== Resource.HEAT) {
      return;
    }
    player.addResourceTo(this, {qty: amount, log: true});
  }
}
