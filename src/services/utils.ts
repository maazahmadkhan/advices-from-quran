export const getRandomBetween = (min: number, max: number) => {
  if (!min || !max) return 0;

  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};
