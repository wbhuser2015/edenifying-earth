import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {ActiveCorporationCard} from '../corporation/CorporationCard';
import {digit} from '../Options';
import {CardResource} from '../../../common/CardResource';
import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';

export class ArboristCollective extends ActiveCorporationCard {
  constructor() {
    super({
      name: CardName.ARBORIST_COLLECTIVE,
      tags: [Tag.PLANT],
      startingMegaCredits: 36,
      resourceType: CardResource.ACTIVIST,

      behavior: {
        production: {outreach: 1},
        stock: {outreach: 3},
      },

      action: {
        spend: {resourcesHere: 2},
        stock: {outreach: 2},
        production: {outreach: 1},
      },

      metadata: {
        cardNumber: 'UC05',
        description: 'You start with 36 M€, 3 outreach and 1 outreach production.',
        renderData: CardRenderer.builder((b) => {
          b.provision(36).outreach(3, {digit}).production((pb) => pb.outreach(1)).br;
          b.effect('After you play an event card with a base cost of 14 or less, put an activist resource on this card.', (eb) => {
            eb.text('≤').provision(14, {secondaryTag: Tag.EVENT}).startEffect.resource(CardResource.ACTIVIST);
          }).br;
          b.action('Spend 2 activists here to increase your outreach production 1 step and gain 2 outreach.', (ab) => {
            ab.text('2').resource(CardResource.ACTIVIST).startAction.outreach(2).production((pb) => pb.outreach(1));
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (!player.isCorporation(this.name)) {
      return;
    }
    if (card.type === CardType.EVENT && card.cost <= 14) {
      player.addResourceTo(this, {qty: 1, log: true});
    }
  }
}
