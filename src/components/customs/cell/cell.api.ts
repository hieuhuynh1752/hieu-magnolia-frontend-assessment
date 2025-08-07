// props of the Cell component

import { Coordination } from "@/services/gameLogic/interfaces/ship.api";
import { CELL_STATE } from "@/services/gameLogic/interfaces/board.api";

export interface CellProps {
  // Position of the Cell
  position: Coordination;

  // State of the Cell
  state: CELL_STATE;

  // Label to be rendered on top of the Cell
  topLabel?: string;

  // Label to be rendered on the left of the Cell
  leftLabel?: string;

  // Function to be called when the Cell is clicked and triggers onClick()
  onSelect(): void;
}
