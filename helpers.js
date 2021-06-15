const constants = require("./constants");

const isEmptyObject = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

const shuffleArray = arr => {
  for (
    var j, x, i = arr.length;
    i;
    j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr;
};

const isHashtagInvalid = (str, allHashtags) => {
 
  if (!str || !/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g.test(str)) {
    return constants.STMT_HASHTAG_INCORRECT_FORMAT;
  }

  if (
    Object.values(allHashtags)
      .reduce((acc, currentItem) => [...acc, ...currentItem], [])
      .includes(str)
  ) {
    return constants.STMT_HASHTAG_ALREADY_EXISTS;
  }
  return "";
};

const isPopularityInvalid = popularity => {
  if (
    !popularity ||
    (popularity && !constants.POPULARITY_LEVEL.includes(popularity))
  ) {
    return constants.STMT_HASHTAG_POPULARITY_NOT_EXISTS;
  }
  return "";
};

exports.isEmptyObject = isEmptyObject;
exports.shuffleArray = shuffleArray;
exports.isHashtagInvalid = isHashtagInvalid;
exports.isPopularityInvalid = isPopularityInvalid;
