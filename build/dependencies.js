// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import gulp from 'gulp';
import gulputil from 'gulp-util';
import ncu from 'npm-check-updates';
import path from 'path';
import through from 'through2';

import conf from './conf';

/**
 * Updates npm dependencies.
 */
gulp.task('update-npm-deps', function () {
  return gulp.src([path.join(conf.paths.base, 'package.json')]).pipe(updateDependencies());
});

function updateDependencies() {
  return through.obj(function (file, codec, cb) {
    let relativePath = path.relative(process.cwd(), file.path);

    ncu.run({
      packageFile: relativePath,
      packageManager: 'npm',
      cli: true,
      upgradeAll: true,
      args: [],
    })
      .then(cb);
  });
}

/**
 * Checks npm dependencies which need to be updated.
 */
gulp.task('check-npm-deps', function () {
  return gulp.src([path.join(conf.paths.base, 'package.json')]).pipe(checkDependencies());
});

function checkDependencies() {
  return through.obj(function (file, codec, cb) {
    let relativePath = path.relative(process.cwd(), file.path);

    ncu.run({
      packageFile: relativePath,
      packageManager: 'npm',
    })
      .then(function (toUpgrade) {
        let dependenciesStr = Object.keys(toUpgrade)
          .map((key) => {
            return `${key}: ${toUpgrade[key]}\n`;
          })
          .join('');

        if (dependenciesStr.length !== 0) {
          gulputil.log(gulputil.colors.yellow(
            `Dependencies needed to update:\n${dependenciesStr}\n` +
            `Run 'gulp update-npm-deps' and then 'npm i' to update dependencies.\n`));
        }

        cb();
      });
  });
}
