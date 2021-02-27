/* global CMS, createClass, h */
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);
const md = window.markdownit({
  html: true,
  linkify: true,
  typographer: true
});

const generateFlag = function(flag) {
  const cleanText = new Map([
    [
      'avoid',
      {
        class: 'avoid',
        text: 'Avoid'
      }
    ],
    [
      'better-alternative',
      {
        class: 'better',
        text: 'Better alternate'
      }
    ],
    [
      'tool',
      {
        class: 'tool',
        text: ''
      }
    ],
    [
      'warning',
      {
        class: 'warning',
        text: ''
      }
    ]
  ]);

  if (flag) {
    const info = cleanText.get(flag.level.toLowerCase());

    const sep = flag.text && info.text ? '—' : '';
    const text = flag.text ? [info.text, flag.text].join(sep) : info.text;

    return html`
      <p
        class="definition-content__signal definition-content__signal--${info.class}"
      >
        ${text}
      </p>
    `;
  }

  return html`
    <p class="definition-content__signal"></p>
  `;
};

const decodeHtml = function(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const DefinitionPreview = createClass({
  render: function() {
    let definitionFlag,
      contentWarning,
      altWords,
      furtherReading = '';

    const flag = this.props.entry.getIn(['data', 'flag'], false) && {
      level: this.props.entry.getIn(['data', 'flag', 'level']),
      text: this.props.entry.getIn(['data', 'flag', 'text'])
    };

    definitionFlag = generateFlag(flag);

    switch (flag.level) {
      case 'avoid':
        contentWarning = html`
          <div class="u-margin-bottom-double content-flag content-flag--avoid">
            <p class="small">
              We would recommend adding a content warning when speaking about
              this term. Please
              <a href="/content-warning-guidelines/">read the guidance</a> on
              how and when to warn people before using this term in any context.
            </p>
          </div>
        `;
        break;
      case 'warning':
        contentWarning = html`
          <div class="u-margin-bottom-double content-flag">
            <p class="small">
              We would recommend adding a content warning when speaking about
              this term. Please
              <a href="/content-warning-guidelines/">read the guidance</a> on
              how and when to warn people before using this term in any context.
            </p>
          </div>
        `;
        break;
    }

    const body =
      this.props.entry.getIn(['data', 'body'], false) &&
      decodeHtml(md.render(this.props.entry.getIn(['data', 'body'])));

    altWords =
      this.props.entry.getIn(['data', 'alt_words'], false) &&
      html`
        <section className="definition-content__content">
          <h2 id="alt-words">Alt Words</h2>
          <ul class="list-semicolon" aria-labelledby="alt-words">
            ${this.props.widgetsFor('alt_words').map(
              (word, index) => html`
                <li key="${index}">${word.getIn(['data'])}</li>
              `
            )}
          </ul>
        </section>
      `;

    furtherReading =
      this.props.entry.getIn(['data', 'reading'], false) &&
      html`
      <section className="definition-content__content"> <h2 id="alt-words">Alt Words</h2>
        <ul class="list-semicolon" aria-labelledby="alt-words">
          ${this.props.widgetsFor('reading').map(
            (link, index) => html`
              <li key="${index}">
                <a href="${link.getIn(['data', 'link'])}"
                  >${link.getIn(['data', 'text'])}</a
                >
              </li>
            `
          )}
        </ul>
      </section
      `;

    return html`
      <main>
        <article className="definition">
          <header className="definition__header">
            ${definitionFlag}
            <h1 className="main-headline">
              ${this.props.entry.getIn(['data', 'title'])}
            </h1>
            <section className="u-margin-bottom-double">
              <p className="definition-content__speech">
                ${this.props.entry.getIn(['data', 'speech'])}
              </p>
            </section>
          </header>
          ${contentWarning}
          <section className="definition-content">
            <section className="definition-content__content">
              ${html([body])}
            </section>
            ${altWords} ${furtherReading}
          </section>
        </article>
      </main>
    `;
  }
});

CMS.registerPreviewTemplate('definitions', DefinitionPreview);
