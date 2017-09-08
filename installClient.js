// in place of `concurrently "npm install" "cd client && npm install"`
// && is not cross platform, this script is

const argsToNpm = [ 'install' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', argsToNpm, opts);
