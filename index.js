var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var nimble = require('nimble');
var Promise = require('bluebird');

var connection = null;

function connect(connectionObj)
{
    connectionObj.host = connectionObj.host !== undefined ? connectionObj.host : 'localhost';
    connectionObj.multipleStatements = true;

    connection = mysql.createConnection(connectionObj);

    connection.connect();
    return connection;
}

function disconnect()
{
    connection.end();
    connection = null;
}

function getFiles(directory)
{
    var toReturn = [];
    var fileRegex = new RegExp("^.+[.]sql$", "g");
    var files = fs.readdirSync(directory);
    files.forEach(function(file) {
        if(file.match(fileRegex) !== null)
        {
            toReturn.push(file);
        }
    });
    return toReturn;
}

function executeFile(file, callback)
{
    //Return a promise is no callback
    if(!callback) {
        return new Promise(function(resolve, reject) {
            executeFile(file, function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    var sql = fs.readFileSync(file).toString();
    connection.query(sql, function(err, result) {
        if(err)
        {
            err.file = file;
            console.log(err);
        }
        callback(err);
    });
}

function executeDirectory(directory, callback)
{
    //Return a promise is no callback
    if(!callback) {
        return new Promise(function(resolve, reject) {
            executeDirectory(directory, function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    var files = getFiles(directory);
    var tasks = [];
    files.forEach(function(file) {
        tasks.push(function(callback) {
            executeFile(path.join(directory, file), callback);
        });
    });
    nimble.series(tasks, callback);
}

module.exports = {'connect': connect, 'disconnect': disconnect, 'executeFile': executeFile, 'executeDirectory': executeDirectory};
