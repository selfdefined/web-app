import test from 'ava';

import definitionPermalink from '../definitionPermalink';

test('constructs correct detail link', (t) => {
  t.is(definitionPermalink('test-slug'), '/#test-slug');
});
