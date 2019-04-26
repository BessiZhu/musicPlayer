var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var connect = require('gulp-connect');

var folder = {
    src: "src/",
    dist: "dist/"
}

// set/export NODE_ENV=development   production 设置环境变量
var devMod = process.env.NODE_ENV == "development";
console.log(devMod);

gulp.task("html", async function(){
    var tasks = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMod){
            tasks.pipe(htmlclean())
        }
        tasks.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("image", async function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
})
gulp.task("css", async function(){
    var tasks = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]));
        if(!devMod){
            tasks.pipe(cleancss())
        }
        tasks.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("js", async function(){
    var tasks = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
        if(!devMod){
            tasks.pipe(uglify())
        }
        tasks.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("server", async function(){
    connect.server({
        port:"8099",
        livereload:true
    })
})
gulp.task("watch", async function(){
    gulp.watch(folder.src + "html/*", gulp.series("html"))
    gulp.watch(folder.src + "css/*", gulp.series("css"))
    gulp.watch(folder.src + "images/*", gulp.series("image"))
    gulp.watch(folder.src + "js/*", gulp.series("js"))
})
gulp.task("default", gulp.parallel(["html","image","css","js","server","watch"]))

