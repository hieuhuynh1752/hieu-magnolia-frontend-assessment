// props of the CommandsArea component

export interface CommandsAreaProps {
  // History of the commands that has been made
  commandsHistory: string[];

  // Function to be called when the Command Input Form gets Submitted by onSubmit(), triggered by Input's Enter key or "Go!" Button
  onInputSubmit(value: string): void;
}
