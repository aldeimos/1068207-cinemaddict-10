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

const shuffleArray = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getRandomLengthArray = (item, separator, length) => {
  if (typeof item === typeof `string`) {
    const array = item.split(`${separator}`);
    return shuffleArray(array).slice(0, length).join(`${separator}`);
  }
  return shuffleArray(item).slice(0, length).join(`${separator}`);
};

export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
  getRandomLengthArray,
  shuffleArray
};
