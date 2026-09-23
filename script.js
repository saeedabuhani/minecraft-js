const Game = {
  // Hardcoded starting world. One character = one tile.
  // . sky  T tree trunk  L leaves  G grass  D dirt  R rock
  ORIGINAL_WORLD: [
    "....................",
    ".....LLL.......LLL..",
    "....LLLLL.....LLLLL.",
    ".....LLL.......LLL..",
    "......T........T....",
    "......T........T....",
    "GGGGGGGGGGGGGGGGGGGG",
    "DDDDDDDDDDDDDDDDDDDD",
    "DDDDRRDDDDDDDRRDDDDD",
    "DDRRRRDDDDRRRRRDDDRD",
    "RRRRRRRRRRRRRRRRRRRR",
    "RRRRRRRRRRRRRRRRRRRR",
  ],

  TILE_TYPES: {
    ".": "sky",
    T: "tree",
    L: "leaves",
    G: "grass",
    D: "dirt",
    R: "rock",
  },

  // Which tile types each tool is allowed to remove.
  TOOLS: {
    axe: ["tree", "leaves"],
    pickaxe: ["rock"],
    shovel: ["dirt", "grass"],
  },

  world: [], // 2D array of tile type names
  selectedTool: null,

  init() {
    this.worldEl = document.getElementById("world");
    this.messageEl = document.getElementById("message");
    this.loadOriginalWorld();
    this.renderWorld();

    document.querySelectorAll(".tool").forEach((btn) => {
      btn.addEventListener("click", () => this.selectTool(btn.dataset.tool));
    });
    this.worldEl.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (tile) this.clickTile(tile);
    });
  },

  setMessage(text) {
    this.messageEl.textContent = text;
  },

  selectTool(name) {
    this.selectedTool = name;
    document.querySelectorAll(".tool").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.tool === name);
    });
    this.setMessage(`${name} selected. Click a matching tile.`);
  },

  clickTile(tileEl) {
    const row = Number(tileEl.dataset.row);
    const col = Number(tileEl.dataset.col);
    const type = this.world[row][col];

    if (type === "sky") return;
    if (!this.selectedTool) {
      this.setMessage("Select a tool first!");
      return;
    }
    if (this.TOOLS[this.selectedTool].includes(type)) {
      this.removeTile(tileEl, row, col);
    } else {
      this.setMessage(`The ${this.selectedTool} can't remove ${type}.`);
      tileEl.classList.add("wrong");
      setTimeout(() => tileEl.classList.remove("wrong"), 300);
    }
  },

  removeTile(tileEl, row, col) {
    const type = this.world[row][col];
    this.world[row][col] = "sky";
    tileEl.classList.add("fade-out");
    setTimeout(() => this.setTileType(tileEl, "sky"), 250);
    this.setMessage(`Removed ${type}.`);
  },

  setTileType(tileEl, type) {
    tileEl.className = `tile tile-${type}`;
  },

  loadOriginalWorld() {
    this.world = this.ORIGINAL_WORLD.map((row) =>
      row.split("").map((ch) => this.TILE_TYPES[ch])
    );
  },

  renderWorld() {
    const rows = this.world.length;
    const cols = this.world[0].length;
    this.worldEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    this.worldEl.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    this.worldEl.innerHTML = "";

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tile = document.createElement("div");
        tile.className = `tile tile-${this.world[r][c]}`;
        tile.dataset.row = r;
        tile.dataset.col = c;
        this.worldEl.appendChild(tile);
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", () => Game.init());
