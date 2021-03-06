const fs = require('fs');

// the team
let team = [];

const writePage = teamMembers => {
    //assigns the array of employee objects to a globally accessed variable.
    team = teamMembers;

    //creates an html file at the specified location
    fs.writeFile('./dist/index.html', basicPage(), err => {
        if (err) throw err;
        //logs if successful.
        console.log('File Created!');
    })
}

//the template for the html document
const basicPage = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css"/>
</head>
<body>
    <header class="h-auto border-bottom-1 "><h1 class="font-weight-bold text-light text-center py-4 ">My Team</h1></header>
    <main>
        <div class="card-box d-flex justify-content-center flex-wrap">
            ${createCards()}
        </div>
    </main>    
</body>
</html>`;
};

// a function that creates cards for each item in the team.
const createCards = () => {
    let cards = ``;
    for (let i = 0; i < team.length; i++) {
        cards += cardTemplate(team[i]) + `
            `;
    }
    return cards;
}

//the card template
const cardTemplate = (employee) => {
    // destructs the employee object into both required and non required variables
    // if the value is not contained in the employee object it will result as undefined
        //which can then be used as a falsey value.
    const { name, id, email, role, school, officeNumber, github } = employee;

    //creates the template, and calls the function to display the title with the applicable icon
    //also calls the function to display the last list item specific to the role using those falsey values
    return `<div class="card mb-4 column">
                <div class="card-header text-light">
                    <h2 class='text-capitalize'>${name}</h2>
                    ${roleDisplayer(role)}
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">Employee id: ${id}</li>
                        <li class="list-group-item">Email: <a href='mailto:${email}'>${email}</a></li>
                        ${classListItem(role, school || officeNumber || github)}
                    </ul>
                </div>
            </div>`
}

// checks the role, and displays the correct trait accordingly.
const classListItem = (role, trait) => {
    if (role === 'Manager') {
        return `<li class="list-group-item">Office Number: ${trait}</li>`;
    } else if (role === 'Engineer') {
        return `<li class="list-group-item">Github: <a href='https://github.com/${trait}/' target='_blank'>${trait}</a></li>`
    } else if (role === 'Intern') {
        return `<li class="list-group-item">School: ${trait}</li>`
    }
}

// A function that takes the Role to display the role h3 element.
const roleDisplayer = (role) => {
    let title = `       <h3 class='${role}'>${role}</h3>`;
    let icons = [`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-briefcase-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
                        <path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v1.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 5.884V4.5zm5-2A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"/>
                    </svg>`, `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-wrench" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019L13 11l-.471.242-.529.026-.287.445-.445.287-.026.529L11 13l.242.471.026.529.445.287.287.445.529.026L13 15l.471-.242.529-.026.287-.445.445-.287.026-.529L15 13l-.242-.471-.026-.529-.445-.287-.287-.445-.529-.026z"/>
                    </svg>`, `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eyeglasses" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/>
                    </svg>`]
    //checks the role, and displays the appropriate icon in front of the Role.
    if (role === 'Manager') {
        return icons[0] + title;
    } else if (role === 'Engineer') {
        return icons[1] + title;
    } else if (role === 'Intern') {
        return icons[2] + title;
    }
}

module.exports = writePage;