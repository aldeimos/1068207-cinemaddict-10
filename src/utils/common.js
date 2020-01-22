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

const splitString = (str, separator) => {
  return str.split(`${separator}`);
};

export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
  splitString,
  formatDate,
};
