---
title: Development & Build
parent:
  title: Documentation
  href: '/documentation'
---

This guide will walk you through the process of setting up your computer so that you can run Self-Defined locally.

## Pre-requisites

Whether you'd like to contribute a definition, or

To contribute to Self-Defined, you should be familiar with local development tools such as Git and the terminal, and comfortable working in a text editor such as Visual Studio Code, Sublime, or Atom. Additionally, you'll need to a GitHub account to submit your changes to us for review.

We're working on making it possible to contribute definitions to Self-Defined without the need for developer tooling! Stay tuned!

If you'd like some help getting your local development environment set up, check out our TBD_LINK_TO_SETUP_GUIDE. Otherwise, you can continue to the next section.

## About the project

We're using [Eleventy](https://www.11ty.io/) to generate Self-Defined website, and Parcel to bundle our modules.

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

This will start Eleventy's development server and watch all the project's files for changes. Once the startup process completes, you your terminal will show you the local URL where Self-Defined is running. We default to [http://localhost:8080](http://localhost:8080).

### Eleventy Config

Configuration for Eleventy (e.g. filters and collections) are defined in `.eleventy.js`.

## Build

To build the production site run

```bash
npm run build
```

This will generate a minified CSS bundle as well as run Eleventy’s production build. Build files are located in `dist`.
