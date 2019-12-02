const getRandomInt = (int) => {
  return Math.floor(Math.random() * int);
};

const getRandomIntegerFromGap = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerFromGap(0, array.length - 1);

  return array[randomIndex];
};


export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
};

