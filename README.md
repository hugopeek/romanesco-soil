# What is Romanesco?

Romanesco is a collection of tools for prototyping and building websites. It integrates a front-end pattern library directly into a CMS ([MODX Revolution][1]).

It aims to combine various best practices like code reusability, iterative development, a content-first approach and modular, responsive content editing into 1 coherent ecosystem.

For more information, visit: https://romanesco.info/

## Project structure

Romanesco is spread out across a few repositories:

- **Romanesco Soil** (this repository)  
A pre-configured MODX installation, as starting point for your project.
- **[Romanesco Patterns][11]**  
A pattern library to manage all reusable elements from a central repository.
- **[Romanesco Backyard][12]**  
A MODX package that links a few things together internally.
- **[Romanesco Data][10]**  
A Gitify extract for updating Soil and Pattern data per project.
- **[Romanesco Theme][13]**  
A custom styling theme for Fomantic UI<sup>1</sup>, the front-end framework used.
- **[Romanesco Seed][14]**  
A command line installer for all these moving parts, to preserve your sanity.

The elements in the pattern library are (loosely) structured according to the atomic design principles, as first outlined by Brad Frost. If you're not familiar with this concept, I suggest you [read up on that first][7]. It's incredibly useful.

Romanesco differs from the original PatternLab in 2 distinct ways:

- It is already integrated with a CMS ([MODX Revolution][1])
- It already provides the frontend assets ([Fomantic UI][8]<sup>1</sup>)

>This means that when you are done installing Romanesco, you have a working website. With CMS and decent styling.

The only thing you need in order to publish your site is fresh content. Well no, that's not entirely true:

## Paid software alert

**If you want to publish your project to a live domain, you'll need a license for [ContentBlocks][3] and [Redactor][4].** These are commercial extras for MODX, developed and maintained by ModMore.

ContentBlocks adds an intuitive and flexible drag&drop interface between MODX and the actual HTML of the page, making it a lot easier to manage responsive content. In fact, I wouldn't even bother building websites anymore without ContentBlocks, so I consider it an essential part of Romanesco.

Redactor is the rich text editor that's available inside the blocks and all throughout MODX. In theory, you could replace this by a free editor like TinyMCE, but Redactor has proven to be a rock solid product over the past many years. ModMore support is also top-notch, so I have no issues paying for it.

A single ContentBlocks license is &euro;79 and for Redactor, that's &euro;25. And the people at ModMore are very considerate: you can try their extras for [free during development][5].

So: *publishing* your project will require you to purchase a license, but getting started with Romanesco is still free at this point. If you're OK with that, then let's move on!

## Installation

Romanesco is not exactly a plug and play environment. Many moving parts means it requires a fair bit of configuration (and patience) to get it up and running.

For the persistent and the brave: [start your journey here][6].

>For everybody else, there's now a command line installer that automates a large portion of this process: [Romanesco Seed][14].
> 
## Yeah, but... What is _a_ Romanesco?

The real romanesco is a curious crossover between a broccoli and a cauliflower. Its flowers are shaped by self-repeating mathematical patterns, forming a mesmerizing collection of green fractals, spiraling up and multiplying in perfect resonance with Fibonacci's golden ratio. The result is a vegetable that looks almost too stunning to be eaten!

![Fractal Broccoli](https://upload.wikimedia.org/wikipedia/commons/4/4f/Fractal_Broccoli.jpg)

_<sup>1</sup> Romanesco switched to [Fomantic UI][8], a community fork of the Semantic UI project._

[1]: https://modx.com/get-modx/
[2]: https://semantic-ui.com/
[3]: https://modmore.com/contentblocks/
[4]: https://modmore.com/redactor/
[5]: https://modmore.com/free-development-licenses/
[6]: https://notes.romanesco.info/backend-installation
[7]: https://patternlab.io
[8]: https://fomantic-ui.com/
[10]: https://github.com/hugopeek/romanesco-data
[11]: https://github.com/hugopeek/romanesco-patterns
[12]: https://github.com/hugopeek/romanesco-backyard
[13]: https://github.com/hugopeek/romanesco-theme
[14]: https://github.com/hugopeek/romanesco-seed
