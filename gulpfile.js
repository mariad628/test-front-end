const { src, dest, watch, series } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function minifyCSS() {
    return src('style.css') 
        .pipe(cleanCSS({ compatibility: 'ie8' })) 
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./'))
        .pipe(browserSync.stream());
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    watch('style.css', minifyCSS);
    watch('index.html').on('change', browserSync.reload);
}

exports.minifyCSS = minifyCSS;
exports.default = series(minifyCSS, liveServer);
