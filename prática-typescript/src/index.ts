let num1: number = 2;
console.log(num1);

//let student = "fulana"

// console.log(student.firstName)

// let student : string;

let grade1 = parseInt("8");
let grade2 = 9;
//type annotation
let isAproved: boolean;

function avarage(num1: number, num2: number): number {
    return (num1 + num2) / 2;
}

console.log(avarage(grade1, grade2));

isAproved = avarage(grade1, grade2) >= 7;


//Arrays

let grades = ["8", "7", 8];

function finalGrade(grades: (number | string)[]) {
    let sum = 0;
    grades.forEach(element => {
        sum += typeof element == 'string' ? parseInt(element) : element
    });

    return sum / grades.length;
}

console.log(finalGrade(grades));


//Objects:


//TYPE

/* type Student = {
    name: string,
    grades: string[],
    //atributo opcional
    isAproved?: boolean
} */

//INTERFACES

interface Person {
    name: string,

}
interface Student extends Person {
    grades: string[],
    //atributo opcional
    isAproved?: boolean
}

let estudante: Student;




function printStudent(student: Student) {
    console.log("Name: " + student.name)
    console.log("final grade: " + finalGrade(student.grades))
    if (typeof student.isAproved == 'boolean') {
        console.log("is aproved" + student.isAproved)
    }
}

let newStudent = {
    name: "John",
    grades: ["5", "6"]
}

// printStudent(newStudent)


let students: Student[] = [
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
]


students.forEach(s => printStudent(s))


let size: "small";

//size = "large";

let id: string | number;

function buttonStyle(size: "small" | "large") {
    let style: { height: string, width: string }
    if (size == "small") {
        style = {
            height: "60px",
            width: "100px"
        }

    }else{
        style = {
            height: "80px",
            width: "140px"
        }
    }
}


function printId(id: number | string){
    if(typeof id == 'string'){
        console.log(id.toUpperCase());
    }
}
function printData(id: number | string | undefined){
    if(typeof id == 'string'){
        console.log(id.toUpperCase());
    }

    console.log(id);
}

let data;

printData(data)


//Any

//tipo any implicito
let person;

person = 2;
person = "6";

console.log(person)

function doubleNum(num: any){
    return num*2;
}


//HTML elements

function getName(input : HTMLInputElement){
    let name = input?.value;
    console.log(name)
}

let input = document.querySelector("input#name") as HTMLInputElement;

getName(input);
