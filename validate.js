function validateName(){
    let name = document.getElementById('name');
    let errorMsgName = document.querySelector('#name + output span');
    if(!name.checkValidity()) {
        errorMsgName.style.visibility = 'visible';
        errorMsgName.textContent = 'This field is required';
    }
};

function validateEmail(){
    let email = document.getElementById('email');
    let errorMsgEmail = document.querySelector('#email + output span');
    let regex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
    console.log(email.value);
    console.log(!regex.test(email.value));
    if(!regex.test(email.value)){
        errorMsgEmail.style.visibility = 'visible';
        errorMsgEmail.textContent = 'Illegal character inputted';
        /*add fade out for error msg*/
    };
}

window.addEventListener('load', function() {
    let button = document.getElementById('submit');
    button.onclick = function() {
        validateName();
    };
    let email = document.getElementById('email');
    email.addEventListener('input', (e) => {
        validateEmail();
    });
});