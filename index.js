#!/usr/bin/env node

'use strict'

/* @author ysknk */

import { promises as fs } from 'fs'
import path from 'path'
import glob from 'glob'

import iconv from 'iconv-lite'

import utils from 'node-package-utilities'

import argv from './lib/arguments.js'

glob.sync(argv.src, {
  ignore: argv.ignore,
  cwd: argv.cwd
}).map((key) => {
  const filename = key.replace(/\.[^/.]+$/, '');
  const name = argv.ext ? `${filename}${argv.ext}` : key

  const destpath = argv.dest
    ? path.resolve(argv.dest, name)
    : path.resolve(argv.cwd, name)

  // NOTE: watch related path
  const relpath = argv.rel
    ? path.resolve(argv.rel, name)
    : path.resolve(argv.cwd, name)

  if (argv.from === argv.to) {
    utils.message.success(`skip encode[${argv.from} -> ${argv.to}]: ${destpath}`, {ptime: false})
    return
  }

  ;(async () => {
    let data = ''
    try {
      data = await fs.readFile(relpath)
    } catch(err) {
      utils.message.failure(err, {ptime: false})
    }

    const contents = iconv.decode(data, argv.from)
    const encodeContents = iconv.encode(contents, argv.to)
    const result = new Buffer.from(encodeContents)

    await utils.file.makeDir(path.parse(destpath).dir)

    await fs.writeFile(destpath, result)

    utils.message.success(`encode[${argv.from} -> ${argv.to}]: ${destpath}`, {ptime: false})
  })()
})
