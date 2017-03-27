const express        = require('express');
const app            = express();
const teacherService = require('./api/teacherService');
const studentService = require('./api/studentService');
const parentService = require('./api/parentService');
const server_config  = require('./config.js').server;
const bodyParser     = require('body-parser');

const authService = require('./services/authentication-service');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'))

var router = express.Router();

//router.use(authService.intercept);

// router.use(function(req, res, next) {
//     console.log('Something is happening.');
//     next();
// });




router.get('/', function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});


router.route('/teacher/authenticate')
      .post(function(req, res) {
        teacherService.login(req.body, function(result){
            res.json(result);
        });
      });


router.route('/teacher/register')
      .put(function(req, res) {
        let teacher = {
            id        : req.body.id,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            email     : req.body.email,
            password  : req.body.password,
        };
        teacherService.register(teacher, function(result){
            res.json(result);
        });
      });

router.route('/teacher/:id/addstudent')
      .put(function(req, res) {
        let student = {
            id        : req.body.id,
            teacherID : req.body.teacherID,
            parentID  : req.body.parentID,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
		    level     : req.body.level,
            username  : req.body.username,
		    password  : req.body.password,
        };
        teacherService.registerStudent(student, function(result){
            res.json(result);
        });
      });

router.route('/teacher/:id/quiz')
      .put(function(req, res) {

        let quizObject = {
            id              : req.body.id,
            teacherID       : req.body.teacherID,
            level           : req.body.level,
            operator        : req.body.operator,
            minNumber       : req.body.minNumber,
            maxNumber       : req.body.maxNumber,
            datePublished   : req.body.datePublished,
            questions       : req.body.questions
        };
        teacherService.publishQuiz(quizObject, function(result){
           res.json(result);
        });
       
      });

router.route('/teacher/:id/insertcustomcolour')
      .put(function(req, res) {

        let customcolourObject = {
            studentId         : req.body.studentId,
            backgroundColour  : req.body.backgroundColour,
            fontSize          : req.body.fontSize
        };
        teacherService.insertCustomColour(customcolourObject, function(result){
           res.json(result);
        });
       
      });

router.route('/teacher/:id/updatecustomcolour')
      .post(function(req, res) {
        let customcolourObject = {
            studentId         : req.body.studentId,
            backgroundColour  : req.body.backgroundColour,
            fontSize          : req.body.fontSize
        };
        teacherService.updateCustomColour(customcolourObject, function(result){
           res.json(result);
        });
      });

router.route('/teacher/:id/deregister')
      .delete(function(req, res) {
        let teacher = {
            id        : req.body.id,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            email     : req.body.email,
            password  : req.body.password,
        };
        teacherService.deregister(teacher.id, function(result){
            res.json(result);
        });
      });


router.route('/teacher/:id')
      .get(function(req, res) {
	//console.log(req);
        teacherService.getById(req.params.id, function(result){
		console.log(result);
            res.json(result);
        });
      });


 router.route('/teacher/:id/students')
      .get(function(req, res) {
        teacherService.getStudents(req.params.id, function(result){
            res.json(result);
        });
      });


router.route('/teacher/:id/countstudents')
      .get(function(req, res) {
        teacherService.countTotalStudentsByLevel(req.params.id, function(result){
            res.json(result);
        });
      });

router.route('/teacher/:id/countquizzes')
      .get(function(req, res) {
        teacherService.countTotalQuizzesByLevel(req.params.id, function(result){
            res.json(result);
        });
      });

router.route('/teacher/:id/countquizzesoperators')
      .get(function(req, res) {
        teacherService.countTotalQuizzesByClassLevel(req.params.id,req.query.level, function(result){
            res.json(result);
        });
      });

router.route('/teacher/:id/countquizzesansweredoperators')
      .get(function(req, res) {
        teacherService.countTotalQuizzesAnsweredByClassLevel(req.params.id,req.query.level, function(result){
            res.json(result);
        });
      });


 router.route('/teacher/:id/profile')
       .get(function(req, res) {
         teacherService.getById(req.params.id, function(result){
             res.json(result);
         });
       });



router.route('/teacher/:id/update')
      .post(function(req, res) {
          //console.log(req.body);
          console.log(req.query.teacher);
          let teacher = JSON.parse(req.query.teacher);
        /*let teacher = {
            id        : req.body.id,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            email     : req.body.email,
            password  : req.body.password,
        };*/
       // console.log(teacher);
        teacherService.update(teacher, function(result){
            res.json(result);
        });
      });











router.route('/student/authenticate')
      .post(function(req, res) {
        studentService.login(req.body, function(result){
            res.json(result);
        });
      });

router.route('/student/:id/quizzes')
      .get(function(req, res) {
          let quizObject = {
              id        :req.params.id,
              level     :  req.query.level,
              teacherID : req.query.teacherID,
          }
          /*console.log(req.query);
          console.log(req.query.level);
          console.log(req.query.teacherID);*/
         
        studentService.getQuizzes(quizObject,function(result){
            res.json(result);
        });
      });

router.route('/student/:id/quiz')
      .get(function(req, res) {
         //console.log(req.params.id);
        studentService.getQuiz(req.params.id,function(result){
            res.json(result);
        });
      });

router.route('/student/:id/colour')
      .get(function(req, res) {
         //console.log(req.params.id);
        studentService.getColours(req.params.id,function(result){;
            res.json(result);
        });
      });

router.route('/student/:id/answers')
      .put(function(req, res) {
          let h = req.body.answeredTime.hours;
          let m = req.body.answeredTime.minutes;
          let s = req.body.answeredTime.seconds;
          let time= h + ':' + m + ':' + s;
        let answers = {
            quizID        : req.body.quizID,
            studentID     : req.body.studentID,
            q1Answer      : req.body.q1Answer,
            q2Answer      : req.body.q2Answer,
            q3Answer      : req.body.q3Answer,
            dateAnswered  : req.body.dateAnswered,
            answeredTime  : time 
        };
        studentService.publishAnswer(answers, function(result){
           res.json(result);
        });
       
      });






router.route('/parent/authenticate')
      .post(function(req, res) {
        parentService.login(req.body, function(result){
            res.json(result);
        });
      });


router.route('/parent/register')
      .put(function(req, res) {
        let parent = {
            id        : req.body.id,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            email     : req.body.email,
            password  : req.body.password,
        };
        parentService.register(parent, function(result){
            res.json(result);
        });
      });


router.route('/parent/:id/addchild')
      .post(function(req, res) {
        let parent = {
            parentID   : req.params.id,
            studentID  : req.body.studentid
        };
        parentService.addChild(parent, function(result){
            res.json(result);
        });
      });

router.route('/parent/:id/childs')
      .get(function(req, res) {
        parentService.getChilds(req.params.id, function(result){
            res.json(result);
        });
      });

router.route('/parent/:id/countassignedquizzes')
      .get(function(req, res) {
        parentService.countTotalAssignedQuizzes(req.query.studentid, function(result){
            res.json(result);
        });
      });

router.route('/parent/:id/countansweredquizzes')
      .get(function(req, res) {
        parentService.countTotalAnsweredQuizzes(req.query.studentid, function(result){
            res.json(result);
        });
      });






app.use('/api', router);

//app.use(express.static('../frontend/dist'));
app.listen(server_config.port, server_config.addr, function (req, res) {
  console.log("Listening at http://%s:%s", server_config.addr, server_config.port);
});

