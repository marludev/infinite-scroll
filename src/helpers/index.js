export const validateStateCharacter = (state) => {
  const states = {
    Alive: "bg-green-400",
    unknown: "bg-yellow-500",
    Dead: "bg-red-500",
  };
  return states[state];
};
