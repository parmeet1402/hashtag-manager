const fs = require("fs");
const clipboardy = require("clipboardy");

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
  allHashtags[popularity].push(str);

  fs.writeFile("data.json", JSON.stringify(allHashtags), function (err) {
    if (err) throw err;
    console.log("Replaced!");
  });
};

const generateHashtags = (length = 30, platform, popularityRatio) => {
  const [highCount, mediumCount, lowCount] = calculateShares(
    popularityRatio,
    length
  );

  /*  clipboardy.writeSync(
    [
      ...getRandomHashtagsByPopularity("high", highCount),
      ...getRandomHashtagsByPopularity("medium", mediumCount),
      getRandomHashtagsByPopularity("low", lowCount),
    ].join(" ")
  ); */

  console.log("Copied!");

  return [
    ...getRandomHashtagsByPopularity("high", highCount),
    ...getRandomHashtagsByPopularity("medium", mediumCount),
    getRandomHashtagsByPopularity("low", lowCount),
  ].join(" ");
};

//  3-4 frequent, 6-8 average and 12-16 rare
const init = () => {
  let rawdata = fs.readFileSync("data.json");
  allHashtags = JSON.parse(rawdata);
};

init();

console.log("WELCOME TO HASHTAG MANAGER");

// while (true) {
// console.log("---X---- Select an option----X---");
// console.log("1. Generate hashtags");
// console.log("2. Add new hashtag");

/* switch (choice) {
    case "1":
    case "2":
  } */
// }
