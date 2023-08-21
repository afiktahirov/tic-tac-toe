const section = document.createElement("section");
const result = document.createElement("h1");
const scoreElement = document.createElement("ul");
scoreElement.classList.add("score__element");
const scoreElementX = document.createElement("li");
const scoreElementO = document.createElement("li");
scoreElementX.textContent = "X: 0";
scoreElementO.textContent = "O: 0";
scoreElement.append(scoreElementX, scoreElementO);
result.classList.add("result");
section.classList.add("board");
const resetGameButton = document.createElement("button");
resetGameButton.classList.add("reset");
resetGameButton.textContent = "Play Again";
resetGameButton.style.display = "none";
resetGameButton.addEventListener("click", () => {
  resetGameButton.style.display = "none";
  winner = null;
  [...document.querySelectorAll(".box")].map((t) => {
    t.textContent = "";
    t.classList.remove("winner");
  });
  result.textContent = "";
  player = true;
  gameArray = Array(9).fill(null);
});
document.body.append(result, scoreElement, section, resetGameButton);
let gameArray = Array(9).fill(null);
let player = true;
let winner = null;
let score = {
  X: 0,
  O: 0,
};
const findWinner = () => {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningPositions.map((position) => {
    let [a, b, c] = position;
    if (
      gameArray[a] &&
      gameArray[a] === gameArray[b] &&
      gameArray[b] === gameArray[c]
    ) {
      winner = gameArray[a];
      score[winner]++;
      scoreElementX.textContent = `X:${score.X}`;
      scoreElementO.textContent = `O:${score.O}`;
      result.textContent = `${winner} qalibdir.`;
      resetGameButton.style.display = "block";
      position.map((t) =>
        document
          .querySelector(`.box:nth-of-type(${t + 1})`)
          .classList.add("winner")
      );
    }
  });
  let checkFull = gameArray.every((t) => t);
  if (checkFull && !winner) {
    result.textContent = "Heç-heçə";
    resetGameButton.style.display = "block";
  }
};
for (let i = 0; i < 9; i++) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.addEventListener("click", () => {
    if (gameArray[i] || winner) {
      return;
    }
    box.textContent = player ? "X" : "O";
    gameArray[i] = player ? "X" : "O";
    player = !player;
    findWinner();
  });
  section.append(box);
}
