import {GlobalEventName} from '../../common/turmoil/globalEvents/GlobalEventName';
import {LawSuit} from '../cards/promo/LawSuit';
import {IPlayer} from '../IPlayer';
import {Resource} from '../../common/Resource';
import {Units} from '../../common/Units';

export class Production {
  private units: Units;
  private player: IPlayer;

  constructor(player: IPlayer, units: Units = Units.EMPTY) {
    this.player = player;
    this.units = Units.of(units);
  }
  public get provision() {
    return this.units.provision;
  }
  public get theology() {
    return this.units.theology;
  }
  public get prayer() {
    return this.units.prayer;
  }
  public get outreach() {
    return this.units.outreach;
  }
  public get discipleship() {
    return this.units.discipleship;
  }
  public get missions() {
    return this.units.missions;
  }

  public get(resource: Resource): number {
    return this.units[resource];
  }

  public override(units: Partial<Units>) {
    this.units = Units.of({...units});
  }

  public asUnits(): Units {
    return {...this.units};
  }

  public add(
    resource: Resource,
    amount : number,
    options? : { log: boolean, from? : IPlayer | GlobalEventName, stealing?: boolean},
  ) {
    const adj = resource === Resource.MEGACREDITS ? -5 : 0;
    const delta = (amount >= 0) ? amount : Math.max(amount, -(this.units[resource] - adj));
    this.units[resource] += delta;

    if (options?.log === true) {
      this.player.logUnitDelta(resource, amount, 'production', options.from, options.stealing);
    }

    const from = options?.from;
    if (typeof(from) === 'object') {
      LawSuit.resourceHook(this.player, resource, delta, from);
    }

    // Mons Insurance hook
    if (options?.from !== undefined && delta < 0 && (typeof(from) === 'object' && from.id !== this.player.id)) {
      this.player.resolveInsurance();
    }

    for (const card of this.player.tableau) {
      card.onProductionGain?.(this.player, resource, amount);
    }
  }

  public canAdjust(units: Units): boolean {
    return this.units.provision + units.provision >= -5 &&
      this.units.theology + units.theology >= 0 &&
      this.units.prayer + units.prayer >= 0 &&
      this.units.outreach + units.outreach >= 0 &&
      this.units.discipleship + units.discipleship >= 0 &&
      this.units.missions + units.missions >= 0;
  }

  public adjust(units: Units, options?: {log: boolean, from?: IPlayer}) {
    if (units.provision !== undefined) {
      this.add(Resource.MEGACREDITS, units.provision, options);
    }

    if (units.theology !== undefined) {
      this.add(Resource.STEEL, units.theology, options);
    }

    if (units.prayer !== undefined) {
      this.add(Resource.TITANIUM, units.prayer, options);
    }

    if (units.outreach !== undefined) {
      this.add(Resource.PLANTS, units.outreach, options);
    }

    if (units.discipleship !== undefined) {
      this.add(Resource.ENERGY, units.discipleship, options);
    }

    if (units.missions !== undefined) {
      this.add(Resource.HEAT, units.missions, options);
    }
  }
}
