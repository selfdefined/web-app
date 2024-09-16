# Contributing Guidelines

Hi! Nice to have you with us. This guide will walk you through the steps you have to take if you want to contribute a word or some code to the project. Let’s go.

## Before You Start

The contribution process currently relies on some knowledge of working with Github and writing in Markdown. We understand that this creates a barrier to entry for folks who haven't worked with either of those before. Long term, we hope to provide a solution that can minimise these sorts of barriers.

We also want to encourage you to dive into Github and Markdown even if you haven't before. We've collected a list of useful links that may help you understand both Github and Markdown:

- [Chaser Pettit's introduction to the GitHub workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)
- [Basic Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
- [Good First Issues](https://github.com/tatianamac/selfdefined/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22good+first+issue%22+)

Please remember that the contributing team is always here to [help](#get-help). No question is "too simple" or "too easy". We'd rather you ask, as someone else might want to know, too!

Below we describe two ways for you to get started: through [issues](#version-1-issues) or [pull requests](#version-2-pull-requests).

---
**Note:** We also have [documentation](https://www.selfdefined.app/documentation/) that covers development and build processes, provides examples, frequently asked questions, and describes front matter configurations.

---

## Contributing Words

### Version 1: Issues

If you know a word that should be defined, but—for whatever reason—don’t feel confident writing the definition yourself (or maybe you disagree with an existing definition), please [open an issue](https://github.com/tatianamac/selfdefined/issues/new). We can then collectively figure out how to best get this word defined.

An issue might also be appropriate if you are unsure about some nuances of a definition you want to define. By opening an issue you start a conversation, and that is always a good thing!

If you are new to Github and feel unsure about what an issue should look like, see examples of a [good first issue](https://github.com/tatianamac/selfdefined/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22good+first+issue%22+).

### Version 2: Pull Requests

You got a definition and want to define it. That’s awesome. Let’s go. Currently, you need to fork this repository and open a pull request (PR) out of your fork. If that sounds like gibberish to you, Chaser Pettit wrote a [great introduction to the workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

#### Working on Words

After you’ve forked the repo, you will need to write a definition. Good times. Hopefully.

Always remember that if you are unsure, you can first open an issue or create a PR with «WIP» in the title («WIP» stands for «work in progress») and ask for early feedback. For example, it might be called *«\[WIP\] Propose definition for spirit animal»*.

For this tutorial we will take the word «Obsessive Compulsive Disorder», as it allows us to show some of the features.

- Step 1: Create a file named `word.md` in the [definitions folder](11ty/definitions/) where we store all definitions.

  Replace `word` with the word or the phrase you are defining. Write it in all-lowercase letters with hyphens instead of spaces.

  In our example, we would create the file named `obsessive-compulsive-disorder.md` (as it is already defined, you can have a look at the [finished definition of «Obsessive Compulsive Disorder»](11ty/definitions/obsessive-compulsive-disorder.md)).

- Step 2: Populate the file you created.

  All definitions consist of two parts: **front matter** and **content**. Front Matter is a technical bubble for some structured data about your content. On our website you can find the [complete documentation on Front Matter](https://www.selfdefined.app/documentation/front-matter/). Here’s a quick run down:

  Every definition _needs_ to have the following meta information: `title`, `slug`, `defined`, and `speech`. Let's discuss what each of these mean:

  - `title` is a word or a phrase you are defining. In this example it's «Obsessive Compulsive Disorder».

  - `slug` is a string that we'll use to link to this word. It should be a URL-friendly, all-lowercase hyphenated version of the full title. In our example it's `obsessive-compulsive-disorder`.

  - `defined` flag can either be `true` or `false`. As soon as you set it to `true`, your definition will be visible on our website.

  - `speech` stores information about the word's part of speech. What kind of word you are defining? A noun? Or an adjective? That’s what `speech` is for. In our example it is a `noun`.

  This leaves us with the following front matter:

  ```yaml
  ---
  title: Obsessive Compulsive Disorder (OCD)
  slug: obsessive-compulsive-disorder
  defined: true
  speech: noun
  ---

  ```

[The finished definition of «Obsessive Compulsive Disorder»](11ty/definitions/obsessive-compulsive-disorder.md) has some more content. We encourage you to take a look around, add things to the file with your word's definition, and see what happens on the page.

#### Pre-Made File Examples

We have created some examples that you can use as the baseline for your work. Take a look at the [File Examples](https://www.selfdefined.app/documentation/examples/) section of our documentation.

**Related:** [When should I open an issue versus a pull request (PR)?](https://www.selfdefined.app/documentation/frequently-asked-questions/#when-should-i-open-an-issue-versus-a-pull-request)

## Contributing Code

### Online one-click setup for code contributions

You can use Gitpod (an online Open Source VS Code like IDE which is free for Open Source) for contributing to the code online, with a single click it will launch a workspace and automatically:

- clone the self-defined repo.
- install the dependencies.
- start `npm run serve`.

so that you can start straight away.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

## Get Help

If you've already tried reading through our [documentation](https://www.selfdefined.app/documentation/) and are stuck, we're here to help and ask your questions:

- Join our [Discord community](https://selfdefined.app/discord).
- Reach out to [@SelfDefinedApp](https://www.twitter.com/selfdefinedapp) on Twitter.
- File an [issue](https://github.com/tatianamac/selfdefined/issues/new) if you think our docs are missing some information that might be helpful.
- Contact <selfdefined@tatianamac.com>.
