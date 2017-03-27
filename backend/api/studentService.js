const mysql = require('mysql');
const db = require('../config.js').database;

const tokenService = require('../services/token-service');

const service          = {};
service.login          = login;
service.getQuizzes     = getQuizzes;
service.getQuiz        = getQuiz;
service.publishAnswer  = publishAnswer;
service.getColours     = getColours;

module.exports          = service;



function login(student, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT * FROM students WHERE username=? AND password=?', [student.username, student.password], function(err, rows) {
        if (err) {
            callback(err);
        } else {
            if( typeof rows[0] === 'undefined')
                callback({err: 'wronglogin'});
            else {
                student = {
                    id         : rows[0].id,
                    teacherID  : rows[0].teacherID,
                    firstName  : rows[0].firstName,
                    //lastName : rows[0].lastName,
                    level      : rows[0].level,
                    //username : rows[0].username,
                    //password : rows[0].password
                };
                let token = tokenService.issue(student);
                callback({user:{id: student.id, firstName: student.firstName,level: student.level,teacherID: student.teacherID}, token:token});
            }
        }
    });
    connection.end();
}

function getQuizzes(quizObject, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let quizzes = [];
    connection.connect();
    connection.query('SELECT DISTINCT id, operator FROM quizzes WHERE NOT EXISTS (SELECT * FROM answers WHERE answers.quizID = quizzes.id AND answers.studentID=?) AND level=? AND teacherID=? ',[quizObject.id,quizObject.level,quizObject.teacherID],function(err, rows) {
        if (err)
            callback(err);
        else
            for(i = 0; i < rows.length; i++)
                quizzes.push(rows[i]);
        callback(quizzes);
    });
    connection.end();
}

function getQuiz(quizID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let quiz = [];
    connection.connect();
    connection.query('SELECT quiz.id, q.id, q.num1, q.operator, q.num2, q.answer FROM quizzes quiz inner join questions q on quiz.id=q.quizID WHERE quiz.id=? ',[quizID],function(err, rows) {
        if (err)
            callback(err);
        else
            for(i = 0; i < rows.length; i++)
                quiz.push(rows[i]);
        callback(quiz);
    });
    connection.end();
}

function publishAnswer(answers, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('INSERT INTO answers SET ?', answers, function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}

function getColours(studentID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT backgroundColour, fontSize FROM customcolours WHERE studentId=? ',[studentID],function(err, rows) {
        if (err)
            callback(err);
        else
            if(rows.length!=0){
                callback(rows[0]);
            }
            else {
                callback({'empty':'empty'});
            }
    });
    connection.end();
}










