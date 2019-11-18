# Contributing Guidelines

Hi! Nice to have you with us. This file will walk you through the steps you need to take if you want to contribute a word or some code to the project. Let’s go.

Actually – before we start – a quick word of caution: Unfortunately the contribution process involves some technical knowledge. We aware that this poses a problem for most people and are discussing how a more inclusive contribution process could look like.

## Contributing Words

### Version 1: Issues

If you know a word that should be defined, but – for whatever reason – don’t feel confident writing the definition yourself (or maybe you disagree with an existing defintion), please open an issue. We can then collectively figure out how to best get this word defined.

An issue might also be appropriate if you are unsure about some nuances of a definition you want to define.

### Version 2: Pull Requests

You got a definition and want to define it. That’s awesome. Let’s go. Currently you need to fork this repository and open a PR out of your fork. If that sounds like gibberish to you, Chaser Pettit wrote a [great introduction to the workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

#### Working on Words

After you’ve forked the repo, you will need to write a definition. Good times. Hopefully. Always remember, if you are unsure you can first open an issue or create a PR, include «WIP» in the title and ask for early feedback.

All definitions are stored in the [definitions folder](11ty/definitions/). Create a file named `word.md` in it. `word` should be the name of the word you are defining. Not `word`. Except you are defining «word». In this case it should be `word`. For this tutorial I will take the word «Obsessive Compulsive Disorder», as it allows me to show some of the feature. That means I would create the file `obsessive-compulsive-disorder.md` (as it is a defined word, you can have a look at [the finished definition](11ty/definitions/obsessive-compulsive-disorder.md)).

All definitions consist of two parts: Front Matter and content. Front Matter is technical bubble for some structured data about your content. [You can find the complete documentation on our website](https://www.selfdefined.app/documentation/front-matter/). Here’s a quick run down:

Every definition _needs_ to have a `title`. In my case «Obsessive Compulsive Disorder». And a slug. That’s the string we need to link somewhere. And it needs a `slug`. A slug is URL friendly, hyphenated version of the title. In my case: `obsessive-compulsive-disorder`. The third required item is the `defined` flag. This is either `true` or `false`. As soon as you set it to `true` your definition will be visible. Finally we need to what kind of word your word. A noun? Or adjective? That’s what `speech` is for. In my example it is a noun.

This leaves us with the following front matter:

```yaml
---
title: Obsessive Compulsive Disorder (OCD)
slug: obsessive-compulsive-disorder
defined: true
speech: noun
---

```

[The finished definition](11ty/definitions/obsessive-compulsive-disorder.md) has some more content. I encourage you to take a look around, add things to your word and see what happens on the page.

#### Pre-Made File Examples

We have created some examples, which you can take as the baseline for your work. Take a look at the [File Examples section of our documentation](https://www.selfdefined.app/documentation/examples/).
