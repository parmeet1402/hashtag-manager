const functions = require("./functions");
const constants = require("./constants");
const helpers = require("./helpers");
const prompt = require("prompt-sync")({ sigint: true });

const handleGenerateHashtags = allHashtags => {
  const DEFAULT_NUMBER_OF_HASHTAGS = 30;
  const DEFAULT_POPULARITY_RATIO = "1:1:1";

  const length =
    prompt(constants.STMT_NUMBER_OF_HASHTAGS) || DEFAULT_NUMBER_OF_HASHTAGS;
  const popularityRatio =
    prompt(constants.STMT_POPULARITY_RATIO) || DEFAULT_POPULARITY_RATIO;
  functions.generateHashtags(+length, popularityRatio, allHashtags);
};

const handleAddNewHashtag = allHashtags => {
  let str = "",
    popularityLevel = "";

  // validate hashtag's name
  str = prompt(constants.STMT_ENTER_HASHTAG_NAME);
  while (helpers.isHashtagInvalid(str, allHashtags)) {
    console.log(helpers.isHashtagInvalid(str, allHashtags));
    str = prompt(constants.STMT_ENTER_HASHTAG_NAME);
  }

  // validate hashtag's popularity
  popularityLevel = prompt(constants.STMT_ENTER_HASHTAG_POPULARITY);
  while (helpers.isPopularityInvalid(popularityLevel.toLowerCase())) {
    console.log(helpers.isPopularityInvalid(popularityLevel.toLowerCase()));
    popularityLevel = prompt(constants.STMT_ENTER_HASHTAG_POPULARITY);
  }

  // add hashtag
  functions.addHashtag(
    str.toLowerCase(),
    popularityLevel.toLowerCase(),
    allHashtags
  );
};

const handleViewAllHashtags = allHashtags => {
  // view all hashtags
  functions.viewAllHashtags(allHashtags);
};

const handleResetHashtags = () => {
  // reset the file to the initial data
  functions.resetHashtags();
};

const handleExit = () => {
  // exit program
  functions.exitProgram();
};

const handleIncorrectInput = () => {
  //incorrect input
  functions.incorrectInput();
};

exports.handleGenerateHashtags = handleGenerateHashtags;
exports.handleAddNewHashtag = handleAddNewHashtag;
exports.handleViewAllHashtags = handleViewAllHashtags;
exports.handleResetHashtags = handleResetHashtags;
exports.handleExit = handleExit;
exports.handleIncorrectInput = handleIncorrectInput;
