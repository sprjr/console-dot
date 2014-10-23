module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        traceur: {
            options: {
                modules: 'commonjs'
            },
            custom: {
                type: 'amd',
                modules: 'commonjs',
                files:[{
                    expand: 'true',
                    includeRuntime: false,
                    cwd: 'lib',
                    src: 'index.js',
                    dest: 'build'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-traceur');
    grunt.registerTask('default', ['traceur']);
};
