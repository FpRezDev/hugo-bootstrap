/**
 * Only copying assets from node_modules to assets/libs directory
 * All other compilation and bundling will be done by hugo site
 * - reasoning: allow application to bundle only what it needs...... it's a static site.
 * - this is merely acting as a libs package manager
 * - all items in assets directory will not be copied to wwwroot unless .Permalink
 * -- but in production build they should be bundled and minified within hugo app
 */
const { src, dest, parallel } = require('gulp');
const merge = require('merge-stream');
const del = require('del');
const assetsConfig = require('./assets.json');

const install = () => {
  let tasks = assetsConfig.map((cfg) => {
    return src(cfg.src)
            .pipe(dest(cfg.dest));
  });
  return merge(tasks);
}

const cleanLibs = () => {
  return del(['assets/libs/', 'static/libs/']);
}

const cleanRoot = () => {
  return del('wwwroot/');
}

exports.install = install;
exports.cleanLibs = cleanLibs;
exports.cleanRoot = cleanRoot;
exports.clean = parallel(cleanLibs, cleanRoot);