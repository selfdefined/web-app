const fileExists = require('../')
const test = require('tape')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rmdir = require('rmdir')
const async = require('async')
const memfs = require('memfs')

test('async', t => {
  mkdirp.sync('.tmp')
  fs.writeFileSync('.tmp/index.html', 'test', 'utf8')
  
  async.parallel([
    done => {
      fileExists('.tmp/index.html', (err, exists) => {
        t.ok(exists, 'file does exist')
        done()
      })
    },
    done => {
      fileExists('/index.html', {root: '.tmp'}, (err, exists) => {
        t.ok(exists, 'file exists in given root directory')
        done()
      })
    },
    done => {
      fileExists('.tmp', (err, exists) => {
        t.notOk(exists, 'directory is not a file')
        done()
      })
    },
    done => {
      fileExists('not.here', (err, exists) => {
        t.notOk(err, 'non-existing file doesn\'t throw')
        t.notOk(exists, 'non-existing file doesn\'t exist')
        done()
      })
    },
    done => {
      fileExists('promise-not.here').then(exists => {
        t.notOk(exists, 'promise: non-existing file doesn\'t exist')
        done()
      })
    },
    done => {
      fileExists('.tmp/index.html').then(exists => {
        t.ok(exists, 'promise: existing file exists')
        done()
      })
    },
    done => {
      var testVolume = memfs.Volume.fromJSON({'./mem.html':'test'}, 'app'); 
      fileExists('app/mem.html', {fileSystem: testVolume}).then(exists => {
        t.ok(exists, 'promise: existing file in alternative fs exists')
        done()
      })
    }
  ], err => {
    rmdir('.tmp', () => t.end())
  })
})

test('sync', t => {
  mkdirp.sync('.tmp')
  fs.writeFileSync('.tmp/index.html', 'test', 'utf8') 

  t.ok(fileExists.sync('.tmp/index.html'), 'file does exist')
  t.ok(fileExists.sync('/index.html', {root: '.tmp'}), 'file exists in given root directory')
  t.notOk(fileExists.sync('.tmp'), 'directory is not a file')
  t.notOk(fileExists.sync('not.here'), 'non-existing file doesn\'t exist')

  var testVolume = memfs.Volume.fromJSON({'./mem.html':'test'}, 'app'); 
  t.ok(fileExists.sync('app/mem.html', {fileSystem: testVolume}), 'file does exist')

  rmdir('.tmp', () => t.end())
})
