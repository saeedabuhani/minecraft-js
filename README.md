# Minecraft JS

## Description
A 2D Minecraft-style sandbox built with plain HTML, CSS and JavaScript (no libraries or frameworks).

The world is a hardcoded 2D array. You pick a tool (Axe, Pickaxe or Shovel) and click a tile in the world.
If the tool matches the tile, the tile is removed from the world and added to the inventory.
You can then click an item in the inventory and click an empty tile to place it back.
A **Reset World** button restores the original world and empties the inventory.

### Features
- Landing page with the game rules and a short tutorial
- Toolbar with 3 tools; the selected tool is highlighted
- Tile removal only with the correct tool (wrong tool = the tile shakes and a message is shown)
- Full inventory that keeps a count for every tile type
- Placing tiles back from the inventory
- Reset button that restores the original hardcoded world
- Fade in / fade out animations when tiles are removed or placed
- Responsive layout for small screens

### Tools
| Tool | Removes |
|---|---|
| Axe | tree trunks, leaves |
| Pickaxe | rock |
| Shovel | dirt, grass |

### Project structure
- `index.html` - landing page (rules and tutorial)
- `game.html` - the game (toolbar, world, inventory, reset button)
- `style.css` - all visuals; tile textures are CSS classes, states use classes such as `.selected`
- `script.js` - all game logic inside one `Game` object

## How to run
No installation is needed.

1. Clone the repo:
   ```bash
   https://github.com/saeedabuhani/minecraft-js.git
   cd minecraft-js
   ```
2. Open `index.html` in a browser, or start a local server:
   ```bash
   npx serve .
   ```
   and open the address printed in the terminal (usually http://localhost:3000).

In VS Code you can also right-click `index.html` and choose **Open with Live Server**.

## What I found hard
- Keeping the world array and the DOM in sync, so that the array is always the source of truth.
- Deciding how tool selection and inventory selection interact (only one can be active at a time).
- Making the grid keep its proportions and stay usable on different screen sizes.

## Known bugs
- Tiles can be placed in mid-air (on any empty sky tile), so floating blocks are possible.
- The world size is fixed (20x12).

## Assignment review
This assignment was a good exercise in separating structure (HTML), visuals (CSS) and logic (JS).
Keeping all state in one `Game` object and using CSS classes for every visual state made the code
easier to follow and to debug. Committing after every feature helped me track progress.


## Live demo
https://saeedabuhani.github.io/minecraft-js/
