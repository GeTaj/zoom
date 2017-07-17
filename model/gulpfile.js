var gulp        = require('gulp');
var miniJs      = require('gulp-uglify');           //压缩js
var miniCss     = require('gulp-minify-css');       //压缩css
var less        = require('gulp-less');             //将less转换为css
var autopre     = require('gulp-autoprefixer');     //给css添加前缀
var concat      = require('gulp-concat');           //合并文件
var browserSync = require('browser-sync');          //服务器
var reload      = browserSync.reload;               //重载



gulp.task('html',function(){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});
gulp.task('css',function(){
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(miniCss())
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
        .pipe(miniJs())
        .pipe(gulp.dest('./dist/js')); 
})
gulp.task('watch',function(){
    gulp.watch('./src/less/*.less',['css']);
    gulp.watch('./src/js/*.js',['js']);
    gulp.watch('./src/*.html',['html']);
});
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:'dist',
            index:'index.html'
        }
    });
    gulp.watch(['*.html','./css/*.css','./js/*.js'],{cwd:'dist'},reload);
});
gulp.task('default',function(){
    gulp.start('html','css','js','serve','watch');
});