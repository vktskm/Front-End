let myForm = document.getElementById('myForm');
let myFormButton = document.querySelector('#myForm .invia');

//modalità gestendo il submit sul form
myForm.addEventListener('submit', function(e){
    e.preventDefault();//blocca funzionamenti predefiniti qualora ce ne fossero, per l'elemento selezionato e questo evento

    console.log('inviato');
})

//modalità gestendo il click sul bottone
myFormButton.addEventListener('click', function(e){
    e.preventDefault();

    let campi = document.querySelectorAll('#myForm input');
    let [nome, cognome, email, password] = campi;//se mi serve per ottenere

    let valid = true;

    for(let campo of campi){
        if(campo.value == ''){
            campo.style.outline = '1px solid red';
            campo.nextElementSibling.textContent = `Compila il campo ${campo.placeholder}`
            valid = false;
        }else{
            campo.style.outline = '';
            campo.nextElementSibling.textContent = ``
        }
    }

    if(valid){
        //codice che invia i dati al server
        console.log('inviato');
    }
})