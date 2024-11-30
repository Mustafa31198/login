var signupName = document.getElementById('sName');
var signupEmail = document.getElementById('sEmail');
var signupPass = document.getElementById('sPass');
var signinEmail = document.getElementById('signinEmail');
var signinPass = document.getElementById('signinPass');




var users = [];
if (localStorage.getItem('username')&&
location.pathname =="/home.html") {
    document.getElementById('username').innerHTML=`<span class="me-2">Welcome</span>`+localStorage.getItem('username')
}
if (localStorage.getItem('user')) {
    users = JSON.parse(localStorage.getItem('user'))

}




function signup() {

    if (validateForm(signupName) &&
        validateForm(signupEmail) &&
        validateForm(signupPass)  
    ) {
        
        if(validatestore(signupEmail)){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        var user = {
            name: signupName.value,
            email: signupEmail.value,
            pass: signupPass.value
        };
        users.push(user);
        clearForm();
        localStorage.setItem('user', JSON.stringify(users));
        setTimeout(function () {
            location.pathname = "/index.html"
        }, 1500)
    }else{
        Swal.fire("Email is not avilable");
    }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Sorry",
            text: "Something went wrong!"
        });
    };
};

function clearForm() {
    signupName.value = null;
    signupEmail.value = null;
    signupPass.value = null;

    signupName.classList.remove('is-valid');
    signupEmail.classList.remove('is-valid');
    signupPass.classList.remove('is-valid');
};

function validateForm(ele) {
    var regex = {
        sName: /^\w{3,}(\s+\w+)*$/,
        sEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        sPass: /^.{5,}$/
    };
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        ele.nextElementSibling.classList.add('d-none');
        return true;
    } else {
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        ele.nextElementSibling.classList.remove('d-none');
        return false;
    };
};





function validatestore(ele) {
    for (var i = 0; i < users.length; i++) {
        if (signupEmail.value == users[i].email) {
            ele.classList.remove('is-valid');
            ele.classList.add('is-invalid');
            return false;
        }
    }
    ele.classList.remove('is-invalid');
    ele.classList.add('is-valid');
    return true;
}

function login() {
    var login = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == signinEmail.value) {
            if (users[i].pass == signinPass.value) {
                localStorage.setItem('username', users[i].name);
                login = true;
                location.pathname = "/home.html";
            }
            break;
        }
    };
    if (login == false) {
        Swal.fire("Wrong Email or Password");
    };
}

function logout() {
   




    Swal.fire({
        title: "Are you sure?",
        text: "You want to Logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "ok",
            text: "See you later",
            icon: "success"
          });
          setTimeout(function () {
            location.pathname = "/index.html";
        }, 1500)
        }
      });
 
}




