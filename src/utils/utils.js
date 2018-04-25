const Utils = {
  isEmptyObject: obj => !Object.keys(obj).length,
  joinLowerCase: str => str.replace(/ /g, '-').toLowerCase(),
};

export default Utils;
