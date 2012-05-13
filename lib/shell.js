/**
 * Perkins Shell
 * Based on: https://github.com/bancek/node-interactive-shell/blob/master/inode.js
 * @author alvaroveliz (alvaro.veliz@gmail.com)
 */
var colors = require('colors');
var putils = require('./utils');
var commands = ['help', 'start', 'preview', 'watch', 'exit'];

var stdin = process.openStdin();
    stdin.setEncoding('utf8');

var shellWrite = function (data) {
    process.stdout.write(data);
};

var shellRead = function () {
    shellWrite('Perkins >o< ');
};

var shellProcess = function (data) {
    data = data.replace('\n', '');
    
    if (data == 'exit') {
        shellExit();
        process.exit(0);
    }
    else {
      if (putils.inArray(data, commands)) {
        console.log('CMD :'+data);
      }
      else {
        console.log('Sorry Sir, "'+data+'" command not found.')
      }
    }
    shellRead();
};

var shellExit = function() {
    console.log('');
    console.log('Goodbye, Sir.');
};

stdin.on('data', function (data) {
    shellProcess(data);
});

stdin.on('end', function () {
    shellExit();
});

process.on('SIGINT', function () {
    shellRead();
});

var spawn = require('child_process').spawn;
var nprocess = spawn(process.execPath, ['-v']);

nprocess.stdout.on('data', function (version) {
  console.log('Perkins v2.0');
  console.log('----------------------------------');
  console.log('Your commands, Sir:');
  console.log(commands.join(', '));
  shellRead();
});