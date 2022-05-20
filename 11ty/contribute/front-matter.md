---
title: Front Matter
parent:
  title: Contribute
  href: '/contribute'
---

We use Front Matter for a range of things. Of course, we provide basic information through it. But also more advanced stuff (technical term) such as sub terms for items in the table of content or further reading links for the definition.

This page will tell you all you need to know.

Note: We also maintain a list of annotated, complete example definitions, which you can grab and go. They are listed on the [Examples documentation page](/contribute/examples).

## Title

| Key   | Type   | required |
| ----- | ------ | -------- |
| title | String | true     |

The complete title of a definition.

### Example

```yaml
title: Obsessive Compulsive Disorder (OCD)
```

## Slug

| Key  | Type   | required |
| ---- | ------ | -------- |
| slug | String | true     |

A link-friendly version of the title.

### Example

```yaml
slug: obsessive-compulsive-disorder
```

## Defined

| Key     | Type    | required |
| ------- | ------- | -------- |
| defined | Boolean | true     |

Whether or not the definition of this word is finished and should be displayed publicly.

### Example

```yaml
defined: true
```

## Excerpt

| Key     | Type   | required |
| ------- | ------ | -------- |
| excerpt | String | true     |

An abbreviated version of the definition that will appear in social media previews. In the social preview, the excerpt will be prefaced with the flag level.

### Example

```yaml
excerpt: This is the short version of the definition that will appear in social previews.
```

## Speech

| Key    | Type   | required |
| ------ | ------ | -------- |
| speech | String | true     |

The type of word. E.g. a noun or an adjective

Note: If it is an adjective please use the abbreviation “adj”.

### Example

```yaml
speech: noun
```

## Skip in Table of Content

| Key                      | Type    | required |
| ------------------------ | ------- | -------- |
| skip_in_table_of_content | Boolean | false    |

If set to true, the word will not be shown in the table of content. This is helpful for words such as «fatphobia» that are linked as [sub terms](#sub-terms) of «Fat» and «-phobia». Can be omitted, if not `true`.

### Example

```yaml
skip_in_table_of_content: false
```

## Flag

| Key  | Type   | required |
| ---- | ------ | -------- |
| flag | Object | false    |

A word is an ableist slur? Or a better alternative for another word? That’s what flags are for. Flags are a bit more involved. Let’s take a deeper look at them.

Flags _can_ consist of these properties:

- `level`: Either `avoid`, `tool` or `better-alternative`. Used to render the icon.
- `text`: Additional info about the flag. E.g. “Tool of Oppression” or “Racist Slur”.
- `for`: Only applicable if `level` is `better-alternative`. Title of the word that should be replaced with the current word. [Note: Currently discarded during rendering.]

Let’s take a look at some examples.

### Examples

Items that have a flag level of `avoid` will be marked in the table of content. We could structure it as follows:

```yaml
flag:
  level: avoid
  text: 'Racist Symbol'
```

A level of `tool` designates words that are used, as an example, to facilitate white supremacy. These words are not flagged in the table of content. Let’s take a look:

```yaml
flag:
  level: tool
  text: 'White Supremacy Tool'
```

And finally we have the words that are more suitable then others.

```yaml
flag:
  level: 'better-alternative'
  for: 'minorities'
```

Note: For is currently not used but might be implemented in a future version.

## Further Reading

| Key     | Type | required |
| ------- | ---- | -------- |
| reading | List | false    |

Provides a list of helpful links to further information about the discussed word. These links _must_ be objects with the keys `text` and `href`.

### Example

```yaml
reading:
  - text: Minority vs minoritze
    href: https://www.theodysseyonline.com/minority-vs-minoritize
```

## Alternative Words

| Key       | Type | required |
| --------- | ---- | -------- |
| alt_words | List | false    |

Adds a list of words that might be used instead of the described one. If a word in the list is defined it will automatically be linked.

### Example

```yaml
alt_words:
  - conscientious
  - exact
  - fastidious
  - fussy
  - meticulous
  - nitpicky
  - particular
  - precise
  - quirky
  - thorough
```

## Sub Terms

| Key       | Type | required |
| --------- | ---- | -------- |
| sub_terms | List | false    |

Provides a list of helpful links to further information about the discussed word. These links _must_ be objects with the keys `text` and `full_title`. If a `full_title` is found in the list of the defined words, the item is automatically linked to this word.

In the following example the words «Fatphobia» or «Fat Shaming» will be linked if these are the [title](#title) of another definition. For these words [Skip in Table of Content](#skip-in-table-of-content) might be set to `true`.

### Example

```yaml
sub_terms:
  - text: -phobia
    full_title: Fatphobia
  - text: Shaming
    full_title: Fat Shaming
  - text: Activism
    full_title: Fat Activism
  - text: Liberation
    full_title: Fat Liberation
```
