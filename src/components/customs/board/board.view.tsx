import React from "react";
import { BoardProps } from "@/components/customs/board/board.api";

export default function Board(props: BoardProps): React.JSX.Element {
  return (
    <div
      style={{
        grid: `repeat(${props.size},1fr)/repeat(${props.size},minmax(2.5rem, 1fr))`,
      }}
      className={`grid w-full pl-8 aspect-square gap-2 max-w-[90vw] sm:max-w-[70vw] md:max-w-[40rem] lg:max-w-[32rem]`}
    >
      {props.children}
    </div>
  );
}
