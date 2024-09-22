const maxSize = 300;
const multiplicationFactor = 2;
let gridSize = 32;
let mode = "normal";
let bgClassNames = ["normal-bg", "modern-bg"];

function createGrid(gridSize) {
  let parent = document.querySelector(".grid-container");
  const body = document.querySelector(".body");
  const separator = document.querySelector(".separator");

  if (parent) {
    parent.remove();
  }
  
  parent = document.createElement("div");
  parent.classList.add("grid-container");
  body.insertBefore(parent, separator);

  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("matrix-row");

    for (let j = 0; j < gridSize; j++) {
      let column = document.createElement("div");
      let cellSize = maxSize / gridSize * multiplicationFactor;
      column.setAttribute("style", `width: ${cellSize}px; height: ${cellSize}px;`);
      column.classList.add("matrix-column");
      row.appendChild(column);
    }

    parent.appendChild(row);
  }
}

function initializeGridHover() {
  let cells = document.querySelectorAll(".matrix-column");
  cellsArr = Array.from(cells);

  for (let i = 0; i < cellsArr.length; i++) {
    const element = cellsArr[i];
    element.addEventListener("mouseover", function (e) {
      let targetCell = e.target;
      removeClassNames(targetCell);

      if (mode === "normal") {
        targetCell.classList.add("normal-bg");
      } else if (mode === "modern") {
        targetCell.classList.add("modern-bg");
      }
    });
  }
}

function initializeButtonMode() {
  let smallBtn = document.querySelector(".small");
  smallBtn.addEventListener("click", function (e){
    gridSize = 16;
    createGrid(gridSize);
    initializeGridHover();
  });

  let mediumBtn = document.querySelector(".medium");
  mediumBtn.addEventListener("click", function (e){
    gridSize = 32;
    createGrid(gridSize);
    initializeGridHover();
  });
  
  let normalBtn = document.querySelector(".normal");
  normalBtn.addEventListener("click", function (e) {
    mode = "normal";
  });

  let modernBtn = document.querySelector(".modern");
  modernBtn.addEventListener("click", function (e) {
    mode = "modern";
  });
}

function removeClassNames(targetCell) {
  for (let i = 0; i < bgClassNames.length; i++) {
    const element = bgClassNames[i];
    targetCell.classList.remove(element);
  }
}

initializeButtonMode();
createGrid(gridSize);
initializeGridHover();
