"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import Board from "@/components/customs/board/board.view";
import Cell from "@/components/customs/cell/cell.view";
import CommandsArea from "@/components/customs/commands-area/commands-area.view";

import {
  FlattenedCell,
  RESPONSE,
} from "@/services/game-logic/interfaces/board.api";
import { BattleshipBoard } from "@/services/game-logic/game";
import { GAME_SETTINGS } from "@/services/game-logic/settings";

import { getCellTextPosition } from "@/utils/utils";

export default function Home() {
  const gameRef = React.useRef<BattleshipBoard | null>(null);
  if (!gameRef.current) {
    gameRef.current = new BattleshipBoard(
      GAME_SETTINGS.size,
      GAME_SETTINGS.fleet,
    );
  }

  const [cells, setCells] = React.useState<FlattenedCell[]>(
    () => gameRef.current!.state.cells,
  );
  const [logs, setLogs] = React.useState<string[]>([
    "Welcome - sweep the seas!",
  ]);

  const handleCellSelect = React.useCallback((row: number, column: number) => {
    const outcome = gameRef.current!.uncover({ row, column });
    const newGameState = gameRef.current!.state;
    setCells(newGameState.cells);
    setLogs((prevState) => [
      ...prevState,
      newGameState.gameOver
        ? "All ship sunk - you win!"
        : outcome === RESPONSE.HIT
          ? `[Command]: ${getCellTextPosition({ column, row })} - Nice! You hit one part of a ship!`
          : outcome === RESPONSE.MISS
            ? `[Command]: ${getCellTextPosition({ column, row })} - Oops! You missed!`
            : outcome === RESPONSE.SUNK
              ? `[Command]: ${getCellTextPosition({ column, row })} - Great! A ship sunk! ${newGameState.remainingShips.length} more to go!`
              : `[Error]: ${getCellTextPosition({ column, row })} - You checked this cell already!`,
    ]);
  }, []);

  const handleInputSubmit = React.useCallback(
    (inputValue: string) => {
      if (
        inputValue.length === 2 &&
        inputValue[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0) <
          GAME_SETTINGS.size &&
        Number.isInteger(Number.parseInt(inputValue[1]))
      ) {
        const row = Number.parseInt(inputValue[1]) - 1;
        const column =
          inputValue[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        if (row >= GAME_SETTINGS.size || column >= GAME_SETTINGS.size) {
          setLogs((prevState) => [
            ...prevState,
            `[Error]: Input value is out of the board's boundary! The size of this game is ${GAME_SETTINGS.size}x${GAME_SETTINGS.size}!`,
          ]);
        }
        handleCellSelect(row, column);
      } else {
        setLogs((prevState) => [
          ...prevState,
          `[Error]: Invalid input value! expecting format "ColumnRow" like "A5"! Please try again!`,
        ]);
      }
    },
    [handleCellSelect],
  );

  return (
    <div className={`mx-auto p-8`}>
      <h1
        className={`scroll-m-20 mb-16 text-center text-4xl font-extrabold tracking-tight text-balance`}
      >
        BATTLESHIP
      </h1>
      <div className={`flex flex-row flex-wrap gap-8 justify-center`}>
        <Board size={GAME_SETTINGS.size}>
          {cells.map((cell, index) => {
            return (
              <Cell
                key={index}
                position={{ row: cell.row, column: cell.column }}
                state={cell.value}
                topLabel={
                  index < GAME_SETTINGS.size
                    ? String.fromCharCode(index + "A".charCodeAt(0))
                    : undefined
                }
                leftLabel={
                  index % GAME_SETTINGS.size === 0 || index === 0
                    ? (index / GAME_SETTINGS.size + 1).toString()
                    : undefined
                }
                onSelect={() => handleCellSelect(cell.row, cell.column)}
              />
            );
          })}
        </Board>
        <div className={`flex flex-col gap-4`}>
          <Button
            onClick={() => window.location.reload()}
            variant={"secondary"}
            className={`hover:cursor-pointer`}
          >
            New Game
          </Button>
          <CommandsArea
            commandsHistory={logs}
            onInputSubmit={handleInputSubmit}
          />
        </div>
      </div>
    </div>
  );
}
