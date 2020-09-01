import test from 'ava';

import tableOfContentFlag from '../tableOfContentFlag';

const definedWordWithAvoidFlag = {
  title: '👌 [ok-hand]',
  slug: 'ok-hand',
  flag: { text: 'Racist Symbol', level: 'avoid' },
  defined: true
};

const definedWordWithAvoidFlagNoText = {
  title: 'dude',
  slug: 'dude',
  defined: true,
  flag: { level: 'avoid' }
};

const definedWordWithWarningFlag = {
  title: 'Ableism',
  slug: 'ableism',
  defined: true,
  speech: 'noun',
  flag: { level: 'warning', text: 'content warning' }
};

const definedWordWithToolFlag = {
  title: 'Gaslighting',
  slug: 'gaslighting',
  defined: true,
  speech: 'noun',
  flag: { level: 'tool', text: 'Tool of Oppression' }
};

const definedWordWithAlternativeFlag = {
  title: 'overrepresented majority (ORM)',
  slug: 'overrepresented-majority',
  defined: true,
  speech: 'noun',
  flag: {
    level: 'better-alternative',
    ['alt-for']: 'underrepresented minority (URM)'
  }
};

const definedWordWithoutFlag = {
  title: 'Transfeminine',
  slug: 'transfeminine',
  speech: 'adj',
  defined: true,
  excerpt:
    'describes a [transgender](/definitions/transgender) person for whom femininity forms part of their gender.'
};

const undefinedWordWithFlag = {
  title: 'Psychopath',
  slug: 'psychopath',
  flag: { text: 'Ableist Slur', level: 'avoid' },
  defined: false
};

test('Does not render a flag if none is given', (t) => {
  t.is(tableOfContentFlag(definedWordWithoutFlag), '');
});

test('Does not render a flag if the word is undefined', (t) => {
  t.is(tableOfContentFlag(undefinedWordWithFlag), '');
});

test('Does not render a flag if the level is `tool`', (t) => {
  t.is(tableOfContentFlag(definedWordWithToolFlag), '');
});

test('Does not render a flag if the level is `better-alternative`', (t) => {
  t.is(tableOfContentFlag(definedWordWithAlternativeFlag), '');
});

test('Does not render a flag if the level is `avoid` but no text is given', (t) => {
  t.is(tableOfContentFlag(definedWordWithAvoidFlagNoText), '');
});

test('Does render an avoid flag if one is given', (t) => {
  t.is(
    tableOfContentFlag(definedWordWithAvoidFlag),
    `<span class="flag flag--red">${definedWordWithAvoidFlag.flag.text}</span>`
  );
});

test('Does render a warning flag if one is given', (t) => {
  t.is(
    tableOfContentFlag(definedWordWithWarningFlag),
    `<span class="flag flag--yellow">${definedWordWithWarningFlag.flag.text}</span>`
  );
});
