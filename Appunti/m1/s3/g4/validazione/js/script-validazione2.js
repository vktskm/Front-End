let myFormButton = document.querySelector('#myForm .invia');


myFormButton.addEventListener('click', function(e){
    e.preventDefault();

    let nome = document.querySelector('#myForm input[name="nome"]');
    let cognome = document.querySelector('#myForm input[name="cognome"]');
    let email = document.querySelector('#myForm input[name="e-mail"]');
    let password = document.querySelector('#myForm input[name="psw"]');

    let regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
    

    email.pattern = regex;
    

    let valid = true;

    console.log(nome.checkValidity());
    if(!nome.checkValidity()){
        nome.nextElementSibling.textContent = nome.validationMessage
        console.log(nome.validity);
    }else{
        nome.nextElementSibling.textContent = '';
        console.log(nome.validity);
    }

    if(nome.validity.patternMismatch){
        console.log('Pattern errato');
    }
    
    if(!email.checkValidity()){
        email.nextElementSibling.textContent = email.validationMessage
       // console.log(email.validity);
    }else{
        email.nextElementSibling.textContent = '';
    }
    

    if(valid){
        //codice che invia i dati al server
        console.log('inviato');
    }
})


