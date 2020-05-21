let fs = require('fs');
let file = './sample_data/Moby Dick; or The Whale, by Herman.txt';


fs.readFile(file, 'utf8', function (err, data) {

  if (err) throw err;

  let wordsArray = splitByWords(data);
  let wordsMap = createWordMap(wordsArray);
  let finalWordsArray = sortByCount(wordsMap);
  
  logResults(finalWordsArray);
});


function logResults(finalWordsArray) {
  finalWordsArray.forEach(item => {
    console.log(`${item.word}  ${item.total}`);
  });
}

function splitByWords (text) {
  let wordsArray = text.split(/\s+/);
  return wordsArray;
}


function createWordMap (wordsArray) {

  let wordsMap = {};

  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
}


function sortByCount (wordsMap) {

  let finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      word: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.total - a.total;
  });

  return finalWordsArray.splice(0,10);

}
