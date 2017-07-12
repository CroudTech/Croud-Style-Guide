const gulp = require('gulp')
const { exec } = require('child_process')

gulp.task('default', () => {
    gulp.watch('config/**/*.json', () => {
        exec('cd build && node build', (err, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
        })
    })
})
