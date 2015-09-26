module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        'js/plugins/*.js',
        '!js/scripts.min.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'js/plugins/*.js',
            'js/_*.js'
          ]
        }
      }
    },
    clean: {
      dist: [
        'assets/js/scripts.min.js'
      ]
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      },
      css: {
        files: [
          'scss/*.scss',
          'scss/base/*.scss'
        ],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean', 'uglify']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('dev', ['watch']);
};
