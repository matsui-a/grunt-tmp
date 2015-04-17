module.exports = function(grunt){

  // 読み込むプラグインの設定
  var taskName;
  var pkg = grunt.file.readJSON('package.json');
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  // 各タスクの設定
  grunt.initConfig({

    // package.jsonの定義
    pkg: pkg,

    // compass
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // 画像パス
    paths: {
      img: 'develop/img/',
      imgdist: 'develop/_dist/img/'
    },

    // jpg.gif圧縮
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= paths.img %>',
          src: '**/*.{jpg,gif}',
          dest: '<%= paths.imgdist %>'
        }]
      }
    },

    // png圧縮
    pngmin: {
      compile: {
        options: {
          ext: '.png'
        },
        files: [{
          expand: true,
          cwd: '<%= paths.img %>',
          src: '**/*.png',
          dest: '<%= paths.imgdist %>'
        }]
      }
    },

    // jsファイルの結合
    concat: {
      dist: {
        src: 'develop/js/libs/*.js',
        dest: 'release/js/scripts.js'
      }
    },

    // jsファイルの圧縮
    uglify: {
      build: {
        src: 'develop/js/scripts.js',
        dest: 'release/js/scripts.min.js'
      }
    },

    // cssの圧縮
    cssmin: {
      dev: {
        src: 'develop/css/style.css',
        dest : 'release/css/style.min.css'
       }
    },

    // ファイルのコピー
    copy: {
      // html: {
      //   expand: true,
      //   cwd: 'develop/',
      //   src: ['**/*.html'],
      //   dest: 'release/'
      // },
      css: {
        expand: true,
        cwd: 'develop/',
        src: ['css/style.min.css'],
        dest: 'release/'
      },
      // images: {
      //   expand: true,
      //   cwd: 'develop/',
      //   src: ['img/**'],
      //   dest: 'release/'
      // },
      js: {
        expand: true,
        cwd: 'develop/',
        src: ['js/scripts.min.js'],
        dest: 'release/'
      }
    },

    // ファイルの削除
    clean: {
      release: {
          src: 'release'
      }
    },

    // スタイルガイド
    kss: {
      options: {
        template: 'styleguide/temp/',  //テンプレート用のフォルダを指定
        includeType: 'scss',
        includePath: 'styleguide/css/style.scss'
      },
      dist: {
        files: {
          'styleguide/': ['styleguide/scss/']
        }
      }
    },

    // ローカルホスト
    connect: {
        server: {
            options: {
                port: 8000,
                hostname: 'localhost'
            }
        }
    },

    // watch
    watch : {
        options: {
            livereload: true
        },
        html: {
            files: ['**/*.html']
        },
        img : {
            files: ['**/*.{png,jpg,gif}'],
            tasks: ['imagemin', 'pngmin']
        },
        sass: {
            files: ['**/*.scss'],
            tasks: ['compass']
        },
        kss: {
            files: ['styleguide/css/*.scss'],
            tasks: ['kss']
        }
    }

  });

  // gruntコマンドで実行するタスクの設定
  grunt.registerTask('default', ['connect','watch']);
  grunt.registerTask('r', ['clean:release', 'copy', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('g', ['kss','connect','watch:kss']);
};