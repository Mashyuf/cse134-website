function validate() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let comment = document.getElementById('comment');
    let errorMsgName = document.querySelector('#name + output span');
    let errorMsgEmail = document.querySelector('#email + output span');
    let errorMsgComment = document.querySelector('#errorMsgComment');

    if(!name.checkValidity()) {
        errorMsgName.style.visibility = 'visible';
        errorMsgName.textContent = 'This field is required';
    }

    if(!email.checkValidity()) {
        errorMsgEmail.style.visibility = 'visible';
        errorMsgEmail.textContent = 'This field is required';
    }

    if(!comment.checkValidity()) {
        errorMsgComment.style.visibility = 'visible';
        errorMsgComment.textContent = 'This field is required';
    }
};

function validateEmail() {
    let email = document.getElementById('email');
    let errorMsgEmail = document.querySelector('#email + output span');
    let regexEmail = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

    if(!regexEmail.test(email.value)){
        errorMsgEmail.textContent = 'Illegal character inputted';
        errorMsgEmail.style.visibility = 'visible';
        errorMsgEmail.style.opacity = '1';
        let interval = setInterval(() => {
            if (errorMsgEmail.style.opacity < 0.1) {
                clearInterval(interval);
            } else {
                errorMsgEmail.style.opacity -= 0.1;
            }
        }, 150);
    };
}

function validateComment() {
    let comment = document.getElementById('comment');
    let errorMsgComment = document.querySelector('#errorMsgComment');
    let regexComment = /^[A-Za-z0-9,. ]+$/

    if(!regexComment.test(comment.value)) {
        errorMsgComment.textContent = 'Illegal Entry';
        errorMsgComment.style.visibility = 'visible';
        errorMsgComment.style.opacity = '1';
        let interval = setInterval(() => {
            if (errorMsgComment.style.opacity < 0.1) {
                clearInterval(interval);
            } else {
                errorMsgComment.style.opacity -= 0.1;
            }
        }, 150);
    }
}

function wordCountdown() {
    let comment = document.getElementById('comment');
    let errorMsgComment = document.querySelector('#errorMsgComment');
    let wordCountdown = document.querySelector('#wordCountdown');
    let charRemain = 100 - comment.value.length;

    wordCountdown.textContent = `${charRemain} Characters Remaning`;

    if(charRemain < 20) {
        wordCountdown.style.color = 'red';
    } else if(charRemain >= 20) {
        wordCountdown.style.color = 'black';
    }

    if(charRemain < 0) {
        wordCountdown.style.color = 'red';
        errorMsgComment.textContent = 'You have exceeded the character limit';
        errorMsgComment.style.visibility = 'visible';
    }
}

window.addEventListener('load', function() {
    let button = document.getElementById('submit');
    let form = this.document.querySelector('form');
    let name = document.getElementById('name');
    let bots = document.getElementById('possible_bot');
    let form_errors = [];
    button.onclick = function() {
        validate();
        if(!name.validity.valid) {
            form_errors.push(JSON.stringify({name: name.value, email: email.value, comment: comment.value}));
        } else if(!email.validity.valid) {
            form_errors.push(JSON.stringify({name: name.value, email: email.value, comment: comment.value}));
        } else if(!comment.validity.valid) {
            form_errors.push(JSON.stringify({name: name.value, email: email.value, comment: comment.value}));
        }
    };

    let email = document.getElementById('email');
    email.addEventListener('input', (e) => {
        validateEmail();
    });

    let comment = document.getElementById('comment');
    comment.addEventListener('input', (e) => {
        validateComment();
        wordCountdown();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let payload = new FormData();
        payload.append('name', name.value);
        payload.append('email', email.value);
        payload.append('comment', comment.value);
        payload.append('form_errors', form_errors);
        payload.append('possible_bot', bots.value);

        this.fetch("https://httpbin.org/post", {
            method: 'POST',
            body: payload,
        });
    });
});