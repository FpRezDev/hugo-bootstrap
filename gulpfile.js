/**
 * Only copying assets from node_modules to assets/libs directory
 * All other compilation and bundling will be done by hugo site
 * - reasoning: allow application to bundle only what it needs...... it's a static site.
 * - this is merely acting as a libs package manager
 * - all items in assets directory will not be copied to wwwroot unless .Permalink
 * -- but in production build they should be bundled and minified within hugo app
 * -- static assets.. such as fonts and images or sourcemaps(in development) should be configured to output to static/libs/[libname]/[webfonts|img|etc...]
 */
const { src, dest } = require('gulp');
const merge = require('merge-stream');
const del = require('del');

const cleanRoot = () => {
  console.log('Cleaning: wwwroot/');
  return del('wwwroot/');
}

const cleanLibs = () => {
  console.log('Cleaning: site/assets/libs/ & site/static/libs/');
  return del(['site/assets/libs/', 'site/static/libs/']);
}

const install = (config) => {
  let tasks = config.map((cfg) => {
    console.log(`-------------------------`);
    console.log(`Installing: ${cfg.src}`);
    console.log(`To: ${cfg.dest}`);
    return src(cfg.src)
            .pipe(dest(cfg.dest));
  });
  return merge(tasks);
}

const installDevLibs = () => {
  console.log('Preparing to install dev libs:');
  return install(require('./assets.dev.json'));
}

const installLibs = () => {
  console.log('Preparing to install libs:');
  return install(require('./assets.json'));
}

exports.cleanLibs = cleanLibs;
exports.cleanRoot = cleanRoot;
exports.installDevLibs = installDevLibs;
exports.installLibs = installLibs;