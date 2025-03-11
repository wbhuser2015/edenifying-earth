export enum Resource {
    MEGACREDITS = 'provision',
    STEEL = 'theology',
    TITANIUM = 'prayer',
    PLANTS = 'outreach',
    ENERGY = 'discipleship',
    HEAT = 'missions'
}

export const ALL_RESOURCES = [Resource.MEGACREDITS, Resource.STEEL, Resource.TITANIUM, Resource.PLANTS, Resource.ENERGY, Resource.HEAT] as const;
