import test from 'ava';

import metaDescriptionWithFlag from '../metaDescriptionWithFlag';

test('renders with flag.level = avoid and flag.text present', (t) => {
  const flag = {
    level: 'avoid',
    text: 'ableist slur'
  };
  const preview = 'here is some preview text';

  t.is(
    metaDescriptionWithFlag(preview, flag),
    'Avoid: ableist slur. Here is some preview text'
  );
});

test('renders with flag.level = avoid and no flag.text', (t) => {
  const flag = {
    level: 'avoid'
  };
  const preview = 'here is some preview text';

  t.is(
    metaDescriptionWithFlag(preview, flag),
    'Avoid: here is some preview text'
  );
});

test('renders with flag.level != avoid', (t) => {
  const flag = {
    level: 'warning'
  };
  const preview = 'here is some preview text';

  t.is(metaDescriptionWithFlag(preview, flag), 'Here is some preview text');
});

test('renders with no flag present', (t) => {
  const preview = 'here is some preview text';

  t.is(metaDescriptionWithFlag(preview), 'Here is some preview text');
});
