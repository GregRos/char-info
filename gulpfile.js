"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Greg on 25/09/2016.
 */
var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require("merge2");
var del = require("del");
var sourcemaps = require("gulp-sourcemaps");
var typedoc = require("gulp-typedoc");
var tsFiles = ['src/**/*.tsx', 'src/**/*.ts'];
var watchToo = ['tsconfig.json'];
var tsProject = ts.createProject('tsconfig.json', { 'sourceMap': true, 'declaration': true });
gulp.task('clean-dist', function () {
    return del([
        'dist/**/*.*'
    ]);
});
gulp.task('compile-ts', function () {
    var tsResult = gulp.src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(sourcemaps.write('.', { sourceRoot: '/src' })).pipe(gulp.dest('dist'))
    ]);
});
gulp.task('watch', ['clean-dist', 'compile-ts'], function () {
    gulp.watch(tsFiles.concat(watchToo), ['clean-dist', 'compile-ts']);
});
gulp.task('typedoc', function () {
    return gulp.src(["src/**/*.ts"])
        .pipe(typedoc({
        exclude: '**/node_modules',
        target: 'es6',
        out: "./docs",
        module: "commonjs",
        // TypeDoc options (see typedoc docs)
        name: "parjs",
        ignoreCompilerErrors: true,
        version: true,
        mode: "modules",
        "lib": ["es6", "es2016.array.include"],
        includeDeclarations: true,
        excludeExternals: true,
        excludePrivate: true
    }));
});
//# sourceMappingURL=gulpfile.js.map