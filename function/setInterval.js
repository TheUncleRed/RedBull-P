const { join } = require('path');
const { readdirSync, statSync } = require('fs');

function loadCommands(directory) {
  readdirSync(directory).forEach(file => {
    const fullPath = join(directory, file);
    const isDirectory = statSync(fullPath).isDirectory();

    if (isDirectory) {
      loadCommands(fullPath);
    } else if (file.endsWith('.js')) {
      const command = require(fullPath);
    }
  });
}

function initializesetInterval() {
  loadCommands(join(__dirname, './../function/setInterval'));
}

module.exports = initializesetInterval;
