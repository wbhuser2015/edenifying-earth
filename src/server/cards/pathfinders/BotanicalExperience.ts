import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all, digit} from '../Options';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../../common/cards/render/Size';
import {Space} from '../../boards/Space';
import {Board} from '../../boards/Board';
import {CardResource} from '../../../common/CardResource';
import {ICard} from '../ICard';
import {Resource} from '../../../common/Resource';

export class BotanicalExperience extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.BOTANICAL_EXPERIENCE,
      cost: 14,
      tags: [Tag.PLANT, Tag.MARS, Tag.SCIENCE],
      requirements: {greeneries: 1, all},
      resourceType: CardResource.DATA,

      metadata: {
        cardNumber: 'Pf50',
        hasExternalHelp: true,
        renderData: CardRenderer.builder((b) => {
          b.greenery({size: Size.SMALL, withO2: false, any: true}).colon().resource(CardResource.DATA, {size: Size.SMALL});
          b.nbsp;
          b.resource(CardResource.DATA, {amount: 3, digit}).asterix().colon().production((pb) => pb.outreach(1));
          b.br;
          b.text('(EFFECT: Whenever a greenery tile is placed, add 1 data on this card.) ' +
            '(EFFECT: Whenever this card has at least 3 data, automatically remove 3 data to raise your outreach production 1 step.) ' +
            '(EFFECT: Players may remove your outreach, but you only lose half, rounded up.)', Size.SMALL, false, false);
        }),
        description: 'Requires one greenery tile on Mars.',
      },
    });
  }


  public onTilePlaced(cardOwner: IPlayer, _activePlayer: IPlayer, space: Space) {
    if (Board.isGreenerySpace(space)) {
      cardOwner.addResourceTo(this, 1);
    }
  }

  public onResourceAdded(player: IPlayer, playedCard: ICard) {
    if (playedCard.name !== this.name) return;
    if (this.resourceCount >= 3) {
      const delta = Math.floor(this.resourceCount / 3);
      const deducted = delta * 3;
      this.resourceCount -= deducted;
      player.production.add(Resource.PLANTS, delta, {log: false});
      player.game.log('${0} removed ${1} data from ${2} to increase outreach production ${3} steps.',
        (b) => b.player(player).number(deducted).card(this).number(delta));
    }
  }
}
