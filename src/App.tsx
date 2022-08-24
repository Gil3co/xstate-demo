import { useMachine } from "@xstate/react";

import { Charmachine } from "./Charmachine";
import charmander from "./assets/charmander.png";
import charmeleon from "./assets/charmeleon.png";
import charizard from "./assets/charizard.png";
import "./App.css";

function App() {
  const [state, send] = useMachine(Charmachine);

  const isEvolvingToCharizard = state.matches("charizard.evolving");
  const hasEvolvedToCharizard = state.matches("charizard.evolved");
  const currentPokémonImage = state.matches("charmander")
    ? charmander
    : state.matches("charmeleon") || isEvolvingToCharizard
    ? charmeleon
    : charizard;

  const currentPokémon = state.matches("charmander")
    ? "Charmander"
    : state.matches("charmeleon") || isEvolvingToCharizard
    ? "Charmeleon"
    : "Charizard";

  const imageSizing = hasEvolvedToCharizard ? "350px" : "200px";
  const buttonDisabled = isEvolvingToCharizard || hasEvolvedToCharizard;
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
        {
          <button
            onClick={() => {
              state.matches("charmander")
                ? send("EVOLVE")
                : send({
                    type: "MEGA_EVOLVE",
                    newStrength: Math.floor(Math.random() * 100),
                  });
            }}
            disabled={buttonDisabled}
            style={{
              width: "fit-content",
              background: "orange",
              color: "yellow",
              cursor: buttonDisabled ? "default" : "pointer",
            }}
          >
            {hasEvolvedToCharizard
              ? "All evolved!"
              : isEvolvingToCharizard
              ? "Evolving..."
              : "Evolve!"}
          </button>
        }
        {`Your Pokémon's current state of evolution is ${currentPokémon} and its strength is ${state.context.strength}`}
      </div>
    </div>
  );
}

export default App;
