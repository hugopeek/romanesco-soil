# What is Romanesco?

Romanesco is an **experimental** collection of tools for prototyping and building websites. It integrates a front-end pattern library directly into a CMS. It aims to combine various best practices like code reusability, iterative development, a content-first approach and modular, responsive content editing into 1 coherent ecosystem.

Romanesco spans across of 3 main areas:

- **Romanesco Soil** (this repository)
A pre-configured base installation, to quickly get you started with each project.
- **Romanesco Patterns**
A pattern library to manage all reusable elements from a central repository.
- **Romanesco Backyard**
A project hub, to display (and experiment with) the pattern library on a separate subdomain.

The elements in the pattern library are structured according to the atomic design principles, as first outlined by Brad Frost. He does a  better job at explaining how those principles work than I ever could, so if you're not familiar with it yet, I suggest you [read up on that first](http://patternlab.io).

Romanesco differs from the original PatternLab however in 2 distinct ways:

- It is already integrated with a CMS: [MODX Revolution][1]
- It already provides the basic styling and HTML through [Semantic UI][2]

This means that when you are done installing Romanesco, the only thing you really need to publish your site is fresh content. Well no, that's not entirely true:

**Please note that if you want to publish your project to a live domain, you'll need a license for ContentBlocks.**
[ContentBlocks][3] is a commercial extra for MODX, which sells at &euro;79 for a single license (I'm not affiliated). It adds a powerful and flexible layer between the content editor and the actual code of the website, making it an essential part of Romanesco. Fortunately, the people at ModMore are very considerate: they'll let you try ContentBlocks for free in your development installation.

So *publishing* your project will require you to purchase a license, but getting started with Romanesco is still free. If you're OK with that notion, then let's move on!

## Whom is it for?

Indivual webdesigners, front-end developers, content editors, UX specialists, bloggers, marketeers, computer savvy business owners... But also digital agencies, companies, educational institutes, government bodies, NGOs or other types of organizations...

Anyone wanting to build their own website, or develops them for a living.

Yes, that is a *very* broad definition. But Romanesco is not a framework or pattern library alone, nor just a pre-configured CMS. It is an ecosystem; a way of building sites. One that differs from many of the currently practiced workflows. And thanks to the power of pattern libraries and ContentBlocks: one that scales remarkably well. You can use it with the defaults and quickly be on your way with publishing content, or you can turn it into a Git powered R&D lab and production facility, reusing patterns, fixing issues and developing new features for *all* your projects simultaneously as you go along.

## Disclaimer and warranty

Yes, those are big promises. And I'm in no way claiming that Romanesco is an answer to all your problems and global inequality. Again: it's an **experiment**. I've been working on it for over a year now and it feels like I'm only just scratching the surface. But does that mean Romanesco is not production ready yet? No. I'm using it in projects already and for the most part, it is stable. But you can't throw any design or UX problem at it just yet, and sometimes moving forward also means breaking things. I will try however, to draw some edges around the "safe zone" the best I can. There's an indicator in the front-end library for example, which informs you if a pattern is safe to use or not. I will also be working on adding more usage instructions and general guidelines over the next few months.

## Installation

Romanesco in its entirety is not a plug and play environment. It should be approached more like a journey. This also means it doesn't come with a magic button or single command for installing it on your server. 

To make it a little easier to get started, there are 2 varieties available of the installation procedure: basic and advanced.

### Basic installation

For the basic version, everything is packed in a zip file, which you will need to merge with an existing MODX installation. This is the easiest option, as it doesn't require Git or any complicated build tools. The most difficult thing you need to do is run an SQL query in your database in order to load all the Romanesco elements and settings.

There are a few limitations though when installing from the zip file:

- You cannot update Romanesco Soil anymore after installation. Your project and Romanesco will both go their separate ways. Your paths *diverge*. So by choosing the basic installation, you essentially choose to use Romanesco as a starter kit; a so called *boilerplate*.
- You cannot change the styling, other than by editing the CSS file directly. I'd strongly advice against that though and I promise you: learning how to work with the automated build process will be well worth the effort. But if that's not an option (yet), just send me an email with the colors (primary and secondary) and Google font you want to use and I'll run the build script for you with those.

What you'll need to get started:

- An operational web server (minimum PHP version: 5.4)
- The latest [MODX distribution][4]
- The Romanesco Starter Kit zip file
- Access to your database (to run an SQL query)
- A ModMore account and API key
- Patience and an open mind

Don't be scared of:

- Running that SQL query. You only have to find the right place to copy / paste the query, and it's a 1-time thing.
- Complicated build scripts, NPM modules or configuration files. Because there aren't any.
- Lack of technical skills. This will be a point and click adventure!

[Check the wiki for detailed instructions](https://github.com/hugopeek/romanesco-soil/wiki/Basic-installation)

### Advanced installation

But Romanesco can be more than that. Much more. That's where the advanced installation comes in. This installation uses Gitify to set things up and Git to keep track of changes. Gitify is a tool that turns your database-based MODX installation into a file-based ehh.. Bunch of files. The biggest advantage of that, is that it allows you to commit those files into a version control system (or VCS). By far the most widely used VCS in the world today is Git, and with good reason. Git does a very good job in maintaining an efficient and reliable version history of your project, without getting in your way too much by forcing you into a certain workflow. It also makes working on the same project with other people a lot easier, mainly because it can detect conflicting changes and help you merge them properly into a stable piece of software.

For a more in-depth explanation on the benefits of using Git and Gitify, and of how they work, check out the [Wielding Gitify](../Deployment/Wielding_Gitify.md) and [Git workflow](../Deployment/Git_workflow.md) sections. 

Working with Git also opens up the possibility to keep your installation up-to-date with the latest Romanesco release.

**What you'll need to get started:**

- An operational web server
	- minimum PHP version: 5.4
	- Composer
	- Git (preferrably > 2.0)
	- Gitify
	- Node.js (including NPM)
- SSH access to your server
- Access to your database (to run some SQL queries)
- A ModMore account and API key
- Basic knowledge of the command line
- Basic knowledge of MODX
- Patience and an open mind

**Don't be intimidated by:**

- The command line. As long as you know where to find it, you'll be ok.
- Git. As long as you know what a repository is and how to clone one, you'll be ok. You will learn the rest as you go along.
- Gitify. It is not as scary as you think. I will try my best to ease you into it and show you why it's absolutely worth investing your time and effort into learning how to operate this tool.

[Check the wiki for detailed instructions](https://github.com/hugopeek/romanesco-soil/wiki)

## Yeah, but.. What is *a* Romanesco?

In nature, the romanesco is a curious crossover between a broccoli and a cauliflower. It's flowers are shaped by repeating mathematical patterns, forming a mesmerizing collection of green fractals, spiraling up and multiplying in perfect resonance with Fibonacci's golden ratio. The result is a vegetable that looks almost too stunning to be eaten!