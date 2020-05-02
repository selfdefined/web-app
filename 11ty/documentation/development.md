---
title: Development & Build
parent:
  title: Documentation
  href: '/documentation'
---

This guide will walk you through the process of setting up your computer so that you can run Self-Defined locally.

## Pre-requisites

To contribute to Self-Defined, you should be familiar with local development tools such as Git and the terminal, and comfortable working in a text editor such as Visual Studio Code, Sublime, or Atom. Additionally, you'll need to a GitHub account to submit your changes to us for review.

We're working on making it possible to contribute definitions to Self-Defined without the need for developer tooling! Stay tuned!

## Installing Self-Defined

In your terminal, run the following command:

```bash
npm install
```

This will install everything you need to run Self-Defined locally.

## Starting the development server

In your terminal, run the following command:

```bash
npm run serve
```

This will start a local development server. Once the startup process completes, you your terminal will show you the local URL that you can visit to view Self-Defined in your browser. We default to [http://localhost:8080](http://localhost:8080).

The `serve` script watches your files for changes and then refreshes your browser. Try `assets/css/abstracts/_variables.scss` and changing a color variable defined there. You'll see your new color as soon as you save!

## About the project

We're using [Eleventy](https://www.11ty.io/), a static site generator, to generate the files that make up the Self-Defined website, and [Syntactically Awesome Stylesheets (SASS)](https://sass-lang.com) to write our CSS. You're welcome to make contributions to any part of this code base. If you're not sure where to begin, check out [our issues on GitHub](https://github.com/tatianamac/selfdefined/issues)! If you're having trouble, feel free to open an issue!

Static site generators like Eleventy rely on something called _front matter_. front matter makes it such that all of the content can be written in Markdown then built into the static HTML and CSS. Here's how we structured our [front matter](/documentation/front-matter/).
