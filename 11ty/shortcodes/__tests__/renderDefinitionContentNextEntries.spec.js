import test from 'ava';

import testCollection from '../../../_util/_mocks/testCollection.json';

import renderDefinitionContentNextEntries from '../renderDefinitionContentNextEntries';

test('first item', (t) => {
  t.is(
    renderDefinitionContentNextEntries(testCollection[0], testCollection),
    `<section class="definition-navigation definition-content__nav" aria-label="Browse definitions">
    <nav class="definition-navigation" aria-label="Previous words"></nav>
    <nav class="definition-navigation" aria-label="Next words"><ul class="definition-navigation__list"><li><a href=/definitions/ableism/>Ableism</a></li><li><a href=/definitions/barbaric/>Barbaric</a></li><li><a href=/definitions/biromantic/>Biromantic</a></li></ul></nav>
    </section>`
  );
});

test('last item', (t) => {
  console.log(
    renderDefinitionContentNextEntries(
      testCollection[testCollection.length - 1],
      testCollection
    )
  );

  t.is(
    renderDefinitionContentNextEntries(
      testCollection[testCollection.length - 1],
      testCollection
    ),
    `<section class="definition-navigation definition-content__nav" aria-label="Browse definitions">
    <nav class="definition-navigation" aria-label="Previous words"><ul class="definition-navigation__list"><li><a href=/definitions/transgender/>Transgender</a></li><li><a href=/definitions/unreal/>unreal</a></li><li><a href=/definitions/white-fragility/>White Fragility</a></li></ul></nav>
    <nav class="definition-navigation" aria-label="Next words"></nav>
    </section>`
  );
});

test('throws if no item has been passed', (t) => {
  const error = t.throws(() => {
    renderDefinitionContentNextEntries();
  });

  t.is(error.message, 'E_NO_ENTRY');
});

test('throws if no collection has been passed', (t) => {
  const error = t.throws(() => {
    renderDefinitionContentNextEntries(testCollection[0]);
  });

  t.is(error.message, 'E_NO_COLLECTION');
});
