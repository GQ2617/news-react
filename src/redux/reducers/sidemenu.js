const initState = { collapsed: false };

export default function sidemenuReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case "CHANGECOLLAPSED":
      let newState = { ...preState };
      newState.collapsed = !newState.collapsed;
      return newState;
    default:
      return preState;
  }
}
