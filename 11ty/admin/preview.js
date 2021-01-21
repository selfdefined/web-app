/* global CMS, createClass, h */

const DefinitionPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    return h(
      'main',
      {},
      h(
        'article',
        { className: 'definition' },
        h(
          'header',
          { className: 'definition__header' },
          h(
            'p',
            {
              className: entry.getIn(['data', 'flag'])
                ? `definition-content__signal definition-content__signal--${entry
                    .getIn(['data', 'flag', 'level'])
                    .toLowerCase()
                    .replace('better-alternative', 'better')}`
                : 'definition-content__signal'
            },
            entry.getIn(['data', 'flag', 'text'])
              ? [
                  entry
                    .getIn(['data', 'flag', 'level'])
                    .replace('better-alternative', 'Better alternate'),
                  entry.getIn(['data', 'flag', 'text'])
                ].join('—')
              : entry
                  .getIn(['data', 'flag', 'level'])
                  .replace('better-alternative', 'Better alternate')
          ),
          h(
            'h1',
            { className: 'main-headline' },
            entry.getIn(['data', 'title']) || 'Untitled'
          ),
          h(
            'section',
            { className: 'u-margin-bottom-double' },
            h(
              'p',
              { className: 'definition-content__speech' },
              entry.getIn(['data', 'speech']) || 'Unknown part of speech'
            )
          )
        ),
        // TODO: Add content warning flag if applicable.
        h(
          'section',
          { className: 'definition-content' },
          h(
            'section',
            { className: 'definition-content__content' },
            this.props.widgetFor('body') // TODO: display as direct descendant of parent element
          )
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('definitions', DefinitionPreview);
