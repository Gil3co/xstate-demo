import { useMachine } from "@xstate/react";

import { Charmachine } from "./Charmachine";
import charmander from "./assets/charmander.png";
import charmeleon from "./assets/charmeleon.png";
import charizard from "./assets/charizard.png";
import "./App.css";

function App() {
  const [state, send] = useMachine(Charmachine);

  const currentPokémon =
    typeof state.value === "string" ? state.value : Object.keys(state.value)[0];

  const isEvolvingToCharizard = state.matches("charizard.evolving");
  const imageSizing = state.matches("charizard.evolved") ? "350px" : "200px";
  const currentPokémonImage = state.matches("charmander")
    ? charmander
    : state.matches("charmeleon") || isEvolvingToCharizard
    ? charmeleon
    : charizard;

  return (
    <div className="App">
      <img
        src={currentPokémonImage}
        className="logo"
        style={{ height: imageSizing, width: imageSizing }}
      />
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!state.matches("charizard.evolved") && (
          <button
            onClick={() => {
              state.matches("charmander")
                ? send("EVOLVE")
                : send({
                    type: "MEGA_EVOLVE",
                    newStrength: Math.floor(Math.random() * 100),
                  });
            }}
            disabled={state.matches("charizard.evolving")}
            style={{
              width: "fit-content",
              background: "orange",
              color: "yellow",
            }}
          >
            {isEvolvingToCharizard ? "Evolving..." : "Evolve!"}
          </button>
        )}
        {`Your Pokémon's current state of evolution is ${
          currentPokémon[0].toUpperCase() + currentPokémon.substring(1)
        } and its strength is ${state.context.strength}`}
      </div>
    </div>
  );
}

export default App;
