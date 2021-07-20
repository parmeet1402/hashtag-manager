const fs = require("fs");
const clipboardy = require("clipboardy");
const constants = require("./constants");
const helpers = require("./helpers");

const generateHashtags = (length = 30, popularityRatio, allHashtags) => {
  const getRandomHashtagsByPopularity = (popularity, count) => {
    return helpers.shuffleArray(allHashtags[popularity]).slice(0, count);
  };

  const stringifyHashtags = () => {
    return [
      ...getRandomHashtagsByPopularity(
        constants.POPULARITY_LEVEL[0],
        highCount,
        allHashtags
      ),
      ...getRandomHashtagsByPopularity(
        constants.POPULARITY_LEVEL[1],
        mediumCount,
        allHashtags
      ),
      getRandomHashtagsByPopularity(
        constants.POPULARITY_LEVEL[2],
        lowCount,
        allHashtags
      ),
    ].join(" ");
  };

  const calculateShares = (str, total) => {
    const [one, two, three] = str.split(":").map(item => +item);
    const ratioTotal = one + two + three;
    return [
      (one / ratioTotal) * total,
      (two / ratioTotal) * total,
      (three / ratioTotal) * total,
    ];
  };

  if (helpers.isEmptyObject(allHashtags)) {
    console.warn(constants.STMT_ADD_HASHTAGS_TO_GENERATE);
    return;
  }

  const [highCount, mediumCount, lowCount] = calculateShares(
    popularityRatio,
    length
  );

  clipboardy.writeSync(stringifyHashtags());

  console.log("Copied!");

  return stringifyHashtags();
};

const acceptAndValidateHashtagInputs = (str, popularityLevel) => {
  str = prompt(STMT_ENTER_HASHTAG_NAME);
  while (!str) {
    console.log(constants.STMT_HASHTAG_NAME_REQUIRED);
    str = prompt(STMT_ENTER_HASHTAG_NAME);
  }

  popularityLevel = prompt(constants.STMT_ENTER_HASHTAG_POPULARITY);
  while (!popularityLevel) {
    console.log(constants.STMT_HASHTAG_POPULARITY_REQUIRED);
    popularityLevel = prompt(constants.STMT_ENTER_HASHTAG_POPULARITY);
  }
};

const addHashtag = (str, popularity, allHashtags) => {
  // add it to the current variable in memory & the json file
  allHashtags[popularity].push(str);

  // if hashtag file isn't created then create it out
  if (Object.keys(allHashtags).length === 0) {
    allHashtags = constants.DEFAULT_JSON_DATA;
    fs.writeFileSync(
      constants.DEFAULT_FILE_NAME,
      JSON.stringify(DEFAULT_JSON_DATA)
    );
  }

  fs.writeFileSync(constants.DEFAULT_FILE_NAME, JSON.stringify(allHashtags));
  console.log(constants.STMT_HASHTAG_ADDED);
};

const viewAllHashtags = allHashtags => {
  console.log(allHashtags);
};

const resetHashtags = () => {
  fs.writeFileSync(
    constants.DEFAULT_FILE_NAME,
    JSON.stringify(constants.DEFAULT_JSON_DATA)
  );
  console.log("Deleted!");
};

const exitProgram = () => {
  process.exit(0);
};

const incorrectInput = () => {
  console.log("Please select the correct option");
};

exports.generateHashtags = generateHashtags;
exports.acceptAndValidateHashtagInputs = acceptAndValidateHashtagInputs;
exports.addHashtag = addHashtag;
exports.viewAllHashtags = viewAllHashtags;
exports.resetHashtags = resetHashtags;
exports.exitProgram = exitProgram;
exports.incorrectInput = incorrectInput;
