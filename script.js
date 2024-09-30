const maxSize = 600;
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
      let cellSize = maxSize / gridSize;
      column.setAttribute(
        "style",
        `width: ${cellSize}px; height: ${cellSize}px;`
      );
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
      } else if (mode === "random") {
        let randomColors = randomRGB();
        targetCell.setAttribute("style", randomColors);
      }
    });
  }
}

function initializeButtonMode() {
  let modal = document.querySelector(".custom-size-modal");
  let customSizeModal = new bootstrap.Modal(modal);

  let smallBtn = document.querySelector(".small");
  smallBtn.addEventListener("click", function (e) {
    gridSize = 16;
    createGrid(gridSize);
    initializeGridHover();
  });

  let mediumBtn = document.querySelector(".medium");
  mediumBtn.addEventListener("click", function (e) {
    gridSize = 32;
    createGrid(gridSize);
    initializeGridHover();
  });

  let customBtn = document.querySelector(".custom");
  customBtn.addEventListener("click", function (e) {
    customSizeModal.show();
  });

  let submitBtn = document.querySelector(".submit");
  submitBtn.addEventListener("click", function (e) {
    let customValue = document.querySelector(".size");
    let customSize = customValue.value;
    
    let validationLabel = document.querySelector(".valid-size");
    if (isNaN(customSize)) {
      validationLabel.textContent = "Please enter a number!";
      customValue.value = "";
      return;
    }

    if (!(customSize >= 1 && customSize <= 100)){
      validationLabel.textContent = "Please enter a valid number!";
      customValue.value = "";
      return;
    }

    validationLabel.textContent = "";
    customValue.value = "";

    gridSize = Number(customSize);
    createGrid(gridSize);
    initializeGridHover();

    customSizeModal.hide();
  });

  let normalBtn = document.querySelector(".normal");
  normalBtn.addEventListener("click", function (e) {
    mode = "normal";
  });

  let modernBtn = document.querySelector(".modern");
  modernBtn.addEventListener("click", function (e) {
    mode = "modern";
  });

  let randomBtn = document.querySelector(".random");
  randomBtn.addEventListener("click", function (e) {
    mode = "random";
  });
}

function removeClassNames(targetCell) {
  for (let i = 0; i < bgClassNames.length; i++) {
    const element = bgClassNames[i];
    targetCell.classList.remove(element);
  }
}

function randomRGB() {
  let output = "";
  let randomRed = getRandomInt(256);
  let randomGreen = getRandomInt(256);
  let randomBlue = getRandomInt(256);

  let cellSize = maxSize / gridSize;
  output = `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue}); 
  width: ${cellSize}px; height: ${cellSize}px;`;
  return output;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

initializeButtonMode();
createGrid(gridSize);
initializeGridHover();
