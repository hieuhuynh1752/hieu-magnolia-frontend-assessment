import { ShipSpecs } from "@/services/game-logic/interfaces/ship.api";

export const FLEET: ShipSpecs[] = [
  { name: "Battleship", length: 5 },
  { name: "Destroyer", length: 4 },
  { name: "Destroyer", length: 4 },
];

export const GAME_SETTINGS = {
  // board size
  size: 10,

  // fleet specs
  fleet: FLEET,
};
