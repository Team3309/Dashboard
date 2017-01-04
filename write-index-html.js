var path = require('path');
var fs = require('fs');

module.exports = function () {
  this.plugin('done', function (stats) {
    var outputPath = path.join(__dirname, 'dist', 'index.html');

    var git = require('git-rev-2');

    git.short(function (err, sha) {
      var html = ' <!DOCTYPE html> ' +
        '<html lang="en"> ' +
        '<head> ' +
        '<meta charset="UTF-8">' +
        '<meta data-sha="' + sha + '" data-date="' + new Date().toString() + '">' +
        '<meta name="theme-color" content="#424242">' +
        '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'+
        '<title>Scout</title>' +
        '<link href="\/\/fonts.googleapis.com\/css?family=Roboto+Condensed:300|Roboto:100,300,400,500" rel="stylesheet" type="text\/css">' +
        '<link href="\/\/fonts.googleapis.com\/icon?family=Material+Icons" rel="stylesheet">' +
        '<style>.hidden {display: none;}</style>'+
        '</head>' +
        '<body>' +
        '<div id="content"></div>' +
        '<script src="bundle.' + stats.hash + '.js"></script>' +
        '<script src="https://apis.google.com/js/client.js?onload=googleClientLoaded"></script>' +
        '</body>' +
        '</html>';

      fs.writeFileSync(outputPath, html);
    });
  });
};
