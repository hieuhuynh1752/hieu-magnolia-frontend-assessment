// properties declaration for Ship

// orientation of the ship
export enum SHIP_ORIENTATION {
  HORIZONTAL,
  VERTICAL,
}

// type of Coordination
export type Coordination = {
  row: number;
  column: number;
};

// type of Ship specifications
export type ShipSpecs = {
  name: string;
  length: number;
};

export interface ShipInstance {
  // specifications of the ship
  specs: ShipSpecs;

  // coordination of the ship's bow
  bow: Coordination;

  // orientation of the ship
  orientation: SHIP_ORIENTATION;

  // coordination list of the ship
  coordination: Coordination[];

  // amount of hits the ship got
  hits: number;

  // boolean property to check if the ship is sunk
  sunk: boolean;
}
