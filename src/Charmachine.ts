import { assign, createMachine, DoneInvokeEvent } from "xstate";

interface IContext {
  strength: number;
}

export const Charmachine = createMachine(
  {
    predictableActionArguments: true,
    initial: "charmander",
    tsTypes: {} as import("./Charmachine.typegen").Typegen0,
    schema: {
      context: {} as IContext,
      events: {} as
        | { type: "MEGA_EVOLVE"; newStrength: number }
        | { type: "EVOLVE" },
    },
    context: {
      strength: 1,
    },
    states: {
      charmander: {
        on: {
          EVOLVE: {
            target: "charmeleon",
          },
        },
      },
      charmeleon: {
        entry: assign((context: IContext) => ({ ...context, strength: 2 })),
        on: {
          MEGA_EVOLVE: {
            target: "charizard",
          },
        },
      },
      charizard: {
        initial: "evolving",
        states: {
          evolving: {
            invoke: {
              id: "megaEvolve",
              src: "megaEvolve",
              onDone: [
                {
                  actions: assign(
                    (
                      context: IContext,
                      event: DoneInvokeEvent<{ newStrength: number }>
                    ) => {
                      const { newStrength } = event.data;
                      return { ...context, strength: newStrength };
                    }
                  ),
                  target: "evolved",
                },
              ],
            },
          },
          evolved: {},
        },
      },
    },
  },
  {
    services: {
      megaEvolve: async (context: IContext, event) => {
        const { newStrength } = event;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { newStrength: context.strength + newStrength };
      },
    },
  }
);
