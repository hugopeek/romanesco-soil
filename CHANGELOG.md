# Changelog for the Romanesco Soil root installation

These changes only affect new installations. For changes that are applied on
every Romanesco update, check the data extract [changelog](_romanesco/CHANGELOG.md).

## Romanesco Soil v2.6.1
Released on ...

> Patterns: 1.0.0-beta13  
> Backyard: 1.0.0-beta17

- Exclude additional components from main dist files
  - Checkbox
  - Dropdown
  - Embed
  - Popup
  - Rating
  - Tab
  - Feed

## Romanesco Soil v2.6.0
Released on October 8, 2023

> Patterns: 1.0.0-beta13  
> Backyard: 1.0.0-beta16

- Add media sources for Videos and Notes
- Rename alternative_tracking_code setting to analytics_tracking_code
- Tweak functionality for hiding advanced features
- Update Fomantic UI to 2.9.3
- Upgrade MODX to 2.8.6-pl

## Romanesco Soil v2.5.4
Released on April 8, 2023

> Patterns: 1.0.0-beta12  
> Backyard: 1.0.0-beta15

- Update Fomantic UI to 2.9.3 nightly
- Add custom theme.less to avoid breaking variable inheritance in FUI 2.9.3
- Add standalone script to remove unused themes
- Upgrade MODX to 2.8.5-pl
- Require minimum YAML version of 5.4

## Romanesco Soil v2.5.3
Released on October 28, 2022

> Patterns: 1.0.0-beta10  
> Backyard: 1.0.0-beta10

- Remove CDN urls for Leaflet assets
- Update Fomantic to 2.9.0

## Romanesco Soil v2.5.2
Released on May 26, 2022

> Patterns: 1.0.0-beta9  
> Backyard: 1.0.0-beta9

- Remove system settings for Twitter keys
- Add / tweak Configuration settings for sidebar and submenu
- Update Leaflet to 1.8.0

## Romanesco Soil v2.5.1
Released on November 19, 2021

> Patterns: 1.0.0-beta8  
> Backyard: 1.0.0-beta8

- Set default media source for ContentBlocks one level higher
- Optimize distribution of breakpoint values for responsive images
- Add option to collect manager feedback directly from editors browser

## Romanesco Soil v2.5.0
Released on October 21, 2021

> Patterns: 1.0.0-beta7  
> Backyard: 1.0.0-beta7

- Update Fomantic UI to 2.8.8
- Remove navbar_sticky_offset config setting
- Rename matomo_tracking_code setting to alternative_tracking_code
- Move Leaflet asset paths and integrity hashes to system settings
- Move img_breakpoints to system settings
- Add pThumb post-hook to system settings (customization in pThumb core)
- Add img_quality as system setting too (baseline for optional post-processing)
- Add minimum option of 30 to img_quality config setting
- Add Configuration settings for inverted logo and badge variants

## Romanesco Soil v2.4.5
Released on August 30, 2021

> Patterns: 1.0.0-beta6  
> Backyard: 1.0.0-beta6

- Load default Google font with new v2 syntax
- Rename some media sources for clarity
- Add media source for static Romanesco elements
- Change CB settings for file upload path, file template path and img crop path

## Romanesco Soil v2.4.4
Released on June 10, 2021

> Patterns: 1.0.0-beta5  
> Backyard: 1.0.0-beta5

- Update MODX to 2.8.3-pl
- Update Fomantic UI to 2.8.7
- Remove NPM dev dependencies (assets are now built from Nursery)

## Romanesco Soil v2.4.3
Released on April 19, 2021

> Patterns: 1.0.0-beta4  
> Backyard: 1.0.0-beta4

- Better description for custom cache setting
- Remove unused css_breakpoints Configuration setting
- Add cache_buster Configuration setting
- Rename navbar_resources Configuration setting to nav_exclude_resources

## Romanesco Soil v2.4.2
Released on February 20, 2021

> Patterns: 1.0.0-beta3  
> Backyard: 1.0.0-beta3

- Rename content_types folder to content_type in defaults data
- Add settings for displaying a (customized) credits popup in footer
- Add content types for MS Word and Excel files
- Move collections_settings table to defaults

## Romanesco Soil v2.4.1
Released on November 3, 2020

> Patterns: 1.0.0-beta2  
> Backyard: 1.0.0-beta2

- Use Matomo by inserting full tracking code directly
- Add setting to share critical CSS amongst templates
- Add setting to exclude templates from critical CSS
- Update Fomantic UI to 2.8.6

## Romanesco Soil v2.4.0
Released on August 27, 2020

> Patterns: 1.0.0-beta1  
> Backyard: 1.0.0-beta1

- Add configuration setting to switch critical CSS on or off
- Set baseUrlRelative to 0 for Icons media source (fixes icon preview in MODX)
- Add default fallback images in uploads folder
- Add overview fallback image fields for each aspect ratio

## Romanesco Soil v2.3.2
Released on July 1, 2020

> Patterns: 0.16.4-pl  
> Backyard: 0.11.4-pl

- Un-deprecate (yes!) favicon configuration settings
- Mark NPM packages included in Romanesco theme as dev dependencies
- Improve minification of Romanesco assets

## Romanesco Soil v2.3.1
Released on June 15, 2020

> Patterns: 0.16.3-pl  
> Backyard: 0.11.3-pl

- Update default styling
- Update NPM dependencies
- Add custom gulpfile.js to root folder
- Add scrolldir.js for displaying menu on mobile when scrolling up
- Use Semantic UI project theme for storing custom variables and overrides
- Use hyphen instead of underscore as separator in sanitized CB images

## Romanesco Soil v2.3.0
Released on April 27, 2020

> Patterns: 0.16.2-pl  
> Backyard: 0.11.1-pl

- Update MODX to v2.7.3
- Update Redactor to v3

## Romanesco Soil v2.3.0-rc1
Released on March 30, 2020

> Patterns: 0.16.0-pl  
> Backyard: 0.11.0-pl

- Generate step component CSS for manager preview
- Add new Fomantic UI components to theme.config
- Separate 'form', 'calendar', 'modal' and 'step' components from main CSS/JS
- Remove tablesort.js from romanesco/assets folder (already in romanesco/vendor)
- Remove all colors except primary and secondary from SUI theme
- Add WhatsApp setting to Configuration
- Remove Google+ setting from Configuration

Note: you can now remove the 'form', 'calendar', 'modal' and 'step' components
from semantic.json in existing projects. They are still generated as individual
components, but no longer added to semantic.css and semantic.js.

This relies on customizations in the Fomantic UI build process, which are
submitted as PR here: https://github.com/fomantic/Fomantic-UI/pull/1385

## Romanesco Soil v2.2.0
Released on March 7, 2020

> Patterns: 0.15.2-pl  
> Backyard: 0.10.2-pl

- Move media sources to defaults

## Romanesco Soil v2.1.1
Released on January 29, 2020

> Patterns: 0.15.1-pl  
> Backyard: 0.10.2-pl

- Switch to SwiperJS in assets build process

## Romanesco Soil v2.1.0
Released on January 14, 2020

> Patterns: 0.15.0-pl  
> Backyard: 0.10.2-pl

- Improve Semantic UI build process and minify custom CSS/JS
- Various small tweaks and fixes, some new settings

## Romanesco Soil v2.0.0
Released on November 19, 2019

> Patterns: 0.14.6-pl  
> Backyard: 0.10.0-pl

- Upgrade MODX to 2.7.2

## Romanesco Soil v2.0.0-rc2
Released on October 10, 2019

> Patterns: 0.14.4-pl  
> Backyard: 0.9.2-pl

- Create separate folder for static elements
- Include custom lexicon entries in defaults
- Switch to Fomantic UI (community fork of Semantic UI)

## Romanesco Soil v2.0.0-rc1
Released on April 15, 2019

> Patterns: 0.14.2-pl  
> Backyard: 0.9.1-pl

- Upgrade MODX to 2.7.1
- Update Semantic UI to 2.4.2
- Add support for Google Gtag and Matomo analytics
- Leave locale empty by default

**NB: MODX 2.7 is now the minimum required version for every new install.**

## Romanesco Soil v1.4.1
Released on February 11, 2019

> Patterns: 0.14.1-pl  
> Backyard: 0.9.1-pl

- Add navbar_level setting under Configuration
- Add recaptcha and math question as anti-spam options to forms
- Point new registrations to an activation resource
- Update SUI assets

## Romanesco Soil v1.4.0
Released on November 15, 2018

> Patterns: 0.13.0-pl  
> Backyard: 0.7.0-pl

- Add Content Purpose tab to resources
- Improve Status tab
- Add SuperBoxSelect as dependency
- Update ContentBlocks to 1.8.2
- Update SimpleSearch to 2.0.2
- Remove Blockdown and SetInputOptions packages
- Include custom db tables in extract

## Romanesco Soil v1.3.2
Released on October 4, 2018

> Patterns: 0.12.3-pl  
> Backyard: 0.6.0-pl

- Create Content category under Configuration
- Add settings for footer content and visibility
- Load Collection renderers from Backyard assets folder
- Set input ID for File CB setting
- Fix incorrectly excluded page_id settings

## Romanesco Soil v1.3.1
Released on September 18, 2018

> Patterns: 0.12.2-pl  
> Backyard: 0.6.0-pl

- Update Semantic UI to 2.4.0

## Romanesco Soil v1.3.0
Released on July 27, 2018

> Patterns: 0.12.1-pl  
> Backyard: 0.6.0-pl

- Add field for client address under Configuration
- Add setting to define client type (Person or Organization)
- Add setting to define which social sharing options to display
- [CB/Redactor] Change paths to custom icons and CSS
- Change default field for new pages to Rich Text
- Change default email sender

## Romanesco Soil v1.2.0
Released on June 6, 2018

> Patterns: 0.12.0-pl  
> Backyard: 0.5.1-pl

- Use SUI theme override for comments

## Romanesco Soil v1.1.0
Released on January 16, 2018

> Patterns: 0.11.3-pl  
> Backyard: 0.5.1-pl

- Add settings to change styling theme
- Reorganize and evaluate existing settings
- Add separate media source for theme images
- Add content type for CSS variables
- Enable auto install option

NB: this version requires ClientConfig 2.0.0-rc1 or higher to function as intended.

## Romanesco Soil v1.0.0
Released on August 15, 2017

> Patterns: 0.11.1-pl  
> Backyard: 0.4.0-pl

- Move core elements to different repository
- Move Semantic UI theme to different repository

Romanesco Soil should now be considered a boilerplate installation only.

The Gitify data files that contain the core elements have moved to a separate
repository. This way, project updates don't need to be rebased anymore on top of
Romanesco updates. The default system and config settings are still included,
because they only need to be set once on installation. Same for SUI theme.

## Romanesco Soil v0.3.1
Released on July 25, 2017

> Patterns: 0.11.1-pl  
> Backyard: 0.4.0-pl

- Add ability to use SVGs as global backgrounds
- Change secondary color to purple
- Add CB field for displaying map with marker
- Fix pThumb errors when SVGs were used in Image CBs [#82]
- Add ability to use your own elements as checkbox or radio buttons
- Add ability to use alternate value for a field option in form HTML
- Add ability to choose help text position (above or below input) in forms
- Add ability to force form fieldset to always display as segment
- Check if longtitle and description are set in status grid (and show value in tooltip)
- Edit resources directly from status grid by clicking on ID
- Add svgSanitizer package as dependency

## Romanesco Soil v0.3.0
Released on April 20, 2017

> Patterns: 0.11.0-pl  
> Backyard: 0.3.2-pl

- Add layout + field for wrapping content in SUI segments
- Add styling options and custom bullet icon to List CB
- Add icon size and de-emphasize options to Icon SVG
- Combine Select Dropdown and Select Options CBs
- Add multiple file upload field to FormBlocks
- Fix broken options inside (deprecated) Select Dropdown [#109]
- Add styling for HeaderVertical submenus
- Improve fix for incorrect column margins on mobile
- Set containers to fluid on mobile, so segments snap to edges
- Fix styling / positioning glitches when submenu is sticky
- Reset fieldset / legend styling and add small improvements
- Reduce size of CSS and JS assets
- Update Semantic UI to 2.2.10
- Add missing menu item for clearing custom cache [#108]
- Add buttons for clearing individual custom cache partitions
- Fix custom cache button not firing the second time around
- Add Performance tab with various image rendering controls
- Add Instagram and Pinterest fields to Social tab

## Romanesco Soil v0.2.0
Released on February 22, 2017

- Add HeaderVertical template
- Various improvements to layout and styling

## Romanesco Soil v0.1.0
Released on January 26, 2017

First official (versioned) release