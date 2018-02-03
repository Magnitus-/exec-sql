# Overview

This is a library to execute MySQL SQL files in directories.

It is not meant to be executed directly on the command line, although it can be used as the basis to create command line utilities to deploy SQL.

## installation

npm install exec-sql

## Procedures

### connect

Connects to a given database. Currently always use 'localhost' as it was enough for our internal needs so far, but it will be specifiable as an argument in a future version.

#### Signature

```
connect(connectionObj)
```

#### Arguments

* connectionObj: This is a connection object that is passed to ```mysql.createConnection```. At the very least, the properties 'database', 'user' and 'password' should be set. The 'host' property will be set to 'localhost' if absent and the 'multipleStatements' will always be set true.

#### Return value

Returns the database connection.

### disconnect

Disconnects from the database

#### Signature

```
disconnect()
```

#### Return value

None.

### executeFile

Execute a given SQL file.

#### Signature

```
executeFile(file, callback)
```

#### Arguments

- file: SQL file to execute. Needs to be a valid path to the file.
- callback: Callback to be executed once the execution of the SQL files has completed. An error will be passed as its sole argument if any.

#### Return value

A promise will be returned if a callback is not passed as the second argument, else nothing will be returned.

### executeDirectory

Execute all SQL files in a given directory. SQL files are identified by their '.sql' ending in the file name. Currently, sub-directories are ignored.

In future versions, sub-directories will be traversed recursively.

#### Signature

```
executeDirectory(directory, callback)
```

#### Arguments

- directory: Directory to execute the SQL files from. Needs to be a valid path to the directory.
- callback: Callback to be executed once the execution of the SQL files has completed. An error will be passed as its sole argument if any.

#### Return value

A promise will be returned if a callback is not passed as the second argument, else nothing will be returned.

## Example

```
//Let's say that we want to execute all SQL files in the relative 'views' directory in database 'mysql' with user 'root' that has the equivalent password.
var execSQL = require('exec-sql');
var path = require('path');

execSQL.connect({
    'database': 'mysql',
    'user': 'root',
    'password': 'root'
});
execSQL.executeDirectory(path.join(__dirname,'views'), function(err) {
    execSQL.disconnect();
    console.log('Done!');
});
```

## tests

You can run the tests either directly on your host or in a dockerized work environment (I personally recommend the later).

### Host

Run the following:

```
yarn install
yarn run test
```

### Docker

Note that you'll need to have docker and docker-composed installed.

Run the following:

```
docker-compose up -d database
```

Note that you might have to wait a bit for the database server to properly start. You can look at the mysql server logs to infer status by typing:

```
docker-compose logs database
```

Then, run any of the 3 commands below (by default, the workspace is boron aka node 6):

```
docker-compose run workspace
docker-compose run workspace-argon
docker-compose run workspace-carbon
```

Then, from inside the workspace, type:

```
yarn install
yarn run test
```

To exit the worspace (when inside), type:

```
exit
```

To cleanup, from outside the worspace, type:

```
docker-compose down --volumes
```

### Note

The tests will output some error logs on the screen. That is normal (as long as you get an indication at the end that all the tests passed) as error paths in the code are tested as well.

## Release Notes

### 2.0.2

- Updated npm repo pointer back to clone after removal of original repo
- Improvement in repo packaging declaration
- Improved test structure and automated them

### 2.0.1

- Corrected default host value: ```locahost -> localhost```
- Updated npm repo pointer to original repo after clearing permission for update
- Slight documentation improvement

### 2.0.0

- Changed connect method argument signature to improve connection flexibility
- Added optional promise support
- Added easy to run visual tests for node argon and boron
- Documentation update and formating adjustments
- Updated version for mysql dependency

### 1.1.0

Added 'file' as a propertie to logged errors when calling executeDirectory.

### 1.0.2

Added installation instruction and corrected error in example.

### 1.0.1

- Added doc and corrected errata in documentation.
- Fixed regex error.

### 1.0.0

Original Release
