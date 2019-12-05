const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

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

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

export {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
  getRandomLengthArray,
  shuffleArray,
  splitString,
  render,
  RenderPosition,
  createElement,
};
