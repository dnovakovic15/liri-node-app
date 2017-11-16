var student = require('./app.js');
var inquirer = require('inquirer');

let name = process.argv[2];
let subject = process.argv[3];
let gpa = process.argv[4];

let studentsArray = [];
let myClass;


inquirer.prompt([

      {

        name: "name",

        message: "Player's Name: "

      }, {

        name: "position",

        message: "Player's position: "

      }

    ]).then(function(answers) {
      myClass = new Class(studentsArray, 0, 'Mike Jones', '214');
      addStudent();
    });

function Class(students, quantity, professor, roomNumber){
    this.students = students;
    this.quantity = quantity;
    this.professor = professor;
    this.roomNumber = roomNumber;
}

Class.prototype.addStudent = function(student){
  this.students.push(student)
}

function addStudent(){
  inquirer.prompt([

      {

        name: "name",

        message: "Name?"

      }, {

        name: "subject",

        message: "Subject?"

      }, {

        name: "gpa",

        message: "GPA?"

      }

    ]).then(function(answers) {
      let newStudent = student.student(answers.name, answers.subject, answers.gpa);
      console.log(newStudent);
      myClass.addStudent(newStudent);
      myClass.quantity++;
      console.log(myClass);
      addStudent();
    });
}