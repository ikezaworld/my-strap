"use strict";
// const fsExtra = require('fs-extra');
// const esbuild = require('esbuild');
// const sassPlugin = require('esbuild-plugin-sass');
import fsExtra from 'fs-extra';
import esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';
import path from 'path';
import archiver from 'archiver';

fsExtra.emptyDirSync('public');
fsExtra.copySync('src/popup.html', 'public/popup.html');
fsExtra.copySync('manifest.json', 'public/manifest.json');
fsExtra.copySync('assets/icon', 'public/icon');

(async ()=>{
  await esbuild.build({
    entryPoints: [
      'src/content.js',
      'src/content.scss',
      'src/popup.js',
      'src/popup.scss',
    ],
    bundle: true,
    platform:'node',
    minify:true,
    // sourcemap:true,
    target:['es2020'],
    outdir: 'public',
    plugins: [
      sassPlugin(),
    ]
  }).catch();

  // Zip the "/public" folder to download the files that will be loaded into the chrome extension.
  const rootDir = path.resolve("./");
  const output = fsExtra.createWriteStream(rootDir + '/my-strap-for-chrome-extension.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', function() {
    console.log("Zip the public folder. Loaded files: "+archive.pointer() + ' total bytes. The zip file generation is complete.');
  });

  archive.pipe(output);
  archive.directory(rootDir+'/public/', 'my-strap-for-chrome-extension');
  await archive.finalize();
})();
