import { assign, createMachine } from "xstate";

interface IContext {
  strength: number;
}

export const Charmachine = createMachine({
  initial: "charmander",
  tsTypes: {} as import("./Charmachine.typegen").Typegen0,
  schema: {
    context: {} as IContext,
  },
  context: {
    strength: 1,
  },
  states: {
    charmander: {
      on: {
        EVOLVE: {
          target: "charmeleon",
          actions: assign((context: IContext) => ({ ...context, strength: 2 })),
        },
      },
    },
    charmeleon: {},
    charizard: {
      states: {
        evolving: {},
        evolved: {},
      },
    },
  },
});
