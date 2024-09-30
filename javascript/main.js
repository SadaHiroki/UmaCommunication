const umaWords = ["おはよう", "おやすみ", "たべたい", "ばいばい"];
const umaText = document.getElementById("umaText");
const answerText = document.getElementById("answerText");
const answerButton = document.getElementById("answerButton");
const emotion = document.getElementById("emotion");
const resultText = document.getElementById("resultText");

const spells = [
  "$",
  "!",
  "#",
  "@",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "+",
  "=",
  ";",
  ",",
  ".",
  "/",
  "?",
  ":",
];
const audio = document.querySelector("audio");
function playAudio() {
  // play() メソッドで音声を再生
  audio.play();
}
var rand = 0;
var count = 0;
// ゲーム開始
function gameStart() {
  var spell = "";
  rand = Math.floor(Math.random() * umaWords.length);
  for (let i = 0; i < umaWords[rand].length; i++) {
    spell += spells[Math.floor(Math.random() * spells.length)] + " ";
  }
  umaText.innerText = spell;
}

function answerFunc() {
  var umaWord = umaWords[rand];
  var answer = answerText.value;
  var resultFlag = true;
  if (umaWord != answer) {
    resultFlag = false;
  }
  if (resultFlag) {
    resultText.innerText = "正解";
    reset();
  } else {
    resultText.innerText = "不正解";
    emotion.innerHTML = "&#x1f622;";
    count++;
  }
  if (count >= 3) {
    emotion.innerHTML = "&#x1f621;";
    playAudio();
    count = 0;
  }
}

//初期化
function reset() {
  emotion.innerHTML = "";
  answerText.value = "";
  umaText.innerText = "";
  count = 0;
  gameStart();
}

gameStart();

// 回答と問題の照らし合わせ
answerText.addEventListener("input", function () {
  var umaWord = umaWords[rand].split("");
  var answer = answerText.value.split("");
  for (let i = 0; i < answerText.value.length; i++) {
    if (umaWord[i] == answer[i]) {
      emotion.innerHTML = "&#x1f600;"; //喜び
    } else {
      emotion.innerHTML = "&#x1f615;"; //悲しみ
      break;
    }
  }
});

// 回答
answerButton.addEventListener("click", function () {
  answerFunc();
});

answerText.addEventListener("keydown", enterKeyPress);
function enterKeyPress(event) {
  if (event.key === "Enter") {
    answerFunc();
  }
}
