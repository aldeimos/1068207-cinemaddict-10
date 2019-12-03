const countFilterValues = (cards, prop) => {
  return cards.filter((it) => it[prop] === true).length;
};


export {countFilterValues};
