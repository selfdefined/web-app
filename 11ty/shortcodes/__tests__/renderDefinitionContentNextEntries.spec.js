import test from 'ava';

import testCollection from '../../../_util/_mocks/testCollection.json';

import renderDefinitionContentNextEntries from '../renderDefinitionContentNextEntries';

test('first item', (t) => {
  const { title, slug } = testCollection[0].data;

  t.is(
    renderDefinitionContentNextEntries(title, slug, testCollection),
    `<section class="definition-navigation definition__further-definitions_nav" aria-label="Browse definitions">
    <h2 class="visually-hidden">Browse</h2>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-previous">Previous words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-previous">
        </nav>
    </div>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-next">Next words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-next"><ul class="definition-navigation__list"><li><a href=/definitions/ableism/>Ableism</a></li><li><a href=/definitions/barbaric/>Barbaric</a></li><li><a href=/definitions/biromantic/>Biromantic</a></li></ul></nav>
    </div>
    </section>`
  );
});

test('last item', (t) => {
  const { title, slug } = testCollection[testCollection.length - 1].data;
  t.is(
    renderDefinitionContentNextEntries(title, slug, testCollection),
    `<section class="definition-navigation definition__further-definitions_nav" aria-label="Browse definitions">
    <h2 class="visually-hidden">Browse</h2>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-previous">Previous words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-previous">
        <ul class="definition-navigation__list"><li><a href=/definitions/transgender/>Transgender</a></li><li><a href=/definitions/unreal/>unreal</a></li><li><a href=/definitions/white-fragility/>White Fragility</a></li></ul></nav>
    </div>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-next">Next words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-next"></nav>
    </div>
    </section>`
  );
});

test('throws if no title has been passed', (t) => {
  const error = t.throws(() => {
    renderDefinitionContentNextEntries();
  });

  t.is(error.message, 'E_NO_TITLE');
});

test('throws if no slug has been passed', (t) => {
  const error = t.throws(() => {
    renderDefinitionContentNextEntries('title');
  });

  t.is(error.message, 'E_NO_SLUG');
});

test('throws if no collection has been passed', (t) => {
  const error = t.throws(() => {
    renderDefinitionContentNextEntries(
      testCollection[0].data.title,
      testCollection[0].data.slug
    );
  });

  t.is(error.message, 'E_NO_COLLECTION');
});
