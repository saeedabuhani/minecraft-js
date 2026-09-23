# Minecraft JS

## Description
A 2D Minecraft-style sandbox built with plain HTML, CSS and JavaScript (no libraries).
The world is a hardcoded 2D array. You pick a tool (Axe, Pickaxe, Shovel), click a tile, and
if the tool matches the tile it is removed from the world and stored in the inventory.
Click an inventory item and then an empty tile to place it back. A Reset button restores
the original world.

- `index.html` - landing page with the rules and a tutorial
- `game.html` - the game (toolbar, world, inventory, reset button)
- `style.css` - all visuals; tile textures are CSS classes, states use classes like `.selected`
- `script.js` - all logic inside one `Game` object

| Tool | Removes |
|---|---|
| Axe | tree trunks, leaves |
| Pickaxe | rock |
| Shovel | dirt, grass |

Extras: full inventory with counts per tile type, fade in/out animations, responsive layout.

## What I found hard
_(Write this in your own words - e.g. keeping the world array and the DOM in sync, deciding how
inventory selection interacts with tool selection, CSS grid sizing.)_

## Known bugs
- Tiles can be placed in mid-air (any empty sky tile), so floating blocks are possible.
- The world size is fixed (20x12).

## Assignment review
_(Write your honest reflection here.)_

## Live demo
_(Add your GitHub Pages link here after enabling Pages.)_
