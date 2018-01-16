# Changelog for the Romanesco Soil root installation

## Romanesco Soil v1.1.0
Released on January 16, 2018

- [Configuration] Add settings to change styling theme
- [Configuration] Reorganize and evaluate existing settings
- [MODX] Add separate media source for theme images

## Romanesco Soil v1.0.0
Released on August 15, 2017

- [Git] Move core elements to different repository
- [Git] Move Semantic UI theme to different repository

Romanesco Soil should now be considered a boilerplate installation only.

The Gitify data files that contain the core elements have moved to a separate
repository. This way, project updates don't need to be rebased anymore on top of
Romanesco updates. The default system and config settings are still included,
because they only need to be set once on installation. Same for SUI theme.

## Romanesco Soil v0.3.1
Released on July 25, 2017

> Patterns: 0.11.1-pl
> Backyard: 0.4.0-pl

- [Global] Add ability to use SVGs as global backgrounds
- [Global] Change secondary color to purple
- [ContentBlocks] Add CB field for displaying map with marker
- [ContentBlocks] Fix pThumb errors when SVGs were used in Image CBs [#82]
- [FormBlocks] Add ability to use your own elements as checkbox or radio buttons
- [FormBlocks] Add ability to use alternate value for a field option in HTML
- [FormBlocks] Add ability to choose help text position (above or below input)
- [FormBlocks] Add ability to force fieldset to always display as segment
- [StatusGrid] Check if longtitle and description are set (and show value in tooltip)
- [StatusGrid] Edit resources directly by clicking on ID
- [Gitify] Add svgSanitizer package as dependency

## Romanesco Soil v0.3.0
Released on April 20, 2017

> Patterns: 0.11.0-pl
> Backyard: 0.3.2-pl

- [ContentBlocks] Add layout + field for wrapping content in SUI segments
- [ContentBlocks] Add styling options and custom bullet icon to List CB
- [ContentBlocks] Add icon size and de-emphasize options to Icon SVG
- [FormBlocks] Combine Select Dropdown and Select Options CBs
- [FormBlocks] Add multiple file upload field
- [FormBlocks] Fix broken options inside (deprecated) Select Dropdown [#109]
- [SemanticUI] Add styling for HeaderVertical submenus
- [SemanticUI] Improve fix for incorrect column margins on mobile
- [SemanticUI] Set containers to fluid on mobile, so segments snap to edges
- [SemanticUI] Fix styling / positioning glitches when submenu is sticky
- [SemanticUI] Reset fieldset / legend styling and add small improvements
- [SemanticUI] Reduce size of CSS and JS assets
- [SemanticUI] Update framework to 2.2.10
- [MODX] Add missing menu item for clearing custom cache [#108]
- [MODX] Add buttons for clearing individual custom cache partitions
- [MODX] Fix custom cache button not firing the second time around
- [Configuration] Add Performance tab with various image rendering controls
- [Configuration] Add Instagram and Pinterest fields to Social tab

## Romanesco Soil v0.2.0
Released on February 22, 2017

- Add HeaderVertical template
- Various improvements to layout and styling

## Romanesco Soil v0.1.0
Released on January 26, 2017

First official (versioned) release