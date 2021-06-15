const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
const constants = require("./constants");
const controllers = require("./controllers");

let allHashtags = {};

const init = () => {
  let rawData = fs.readFileSync(constants.DEFAULT_FILE_NAME);
  allHashtags = JSON.parse(rawData);
};

init();

console.log(constants.STMT_WELCOME_MESSAGE);
while (true) {
  console.log(constants.STMT_MAIN_MENU_OPTIONS);

  const choice = prompt(constants.STMT_SELECT_OPTION);

  switch (choice) {
    case "1":
      controllers.handleGenerateHashtags(allHashtags);
      break;

    case "2":
      controllers.handleAddNewHashtag(allHashtags);
      break;

    case "3":
      controllers.handleViewAllHashtags(allHashtags);
      break;

    case "4":
      controllers.handleResetHashtags();
      break;

    case "5":
      controllers.handleExit();
      break;

    default:
      controllers.handleIncorrectInput();
  }
}
