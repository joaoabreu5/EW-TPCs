exports.initialPage= function (users, tasks, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>

                <form class="w3-container" method="POST">
                    <br>
                    <a class="w3-btn w3-purple w3-mb-2" href="/users/add">New User</a>
                    <br><br>
                    <fieldset>
                        <legend>
                            <h3><b>Add Task</b></h3>
                        </legend>
                        <label><b>What</b></label>
                        <input class="w3-input w3-round" type="text" name="what"/>
                        
                        <label><b>Who</b></label>
                        <select class="w3-select" name="who">
                            <option value="" disabled selected>Choose your option</option>`
    
    users.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i<users.length; i++)
    {
        pagHTML += `<option value="${users[i].name}">${users[i].name}</option>`
    }
                                        
    pagHTML += `</select>
                        <label><b>Duedate</b></label>
                        <input class="w3-input w3-round" type="date" name="date"/>
                        <label><b>Description</b></label>
                        <input class="w3-input w3-round" type="text" name="desc"/>
                    </fieldset>
                    <br>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                <br>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>
                                <h3><b>Tasks to be done</b></h3>
                            </th>
                            <th>
                                <h3><b>Already done</b></h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table class="w3-table-all">
                                    <tr>
                                        <th>What</th>
                                        <th>Who</th>
                                        <th>Duedate</th>
                                        <th></th>
                                    </tr>`

    for (let i=0; i < tasks.length ; i++) 
    {
        if (tasks[i].done == false)
        {
            pagHTML += `<tr>
                            <td>${tasks[i].what}</td>
                            <td>${tasks[i].who}</td>    
                            <td>${tasks[i].date}</td>
                            <td>
                                <a href="/tasks/${tasks[i].id}">[Info]</a>
                                <a href="/tasks/edit/${tasks[i].id}">[Edit]</a>
                                <a href="/tasks/done/${tasks[i].id}">[Done]</a>
                                <a href="/tasks/delete/${tasks[i].id}">[Delete]</a>
                            </td>
                        </tr>`
        }
    }

    pagHTML += `    </table>
                </td>
                <td>
                <table class="w3-table-all">
                    <tr>
                        <th>What</th>
                        <th>Who</th>
                        <th>Duedate</th>
                        <th></th>
                    </tr>`

    for (let i=0; i < tasks.length ; i++) 
    {
        if (tasks[i].done == true)
        {
            pagHTML += `<tr>
                            <td>${tasks[i].what}</td>
                            <td>${tasks[i].who}</td>    
                            <td>${tasks[i].date}</td>
                            <td>
                                <a href="/tasks/${tasks[i].id}">[Info]</a>
                                <a href="/tasks/edit/${tasks[i].id}">[Edit]</a>
                                <a href="/tasks/todo/${tasks[i].id}">[To do]</a>
                                <a href="/tasks/delete/${tasks[i].id}">[Delete]</a>
                            </td>
                        </tr>`
        }
    }

    pagHTML += `    </tr>
                </table>
                </td>
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.newUserPage = function() {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>New User</h1>
                </header>

                <form class="w3-container" method="POST">
                    <br>
                    <fieldset>
                        <legend>Add User</legend>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="name"/>
                    </fieldset>
                    <br>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                <br>`

    return pagHTML
}

exports.editTaskPage = function (users, tasks, d, task) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>

                <form class="w3-container" method="POST">
                    <br>
                    <a class="w3-btn w3-purple w3-mb-2" href="/users/add">New User</a>
                    <br><br>
                    <fieldset>
                        <legend>
                            <h3><b>Edit Task</b></h3>
                        </legend>
                        <label><b>What</b></label>
                        <input class="w3-input w3-round" type="text" name="what" value="${task['what']}"/>
                        
                        <label><b>Who</b></label>
                        <select class="w3-select" name="who">
                            <option value="" disabled selected>Choose your option</option>`
    
    users.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i<users.length; i++)
    {
        if (users[i].name != task['who']) {
            pagHTML += `<option value="${users[i].name}">${users[i].name}</option>`
        }
        else {
            pagHTML += `<option value="${users[i].name}" selected>${users[i].name}</option>`
        }
    }
                                        
    pagHTML += `</select>
                        <label><b>Duedate</b></label>
                        <input class="w3-input w3-round" type="date" name="date" value="${task['date']}"/>
                        <label><b>Description</b></label>
                        <input class="w3-input w3-round" type="text" name="desc" value="${task['desc']}"/>
                    </fieldset>
                    <br>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Save</button>
                </form>
                <br>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>
                                <h3><b>Tasks to be done</b></h3>
                            </th>
                            <th>
                                <h3><b>Already done</b></h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table class="w3-table-all">
                                    <tr>
                                        <th>What</th>
                                        <th>Who</th>
                                        <th>Duedate</th>
                                        <th></th>
                                    </tr>`

    for (let i=0; i < tasks.length ; i++) 
    {
        if (tasks[i].done == false)
        {
            pagHTML += `<tr>
                            <td>${tasks[i].what}</td>
                            <td>${tasks[i].who}</td>    
                            <td>${tasks[i].date}</td>
                            <td>
                                <a href="/tasks/${tasks[i].id}">[Info]</a>
                                <a href="/tasks/edit/${tasks[i].id}">[Edit]</a>
                                <a href="/tasks/done/${tasks[i].id}">[Done]</a>
                                <a href="/tasks/delete/${tasks[i].id}">[Delete]</a>
                            </td>
                        </tr>`
        }
    }

    pagHTML += `    </table>
                </td>
                <td>
                <table class="w3-table-all">
                    <tr>
                        <th>What</th>
                        <th>Who</th>
                        <th>Duedate</th>
                        <th></th>
                    </tr>`

    for (let i=0; i < tasks.length ; i++) 
    {
        if (tasks[i].done == true)
        {
            pagHTML += `<tr>
                            <td>${tasks[i].what}</td>
                            <td>${tasks[i].who}</td>    
                            <td>${tasks[i].date}</td>
                            <td>
                                <a href="/tasks/${tasks[i].id}">[Info]</a>
                                <a href="/tasks/edit/${tasks[i].id}">[Edit]</a>
                                <a href="/tasks/todo/${tasks[i].id}">[To do]</a>
                                <a href="/tasks/delete/${tasks[i].id}">[Delete]</a>
                            </td>
                        </tr>`
        }
    }

    pagHTML += `    </tr>
                </table>
                </td>
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.recordInsertedPage = function(task, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>
                
                <ul class="w3-ul">
                    <li>
                        <h3><b>Task Added</b></h3>
                    </li>
                    <li><b>What:</b> ${task.what}</li>
                    <li><b>Who:</b> ${task.who}</li>    
                    <li><b>Duedate:</b> ${task.date}</li>
                    <li><b>Description:</b> ${task.desc}</li>
                    <li><b>Done:</b> ${task.done}</li>
                </ul>

                <p>
                <div class="w3-margin">
                    <button class="w3-btn w3-purple w3-mb-2">
                        <a href="/">Return to home page</a>
                    </button>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`
    return pagHTML
}

exports.recordUpdatedPage = function(task, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>
                
                <ul class="w3-ul">
                    <li>
                        <h3><b>Task Updated</b></h3>
                    </li>
                    <li><b>What:</b> ${task.what}</li>
                    <li><b>Who:</b> ${task.who}</li>
                    <li><b>Duedate:</b> ${task.date}</li>
                    <li><b>Description:</b> ${task.desc}</li>
                    <li><b>Done:</b> ${task.done}</li>
                </ul>

                <p>
                <div class="w3-margin">
                    <button class="w3-btn w3-purple w3-mb-2">
                        <a href="/">Return to home page</a>
                    </button>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`
    return pagHTML
}

exports.recordDeletedPage = function(task, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>
                
                <ul class="w3-ul">
                    <li>
                        <h3><b>Task Deleted</b></h3>
                    </li>
                    <li><b>What:</b> ${task.what}</li>
                    <li><b>Who:</b> ${task.who}</li>    
                    <li><b>Duedate:</b> ${task.date}</li>
                    <li><b>Description:</b> ${task.desc}</li>
                    <li><b>Done:</b> ${task.done}</li>
                </ul>

                <p>
                <div class="w3-margin">
                    <button class="w3-btn w3-purple w3-mb-2">
                        <a href="/">Return to home page</a>
                    </button>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`
    return pagHTML
}

exports.newUserAddedPage = function(user, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>
                
                <ul class="w3-ul">
                    <li>
                        <h3><b>New User Created</b></h3>
                    </li>
                    <li><b>Name:</b> ${user.name}</li>
                </ul>

                <p>
                <div class="w3-margin">
                    <button class="w3-btn w3-purple w3-mb-2">
                        <a href="/">Return to home page</a>
                    </button>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`
    return pagHTML
}

exports.recordInfoPage = function(task, d) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Task Manager</h1>
                </header>
                
                <ul class="w3-ul">
                    <li>
                        <h3><b>Task Info</b></h3>
                    </li>
                    <li><b>What:</b> ${task.what}</li>
                    <li><b>Who:</b> ${task.who}</li>    
                    <li><b>Duedate:</b> ${task.date}</li>
                    <li><b>Description:</b> ${task.desc}</li>
                    <li><b>Done:</b> ${task.done}</li>
                </ul>

                <p>
                <div class="w3-margin">
                    <button class="w3-btn w3-purple w3-mb-2">
                        <a href="/">Return to home page</a>
                    </button>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated by A91755 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`
    return pagHTML
}
