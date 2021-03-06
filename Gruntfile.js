module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),//读取项目信息文件
	//要输出的sass文件
      sass: {
      output : {
        options: {
            banner:'\n/*! time:<%= grunt.template.today("yyyy-mm-dd") %> */',
            style: 'expanded',
            unixNewlines: true
        },
        files: {
          './css/index.css': './scss/index.scss'
        }
      }
    },
	//js文件合并
    concat: {
      dist: {
        src: ['./src/plugin.js', './src/plugin2.js'],
        dest: './global.js',
      }
    },
      //css文件压缩
      cssmin: {
          dist: {
              options: {
                  banner: '',
                  keepSpecialComments: '*'
              },
              files: {
                  './css/base.min.css': ['./css/base.css'],
                  './css/index.min.css': ['./css/index.css']
              }
          }
      },
	//js文件压缩
	uglify: {
        options: {
			mangle: false, //不混淆变量名
			banner:'/**\n* author:<%= pkg.author %>\n* version:<%= pkg.version %>\n* <%= pkg.description %>\n*/\n/* <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */',
            footer:'\n/* <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
	    },
	    builda: {//任务一:压缩ace.js,不混淆变量名,保留注释，添加banner和footer
            options: {
               mangle: false, //不混淆变量名
               preserveComments: 'all', //不删除注释,还可以为 false(删除全部注释),some(保留@preserve @license @cc_on等注释)
			   banner:'/**\n* author:<%= pkg.author %>\n* version:<%= pkg.version %>\n* <%= pkg.description %>\n*/\n/* <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            files: {
                'dis/js/numChangeEffect.min.js': ['js/numChangeEffect.js']
            }
        },
		buildse:{//任务二:把开发环境下的js文件下的所有js文件（包括文件夹）复制到发布环境下的相同目录下
			files:[{
				expand:true,
                cwd:'dev/assets/js/flot',//js目录下
                src:'**/*.js',//所有js文件
                dest: 'dis/assets/js/flot',//输出到此目录下
                ext: '.min.js'//结尾		
			}]			
		},
	    buildall:{//任务二:把开发环境下的js文件下的所有js文件（包括文件夹）复制到发布环境下的相同目录下
			files:[{
				expand:true,
                cwd:'dev/assets/js',//js目录下
                src:'**/*.js',//所有js文件
                dest: 'dis/assets/js',//输出到此目录下
                ext: '.min.js'//结尾		
			}]			
		}
    },
	//js文件语法检测
    jshint: {
      all: ['Gruntfile.js']
    },
	//图片压缩
	imagemin:{
		dynamic: {                         // Another target
            files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'dev/assets/avatars/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'dis/assets/avatars/'                  // Destination path prefix
            }]
        }
	},
	htmlmin: {                                     // Task
        dist: {                                      // Target
            options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            files: {                                   // Dictionary of files
                'dis/index.html': 'dev/index.html',     // 'destination': 'source'
                'dis/uglify.html': 'dev/uglify.html',
				'dis/install.html': 'dev/install.html',
				'dis/introduction.html': 'dev/introduction.html',
				'dis/cssmin.html': 'dev/cssmin.html',
				'dis/watch.html': 'dev/watch.html',
				'dis/connect.html': 'dev/connect.html',
				'dis/htmlmin.html': 'dev/htmlmin.html',
                'dis/imagemin.html': 'dev/imagemin.html',
                'dis/gulp.html': 'dev/gulp.html',
                'dis/dif.html': 'dev/dif.html'				
            }
        }
    },
	//实时监控被修改的文件
	watch: {
        scripts: {
            files: ['./js/**/*.js'],
            tasks: ['jshint']
        },
		css: {
            files: './css/**/*.css',
            tasks: ['mincss'],
            options: {
                livereload: true,
            },
        },
        /*sass: {
            files: ['./scss/style.scss'],
            tasks: ['sass']
        },*/
	    //浏览器自动更新修改的文件
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                './dev/**/*',
            ]
        }
    },
	//开启web服务
    connect: {
        options: {
            port: 9000,
            open: true,
            livereload: 35745,
             // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        server: {
            options: {
                port: 9001,
                base: './demo'
            }
        }
    }
  });
  //需要加载的模块
  grunt.loadNpmTasks('grunt-contrib-sass');//sass文件转css文件模块
  grunt.loadNpmTasks('grunt-contrib-concat');//js文件合并模块
  grunt.loadNpmTasks('grunt-contrib-jshint');//js文件语法检测模块
  grunt.loadNpmTasks('grunt-contrib-uglify');//js文件压缩模块
  grunt.loadNpmTasks('grunt-contrib-watch');//实时监控被修改的文件模块
  grunt.loadNpmTasks('grunt-contrib-connect');//开启web服务模块
  grunt.loadNpmTasks('grunt-contrib-cssmin');//css文件压缩模块
  grunt.loadNpmTasks('grunt-contrib-htmlmin');//html文件压缩模块
  grunt.loadNpmTasks('grunt-contrib-imagemin');//图片文件压缩模块
  //任务命令配置
  grunt.registerTask('outputcss',['sass','cssmin:dist']);
  grunt.registerTask('minjs',['uglify:builda']);
  grunt.registerTask('minhtml',['htmlmin']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('minimage',['imagemin']);
  grunt.registerTask('mincss',['cssmin:dist']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['cssmin','connect','watch']);
  grunt.registerTask('default');
};