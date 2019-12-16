'use strict';

var fs = require('fs');
var haml = require('../lib/haml');

describe('haml', function () {
  describe('.version', function () {
    it('should be a triplet', function () {
      haml.version.should.match(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('.compile()', function () {
    it('should return a function', function () {
      var fn = haml.compile('%foo= bar');
      fn({ bar: 'baz' }).should.equal('\n<foo>baz</foo>');
    });
  });

  describe('Parser', function () {
    it('should be available for extension', function () {
      haml.Parser.should.not.equal(undefined);
    });
  });

  describe('.renderFile()', function () {
    it('should render the given file', function (done) {
      haml.renderFile(__dirname + '/fixtures/class.haml', 'utf8', {}, function (err, html) {
        html = html.trim()
        var expected = fs.readFileSync(__dirname + '/fixtures/class.html').toString()

        console.log(JSON.stringify(html), JSON.stringify(expected))
        html.should.equal(expected)

        done()
      });
    });
  });

  describe('.render()', function () {
    var assertAs, assert, assertXML;

    // Prepare helper functions
    before(function () {
      assertAs = function(name, type, options) {
        var str = fs.readFileSync(__dirname + '/fixtures/' + name + '.haml').toString();
        try {
          var html = haml.render(str, options).trim();
          var expected = fs.readFileSync(__dirname + '/fixtures/' + name + '.' + type).toString().trim();
          html.should.equal(expected);
        } catch (err) {
          throw err;
        }
      };
      assert = function(name, options) {
        assertAs(name, 'html', options, 'CRLF', '\r\n');
      };
      assertXML = function(name, options) {
        assertAs(name, 'xml', options, 'CRLF', '\r\n');
      };
    });

    it('should allow passing of a context object', function () {
      assert('context', { context: 'yay' });
    });

    it('should allow passing of literals', function () {
      assert('literals', { locals: { user: 'tj' }});
    });

    it('should not fail on trailing indents', function () {
      assert('trailing-indent');
    });

    it('should add xml support via the "xml" option', function () {
      assertXML('feed', { xml: true });
    });

    it('should support xml namespaces', function () {
      assertXML('namespace');
    });

    it('should utilize "filename" option when an error is thrown', function () {
      try { assert('error', { filename: 'error.haml' }); }
      catch (err) {
        err.message.should.eql('(error.haml):3 invalid indentation; got 3, when previous was 1');
      }
    });

    it('should default filename to "Haml" when an error is thrown', function () {
      try { assert('error'); }
      catch (err) {
        err.message.should.eql('(Haml):3 invalid indentation; got 3, when previous was 1');
      }
    });

    it('should bitch when "cache" is true without a filename given', function () {
      // -{ assert('tag.simple', { cache: true }) }.should.throw_error
    });

    it('should pre-compiled and cache when "cache" is true', function () {
      assert('tag.simple', { cache: true, filename: 'tag.simple.haml' });
      assert('tag.simple', { cache: true, filename: 'tag.simple.haml' });
    });

    describe('\\n', function () {
      it('should support blank lines', function () {
        assert('newlines');
      });

      it('should support blank lines within tags', function () {
        assert('newlines.within-tags');
      });
    });

    describe('.class', function () {
      it('should output a div with the given class', function () {
        assert('class');
      });

      it('should work with several classes', function () {
        assert('classes');
      });
    });

    describe('#id', function () {
      it('should output a div with the given id', function () {
        assert('id');
      });
    });

    describe('%tag', function () {
      it('should work with no text or block', function () {
        assert('tag.simple');
      });

      it('should work with text', function () {
        assert('tag.text');
      });

      it('should work with block text', function () {
        assert('tag.text.block');
      });

      it('should work with blocks of text and tags', function () {
        assert('tag.text.block.complex');
      });

      it('should work with many classes / ids / attrs', function () {
        assert('tag.complex');
      });

      it('should allow empty tags', function () {
        assert('tag.empty');
      });
    });

    describe('%tag.class', function () {
      it('should output tag with a class', function () {
        assert('tag.class');
      });

      it('should work with several classes', function () {
        assert('tag.classes');
      });

      it('should work with both .class and class=\'another-class\'', function () {
        assert('tag.class.attribute');
      });

      it('should support self-closing tags', function () {
        assert('tag.self-close');
      });
    });

    describe('%tag!=', function () {
      it('should output the evaluated code', function () {
        assert('tag.code');
      });

      it('should not escape output', function () {
        assert('tag.code.no-escape');
      });
    });

    describe('%tag=', function () {
      it('should escape the evaluated code', function () {
        assert('tag.escape');
      });
    });

    describe('%namespace:tag', function () {
      it('should output a tag with a namespace prefix', function () {
        assert('namespace.tag');
      });
    });

    describe('{...}', function () {
      it('should be mapped as html attributes', function () {
        assert('tag.attrs');
      });

      it('should escape values', function () {
        assert('tag.attrs.escape');
      });

      it('should allow booleans', function () {
        assert('tag.attrs.bools');
      });
    });

    describe('!!!', function () {
      it('should default the doctype to 1.0 transitional', function () {
        assert('doctype');
      });
    });

    describe('!!! NAME', function () {
      it('should output a specific doctype', function () {
        assert('doctype.xml');
      });

      it('should be case-insensitive', function () {
        assert('doctype.xml.case');
      });
    });

    describe('nesting', function () {
      it('should work when nested downwards', function () {
        assert('nesting.simple');
      });

      it('should work when blocks outdent', function () {
        assert('nesting.complex');
      });
    });

    describe('- code', function () {
      it('should work with if statements', function () {
        assert('code.if');
      });

      it('should work with if / else statements', function () {
        assert('code.if.else');
      });

      it('should work when nested', function () {
        assert('code.nested');
      });
    });

    describe('- each', function () {
      it('should iterate', function () {
        assert('code.each', { locals: { items: ['one', 'two', 'three'] }});
        assert('code.each.non-enumerable', { locals: { items: null }});
      });

      it('should iterate objects', function () {
        assert('code.each', { locals: { items: { 0: 'one', 1: 'two', 2: 'three' }}});
        assert('code.each.index', { locals: { items: { 0: 'one', 1: 'two', 2: 'three' }}});
      });

      it('should iterate with index', function () {
        assert('code.each.index', { locals: { items: ['one', 'two', 'three'] }});
      });
    });

    describe('= code', function () {
      it('should output evaluation', function () {
        assert('code');
      });
    });

    describe('&= code', function () {
      it('should output evaluation while escaping html entities', function () {
        assert('code.escape');
      });
    });

    describe('<literal></html>', function () {
      it('should remain intact', function () {
        assert('html');
      });
    });

    describe('\\char', function () {
      it('should escape the character', function () {
        assert('escape');
      });
    });

    describe('#{}', function () {
      it('should interpolate strings', function () {
        assert('string.interpolation', { locals: { message: 'it works!' } });
      });

      it('should interpolate strings (complex)', function () {
        assert('string.complex-interpolation', { locals: { message: 'it works!' } });
      });
    });

    describe('-#', function () {
      it('should become a silent comment', function () {
        assert('comment');
      });
    });

    describe('/', function () {
      it('should comment out tags', function () {
        assert('comment.tag');
      });

      it('should comment out blocks', function () {
        assert('comment.block');
      });

      it('should comment out text', function () {
        assert('comment.text');
      });

      it('should work in blocks', function () {
        assert('comment.text.complex');
      });
    });

    describe('/[]', function () {
      it('should insert conditional comment blocks', function () {
        assert('comment.block.conditional');
      });
    });

    describe(':filter', function () {
      describe('plain', function () {
        it('should ignore haml specific characters', function () {
          assert('filter.plain');
        });
      });

      describe('cdata', function () {
        it('should wrap with CDATA tags', function () {
          assert('filter.cdata');
        });

        it('should retain whitespace', function () {
          assert('filter.cdata.whitespace');
        });
      });

      describe('javascript', function () {
        it('should wrap with <script> and CDATA tags', function () {
          assert('filter.javascript');
        });
      });
    });

    describe('bug fixes', function () {
      it('#8 code block', function () {
        assert('issue.#8', { locals: { items: ['foo', 'bar', 'baz'] }});
      });

      it('#10 Attributes should not need quotes', function () {
        assert('issue.#10');
      });
    });
  });
});
