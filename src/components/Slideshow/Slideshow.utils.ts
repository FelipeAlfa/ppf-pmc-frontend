export const getMainBulletIndexes = (
  mainBulletsCount: number,
  slidesLength: number,
  activeIndex: number,
) => {
  let indexes: number[] = [];

  const half = Math.floor(mainBulletsCount / 2);
  const offset = mainBulletsCount % 2 === 0 ? half - 1 : half;

  for (let i = 0; i < mainBulletsCount; i++) {
    indexes.push(activeIndex - offset + i);
  }

  const min = Math.min(...indexes);
  const max = Math.max(...indexes);
  let fix = 0;

  if (min < 0) {
    const diff = -min;
    indexes = indexes.map((x) => {
      if (x < 0) {
        fix++;
      }

      return x + diff;
    });
  }
  if (max >= slidesLength) {
    const diff = max - (slidesLength - 1);
    indexes = indexes.map((x) => {
      if (x >= slidesLength) {
        fix--;
      }

      return x - diff;
    });
  }

  return {
    indexes,
    fix
  };
};
