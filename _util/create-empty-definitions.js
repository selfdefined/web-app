import slugify from 'slugify';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

import { words } from './undefined-words';
const defintionPath = path.resolve(process.cwd(), '11ty/definitions/');

const template = `
---
title: {{title}}
slug: {{slug}}
defined: false
---
`;

export function createDefinitions() {
  return words.forEach(async (word) => {
    const title = word;
    const slug = slugify(
      word.toLowerCase().replace(/ \([a-z]+\)| ([a-z-]+) slur/i, '')
    );

    const content = template
      .replace('{{title}}', title)
      .replace('{{slug}}', slug)
      .trim();

    try {
      await writeFile(`${defintionPath}/${slug}.md`, content, 'utf8');
    } catch (e) {
      console.error(e);

      process.exit(1);
    }

    return true;
  });
}
