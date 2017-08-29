// in place of `concurrently "npm run server" "cd client && npm start"`
// && is not cross platform, this script is

const argsToNpm = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', argsToNpm, opts);
