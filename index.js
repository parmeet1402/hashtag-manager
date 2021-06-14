const fs = require("fs");
const clipboardy = require("clipboardy");

// TODO: Load hashtags
// 1. Access JSON file and load up the all hashtags variable
// 2. If file not found, prompt to generate a new one

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

function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

// TODO: Add hashtag
// 1. First check whether it has only one # along with string and no special characters
// 2. Check if the hashtag is present in any of the array, all can be joined and then searched upon
// 3A. If found, throw error
// 3B. If not found, insert it up into the allHashtags array and then also add it to the JSON file

const generateHashtags = (length = 30, platform, popularityRatio) => {
  const [highCount, mediumCount, lowCount] = calculateShares(
    popularityRatio,
    length
  );

  clipboardy.writeSync(
    [
      ...getRandomHashtagsByPopularity("high", highCount),
      ...getRandomHashtagsByPopularity("medium", mediumCount),
      getRandomHashtagsByPopularity("low", lowCount),
    ].join(", ")
  );

  console.log("Copied!");

  return [
    ...getRandomHashtagsByPopularity("high", highCount),
    ...getRandomHashtagsByPopularity("medium", mediumCount),
    getRandomHashtagsByPopularity("low", lowCount),
  ].join(", ");
};

//  3-4 frequent, 6-8 average and 12-16 rare
const init = () => {
  let rawdata = fs.readFileSync("data.json");
  allHashtags = JSON.parse(rawdata);
  // console.log(window);
};

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

init();
// TODO: Add it to clipboard for easier usage
console.log(generateHashtags(30, "instagram", "1:1:1"));
/* 

1000
#developer_work #developerSetup #reactjsDeveloper #appleDeveloper #flutterDeveloper #gameDeveloper #developersInMumbai #nodejsDeveloper #reactnativeDevelopers #softwareDevelopers #googleDevelopers #developerDiaries #developerStuff #developerStuff #javascriptDeveloper #mobileDeveloper #codingPics #codeIsMyLife #nanodegree #vuejs #cloudDeveloper  #cloudsolutions #serverless


100000
#webDeveloper #appDeveloper #websiteDeveloper #iosDeveloper #backendDeveloper #frontendDeveloper  #coders #worldCode  #coderLife #reactjs #learnToCode #aws  #devops #codingIsFun

1000000
#code #coder #programmer #developer #javascript #programming#macbook #coding #codingLife #


#bootstrap #code #programmers #python #html #css #course #webapp #webdeveloper #frontend #backend #webdev #webdesigner #learntocode #onlinecourse #peoplewhocode

*/
