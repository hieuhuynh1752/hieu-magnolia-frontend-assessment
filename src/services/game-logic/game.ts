import {
  CELL_STATE,
  FlattenedCell,
  GameState,
  RESPONSE,
} from "@/services/game-logic/interfaces/board.api";
import {
  Coordination,
  SHIP_ORIENTATION,
  ShipInstance,
  ShipSpecs,
} from "@/services/game-logic/interfaces/ship.api";
import { randomize } from "@/utils/utils";

export class BattleshipBoard {
  private fleet: ShipInstance[] = [];
  private readonly fleetSpecs: ShipSpecs[] = [];
  private readonly boardSize: number;
  private readonly grid: CELL_STATE[][] = [];

  constructor(boardSize: number, fleetSpecs: ShipSpecs[]) {
    this.boardSize = boardSize;
    this.fleetSpecs = fleetSpecs;
    this.grid = Array.from({ length: boardSize }, () =>
      Array<CELL_STATE>(boardSize).fill(CELL_STATE.UNKNOWN),
    );
    this.randomFleetDistribution();
  }

  // fleet distribution
  private randomFleetDistribution(): void {
    for (const ship of this.fleetSpecs) {
      let isShipPlaced = false;
      while (!isShipPlaced) {
        const bowCoordination: Coordination = {
          row: randomize(this.boardSize),
          column: randomize(this.boardSize),
        };

        const shipOrientation =
          Math.random() < 0.5
            ? SHIP_ORIENTATION.HORIZONTAL
            : SHIP_ORIENTATION.VERTICAL;

        if (this.canPlaceShip(ship, bowCoordination, shipOrientation)) {
          this.fleet.push({
            specs: ship,
            bow: bowCoordination,
            coordination: this.getShipCoordinationList(
              ship,
              bowCoordination,
              shipOrientation,
            ),
            orientation: shipOrientation,
            hits: 0,
            sunk: false,
          });
          isShipPlaced = true;
        }
      }
    }
  }

  // ---- helpers ----
  // function to check if possible to place a ship without colliding or overflowing from the board
  private canPlaceShip(
    shipSpecification: ShipSpecs,
    bowCoordination: Coordination,
    orientation: SHIP_ORIENTATION,
  ): boolean {
    for (let i = 0; i < shipSpecification.length; i++) {
      const row =
        bowCoordination.row +
        (orientation === SHIP_ORIENTATION.VERTICAL ? i : 0);
      const column =
        bowCoordination.column +
        (orientation === SHIP_ORIENTATION.HORIZONTAL ? i : 0);

      if (row >= this.boardSize || column >= this.boardSize) return false;
      if (this.isPartOfExistingShip({ row, column })) return false;
    }
    return true;
  }

  // function to check if a Cell is a part of a Ship
  private isPartOfExistingShip({ row, column }: Coordination): ShipInstance | undefined {
    // look up for each ship to find any cell that fits the request
    return this.fleet.find((ship) =>
      ship.coordination.some(
        (coordinate) => coordinate.row === row && coordinate.column === column,
      ),
    );
  }

  // function to generate the coordination list of a ship
  private getShipCoordinationList(
    shipSpecs: ShipSpecs,
    bowCoordination: Coordination,
    orientation: SHIP_ORIENTATION,
  ): Coordination[] {
    const cells: Coordination[] = [];
    for (let i = 0; i < shipSpecs.length; i++) {
      cells.push({
        row:
          bowCoordination.row +
          (orientation === SHIP_ORIENTATION.VERTICAL ? i : 0),
        column:
          bowCoordination.column +
          (orientation === SHIP_ORIENTATION.HORIZONTAL ? i : 0),
      });
    }
    return cells;
  }

  // ---- Public API ----
  public get state(): GameState {
    const flattenedCells: FlattenedCell[] = [];
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        flattenedCells.push({ row: i, column: j, value: this.grid[i][j] });
      }
    }
    return {
      cells: flattenedCells,
      remainingShips: this.fleet.filter((ship) => !ship.sunk),
      gameOver: this.fleet.every((ship) => ship.sunk),
    };
  }

  public uncover(cell: Coordination): RESPONSE {
    const { row, column } = cell;
    if (this.grid[row][column] !== CELL_STATE.UNKNOWN) return RESPONSE.REPEAT;

    const ship = this.isPartOfExistingShip(cell);
    if (!ship) {
      this.grid[row][column] = CELL_STATE.MISS;
      return RESPONSE.MISS;
    }

    ship.hits += 1;
    this.grid[row][column] = CELL_STATE.HIT;

    if (ship.hits === ship.specs.length) {
      ship.sunk = true;
      return RESPONSE.SUNK;
    }
    return RESPONSE.HIT;
  }
}
