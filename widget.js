window.addEventListener('DOMContentLoaded', init)

function init() {
    console.log("DOM loaded");
    let num = Number(document.getElementById('rating').getAttribute('max'));
    const star = [];
    for(let i = 0; i < num; i++) {
        star[i] = document.createElement('rating-star');
        document.body.appendChild(star[i]);
        star[i].setAttribute('id', 'star' + (i+1));
        console.log(i);
    };

    for(let i = 0; i < num; i++) {
        star[i].addEventListener('click', (e)=> {
            for(let j = 0; j <= i; j++) {
                star[j].classList.add('clicked');
                star[j].classList.remove('unclicked');
            };
            for(let k = num-1; k > i; k--) {
                star[k].classList.add('unclicked');
                star[k].classList.remove('clicked');
            };

            let message = document.querySelector('rating-response');
            if (message) {
                document.body.removeChild(message);
            }
            message = document.createElement('rating-response');
            document.body.appendChild(message);
            message.shadowRoot.innerHTML = '<br>Thanks for your '+ (i+1) + ' star rating!';
            
            if((i+1)/num < 0.8) {
                message.shadowRoot.innerHTML = '<br>Thanks for your '+ (i+1) + ' star rating, we will try to do better.'
            }

            let payload = new FormData();

            payload.append('question', 'How Satisfied are you?');
            payload.append('raintg', 1);
            payload.append('sentBy', 'js');

            this.fetch("https://httpbin.org/post", {
                method: 'POST',
                headers: {
                    'X-Sent-By': 'JavaScript', 
                },
                body: payload,
            });
        });
    };
};

customElements.define('rating-widget', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = '<label>How satisfied are you?</label>';
    };
});

customElements.define('rating-star', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback () {
        this.innerHTML ='&#9733';
    }
});

customElements.define('rating-response', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML= '<br>';
    }
});