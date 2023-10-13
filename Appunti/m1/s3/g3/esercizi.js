
//esempio attributi personalizzati

document.querySelector('button')
.addEventListener('click',function(){
    let attributo = this.getAttribute('data-pippo');//prelevo un valore da un attributo
    console.log(attributo);
})
   
       /* ESERCIZIO 9
          Scrivi una funzione che rimuova l'ultima lettera dall'h1 ogni volta che l'utente lo clicca
         */
   
       const makeItClickable = function () {
   
            let h1 = document.querySelector('h1');
            let testoArr = h1.innerText.split('');

            testoArr.pop();

            let nuovoTesto = testoArr.join('');
            h1.textContent = nuovoTesto;
            
        }
        
        document.querySelector('h1')
        .addEventListener('click', makeItClickable);

   
       /* ESERCIZIO 10
          Crea una funzione che, al click sul footer, riveli l'URL del link interno come contenuto di un alert()
         */
   
       const revealFooterLink = function () {
            let url = document.querySelector('a').href;
            alert(url);
       }
       
       document.querySelector('footer')
       .addEventListener('click', revealFooterLink);
   
       /* ESERCIZIO 11
          Crea una funzione che crei una tabella nell'elemento con id "tableArea". 
          La tabella avrà 5 elementi e questa struttura: immagine, nome prodotto, quantità, prezzo
       */
   
       const generateTable = function () {
        
        let target = document.querySelector('#tableArea');

        let tabella = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let primaTr = document.createElement('tr');

        thead.append(primaTr);
        tabella.append(thead, tbody);
        target.append(tabella);     

        let colonne = ['immagine',' nome prodotto', 'quantità', 'prezzo'];

        for(let colonna of colonne){
            let th = document.createElement('th');
            th.textContent = colonna;
            primaTr.append(th);
        }

        let dati = [
            {
                immagine:'urlimmagine', 
                nome_prodotto: 'lorem ipsum', 
                quantità: 1000, 
                prezzo: 18
            },
            {
                immagine:'urlimmagine', 
                nome_prodotto: 'lorem ipsum', 
                quantità: 100, 
                prezzo: 1
            },
            {
                immagine:'urlimmagine', 
                nome_prodotto: 'lorem ipsum', 
                quantità: 1, 
                prezzo: 187
            },
            {
                immagine:'urlimmagine', 
                nome_prodotto: 'lorem ipsum', 
                quantità: 1, 
                prezzo: 145
            },
            {
                immagine:'urlimmagine', 
                nome_prodotto: 'lorem ipsum', 
                quantità: 1000, 
                prezzo: 134
            },
        ]


        for(let riga of dati){
            let tr = document.createElement('tr');
           
            let immagine = document.createElement('td');
            immagine.textContent = riga.immagine

            let nome = document.createElement('td');
            nome.textContent = riga.nome_prodotto

            let quantità = document.createElement('td');
            quantità.textContent = riga.quantità

            let prezzo = document.createElement('td');
            prezzo.textContent = riga.prezzo


            immagine.addEventListener('click',function(){
                console.log("hai cliccato l'immagine");
            })

            tr.append(immagine, nome, quantità, prezzo)
            tbody.append(tr);
        }
       }

       generateTable();
   
       /* ESERCIZIO 12
          Crea una funzione che aggiunga una riga alla tabella precedentemente creata e fornisca i dati necessari come parametri
       */
   
       const addRow = function () {
   
   
       }
   
       /* ESERCIZIO 14
         Crea una funzione che nasconda le immagini della tabella quando eseguita
       */
   
       const hideAllImages = function () {
   
   
       }
   
       /* EXTRA ESERCIZIO 15
         Crea una funzione che cambi il colore del h2 con id "changeMyColor" con un colore random ad ogni click ricevuto
       */
   
       const changeColorWithRandom = function () {
   
   
       }
   
       /* EXTRA ESERCIZIO 16
         Crea una funzione che elimini le vocali da ogni elemento testuale della pagina (puoi aiutarti con i nuovi metodi degli array di ES6)
       */
   
       const deleteVowels = function () {
   
   
       }
   
     