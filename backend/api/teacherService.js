const mysql  = require('mysql');
const db     = require('../config.js').database;

const tokenService = require('../services/token-service');

const service              = {};
service.login              = login;
service.register           = register;
service.deregister         = deregister;
service.update             = update;
service.getById            = getById;
service.getStudents        = getStudents;
service.registerStudent    = registerStudent;
service.publishQuiz        = publishQuiz;
service.insertCustomColour = insertCustomColour;
service.updateCustomColour = updateCustomColour;


service.countTotalStudentsByLevel             = countTotalStudentsByLevel;
service.countTotalQuizzesByLevel              = countTotalQuizzesByLevel;
service.countTotalQuizzesByClassLevel         = countTotalQuizzesByClassLevel;
service.countTotalQuizzesAnsweredByClassLevel = countTotalQuizzesAnsweredByClassLevel;

module.exports             = service;

function getById(id, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT * FROM teachers WHERE id=? ', [id], function(err, rows) {
        if (err) {
            console.log(err);
            teacher = null;
        } else {
            if( typeof rows[0] === 'undefined')
                teacher = null;
            else
                teacher = {
                    id        : rows[0].id,
                    firstName : rows[0].firstName,
                    lastName  : rows[0].lastName,
                    email     : rows[0].email,
                    password  : rows[0].password
                };
        }
        callback(teacher);
    });
    connection.end();
}

function login(teacher, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('SELECT * FROM teachers WHERE email=? AND password=?', [teacher.email, teacher.password], function(err, rows) {
        if (err) {
            callback(err);
        } else {
            if( typeof rows[0] === 'undefined')
                callback({err: 'wronglogin'});
            else {
                teacher = {
                    id        : rows[0].id,
                    firstName : rows[0].firstName,
                    lastName  : rows[0].lastName,
                    email     : rows[0].email,
                    password  : rows[0].password
                };
                let token = tokenService.issue(teacher);
                callback({user:{id: teacher.id, firstName: teacher.firstName}, token:token});
            }
        }
    });
    connection.end();
}

function register(teacher, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('INSERT INTO teachers SET ?', teacher, function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}

function registerStudent(student, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('INSERT INTO students SET ?', student, function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}

function insertCustomColour(customcolourObject, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('INSERT INTO customcolours SET ?', customcolourObject, function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}

function updateCustomColour(customcolourObject, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('UPDATE customcolours SET backgroundColour=?, fontSize=? WHERE studentId=?', [customcolourObject.backgroundColour,customcolourObject.fontSize,customcolourObject.studentId], function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}


function deregister(id, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('DELETE FROM teachers WHERE id=?', teacher.id, function(err, rows) {
        if (err){
            callback(err);
            console.log(err);
        }
        else{
            callback(rows);
            console.log(rows);
        }
    });
    connection.end();
}

function update(teacher, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    connection.query('UPDATE teachers SET id=?, firstName=?  WHERE id= ? ', [teacher.id, teacher.firstName, teacher.id], function(err, rows) {
        if (err) {
            callback(err);
        }else {
            if( typeof rows[0] === 'undefined');
                //callback({err: 'could not update'});
            else 
                teacher = {
                    id        : rows[0].id,
                    firstName : rows[0].firstName,
                    lastName  : rows[0].lastName,
                    email     : rows[0].email,
                    password  : rows[0].password
                };
                
            }
            callback(rows);
    });
    connection.end();
}


/*function update(teacher, callback) {
    // Create a connection to the database.
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    // Execute the query.
    connection.connect();
    connection.query('UPDATE teachers SET id=?, firstName=? ? WHERE id= ? ', [teacher.id, teacher.firstName, teacher.id], function(err, rows) {
        if (err)
            callback(err);
        else
            callback(rows);
    });
    connection.end();
}*/


function getStudents(teacherID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let students = [];
    connection.connect();
    connection.query('SELECT * FROM students WHERE teacherID=? ORDER BY lastName ASC', teacherID, function(err, rows) {
        if (err)
            students = null;
        else
            for(i = 0; i < rows.length; i++)
                students.push(rows[i]);
        callback(students);
    });
    connection.end();
}


function countTotalStudentsByLevel(teacherID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let students = [];
    connection.connect();
    connection.query('select count(*) as total, level from students WHERE teacherID=? group by level ', teacherID, function(err, rows) {
        if (err)
            students = null;
        else
            for(i = 0; i < rows.length; i++)
                students.push(rows[i]);
        callback(students);
    });
    connection.end();
}

function countTotalQuizzesByLevel(teacherID, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let quizzes = [];
    connection.connect();
    connection.query('select count(*) as total, level from quizzes WHERE teacherID=? group by level', teacherID, function(err, rows) {
        if (err)
            quizzes = null;
        else
            for(i = 0; i < rows.length; i++)
                quizzes.push(rows[i]);
        callback(quizzes);
    });
    connection.end();
}

function countTotalQuizzesByClassLevel(teacherID,level, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let quizzes = [];
    connection.connect();
    connection.query('select count(*) as total, operator from quizzes WHERE teacherID=? AND level=? group by operator', [teacherID,level], function(err, rows) {
        if (err)
            quizzes = null;
        else
            for(i = 0; i < rows.length; i++)
                quizzes.push(rows[i]);
        callback(quizzes);
    });
    connection.end();
}

function countTotalQuizzesAnsweredByClassLevel(teacherID,level, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    let answeredQuizzes = [];
    connection.connect();
    connection.query('select count(*) as total, operator from quizzes q join answers a on q.id=a.quizID WHERE teacherID=? AND level=? group by operator', [teacherID,level], function(err, rows) {
        if (err)
            answeredQuizzes = null;
        else
            for(i = 0; i < rows.length; i++)
                answeredQuizzes.push(rows[i]);
        callback(answeredQuizzes);
    });
    connection.end();
}
 
 
function publishQuiz(quizObject, callback) {
    let connection = mysql.createConnection({
        host     : db.host,
        user     : db.user,
        password : db.pass,
        database : db.name
    });
    connection.connect();
    let quiz = {
        id              : quizObject.id,
        teacherID       : quizObject.teacherID,
        level           : quizObject.level,
        operator        : quizObject.operator,
        minNumber       : quizObject.minNumber,
        maxNumber       : quizObject.maxNumber,
        datePublished   : quizObject.datePublished,
    }
    connection.beginTransaction(function(err) {
        if (err) { 
            callback(err); 
        }
        connection.query('INSERT INTO quizzes SET ?',quiz, function(error, result) {
            let countedQuiz          = 0;
            let countedQuizQuestions = 0;
            if (error) { 
                connection.rollback(function() {
                    callback(err);
                });
            }
            countedQuiz++;
        
            let quizId = result.insertId;

            for (q of quizObject.questions){
                let question = {
                        QuizID   : quizId,
                        id       : q.id,
                        num1     : q.num1,
                        operator : q.operator,
                        num2     : q.num2,
                        answer   : q.answer,
                    };
                    connection.query('INSERT INTO questions SET ?',question, function(err, result) {
                        if (err) { 
                            connection.rollback(function() {
                                callback(err);
                            });
                        }
                        countedQuizQuestions++;
                     }); 
            }
            connection.commit(function(err) {
                    if (err) { 
                        connection.rollback(function() {
                            callback(err);
                        });
                    }
                    callback({'quiz':countedQuiz,'questions': countedQuizQuestions});
                    //console.log('Transaction Complete.');
                    connection.end();
                });
        });
    });
    /* End transaction */
}
