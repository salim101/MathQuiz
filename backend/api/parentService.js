const mysql  = require('mysql');
const db     = require('../config.js').database;

const tokenService = require('../services/token-service');

const service       = {};
service.login       = login;
service.register    = register;
service.getById     = getById;
service.addChild    = addChild;
service.getChilds   = getChilds;

service.countTotalAssignedQuizzes = countTotalAssignedQuizzes;
service.countTotalAnsweredQuizzes = countTotalAnsweredQuizzes;

module.exports             = service;

function getById(id, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT * FROM parents WHERE id=? ', [id], function(err, rows) {
        if (err) {
            parents = null;
        } else {
            if( typeof rows[0] === 'undefined')
                parents = null;
            else
                parents = {
                    id        : rows[0].id,
                    firstName : rows[0].firstName,
                    lastName  : rows[0].lastName,
                    email     : rows[0].email,
                    password  : rows[0].password
                };
        }
        callback(parents);
    });
    connection.end();
}

function login(parent, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT * FROM parents WHERE email=? AND password=?', [parent.email, parent.password], function(err, rows) {
        if (err) {
            callback(err);
        } else {
            if( typeof rows[0] === 'undefined')
                callback({err: 'wronglogin'});
            else {
                parent = {
                    id        : rows[0].id,
                    firstName : rows[0].firstName,
                    lastName  : rows[0].lastName,
                    email     : rows[0].email,
                    password  : rows[0].password
                };
                let token = tokenService.issue(parent);
                callback({user:{id: parent.id, firstName: parent.firstName}, token:token});
            }
        }
    });
    connection.end();
}

function register(parent, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('INSERT INTO parents SET ?', parent, function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}

function addChild(obj, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('UPDATE students SET parentID=? WHERE id=?', [obj.parentID,obj.studentID], function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}



function getChilds(parentID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let students = [];
    connection.connect();
    connection.query('SELECT * FROM students WHERE parentID=? ORDER BY lastName ASC', parentID, function(err, rows) {
        if (err)
            students = null;
        else
            for(i = 0; i < rows.length; i++)
                students.push(rows[i]);
        callback(students);
    });
    connection.end();
}

function countTotalAssignedQuizzes(studentId, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let countQuizzes = [];
    connection.connect();
    connection.query('select count(*) as total, operator from quizzes WHERE level=(select level from students where id=?) group by operator', studentId, function(err, rows) {
        if (err)
            countQuizzes = null;
        else
            for(i = 0; i < rows.length; i++)
                countQuizzes.push(rows[i]);
        callback(countQuizzes);
    });
    connection.end();
}

function countTotalAnsweredQuizzes(studentId, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let countAnsweredQuizzes = [];
    connection.connect();
    connection.query('select count(*) as total, operator from quizzes q join answers a on q.id=a.quizID WHERE a.studentID=?  group by operator', studentId, function(err, rows) {
        if (err)
            countAnsweredQuizzes = null;
        else
            for(i = 0; i < rows.length; i++)
                countAnsweredQuizzes.push(rows[i]);
        callback(countAnsweredQuizzes);
    });
    connection.end();
}
