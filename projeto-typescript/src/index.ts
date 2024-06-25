import data from './data.js';

const students = JSON.parse(data);
console.log(students);

interface Student {
    id: string,
    firstName: string,
    lastName: string,
    dateAdmission: string,
    birthYear: string,
    dateRegistrationSuspended?: string,
    focusArea?: string | string[]
}


function addRow(table: HTMLTableElement, student: Student) {

    let tr = table.querySelector("tbody")!.insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.firstName}  ${student.lastName}`));

    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birthYear)).toString()));

    const majors = tr.insertCell();

    if (student.focusArea) {
        if (typeof student.focusArea == "string") {

            majors.appendChild(document.createTextNode(""));
        } else {
            let areas = "";
            student.focusArea.forEach(a => areas += a + ", ");
            majors.appendChild(document.createTextNode(areas.slice(0, -2)));
        }
    }

    const status = tr.insertCell();

    if (student.dateRegistrationSuspended) {
        status.appendChild(document.createTextNode("Inactive"));

    } else {

        status.appendChild(document.createTextNode("Active"));
    }
}

// select HTML table
function selectTable() {
    return document.querySelector("#students-table") as HTMLTableElement;
}


function refreshTable(table: HTMLTableElement, students: Student[]) {
    table.querySelector("tbody")!.innerHTML = "";
    students.forEach(s => addRow(table, s))
}


// add rows
window.onload = function () {
    refreshTable(selectTable(), students);
}
