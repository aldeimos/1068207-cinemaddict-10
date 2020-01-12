import moment from 'moment';

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

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY HH:mm`);
};

const shuffleArray = (arr) => {
  let j;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
};

const splitString = (str, separator) => {
  return str.split(`${separator}`);
};

const getRandomLengthArray = (item, separator, length) => {
  return shuffleArray(item).slice(0, length).join(`${separator}`);
};

export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
  getRandomLengthArray,
  shuffleArray,
  splitString,
  formatDate,
};
