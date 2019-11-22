---
title: Development & Build
parent:
  title: Documentation
  href: '/documentation'
---

This guide will walk you through the current state of the development config. Things get a bit technical here. 🤖

All file names, except stated differently, are relative to the project root.

We are using [Eleventy](https://www.11ty.io/) to generate the site based on the given definitions. As a module bundle we use Parcel.

## Setup

You will need to have Node and Git installed on your machine. To start developing please create a fork of the root repository.

Afterwards, install the dependencies.

```bash
npm install
```

That’s it, actually.

## Development Mode

To start the dev server run this command:

```bash
npm run serve
```

This will start Eleventy’s development server and watch the CSS entry point for changes. The output in the console will show the local URL to use.

### Eleventy Config

Configuration for Eleventy (e.g. filters and collections) are defined in `.eleventy.js`.

## Build

To build the production site run

```bash
npm run build
```

This will generate a minified CSS bundle as well as run Eleventy’s production build. Build files are located in `dist`.
