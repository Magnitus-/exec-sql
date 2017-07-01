var execSQL = require('./index.js');

var path = require('path');

execSQL.connect(process.env.DB_HOST, process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD);
execSQL.executeFile(path.join(__dirname, 'sql-file.sql')).then(function() {
    console.log('Successfully executed the valid file as exepected.');
    return execSQL.executeDirectory(path.join(__dirname, 'sql-directory'));
}).then(function() {
    console.log('Successfully executed the valid directory as expected');
    return execSQL.executeFile(path.join(__dirname, 'sql-file-bad.sql'));
}).catch(function(err) {
    console.log('Executing the bad sql file generated an error as expected');
    return execSQL.executeDirectory(path.join(__dirname, 'sql-directory-bad'));
}).catch(function(err) {
    console.log('Executing the bad sql directory generated an error as espected');
}).finally(function() {
    execSQL.disconnect();
    console.log('Done!');
});
