let num1 = 2;
console.log(num1);
//let student = "fulana"
// console.log(student.firstName)
// let student : string;
let grade1 = parseInt("8");
let grade2 = 9;
//type annotation
let isAproved;
function avarage(num1, num2) {
    return (num1 + num2) / 2;
}
console.log(avarage(grade1, grade2));
isAproved = avarage(grade1, grade2) >= 7;
//Arrays
let grades = ["8", "7", 8];
function finalGrade(grades) {
    let sum = 0;
    grades.forEach(element => {
        sum += typeof element == 'string' ? parseInt(element) : element;
    });
    return sum / grades.length;
}
console.log(finalGrade(grades));
let estudante;
function printStudent(student) {
    console.log("Name: " + student.name);
    console.log("final grade: " + finalGrade(student.grades));
    if (typeof student.isAproved == 'boolean') {
        console.log("is aproved" + student.isAproved);
    }
}
let newStudent = {
    name: "John",
    grades: ["5", "6"]
};
// printStudent(newStudent)
let students = [
    {
        name: "John",
        grades: ["5", "6"],
        isAproved: true
    },
    {
        name: "Sarah",
        grades: ["9", "6"],
        isAproved: true
    },
    {
        name: "Luisa",
        grades: ["9", "6"],
    }
];
students.forEach(s => printStudent(s));
let size;
//size = "large";
let id;
function buttonStyle(size) {
    let style;
    if (size == "small") {
        style = {
            height: "60px",
            width: "100px"
        };
    }
    else {
        style = {
            height: "80px",
            width: "140px"
        };
    }
}
function printId(id) {
    if (typeof id == 'string') {
        console.log(id.toUpperCase());
    }
}
function printData(id) {
    if (typeof id == 'string') {
        console.log(id.toUpperCase());
    }
    console.log(id);
}
let data;
printData(data);
//Any
//tipo any implicito
let person;
person = 2;
person = "6";
console.log(person);
