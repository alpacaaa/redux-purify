

const actionReducerPair = (actionType, input) => {
  const base = {
    actionCreator: (...args) => ({
      type: actionType,
      __args: args,
    })
  };


  if (typeof input === 'function') {
    return {
      ...base,
      reducer: input,
    };
  }

  if (typeof input !== 'object') {
    throw new Error('redux-purify does not undertand your intentions');
  }

  return {
    ...base,
    ...input,
  };
};




export default (pairs, initialState) => {

  if (typeof pairs !== 'object') {
    throw new Error('redux-purify only accepts objects as argument');
  }

  const { actions, reducers, constants } = Object.keys(pairs).reduce((acc, actionType) => {
    const input = pairs[actionType];
    const item = actionReducerPair(actionType, input);

    const actions = {
      ...acc.actions,
      [actionType]: (...args) => ({
        type: actionType,
        ...item.actionCreator(...args),
      }),
    };

    const reducers = {
      ...acc.reducers,
      [actionType]: item.reducer,
    };

    const constants = {
      ...acc.constants,
      [actionType]: actionType,
    };

    return {
      actions,
      reducers,
      constants,
    };
  }, { actions: {}, reducers: {}, constants: {} });

  return {
    actions,
    constants,

    reducer(state, action = {}) {
      const reducer = reducers[action.type];
      const extraArgs = action.__args || [];

      if (reducer) {
        return reducer(state, action, ...extraArgs);
      }

      if (typeof state === 'undefined') {
        return initialState;
      }

      return state;
    },
  }
};
