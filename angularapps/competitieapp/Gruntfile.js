module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'app.min.js': [            
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-resource/angular-resource.js',
            'js/*.js'
          ]
        }
      }
    },
    clean: {
      dist: [
        'app.min.js'
      ]
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify'); 

  grunt.registerTask('build', ['clean', 'uglify']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('dev', ['watch']);
};
