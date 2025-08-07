import React from "react";
import { CommandsAreaProps } from "@/components/customs/commands-area/commands-area.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CommandsArea(props: CommandsAreaProps) {
  const [value, setValue] = React.useState("");

  const onCommandChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      setValue(event.target.value);
    }, []);

  const onCommandSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => {
        event.preventDefault();
        props.onInputSubmit(value);
        setValue("");
      },
      [props, value],
    );

  return (
    <Card
      className={`w-full grow max-w-[90vw] sm:max-w-[70vw] md:max-w-[40rem] lg:max-w-[32rem]`}
    >
      <CardHeader>
        <CardTitle>Commands</CardTitle>
        <CardDescription>Query your command</CardDescription>
      </CardHeader>
      <CardContent className={`flex flex-col grow gap-4`}>
        <div
          className={`w-full h-full min-h-24 max-h-[26vh] p-4 border rounded-md overflow-auto font-mono text-gray-600 min-w-[86vw] sm:min-w-[66vw] md:min-w-[36rem] lg:min-w-[28rem]`}
        >
          {props.commandsHistory.map((command, index) => {
            return <p key={index}>{command}</p>;
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className={`flex flex-col grow gap-2`}>
          <Label htmlFor={"command"}>Command</Label>
          <form onSubmit={onCommandSubmit} className={`flex gap-2`}>
            <Input
              id={"command"}
              name={"command"}
              type={"text"}
              placeholder={`Type: "A5" (Column A and Row 5)`}
              value={value}
              onChange={onCommandChange}
            />
            <Button type="submit" className={`hover:cursor-pointer`}>
              Go!
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
