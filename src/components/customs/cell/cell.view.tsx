import React from "react";
import { CellProps } from "@/components/customs/cell/cell.api";
import { CELL_STATE } from "@/services/gameLogic/interfaces/board.api";
import { getCellTextPosition } from "@/utils/utils";

export default function Cell(props: CellProps): React.JSX.Element {
  return (
    <div
      aria-disabled={props.state !== CELL_STATE.UNKNOWN}
      aria-label={`Cell ${getCellTextPosition(props.position)}`}
      className={`relative aspect-square border-2 rounded-md  
      ${
        props.state === CELL_STATE.MISS
          ? "bg-teal-200 border-teal-200 hover:cursor-not-allowed"
          : props.state === CELL_STATE.HIT
            ? "bg-amber-200 border-amber-200 hover:cursor-not-allowed"
            : "border-gray-400 bg-gray-200 hover:cursor-pointer shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl hover:bg-blue-200"
      }`}
      onClick={() => {
        if (props.state !== CELL_STATE.UNKNOWN) return;
        props.onSelect();
      }}
    >
      {props.topLabel && (
        <span className={`absolute font-semibold top-[-100%] right-[35%]`}>
          {props.topLabel}
        </span>
      )}
      {props.leftLabel && (
        <span className={`absolute font-semibold top-[25%] left-[-100%]`}>
          {props.leftLabel}
        </span>
      )}
    </div>
  );
}
