// properties declaration for the Board
import { ShipInstance } from "@/services/gameLogic/interfaces/ship.api";

export enum CELL_STATE {
  UNKNOWN,
  MISS,
  HIT,
}

export enum RESPONSE {
  HIT,
  MISS,
  SUNK,
  REPEAT,
}

export interface FlattenedCell {
  row: number;
  column: number;
  value: CELL_STATE;
}

export interface GameState {
  cells: FlattenedCell[];
  remainingShips: ShipInstance[];
  gameOver: boolean;
}
