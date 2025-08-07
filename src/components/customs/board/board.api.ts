// props of the Board component

import { PropsWithChildren } from "react";

export interface BoardProps extends PropsWithChildren {
  // Size of the board
  size: number;
}
