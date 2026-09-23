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
  inventory: {}, // tile type -> count
  selectedItem: null, // tile type chosen from the inventory for placing

  init() {
    this.worldEl = document.getElementById("world");
    this.messageEl = document.getElementById("message");
    this.inventoryEl = document.getElementById("inventory");
    this.loadOriginalWorld();
    this.renderWorld();
    this.renderInventory();

    document.querySelectorAll(".tool").forEach((btn) => {
      btn.addEventListener("click", () => this.selectTool(btn.dataset.tool));
    });
    this.worldEl.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (tile) this.clickTile(tile);
    });
    document.getElementById("reset-btn").addEventListener("click", () => this.resetWorld());
    this.inventoryEl.addEventListener("click", (e) => {
      const slot = e.target.closest(".inv-item");
      if (slot) this.selectItem(slot.dataset.type);
    });
  },

  setMessage(text) {
    this.messageEl.textContent = text;
  },

  selectTool(name) {
    this.selectedTool = name;
    this.selectedItem = null;
    this.renderInventory();
    document.querySelectorAll(".tool").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.tool === name);
    });
    this.setMessage(`${name} selected. Click a matching tile.`);
  },

  clickTile(tileEl) {
    const row = Number(tileEl.dataset.row);
    const col = Number(tileEl.dataset.col);
    const type = this.world[row][col];

    if (this.selectedItem) {
      this.placeFromInventory(tileEl, row, col);
      return;
    }
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
    this.addToInventory(type);
    tileEl.classList.add("fade-out");
    setTimeout(() => this.setTileType(tileEl, "sky"), 250);
    this.setMessage(`Removed ${type}.`);
  },

  setTileType(tileEl, type) {
    tileEl.className = `tile tile-${type}`;
  },

  addToInventory(type) {
    this.inventory[type] = (this.inventory[type] || 0) + 1;
    this.renderInventory();
  },

  selectItem(type) {
    this.selectedItem = type;
    this.selectedTool = null;
    document.querySelectorAll(".tool").forEach((btn) => btn.classList.remove("selected"));
    this.renderInventory();
    this.setMessage(`Placing ${type}. Click an empty sky tile.`);
  },

  placeFromInventory(tileEl, row, col) {
    const type = this.selectedItem;
    if (this.world[row][col] !== "sky") {
      this.setMessage("You can only place tiles on empty space.");
      tileEl.classList.add("wrong");
      setTimeout(() => tileEl.classList.remove("wrong"), 300);
      return;
    }
    this.world[row][col] = type;
    this.inventory[type]--;
    if (this.inventory[type] <= 0) {
      delete this.inventory[type];
      this.selectedItem = null;
    }
    this.setTileType(tileEl, type);
    tileEl.classList.add("fade-in");
    this.renderInventory();
    this.setMessage(`Placed ${type}.`);
  },

  renderInventory() {
    this.inventoryEl.innerHTML = "";
    const types = Object.keys(this.inventory);
    if (types.length === 0) {
      const empty = document.createElement("p");
      empty.className = "inv-empty";
      empty.textContent = "Empty";
      this.inventoryEl.appendChild(empty);
      return;
    }
    types.forEach((type) => {
      const slot = document.createElement("button");
      slot.className = "inv-item" + (type === this.selectedItem ? " selected" : "");
      slot.dataset.type = type;
      slot.innerHTML = `<span class="inv-tile tile-${type}"></span><span class="inv-name">${type}</span><span class="inv-count">${this.inventory[type]}</span>`;
      this.inventoryEl.appendChild(slot);
    });
  },

  resetWorld() {
    this.loadOriginalWorld();
    this.inventory = {};
    this.selectedTool = null;
    this.selectedItem = null;
    document.querySelectorAll(".tool").forEach((btn) => btn.classList.remove("selected"));
    this.renderWorld();
    this.renderInventory();
    this.setMessage("World reset. Pick a tool, then click a tile.");
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
