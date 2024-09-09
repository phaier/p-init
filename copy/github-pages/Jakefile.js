const { task, desc } = require('jake');

desc('clean');
task('clean', [], async () => {
  const { deleteSync } = await import('del');

  deleteSync([
    './dist/repo/js/**/*.js',
    './dist/repo/js/**/*.js.map',
    './dist/repo/js/**/*.css',
    './dist/repo/js/**/*.css.map',
  ]);
});
