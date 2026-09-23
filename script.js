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

  world: [], // 2D array of tile type names

  init() {
    this.worldEl = document.getElementById("world");
    this.loadOriginalWorld();
    this.renderWorld();
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
