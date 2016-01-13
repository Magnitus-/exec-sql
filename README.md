#Overview

This is a library to execute MySQL SQL files in directories.

It is not meant to be executed directly on the command line, although it can be used as the basis to create command line utilities to deploy SQL.

## installation

npm install exec-sql

## Procedures

### connect

Connects to a given database. Currently always use 'localhost' as it was enough for our internal needs so far, but it will be specifiable as an argument in a future version.

#### Signature

```
connect(db, user, password)
```

#### Arguments

-db: Database to connect to
-user: Database user to connect as
-password: Password of the database user to connect as

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

None.

### executeDirectory

Execute all SQL files in a given directory. SQL files are identified by their '.sql' ending in the file name. Currently, sub-directories are ignored.

In future versions, sub-directories will be traversed recursively.

#### Signature

```
executeDirectory(directory, callback)
```

### Arguments

- directory: Directory to execute the SQL files from. Needs to be a valid path to the directory.
- callback: Callback to be executed once the execution of the SQL files has completed. An error will be passed as its sole argument if any.

## Example

```
//Let's say that we want to execute all SQL files in the relative 'views' directory in database 'mysql' with user 'root' that has the equivalent password.
var execSQL = require('exec-sql');
var path = require('path');

execSQL.connect('mysql', 'root', 'root');
execSQL.executeDirectory(path.join(__dirname,'views'), function(err) {
    execSQL.disconnect();
    console.log('Done!');
});
```

## Release Notes

### 1.1.0

Added 'file' as a propertie to logged errors when calling executeDirectory.

### 1.0.2

Added installation instruction and corrected error in example.

### 1.0.1

- Added doc and corrected errata in documentation.
- Fixed regex error.

### 1.0.0

Original Release
