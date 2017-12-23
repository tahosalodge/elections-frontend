export function mergeItems(state, items) {
  if (!items) {
    return state;
  }
  return Object.keys(items).reduce(
    (nextState, id) => {
      // eslint-ignore-next-line
      nextState[id] = { ...items[id] };
      return nextState;
    },
    { ...state },
  );
}

export function mergeItem(state, id, data) {
  const item = state[id];
  if (!item) {
    return state;
  }
  return {
    ...state,
    [id]: { ...item, ...data },
  };
}

export function addItem(state, id, data) {
  if (!state[id]) {
    return {
      ...state,
      [id]: { ...data },
    };
  }
  return state;
}

export function removeItem(state, id) {
  if (state[id]) {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }
  return state;
}
