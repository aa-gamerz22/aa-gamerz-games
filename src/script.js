const game = document.getElementById("game");
const levelText = document.getElementById("level-text");
const refresh = document.getElementById("refresh");
const fullscreen = document.getElementById("fullscreen");
const topArrow = document.getElementById("top");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const bottomArrow = document.getElementById("bottom");
const timer = document.getElementById("timer");
const titleScreenButton = document.getElementById("title-screen-button");

const player = document.createElement("div");
player.classList.add("game__player");

let level = 0;
let width = 29;
const puzzles = [
  ["ox---", "---xe"],
  ["ox---", "---xe", "--xxx"],
  ["o--xx", "x--xe", "--x--", "-----", "-----"],
  ["e-xx-", "x--xx", "--xo-", "-x---", "-----"],
  ["xx--e", "---xx", "--xxx", "----x", "-x-ox"],
  ["ox--e", "-x-xx", "---xx", "--xxx", "x---x"],
  ["ox--x", "-x-xe", "---x-", "x----", "x---x"],
  ["ox---", "---xe", "--xxx", "---x-", "x----"],
  ["ox--x", "-----", "x--x-", "x--e-", "x---x"],
  ["ox---", "---x-", "x----", "---xx", "xexxx"],
  ["o-x--", "--x--", "x----", "x--ex", "x--xx"],
  ["ox--x", "---x-", "--e--", "x-x--", "x---x"],
  ["---x---", "-x----e", "--x----", "x------", "o-----x"],
  ["ox----x---", "--------xe", "-----x---x"],
  [
    "xxo---x---",
    "--------x-",
    "-----x----",
    "--x-------",
    "---------e",
    "-x---x----"
  ],
  ["xollx---", "l-----xe"],
  [
    "xx----x--o",
    "------x---",
    "--------xx",
    "--x----x--",
    "---ll----e",
    "xx-xx---x-"
  ],
  [
    "xx----x--o",
    "------x---",
    "---x----xx",
    "--x----x--",
    "--x-xx----",
    "---x----xx",
    "--x-------",
    "----xlll--",
    "xx-xxlllxe"
  ],
  [
    "xx----x--o",
    "------x--x",
    "-lxlx-----",
    "-llx--x-xx",
    "-lx-------",
    "-llx----xx",
    "-lxx---x--",
    "----x-----",
    "xxe-x---x-"
  ],
  [
    "xx----x---",
    "------x--x",
    "--x-x-----",
    "x--x--x-xx",
    "l-xx------",
    "l--xlll--x",
    "l-xxlxlx--",
    "l---xe--x-",
    "xx------xo"
  ],
  [
    "xx----x---",
    "---l--x--x",
    "---l------",
    "x--x--x-x-",
    "-----x--x-",
    "--ex-x----",
    "--x-----x-",
    "----------",
    "xx-------o"
  ],
  [
    "xx----x---",
    "---l--x--x",
    "---l----l-",
    "------x-x-",
    "-----x--x-",
    "--lx-x----",
    "--x-----x-",
    "-l---xx---",
    "ex-------o"
  ],
  ["xx----xxll", "---x----lx", "-lxx-lx--o", "-x---lx---", "--elxxx--x"],
  [
    "xx----xxll",
    "ll-x----lx",
    "ll-l-xx-lx",
    "ll-l-ll-lx",
    "---x----lx",
    "-lxx-xl--o",
    "-xlllex---",
    "------x--x"
  ],
  [
    "xx----llll",
    "------exlx",
    "-l-l-xxxlx",
    "-l-l-ll-xx",
    "---x-----x",
    "-lxx-xl--o",
    "-xll-lxx--",
    "------x--x"
  ],
  [
    "xx--------",
    "--llx--xl-",
    "-x----xlx-",
    "-l---x-xx-",
    "-l-x------",
    "---x---x-x",
    "-lxx-xl--o",
    "exll-lxx--",
    "x--------x"
  ],
  ["o---s---", "--------", "---xe--s", "--------"],
  [
    "o--xxx----",
    "---xxx-x--",
    "-------e--",
    "-----x-s--",
    "---xx----x",
    "x------xxx"
  ],
  [
    "o-------s-",
    "-x-xxx-x--",
    "---------e",
    "-----x----",
    "---xx----x",
    "x------xxx"
  ],
  [
    "o---------",
    "---xxx-x--",
    "-s-s--slse",
    "-----x----",
    "---xx----x",
    "x-----xxxx"
  ],
  [
    "o---------",
    "------s-s-",
    "-s-s------",
    "-------ss-",
    "---s-ss---",
    "-s-----e--"
  ],
  [
    "o---------",
    "------s-s-",
    "-s-s------",
    "--------s-",
    "----s--s--",
    "----s---s-",
    "---s-ss---",
    "-s-----e--"
  ],
  [
    "o------e--",
    "--lll-s-s-",
    "-s-s------",
    "---llll-s-",
    "----s--s--",
    "--lls---ss",
    "---s-ssll-",
    "-s--------"
  ],
  [
    "o-xxx---x-",
    "--lll-s-s-",
    "-s-s---x--",
    "xx-llll-s-",
    "----sxxx--",
    "--lls---ss",
    "---sxxxll-",
    "-s-s---ex-"
  ],
  [
    "--xxx---x-",
    "--lll-s-s-",
    "-s-s---xll",
    "-l-llx--s-",
    "---lsxxx--",
    "--lls---ss",
    "---sxxxll-",
    "xs-s---exo"
  ],
  [
    "-s--x---x-",
    "e--ll-s-s-",
    "x--s---xll",
    "-l-l-xlll-",
    "----sxxx--",
    "-l-ls---ss",
    "--s-xxxll-",
    "xs-s----lo"
  ],
  [
    "es--l-----",
    "xxx---s---",
    "ol-ls---ss",
    "--s-xx-ll-",
    "xs-s----l-",
    "x--s---xl-",
    "-l-l-xlll-",
    "----s-----"
  ],
  ["-x-e---xxx", "-x--xlsllx", "s------x--", "-xs-xl-l--", "---------o"],
  [
    "lllls--x--",
    "sxxx-s-x--",
    "-x--slell-",
    "-x--xlx-l-",
    "s--------s",
    "-xsxxx-ls-",
    "-xs-xlxx--",
    "-xs-xlol--",
    "--slll---x"
  ],
  [
    "s-e-s-x-s-",
    "x--lx-slx-",
    "sss-ls--ss",
    "x-x-x-x-x-",
    "-sl-s-l-s-",
    "-x--llo-ss",
    "-xs-xlxx--",
    "s--s--s--s",
    "x--s--x--s"
  ],
  [
    "x-l-l-lxe-",
    "------xlx-",
    "-l--l--l--",
    "-lx-x--xx-",
    "-x--xx--l-",
    "----ll----",
    "x--x--x--l",
    "-l-l---l-l",
    "o--xl---xl"
  ],
  [
    "ss-ss-s--s",
    "o--s----s-",
    "-s--s--s--",
    "--ss--s---",
    "-s--ss--s-",
    "-------s-e",
    "s--s--s--s",
    "----s----s",
    "s--s--s--s"
  ],
  [
    "s-sss-s-ss",
    "---s--ss-s",
    "-----s-s--",
    "s-ss--s---",
    "-s--s---s-",
    "-------s--",
    "s--s--s--s",
    "-s--s-s--s",
    "s--soe----"
  ],
  [
    "s-s---s--s",
    "o--s--ss-s",
    "-s---s-s--",
    "s-ss--s---",
    "-s------s-",
    "--s-s--s--",
    "s--s--s--s",
    "-s--s-s--s",
    "s--s----e-"
  ],
  [
    "-s--sll--s",
    "---sllss-s",
    "-s---s----",
    "s-ss--s-ll",
    "-s-ll--s-l",
    "--s-s--s--",
    "sl-s--s--s",
    "-s--s-s--s",
    "s--s-eloll"
  ],
  [
    "-s-------s",
    "x--sllss-s",
    "lsllls-xx-",
    "l-ss--s-ll",
    "-sxx-----l",
    "-xxll--s--",
    "---sl-s--s",
    "--x-l-s--s",
    "--ls-xl-ll",
    "-sl--ex--o"
  ],
  [
    "os-xx------s--",
    "x--sllssxx---x",
    "lsllls-xx-s-xx",
    "l-ss--s-ll-xx-",
    "-s-l--xx---lxx",
    "-x-ll--s--xx-l",
    "-x---sl-s--ll-",
    "---xx-l-s--s-e"
  ],
  [
    "o---e-------------",
    "xxxx-xxxxxxxxxxxx-",
    "----------------x-",
    "-xxx-xxxxxxxxxx-x-",
    "------------------",
    "xxxx------------xx"
  ],
  [
    "xxxx-xxxxxxxxxxxxx",
    "e-----------------",
    "xxxx-xxxxxxxx-xxx-",
    "o-----------------",
    "xxxx-xxxxxxxx-xxx-",
    "----------------x-",
    "-xxx-xxxxxxxx-x-x-",
    "------------------",
    "xxxx------------xx",
    "xxxx-xxxxxxxx-xxxx",
    "xxxx----------xxxx"
  ],
  [
    "xxxx----------xxxx",
    "xxxx-xxxx-xxx-xxxx",
    "------------------",
    "xxxx-xxxx-xxx-xxx-",
    "o-----------------",
    "xxxx-xxxx-xxx-x-x-",
    "----------xxx-x-x-",
    "-xxx-xxxx-xxx-x-x-",
    "------------------",
    "xxxx------------xx",
    "xxxx-xxxx-xxx-xxxx",
    "e-------------xxxx",
    "xxxx------xxxxxxxx"
  ],
  [
    "xxxx----xx----xxxx",
    "xxox-xx-xx-xx-xxxx",
    "e----------xx-----",
    "xx-x-xxxxx-xx-xxx-",
    "------------------",
    "-x-x-xx-xx-xx-x-x-",
    "-----------xx-x-x-",
    "-x-x-xx-xx-xx-x-x-",
    "------------------",
    "xx--------------x-",
    "xxxx-xxxxx-xx-xxx-",
    "--------------xxx-",
    "xxxx--------------"
  ],
  [
    "xxxx----xx----xxxx",
    "xxox-xx-xx-xx-xxxx",
    "e----------xx-----",
    "-x-x-xx-xx-xx-x-x-",
    "-------------s----",
    "xx--------------x-",
    "xxxx-xxxxx-xx-xxx-",
    "--------------xxx-",
    "xxxx--------------"
  ],
  ["oe"]
];

let initialPosition = [];
let position = [];
let end = [];
let rocks = [];
var start = Date.now();

const buildLevel = () => {
  // Show tutorial on first level
  if (level === 0) {
    game.classList.add("game--tutorial");
  } else {
    game.classList.remove("game--tutorial");
  }
  // Adapt cell size to level
  document.body.style = `--cell: ${width / puzzles[level][0].length}rem`;
  // Reset rocks
  rocks = [];
  puzzles[level].forEach((row, rowIndex) => {
    const cells = row.split("");
    cells.forEach((cell, cellIndex) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("game__cell");
      if (cell === "o") {
        initialPosition = [cellIndex, rowIndex];
        position = [cellIndex, rowIndex];
      } else if (cell === "x") {
        rocks.push([cellIndex, rowIndex, "rock"]);
        newDiv.classList.add("game__cell--rock");
      } else if (cell === "l") {
        rocks.push([cellIndex, rowIndex, "lava"]);
        newDiv.classList.add("game__cell--lava");
      } else if (cell === "s") {
        rocks.push([cellIndex, rowIndex, "stop"]);
        newDiv.classList.add("game__cell--stop");
      } else if (cell === "e") {
        end = [cellIndex, rowIndex];
        newDiv.classList.add("game__cell--end");
      }
      game.appendChild(newDiv);
    });
  });
  game.appendChild(player);
};

const positionPlayer = () => {
  player.style = `--positionLeft: ${position[0]}; --positionTop: ${position[1]};`;
};

const removeEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const winLevel = () => {
  game.classList.add("game--win");
  document.addEventListener("keydown", removeEvent);
  removeArrowsEvents();
  setTimeout(() => {
    game.innerHTML = "";
    game.classList.remove("game--win");
    level = level + 1;
    levelText.innerHTML = level;
    buildLevel();
    positionPlayer();
    document.removeEventListener("keydown", removeEvent);
    registerArrows();
  }, 500);
};

const loseLevel = () => {
  game.classList.add("game--lose");
  document.addEventListener("keydown", removeEvent);
  removeArrowsEvents();
  setTimeout(() => {
    game.classList.remove("game--lose");
    position = [...initialPosition];
    positionPlayer();
    document.removeEventListener("keydown", removeEvent);
    registerArrows();
  }, 500);
};

const nextLevel = () => {
  if (position[0] === end[0] && position[1] === end[1]) {
    if (level === puzzles.length - 1) {
      // If this was the last level: win the game
      const s = (Date.now() - start) / 1000;
      timer.innerHTML = `${parseInt(s / 60 / 60)}h ${parseInt(
        (s / 60) % 60
      )}m ${parseInt(s % 60)}s`;
      game.classList.add("game--final-win");
    } else {
      winLevel();
    }
  }
};

const movePlayer = (axis, perpendicularAxis, movingForward) => {
  const relevantRocks = rocks
    .filter((rock) => rock[axis] === position[axis]) // Filtering rocks in this axis
    .filter((rock) =>
      movingForward
        ? rock[perpendicularAxis] > position[perpendicularAxis]
        : rock[perpendicularAxis] < position[perpendicularAxis]
    ); // Filtering rocks that are in the desired direction
  if (relevantRocks.length) {
    // If there are rocks in this path
    const minmax = movingForward
      ? Math.min(...relevantRocks.map((rock) => rock[perpendicularAxis]))
      : Math.max(...relevantRocks.map((rock) => rock[perpendicularAxis]));
    const relevantRock = relevantRocks.filter(
      (rock) => rock[perpendicularAxis] === minmax
    )[0];
    if (relevantRock[2] === "rock") {
      position[perpendicularAxis] = movingForward ? minmax - 1 : minmax + 1;
    } else {
      position[perpendicularAxis] = minmax;
      if (relevantRock[2] === "lava") {
        loseLevel();
      }
    }
  } else {
    const maxCells =
      axis === 1 ? puzzles[level][position[1]].length : puzzles[level].length;
    position[perpendicularAxis] = movingForward ? maxCells - 1 : 0;
  }
  positionPlayer();
  nextLevel();
};

const topFunction = () => movePlayer(0, 1, false);
const leftFunction = () => movePlayer(1, 0, false);
const rightFunction = () => movePlayer(1, 0, true);
const bottomFunction = () => movePlayer(0, 1, true);

const registerArrows = () => {
  topArrow.addEventListener("click", topFunction);
  leftArrow.addEventListener("click", leftFunction);
  rightArrow.addEventListener("click", rightFunction);
  bottomArrow.addEventListener("click", bottomFunction);
};

const removeArrowsEvents = () => {
  topArrow.removeEventListener("click", topFunction);
  leftArrow.removeEventListener("click", leftFunction);
  rightArrow.removeEventListener("click", rightFunction);
  bottomArrow.removeEventListener("click", bottomFunction);
};

// Init
buildLevel();
positionPlayer();
registerArrows();

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    rightFunction();
  } else if (event.key === "ArrowLeft") {
    leftFunction();
  } else if (event.key === "ArrowDown") {
    bottomFunction();
  } else if (event.key === "ArrowUp") {
    topFunction();
  }
});

refresh.addEventListener("click", () => {
  position = [...initialPosition];
  positionPlayer();
});

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

titleScreenButton.addEventListener("click", () => {
  document.getElementById("title-screen").classList.add("title-screen--hidden");
});
