import test from 'ava';

import testCollection from '../../../_util/_mocks/testCollection.json';

import findDefinitionContentNextItems from '../findDefinitionContentNextItems';

test('finds no previous previous elements for the first item', (t) => {
  const { previous } = findDefinitionContentNextItems(
    testCollection[0].data,
    testCollection
  );

  t.deepEqual(previous, []);
});

test('finds one previous element for the second item', (t) => {
  const { previous } = findDefinitionContentNextItems(
    testCollection[1].data,
    testCollection
  );

  t.deepEqual(previous, [testCollection[0].data]);
});

test('finds two previous elements for the third item', (t) => {
  const { previous } = findDefinitionContentNextItems(
    testCollection[2].data,
    testCollection
  );

  t.deepEqual(previous, [testCollection[0].data, testCollection[1].data]);
});

test('finds three previous elements for the fourth item', (t) => {
  const { previous } = findDefinitionContentNextItems(
    testCollection[3].data,
    testCollection
  );

  t.deepEqual(previous, [
    testCollection[0].data,
    testCollection[1].data,
    testCollection[2].data
  ]);
});

test('finds three previous elements for the eigth item', (t) => {
  const { previous } = findDefinitionContentNextItems(
    testCollection[7].data,
    testCollection
  );

  t.deepEqual(previous, [
    testCollection[4].data,
    testCollection[5].data,
    testCollection[6].data
  ]);
});

test('finds three next elements for the eigth item', (t) => {
  const { next } = findDefinitionContentNextItems(
    testCollection[7].data,
    testCollection
  );

  t.deepEqual(next, [
    testCollection[8].data,
    testCollection[9].data,
    testCollection[10].data
  ]);
});

test('finds three next elements for the fourth to last item', (t) => {
  const { next } = findDefinitionContentNextItems(
    testCollection[testCollection.length - 4].data,
    testCollection
  );

  t.deepEqual(next, [
    testCollection[testCollection.length - 3].data,
    testCollection[testCollection.length - 2].data,
    testCollection[testCollection.length - 1].data
  ]);
});

test('finds two next elements for the third to last item', (t) => {
  const { next } = findDefinitionContentNextItems(
    testCollection[testCollection.length - 3].data,
    testCollection
  );

  t.deepEqual(next, [
    testCollection[testCollection.length - 2].data,
    testCollection[testCollection.length - 1].data
  ]);
});

test('finds one next elements for the second to last item', (t) => {
  const { next } = findDefinitionContentNextItems(
    testCollection[testCollection.length - 2].data,
    testCollection
  );

  t.deepEqual(next, [testCollection[testCollection.length - 1].data]);
});

test('finds no next elements for the last item', (t) => {
  const { next } = findDefinitionContentNextItems(
    testCollection[testCollection.length - 1].data,
    testCollection
  );

  t.deepEqual(next, []);
});

test('throws if no slug has been given', (t) => {
  const error = t.throws(() =>
    findDefinitionContentNextItems({ test: 'no-slug' })
  );

  t.is(error.message, 'E_NO_SLUG');
});
