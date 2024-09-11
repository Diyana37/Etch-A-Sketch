let gridSize = Number(prompt("Please enter grid size"));

let mode = "normal";
let bgClassNames = ["normal-bg", "modern-bg"];

function createGrid(gridSize) {
  const parent = document.querySelector(".grid-container");

  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("matrix-row");

    for (let j = 0; j < gridSize; j++) {
      let column = document.createElement("div");
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

createGrid(gridSize);
initializeGridHover();
initializeButtonMode();
