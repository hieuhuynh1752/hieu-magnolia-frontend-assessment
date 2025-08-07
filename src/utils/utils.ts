import { Coordination } from "@/services/game-logic/interfaces/ship.api";

export function randomize(n: number): number {
  return Math.floor(Math.random() * n);
}

export function getCellTextPosition({ row, column }: Coordination): string {
  return String.fromCharCode(column + "A".charCodeAt(0)) + (row + 1).toString();
}
