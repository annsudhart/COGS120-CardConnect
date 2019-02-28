function validateLogin() {
    console.log("Validating login ...");
    console.log("username: " + username + ", password: " + password);
    if(document.forms['login'].username.value == "" ||
        document.forms['login'].password.value == "") {
            alert("Username or password is empty. Please try again.");
    } else {
        window.location = "contactlist";
    }
}