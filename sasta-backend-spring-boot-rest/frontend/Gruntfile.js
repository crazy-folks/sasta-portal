module.exports = function (grunt) {
    var webappDir = 'src/main/webapp/';
    var cssDir = webappDir + 'WEB-INF/css/';
    var jsDir = webappDir + 'WEB-INF/js/';
    var imgDir = webappDir + 'WEB-INF/images/';

    var dstDir = webappDir + 'public/';
    var bowerDir = dstDir + 'lib/';
    var dstCssDir = dstDir + 'css/';
    var dstJsDir = dstDir + 'js/';
    var dstImgDir = dstDir + 'images/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [ dstDir ],
        bower: {
            install: {
                options: {
                    targetDir: bowerDir,
                    install: true,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        copy: {
            images_css: {
                expand: true,
                cwd: cssDir,
                src: [
                    'images/*'
                ],
                dest: dstCssDir
            },
            images: {
                expand: true,
                cwd: imgDir,
                src: [ '**/*' ],
                dest: dstImgDir
            }
        },
        uglify: {
            dist: {
                options: {
                    compress: true,
                    report: 'min'
                },
                src: [
                    jsDir + '*.js'
                ],
                dest: dstJsDir + 'all.js'
            }
        },
        less: {
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },
                src: [
                    cssDir + '*.less',
                    cssDir + '*.css'
                ],
                dest: dstCssDir + 'all.css'
            }
        },
        connect: {
            options: {
                port: 8080,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:8080/'
                    },
                    base : [
                        'frontend'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['bower', 'uglify', 'less', 'copy']);

 /*   // After running "npm install connect serve-static --save-dev" to add connect as a dev
// dependency of your project, you can require it in your gruntfile with:
    var connect = require('connect');
    var serveStatic = require('serve-static');
    connect(serveStatic('www-root')).listen(8080);

// Now you can define a "connect" task that starts a webserver, using the
// connect lib, with whatever options and configuration you need:
    grunt.registerTask('connect', 'Start a custom static web server.', function() {
        grunt.log.writeln('Starting static web server in "www-root" on port 9001.');
        connect(serveStatic('www-root')).listen(8080);
    });*/
};