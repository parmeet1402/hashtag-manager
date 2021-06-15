const fs = require("fs");
const clipboardy = require("clipboardy");
const prompt = require("prompt-sync")({ sigint: true });
const constants = require("./constants");
let allHashtags = {};

const calculateShares = (str, total) => {
  const [one, two, three] = str.split(":").map(item => +item);
  const ratioTotal = one + two + three;
  return [
    (one / ratioTotal) * total,
    (two / ratioTotal) * total,
    (three / ratioTotal) * total,
  ];
};

function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

const getRandomHashtagsByPopularity = (popularity, count) => {
  return shuffle(allHashtags[popularity]).slice(0, count);
};

function shuffle(arr) {
  for (
    var j, x, i = arr.length;
    i;
    j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr;
}

const addHashtag = (str, popularity) => {
  // validate popularity
  if (
    !popularity ||
    (popularity && !["high", "medium", "low"].includes(popularity))
  ) {
    throw new Error("Invalid Popularity value");
  }

  // validation check
  if (!str || !/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g.test(str)) {
    throw new Error("Hashtag is not in correct format");
  }

  // already exists check
  if (
    Object.values(allHashtags)
      .reduce((acc, currentItem) => [...acc, ...currentItem], [])
      .includes(str)
  ) {
    throw new Error("Hashtag already exists");
  }

  // add it to the current variable in memory & the json file
  if (allHashtags.popularity) {
    allHashtags[popularity].push(str);
  } else {
    allHashtags[popularity] = [str];
  }

  // if hashtag file isn't created then create it out
  if (Object.keys(allHashtags).length === 0) {
    allHashtags = { high: [], medium: [], low: [] };
    fs.writeFile(
      "data.json",
      JSON.stringify({ high: [], medium: [], low: [] }),
      function (err) {
        if (err) throw err;
      }
    );
  }

  fs.writeFile("data.json", JSON.stringify(allHashtags), function (err) {
    if (err) throw err;
    console.log("Added!");
  });
};

const generateHashtags = (length = 30, popularityRatio) => {
  if (Object.keys(allHashtags).length === 0) {
    console.warn(
      "Please add hashtags before you could start generating them up"
    );
    return;
  }

  const [highCount, mediumCount, lowCount] = calculateShares(
    popularityRatio,
    length
  );

  clipboardy.writeSync(
    [
      ...getRandomHashtagsByPopularity("high", highCount),
      ...getRandomHashtagsByPopularity("medium", mediumCount),
      getRandomHashtagsByPopularity("low", lowCount),
    ].join(" ")
  );

  console.log("Copied!");

  return [
    ...getRandomHashtagsByPopularity("high", highCount),
    ...getRandomHashtagsByPopularity("medium", mediumCount),
    getRandomHashtagsByPopularity("low", lowCount),
  ].join(" ");
};

//  3-4 frequent, 6-8 average and 12-16 rare
const init = () => {
  let rawData = fs.readFileSync("data.json");
  console.log(JSON.parse(rawData));
  allHashtags = JSON.parse(rawData);
};

init();

console.log(constants.STMT_WELCOME_MESSAGE);
console.log(constants.STMT_MAIN_MENU_OPTIONS);

const choice = prompt(constants.STMT_SELECT_OPTION);
switch (choice) {
  case "1":
    const length = prompt("Number of Hashtags: (30) ") || 30;
    const popularityRatio =
      prompt("Popularity Ratio: <High:Medium:Low> (1:1:1) ") || "1:1:1";
    generateHashtags(+length, popularityRatio);
    break;
  case "2":
    let str = "",
      popularityLevel = "";
    str = prompt("Name: ");
    while (!str) {
      console.log("Hashtag name is required");
      str = prompt("Name: ");
    }

    popularityLevel = prompt("Hashtag's Popularity: <High:Medium:Low> ");
    while (!popularityLevel) {
      console.log("Hashtag's Popularity is required");
      popularityLevel = prompt("Hashtag's Popularity: <High:Medium:Low> ");
    }

    if (str) addHashtag(str.toLowerCase(), popularityLevel.toLowerCase());
    break;
  case "3":
    console.log(allHashtags);
    break;
  case "4":
    fs.writeFile(
      "data.json",
      JSON.stringify({ high: [], medium: [], low: [] }),
      function (err) {
        if (err) throw err;
        console.log("Deleted!");
      }
    );
    break;
  case "5":
    process.exit(0);
    break;
  default:
    console.log("Please select the correct option");
}

// Constants
const POPULARITY_LEVEL = ["high", "medium", "low"];

// Statements_Constants

/* const STMT_WELCOME_MESSAGE = `WELCOME TO HASHTAG MANAGER`;

const STMT_MAIN_MENU_OPTIONS = `---X---- Select an option ----X--- 
1. Generate Hashtags
2. Add new Hashtag
3. View all hashtags
4. Reset Hashtags
5. Exit`; */

// Validations
// Handlers
