let seed = performance.now() * 1000;
// performance.now() returns the number of milliseconds since the page was loaded.

export const random = (): number => {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  seed = (a * seed + c) % m;
  return seed / m;
};
