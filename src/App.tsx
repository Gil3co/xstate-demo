import { useMachine } from "@xstate/react";

import { Charmachine } from "./Charmachine";
import charmander from "./assets/charmander.png";
import charmeleon from "./assets/charmeleon.png";
import charizard from "./assets/charizard.png";
import "./App.css";

const pokémonMap: Record<string, string> = {
  charmander,
  charizard,
  charmeleon,
};

function App() {
  const [state, send] = useMachine(Charmachine);

  const currentPokémon = state.value as string;
  const { [currentPokémon]: currentPokémonImage } = pokémonMap;
  return (
    <div className="App">
      <img src={currentPokémonImage} className="logo" />
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={() => {
            send("EVOLVE");
          }}
          style={{
            width: "fit-content",
            background: "orange",
            color: "yellow",
          }}
        >
          Evolve!
        </button>
        {`Your Pokémon's current state of evolution is ${
          currentPokémon[0].toUpperCase() + currentPokémon.substring(1)
        } and its strength is ${state.context.strength}`}
      </div>
    </div>
  );
}

export default App;
