// in place of "cd client && npm test"`
// && is not cross platform, this script is

const argsToNpm = [ 'test' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', argsToNpm, opts);
