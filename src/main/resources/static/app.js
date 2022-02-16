$(async function () {
    await getTableWithUsers();
    await getDefaultModal();
    await addNewUser();
})


const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/users'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users', {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),

    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#mainTableWithUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.userName}</td>
                            <td>${user.userLastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(roleUser =>
                    roleUser.role
                )}</td>     
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info" 
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getDefaultModal() {

    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        console.log(event)
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':

                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}

async function editUser(modal, id) {

    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();


    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>;`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
            
       
                                                               
                                                                        <label for="id">ID</label>
                                                                        <input type="text"
                                                                               value="${user.id}"
                                                                               class="form-control"
                                                                               id="id"
                                                                               name ="id"
                                                                               disabled
                                                                               >
                                                                   
                                                                  
                                                                        <label for="userName">First
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userName}"
                                                                               name="userName"
                                                                               class="form-control"
                                                                               id="userName">
                                                             
                                                             
                                                                        <label for="userLastName">Last
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userLastName}"
                                                                               name="userLastName"
                                                                               class="form-control"
                                                                               id="userLastName">
                                                                 
                                                                        <label for="age">Age</label>
                                                                        <input type="number"
                                                                               value="${user.age}"
                                                                               name="age"
                                                                               class="form-control"
                                                                               min="1" value="1"
                                                                               id="age">
                                                                   
                                                                        <label for="email">Email</label>
                                                                        <input type="text"
                                                                               value="${user.email}"
                                                                               class="form-control"
                                                                               name="email"
                                                                               id="email">
                                                                   
                                                                        <label for="password">Password</label>
                                                                        <input type="text"
                                                                               value="${user.password}"
                                                                               class="form-control"
                                                                         
                                                                               name="password"
                                                                               id="password">
                                                                   
                                                                        <label>Role</label>
                                                                        <select name="roles" id="roles"
                                                                                class="form-control" size="2" multiple
                                                                                aria-label="multiple select example">
                                                                            <option value="USER">USER</option>
                                                                            <option value="ADMIN">ADMIN</option>
                                                                        </select>
                                                                  
                
                
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let userName = modal.find("#userName").val().trim();
        let userLastName = modal.find("#userLastName").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim();


        let options = [];
        let val = [];

        val = modal.find("#roles").val();
        let x = "x";
        let y = "y";

        if (val[0] !== undefined) {
            x = val[0];
            console.log(1);
        }
        if (val[1] !== undefined) {
            y = val[1];
            console.log(2);
        }

        if (x == "USER") {
            options.push({
                "id": 1,
                "role": "USER"
            });
        } else if (x == "ADMIN") {
            options.push({
                "id": 2,
                "role": "ADMIN"
            });
        }
        if (y == "ADMIN") {
            options.push({
                "id": 2,
                "role": "ADMIN"
            });
        }


        let data = {
            id: id,
            userName: userName,
            userLastName: userLastName,
            age: age,
            email: email,
            password: password,
            roles: options

        }
        console.log(data);
        const response = await userFetchService.updateUser(data, id);
        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

async function deleteUser(modal, id) {

    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();


    modal.find('.modal-title').html('Delete user');

    let deleteButton = `<button  class="btn btn-outline-success" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>;`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
            
       
                                                               
                                                                        <label for="id">ID</label>
                                                                        <input type="text"
                                                                               value="${user.id}"
                                                                               class="form-control"
                                                                               id="id"
                                                                               name ="id"
                                                                               disabled
                                                                               >
                                                                   
                                                                  
                                                                        <label for="userName">First
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userName}"
                                                                               name="userName"
                                                                               class="form-control"
                                                                               id="userName"
                                                                               disabled>
                                                             
                                                             
                                                                        <label for="userLastName">Last
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userLastName}"
                                                                               name="userLastName"
                                                                               class="form-control"
                                                                               id="userLastName"
                                                                               disabled>
                                                                 
                                                                        <label for="age">Age</label>
                                                                        <input type="number"
                                                                               value="${user.age}"
                                                                               name="age"
                                                                               class="form-control"
                                                                               min="1" value="1"
                                                                               id="age"
                                                                               disabled>
                                                                   
                                                                        <label for="email">Email</label>
                                                                        <input type="text"
                                                                               value="${user.email}"
                                                                               class="form-control"
                                                                               name="email"
                                                                               id="email"
                                                                               disabled>
                                                                   
                                                                        <label for="password">Password</label>
                                                                        <input type="text"
                                                                               value="${user.password}"
                                                                               class="form-control"
                                                                         
                                                                               name="password"
                                                                               id="password"
                                                                               disabled>
                                                                   
                                                                        <label>Role</label>
                                                                        <select name="roles" id="roles" disabled
                                                                                class="form-control" size="2" multiple
                                                                                aria-label="multiple select example">
                                                                            <option value="USER">USER</option>
                                                                            <option value="ADMIN">ADMIN</option>
                                                                        </select>
                                                                  
                
                
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })
    $("#deleteButton").on('click', async () => {

        await userFetchService.deleteUser(id);
        getTableWithUsers();
        modal.modal('hide');
    })

}


async function addNewUser() {
    $('#addNewUserButton').click(async () => {

        let addUserForm = $('#defaultSomeForm')
        let addUserName = addUserForm.find("#addUserName").val().trim();
        let addUserLastName = addUserForm.find("#addUserLastName").val().trim();
        let addAge = addUserForm.find("#addAge").val().trim();
        let addEmail = addUserForm.find("#addEmail").val().trim();
        let addPassword = addUserForm.find("#addPassword").val().trim();


        let addOptions = [];
        let addVal = [];

        addVal = addUserForm.find("#addRoles").val();
        let addx = "x";
        let addy = "y";

        if (addVal[0] !== undefined) {
            addx = addVal[0];
        }
        if (addVal[1] !== undefined) {
            addy = addVal[1];
        }

        if (addx == "USER") {
            addOptions.push({
                "role": "USER"
            });
        } else if (addx == "ADMIN") {
            addOptions.push({
                "role": "ADMIN"
            });
        }
        if (addy == "ADMIN") {
            addOptions.push({
                "role": "ADMIN"
            });
        }


        let data = {
            userName: addUserName,
            userLastName: addUserLastName,
            age: addAge,
            email: addEmail,
            password: addPassword,
            roles: addOptions

        }
        console.log(data);


        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            $('#nav-tab a[href="#nav-home"]').tab('show');
            getTableWithUsers();
            addUserForm.find("#addUserName").val('');
            addUserForm.find("#addUserLastName").val('');
            addUserForm.find("#addAge").val('');
            addUserForm.find("#addEmail").val('');
            addUserForm.find("#addPassword").val('');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })
}