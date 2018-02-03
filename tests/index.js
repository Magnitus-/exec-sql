var path = require('path');
var execSQL = require('../');
var mysql = require('mysql');

exports.main = {
    'functionality': function(test) {
        test.expect(7);
        execSQL.connect({
            'host': process.env.DB_HOST,
            'database': process.env.DB,
            'user': process.env.DB_USER,
            'password': process.env.DB_PASSWORD
        });
        execSQL.executeFile(path.join(__dirname, 'clean.sql')).then(function() {
            return execSQL.executeFile(path.join(__dirname, 'sql-file.sql'));
        }).then(function() {
            test.ok(true, 'Successfully executed the valid file as exepected.');
            return execSQL.executeDirectory(path.join(__dirname, 'sql-directory'));
        }).then(function() {
            test.ok(true, 'Successfully executed the valid directory as expected.');
            return execSQL.executeFile(path.join(__dirname, 'sql-file-bad.sql'));
        }).catch(function(err) {
            test.ok(true, 'Executing the bad sql file generated an error as expected.');
            return execSQL.executeDirectory(path.join(__dirname, 'sql-directory-bad'));
        }).catch(function(err) {
            test.ok(true, 'Executing the bad sql directory generated an error as espected.');
        }).finally(function() {
            execSQL.disconnect();
            var connection = mysql.createConnection({
                'host': process.env.DB_HOST,
                'database': process.env.DB,
                'user': process.env.DB_USER,
                'password': process.env.DB_PASSWORD
            });
            connection.query('SELECT * FROM tv_shows', function (err, results, fields) {
                test.ok(results.length === 3, "Ensure the number of inserted rows is as expected");
                test.ok(results.some(function(result) {
                    return result.name === 'Avatar: The Last Airbender';
                }) &&
                results.some(function(result) {
                    return result.name === 'Game of Thrones';
                }) &&
                results.some(function(result) {
                    return result.name === 'Firefly';
                }), "Ensure the content of the inserted rows is as expected");

                connection.query('SELECT DISTINCT TABLE_NAME, INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS', function(err, results, fields) {
                    test.ok(results.some(function(result) {
                        return result.TABLE_NAME === 'tv_shows' && result.INDEX_NAME === 'tv_shows_name_idx';
                    }) &&
                    results.some(function(result) {
                        return result.TABLE_NAME === 'tv_shows' && result.INDEX_NAME === 'tv_shows_seasons_idx';
                    }), "Ensure the inserted indexes are present as expected");
                    connection.end();
                    test.done();
                });
            });
        });
    }
}
