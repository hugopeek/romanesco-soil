# What is Romanesco?

Romanesco is a collection of tools for prototyping and building websites. It integrates a front-end pattern library directly into a CMS ([MODX Revolution][1]).

It aims to combine various best practices like code reusability, iterative development, a content-first approach and modular, responsive content editing into 1 coherent ecosystem.

For more information, visit: https://romanesco.info/

## Project structure

Romanesco currently spans no less than 5 repositories:

- **Romanesco Soil** (this repository)  
A pre-configured boilerplate installation.
- **[Romanesco Data][10]**  
A separate repository containing a Gitify data extract, which can be updated per project.
- **[Romanesco Patterns][11]**  
A pattern library to manage all reusable elements from a central repository.
- **[Romanesco Backyard][12]**  
A MODX package that performs a few internal connections on installation.
- **[Romanesco Theme][13]**  
A custom styling theme for Semantic UI<sup>1</sup>, the front-end framework used.

The elements in the pattern library are structured according to the atomic design principles, as first outlined by Brad Frost. He does a better job at explaining how those principles work than I ever could, so if you're not familiar with it yet, I suggest you [read up on that first][7].

Romanesco differs from the original PatternLab in 2 distinct ways:

- It is already integrated with a CMS ([MODX Revolution][1])
- It already provides the basic styling ([Fomantic UI][14]<sup>1</sup>)

This means that when you are done installing Romanesco, the only thing you really need in order to publish your site is fresh content. Well no, that's not entirely true:

**If you want to publish your project to a live domain, you'll need a license for [ContentBlocks][3] and [Redactor][4].**  
Both are commercial extras for MODX, which sell at respectively &euro;79 and &euro;25 for a single license (I'm not affiliated). ContentBlocks adds a powerful and flexible layer between the content editor (Redactor) and the actual code of the website, making it an essential part of Romanesco. Fortunately, the people at ModMore are very considerate: they'll let you try their extras for free during development.

So: *publishing* your project will require you to purchase a license, but getting started with Romanesco is still free. If you're OK with that, then let's move on!

## Installation

Romanesco is not exactly a plug and play environment. Many moving parts means it doesn't come with a magic button or single command for installing it on your server. 

For the persistent and the brave: [start your journey here][5].

>I'm planning to integrate an automated installer to make this step a little easier. It's currently closed source, because it's still coupled to our own infrastructure. **Please send me a message if you want to help out with this!**

## Yeah, but.. What is *a* Romanesco?

In nature, the romanesco is a curious crossover between a broccoli and a cauliflower. Its flowers are shaped by repeating mathematical patterns, forming a mesmerizing collection of green fractals, spiraling up and multiplying in perfect resonance with Fibonacci's golden ratio. The result is a vegetable that looks almost too stunning to be eaten!

![Fractal Broccoli](https://upload.wikimedia.org/wikipedia/commons/4/4f/Fractal_Broccoli.jpg)

_<sup>1</sup> Romanesco switched to Fomantic UI, a community fork of the Semantic UI project._

[1]: https://modx.com/get-modx/
[2]: https://semantic-ui.com/
[3]: https://www.modmore.com/contentblocks/
[4]: https://www.modmore.com/redactor/
[5]: https://notes.romanesco.info/deployment/installation-backend
[7]: https://patternlab.io
[10]: https://github.com/hugopeek/romanesco-data
[11]: https://github.com/hugopeek/romanesco-patterns
[12]: https://github.com/hugopeek/romanesco-backyard
[13]: https://github.com/hugopeek/romanesco-theme
[14]: https://fomantic-ui.com/
