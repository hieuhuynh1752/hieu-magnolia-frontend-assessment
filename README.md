# Simple Battleships

This is an individual Battleships game build on [Next.js](https://nextjs.org), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and `shadcn/ui`.

---

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Features

#### Game Experience

- Select Cell by click, or by a command text (with constraints to validate the text)
- Selected Cells will no longer be selectable, if it's a `MISS`, the Cell turns into `blue`, if it's a `HIT`, turns into `yellow` instead!
- Responsive UI

#### Architecture

- Game logic is designed in Object-oriented Approach
- Game settings are all abstracted and ready to adapt with different game configurations (adding more ships, changing dimension). See, or modify `/src/services/gameLogic/settings.ts`
- UI components are separated from logic (stateless, except for `CommandsArea` with a Controlled Input), with separate `*.api.ts` file to declare properties of the component. See: `/src/components/customs/` directory.

---

## To improve

- Accessibility improvement (Keyboard navigation, Screenreader tests)
- Add tests: Unit test (Jest), Snapshot test (Cypress)
- Allow users to change game settings (modify ships, fleet, or board dimension)
- Deployment


---

## Development process

Game theory --> Game logic (`/src/services`) --> UI Components (`/src/components`) --> Integrate Game to UI (`/src/app/page.tsx`) --> UI & UX Refinement, constraints

---

## Declaration of AI Usage

I hereby declare that I did use the help of AI throughout the development process of this assessment, to:
- understand the problem
- get to know the best approach to solve it
- justify some of the technical concerns that I have based on the results that it gives
- look up for possible questions (and answers) that could be asked for the next interview rounds if it happens

The usage of AI in this project is kept under a very basic conversation without specific details, as in rationale of information security and personal expertise showcase purpose. 
The project could be done faster with proper promt engineering, but I decided to do all the coding part myself without any intervention of AI, so it does not reflect all of my skills in using AI.

Information on the AI that I used and the conversation that I made with it:
- Model: ChatGPT-o3
- Conversation history: [link](https://chatgpt.com/share/68947b3a-b7bc-8007-9400-5675707e5264)
