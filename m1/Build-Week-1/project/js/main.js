(function acceptButton() {
    //seleziono tramite id gli elementi del dom che ci servono
    const btn = document.getElementById('acceptBtn');
    const checkB = document.getElementById('consenso');
    // aggiungo l'evento che al click del bottone porta alla pagina del quiz 
    btn.addEventListener('click', () => {
        if (checkB.checked) {
            document.querySelector('.container').remove();
            //build quiz
            let quizTemplate = document.getElementsByTagName('template')[0];      //qui viene creata la pagina dei quiz tramite template
            let cloneQuiz = quizTemplate.content.cloneNode(true);
            document.getElementById('div-quiz').append(cloneQuiz);
            getQuestions();
            addBtnsEvents();
            buildTimer();
            
        } else {
            document.getElementById('avviso').classList.remove('mostraAvviso')
        }
    })
    // aggiungo l'evento alla checkbox in modo che al moment. della compilazione il messaggio sparisca
    checkB.addEventListener('click', () => {
        if (checkB.checked == true) {
            document.getElementById('avviso').classList.add('mostraAvviso')
        }
    })
  // Easteregg x michele
    let easterEgg = document.querySelector('#easter');
    let audioEgg = document.querySelector('#audioIntro');
    let videoEgg = document.querySelector('#videoIntro');
    easterEgg.addEventListener('click', function () {
      audioEgg.play()
      setTimeout(function () {
          videoEgg.classList.remove('scomparsa');
          videoEgg.play();
      }, 21000)
      setTimeout(function () {
          videoEgg.classList.add('scomparsa');
      }, 35000)
  })
})()





// Qui sotto tutto il codice JS per il questionario

let questionsArr = [];
let shuffledQuestions = [];
let selectedQuestion = {};
let counterQuestions = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timerInterval = null;

// tempo limite
const TIME_LIMIT = 60;

// due variabili per controllare il timer
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const FULL_DASH_ARRAY = 283;
// cambio di colore a 20s
const WARNING_THRESHOLD = 20;
// colore di allerta a 10s
const ALERT_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let remainingPathColor = COLOR_CODES.info.color;

//funzione che viene eseguita all'entrata nella sezione del questionario
//deposito in un array globale il risultato del fetch, in modo da poterlo usare nelle altre funzioni
//infine avvio la funzione buildQuiz che si occuperà di strutturare la pagina
async function getQuestions() {
  let containerDomanda = document.getElementById('contenitoreDomanda');
  let target = document.getElementById('contenitoreRisposte');
  let numDomanda = document.getElementById('numeroDomande');
  let timer = document.getElementById('timer');
  containerDomanda.style.opacity = 0;
  target.style.opacity = 0;
  numDomanda.style.opacity = 0;
  timer.style.opacity = 0;

  fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy').then(async function (res) {
    let json = await res.json();
    questionsArr = json.results;
    shuffledQuestions = shuffle(questionsArr);
    buildQuiz();
  })
}

//funzione che anima il logo al refresh delle domande
function animLogo() {
  let logo = document.querySelector('.nav img');
  if (!logo.classList.contains('animate-logo')) {
    logo.classList.add('animate-logo');
    return true;
  } else {
    logo.classList.remove('animate-logo');
  }
}

//qui aggiungiamo gli eventi click ai vari pulsanti delle risposte
function addBtnsEvents() {
  let target = document.getElementById('contenitoreRisposte');
  let risposte_1 = target.querySelector('.risposte-1');
  let risposte_2 = target.querySelector('.risposte-2');

  risposte_1.firstElementChild.addEventListener('click', function () {
    doBtnEvents(1, 1);
  });
  risposte_2.firstElementChild.addEventListener('click', function () {
    doBtnEvents(2, 1);
  });

  if (risposte_1.children.length == 2) {
    risposte_1.lastElementChild.addEventListener('click', function () {
      doBtnEvents(1, 2);
    });
  }
  if (risposte_2.children.length == 2) {
    risposte_2.lastElementChild.addEventListener('click', function () {
      doBtnEvents(2, 2);
    });
  }
}

//qui la funzione che controlla la correttezza delle domande e salva il risultato nel localStorage
//infine si lancia nuovamente la funzione buildQuiz che ricostruisce la pagina con la nuova domanda
function doBtnEvents(ind, num) {
  let actualAnswer = "";
  if (ind == 1) {
    let risposte_1 = document.querySelector('.risposte-1');
    if (num == 1) {
      let btn = risposte_1.firstElementChild;
      actualAnswer = btn.textContent;
    } else {
      let btn = risposte_1.lastElementChild;
      actualAnswer = btn.textContent;
    }
  } else {
    let risposte_2 = document.querySelector('.risposte-2');
    if (num == 1) {
      let btn = risposte_2.firstElementChild;
      actualAnswer = btn.textContent;
    } else {
      let btn = risposte_2.lastElementChild;
      actualAnswer = btn.textContent;
    }
  }

  actualAnswer == selectedQuestion.correct_answer ? correctAnswers += 1 : wrongAnswers += 1;
  localStorage.setItem('correctAnswers', correctAnswers);
  localStorage.setItem('wrongAnswers', wrongAnswers);

  buildQuiz();
}

function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }
    return newArray
  }
  
  function buildQuiz() {
    if (shuffledQuestions.length == 0) {
      onTimesUp();
      document.getElementById('div-quiz').remove();
      setIntermezzoQuizResult();
      //questa funzione viene eseguita al termine del questionario. Lancia la funzione per costruire la pagina successiva
    } else {
      //qui invece si costruisce il quiz
      let containerDomanda = document.getElementById('contenitoreDomanda');
      let target = document.getElementById('contenitoreRisposte');
      let numDomanda = document.getElementById('numeroDomande');
      let timer = document.getElementById('timer');
  
      containerDomanda.style.opacity = 0;
      target.style.opacity = 0;
      numDomanda.style.opacity = 0;
      timer.style.opacity = 0;
      animLogo();
  
      let risposte_1 = target.querySelector('.risposte-1');
      let risposte_2 = target.querySelector('.risposte-2');
      let random = Math.floor(Math.random() * (shuffledQuestions.length));
      let primo_titolo = document.querySelector('.prima-parte');
      selectedQuestion = shuffledQuestions[random];
  
      primo_titolo.innerHTML = shuffledQuestions[random].question;
      onTimesUp();
      timePassed = 0;
      timeLeft = 60;
      buildTimer();
      startTimer();
  
      let tmpSelectedQuestion = [];
      let shuffledSelectedQuestion = [];
  
      if (selectedQuestion.type == "boolean") {
        //se la domanda contiene solo due risposte possibili
        tmpSelectedQuestion.push(selectedQuestion.correct_answer);
        tmpSelectedQuestion.push(selectedQuestion.incorrect_answers[0]);
        shuffledSelectedQuestion = shuffle(tmpSelectedQuestion);
  
        if (risposte_1.children.length == 2) {
          risposte_1.removeChild(risposte_1.lastElementChild);
        }
        if (risposte_2.children.length == 2) {
          risposte_2.removeChild(risposte_2.lastElementChild);
        }
        let newB1 = document.createElement('button');
        newB1.classList.add('risposte');
        newB1.id = "risposta1";
        newB1.innerHTML = shuffledSelectedQuestion[0];
        risposte_1.replaceChild(newB1, risposte_1.firstElementChild);
  
        let newB2 = document.createElement('button');
        newB2.classList.add('risposte');
        newB2.id = "risposta3";
        newB2.innerHTML = shuffledSelectedQuestion[1];
        risposte_2.replaceChild(newB2, risposte_2.firstElementChild);
  
      } else {
        //se la domanda contiene 4 risposte possibili
        let tmpSelectedQuestion = [];
        let shuffledSelectedQuestion = [];
  
        tmpSelectedQuestion.push(selectedQuestion.correct_answer);
        tmpSelectedQuestion.push(selectedQuestion.incorrect_answers[0]);
        tmpSelectedQuestion.push(selectedQuestion.incorrect_answers[1]);
        tmpSelectedQuestion.push(selectedQuestion.incorrect_answers[2]);
        shuffledSelectedQuestion = shuffle(tmpSelectedQuestion);
  
        let tmpBtn = document.createElement('button');
        let tmpBtn2 = document.createElement('button');
        if (risposte_1.children.length == 1) {
          risposte_1.appendChild(tmpBtn);
        }
        if (risposte_2.children.length == 1) {
          risposte_2.appendChild(tmpBtn2);
        }
  
        let newB1 = document.createElement('button');
        newB1.classList.add('risposte');
        newB1.id = "risposta1";
        newB1.innerHTML = shuffledSelectedQuestion[0];
        risposte_1.replaceChild(newB1, risposte_1.firstElementChild);
  
        let newB2 = document.createElement('button');
        newB2.classList.add('risposte');
        newB2.id = "risposta2";
        newB2.innerHTML = shuffledSelectedQuestion[1];
        risposte_1.replaceChild(newB2, risposte_1.lastElementChild);
  
        let newB3 = document.createElement('button');
        newB3.classList.add('risposte');
        newB3.id = "risposta3";
        newB3.innerHTML = shuffledSelectedQuestion[2];
        risposte_2.replaceChild(newB3, risposte_2.firstElementChild);
  
        let newB4 = document.createElement('button');
        newB4.classList.add('risposte');
        newB4.id = "risposta4";
        newB4.innerHTML = shuffledSelectedQuestion[3];
        risposte_2.replaceChild(newB4, risposte_2.lastElementChild);
      }
      counterQuestions++;
      numDomanda.innerHTML = `QUESTION ${counterQuestions} <span id="domandeRimaste">&nbsp;/ 10</span>`;
      shuffledQuestions.splice(random, 1);
  
      setTimeout(function () {
        containerDomanda.style.opacity = 1;
        target.style.opacity = 1;
        numDomanda.style.opacity = 1;
        timer.style.opacity = 1;
        animLogo();
      }, 1000)
      addBtnsEvents();
    }
  }
  
  
  function buildTimer() {
    //seleziona l'elemento HTML dove visualizzare il timer
    let timer = document.getElementById("timer");
    timer.innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        ${timeLeft}
      </span>
    </div>
    `;
  }
  
  function onTimesUp() {
    clearInterval(timerInterval);
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = timeLeft;
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
        buildQuiz();
      }
    }, 1000);
  }
  
  // Divide il tempo rimanente per il tempo limite
  function calculateTimeFraction() {
    return timeLeft / TIME_LIMIT;
  }
  
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  
  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  
  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
  
    // If the remaining time is less than or equal to 10, remove the "warning" class and apply the "alert" class.
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
  
      // If the remaining time is less than or equal to 20, remove the base color and apply the "warning" class.
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  


//script funzioni pagina intermezzo quiz-result

function setIntermezzoQuizResult() {
  let intermezzoTemplate = document.getElementsByTagName('template')[1];
  let cloneIntermezzo = intermezzoTemplate.content.cloneNode(true);
  let divInt = document.getElementById('intermezzo-welcome-quiz'); 
  divInt.append(cloneIntermezzo);
  let p1 = document.querySelector('.first-p');
  let p2 = document.querySelector('.second-p');
  setTimeout(function() {
    p1.style.opacity = 1;
  }, 1000);
  setTimeout(function() {
    p2.style.animation = "fadeIn 1.5s";
    p2.style.opacity = 1;
  }, 2500);

  setTimeout(function() {
    let vid = document.querySelector('.corriere');
    p1.style.display = "none";
    p2.style.display = "none";
    vid.classList.remove('displayNone');
    vid.play();
  }, 5500);


  setTimeout(function() {
    divInt.remove();
    let resultTemplate = document.getElementsByTagName('template')[2];
    let cloneResult = resultTemplate.content.cloneNode(true);
    document.getElementById('div-result').append(cloneResult);
    setResultPage();
    inserisciValori();
    calcolaPercentuali();
    risultatoTest();
  }, 16000)
}




// qui sotto lo script JS per la pagina Results

let domande = 10
let corrette = 0;
let sbagliate = 0;
let percentCorrette;
let percentSbagliate;

function setResultPage() {
    corrette = localStorage.getItem("correctAnswers");
    sbagliate = localStorage.getItem("wrongAnswers");
    let btn = document.querySelector('.rateButton');
    btn.addEventListener('click', function() {
        document.getElementById('div-result').remove();
        let reviewTemplate = document.getElementsByTagName('template')[3];
        let cloneTemplate = reviewTemplate.content.cloneNode(true);
        let divTemplate = document.getElementById('div-review');
        divTemplate.append(cloneTemplate);
        reviewInit();
    })
      const ctx = document.getElementById('myChart');
      new Chart(ctx, {
      type: 'doughnut',
      data: {
          // labels: ['Risposte sbagliate', 'Risposte corrette'],
          datasets: [{
          label: '# of Questions',
          data: [sbagliate, corrette],
          backgroundColor: [
              '#C2128D',
              "#00FFFF",
          ],
          borderWidth: 0,
          cutout: 145

          }]
      }
    });
  }

function inserisciValori() {
  let numeroCorrette = document.getElementById("numeroCorrette")
  let numeroSbagliate = document.getElementById("numeroSbagliate")
  let numeroDomande = document.querySelectorAll(".numeroDomande")

  for (const domanda of numeroDomande) {
    domanda.textContent = domande
  }
  numeroCorrette.textContent = corrette
  numeroSbagliate.textContent = sbagliate
}

function calcolaPercentuali() {
    let percentualeCorrette = document.getElementById("percentualeCorrette")
    let percentualeSbagliate = document.getElementById("percentualeSbagliate")
    percentCorrette = (corrette / domande) * 100
    percentSbagliate = (sbagliate / domande) * 100
    percentualeCorrette.textContent = percentCorrette.toFixed(1) + "%"
    percentualeSbagliate.textContent = percentSbagliate.toFixed(1) + "%"
  }

function risultatoTest() {
    let risultato = document.getElementById("complimenti")
    let descrizione = document.getElementById("descrizione")
    let suonoBocciatura = document.getElementById("suonoBocciatura")
    let suonoPromozione = document.getElementById("suonoPromozione")
  
    if (percentCorrette >= 60) {
      suonoPromozione.play();
      risultato.textContent = "Congratualations!"
      descrizione.textContent = "you passed the exam!"
      risultato.style.color = "#00FFFF"
    } else {
      suonoBocciatura.play();
      risultato.textContent = "We are sorry.."
      descrizione.textContent = "you didn't passed the exam.."
      risultato.style.color = "#C2128D"
    }
}




// qui sotto il codice JS per la pagina Review
let starsArr = [];

  function reviewInit() {
    starsArr = document.querySelectorAll('.stars-container svg');
    starsArr.forEach((star, i) => {
        star.addEventListener('click', function () {
            setFill(i);
            // salvo l'indice dell'ultima stella selezionata nel localStorage
            localStorage.setItem('votoStelle', i + 1);
        })
    }) //imposto l'evento click a tutti gli svg (stelle) e gli dico di eseguire la funzione setFill quando appunto si clicca sulla stella. setFill prende come parametro il numero della stella, utile poi sotto per il ciclo

    const salvataggioIndex = localStorage.getItem('votoStelle');

    if (salvataggioIndex) {
        setFill(parseInt(salvataggioIndex, - 1));
    }
    setForm();
  }

  function setFill(index) {
    for (let x = 0; x < starsArr.length; x++) {
        if (starsArr[x].classList.contains('stars-svg-with-color')) {
            starsArr[x].classList.remove('stars-svg-with-color');
        }
    } //ripulisco tutte le stelle, ossia tolgo l'eventuale sfondo azzurro presente in tutte le stelle

    for (let i = 0; i <= index; i++) {
        starsArr[i].classList.add('stars-svg-with-color');
    } //applico lo sfondo azzurro a tutte le stelle dalla prima fino a quella selezionata, le altre rimangono pulite
}

function setForm() {
    let campoForm = document.querySelector('form');
    campoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const commentiInput = document.querySelector('.user-review');
        localStorage.setItem('feedback', commentiInput.value);
        
        let divRev = document.getElementById('div-review');
        divRev.remove();
        let divGrazie = document.getElementById('div-grazie');
        let grazieTemplate = document.getElementsByTagName('template')[4];
        let cloneTemplate = grazieTemplate.content.cloneNode(true);
        divGrazie.append(cloneTemplate);
        let p1 = document.querySelector('.first-p');
        let p2 = document.querySelector('.second-p');
        setTimeout(function() {
          p1.style.opacity = 1;
        }, 1000);
        setTimeout(function() {
          p2.style.animation = "fadeIn 1.5s";
          p2.style.opacity = 1;
        }, 2500);
    })
}