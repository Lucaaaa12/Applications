const langButtons = document.querySelectorAll('.lang-button');//All per far si di prendere in considerazione tutti gli elementi html langButton
const textInput = document.querySelector('.text-input');
const translationText = document.querySelector('.translation-text');
const translationFlag = document.querySelector('.translation-flag');
const resetButton = document.querySelector('.reset-button');

function reset() {
  textInput.value = '';
  translationText.innerText = 'Traduzione';
  translationFlag.innerText = '';
}

async function translate(text, lang, flag) {
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=it|${lang}`;
  //async indica che la chiamata al server non è sincrona
  // Querystring: passaggio di dati al server dati
  // Parametri utilizzati: sono q(stringa da tradurre) e langpair(coppia lingua di origine e destinazione)
  //? indica l'inizio della querystring ed ogni valore è superato da &

  const response = await fetch(url);
  const jsonData = await response.json();
  //fetch: funzionalità che consente che consnte di interagire ccon servizi secondari come API)
  //Json(javascript object notation) serve per lo scambio di dati tra server e applicazioni
  //Json fornisce un dato pronto per l'utilizzo sottoforma di testo che può essere letto da javascript a partire dal client server 
  const result = jsonData.responseData.translatedText; 
  console.log(result);
  translationText.innerHTML = result;
  translationFlag.innerText = flag;
}

langButtons.forEach(function(langButton) { //forEach serve per indicare le iterazioni per ogni singolo tasto 
  langButton.addEventListener('click', function() {
    
    // recupero il testo dal campo di input e rimuovo eventuali spazi extra
    // all'inizio e alla fine della stringa inserita con il metodo .trim()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const text = textInput.value.trim();// textInput per accedere al valore da html
    // recupero il codice lingua dal data-attribute del pulsante da HTML
    const lang = langButton.dataset.lang;
    // recupero la bandierina dalla testo del pulsante da HTML
    const flag = langButton.innerText;


    // se il campo di input ha effettvamente del testo
    // invoco la funzione e faccio partire la chiamata alle API
    if(text.length > 0) {
      translate(text, lang, flag);
    }
  });
});

resetButton.addEventListener('click', reset);







