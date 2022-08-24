// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.megaEvolve": {
      type: "done.invoke.megaEvolve";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.megaEvolve": {
      type: "error.platform.megaEvolve";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    megaEvolve: "done.invoke.megaEvolve";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    megaEvolve: "MEGA_EVOLVE";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "charizard"
    | "charizard.evolved"
    | "charizard.evolving"
    | "charmander"
    | "charmeleon"
    | { charizard?: "evolved" | "evolving" };
  tags: never;
}
