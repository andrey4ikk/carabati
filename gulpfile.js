var gulp       = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	// pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	svgSprite = require('gulp-svg-sprite'), //makes svg-sprites
	notify		 = require('gulp-notify');

gulp.task('scss', function(){ // Создаем таск scss
	return gulp.src('src/scss/**/*.scss') // Берем источник
		.pipe(scss({outputStyle:'expanded'}).on("error", notify.onError())) // Преобразуем scss в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], /*{ cascade: true }*/)) // Создаем префиксы
		.pipe(gulp.dest('src')) // Выгружаем результата в папку src
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery/jquery-1.12.min.js', // Берем jQuery
		'src/libs/jquery-ui.js',
		'src/libs/tabs.js',
		'src/libs/slick.js',
		'src/libs/jquery.matchHeight.js',
		'src/libs/wowjs/dist/wow.js',
		'src/libs/ResizeSensor.js',
		'src/libs/jquery.sticky-sidebar.js',
		'src/assets/js/common.js' // Всегда в конце
		])
		.pipe(concat('main.js')) // Собираем их в кучу в новом файле main.js
		// .pipe(uglify()) // Сжимаем JS файл (main.min.js)
		.pipe(gulp.dest('src/assets/js')) // Выгружаем в папку src/assets/js
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		open: false,
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', function() {
	// gulp.watch('src/scss/**/*.scss', ['scss']); // Наблюдение за scss файлами в папке scss
	gulp.watch('src/scss/**/*.scss', function(event, cb) {
		setTimeout(function() {gulp.start('scss');}, 500) // Наблюдение за scss файлами в папке scss
	});
	gulp.watch('src/**/*.html', browserSync.reload); // Наблюдение за HTML файлами
	gulp.watch('src/assets/js/**/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
	gulp.watch('src/assets/img/sprite/*.svg', function(){gulp.start('svgsprite');});
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/assets/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
			// use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('../assets/img')); // Выгружаем на продакшен
});

//SVG SPRITES
var baseDir      = 'src/assets/img/sprite/',   // <-- Set to your SVG base directory
svgGlob      = '**/*.svg',       // <-- Glob to match your SVG files
outDir       = '.',     // <-- Main output directory
config       = {
	"dest" : '.',
	"shape": {
      "spacing": { // Add padding
        // "padding": 10
      },
    },
    "mode": {
        "css": {
			"bust" : false,
            "dest": "./src/",
            "prefix": "@mixin sprite-%s",
            "dimensions": true,
            "sprite": "assets/img/sprite.svg",
						"bust" : false,
            "render": {
                "scss": {"dest" : 'scss/_mixins/_svg-sprite.scss'}
            }
        }
    }
};

gulp.task('svgsprite', function() {
    return gulp.src(svgGlob, {cwd: baseDir})
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest(outDir))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build', ['clean', 'img', 'scss', 'scripts'], function() {

	var buildCss = gulp.src('src/style.css') // Переносим стили в продакшен
	.pipe(gulp.dest('../'))

	var buildFonts = gulp.src('src/assets/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('../assets/fonts'))

	var buildJs = gulp.src('src/assets/js/main.js') // Переносим скрипты в продакшен
	.pipe(rename('scripts.js'))
	.pipe(gulp.dest('../assets/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('../'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['svgsprite', 'scss', 'scripts', 'browser-sync', 'watch']);
