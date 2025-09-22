// # OPERAZIONI DA FARE AD AVVIO PAGINA

// Recupero gli elementi di interesse dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';//se esiste qualcosa di preesistente nello storage

// Preparo una lista di attività
let activities = []; /*creare una variabile che voglio cambiare */

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);//jSON.parse prende una stringa e lo trasforma in array
}

// Chiedo a JS di decidere cosa mostrare
showContent();

// # OPERAZIONI DINAMICHE 
// Reagisco al click del bottone
button.addEventListener('click', function () {
  // Chiedo di aggiungre l'attività
  addActivity();
});

// # FUNZIONI 

// Funzione che decide cosa mostrare in pagina
function showContent() {
  // Innanzitutto pulisco tutto
  todoList.innerText = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {
    // Se c'è almeno una attività...
    // per ciascuna attività...
    activities.forEach(function (activity) {
      // Crea un template HTML
      const template = createActivityTemplate(activity)

      // Inseriscilo in pagina
      todoList.innerHTML += template;
    });

    // Rendi cliccabili i check
    makeCheckClickable();
   


  } else {
    // ALTRIMENTI
    // Mostra il messaggio di lista vuota
    emptyListMessage.innerText = 'Sembra che non ci siano attività';
   
  }
 

}

// Funzione per rendere i check cliccabili
function makeCheckClickable() {
  // Cerca tutti i check e fa' sì che siano cliccabili
  const checks = document.querySelectorAll('.todo-check');
  // Per ognuno dei check...
  checks.forEach(function (check, index) {
    // Aggiungi una reazione al click
    check.addEventListener('click', function () {
      // Rimuovi l'elemento dalla lista
      activities.splice(index, 1);
      
      // Aggiorna anche il localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

      // Aggiorna la lista in pagina
      showContent();
    });
  })

}


// Funzione per aggiungere un'attività
function addActivity() {
  // Recupero il testo nel campo
  const newActivity = inputField.value.trim();//.trim per far si che non venga un riquadro senza nulla anche se si tocca sul +

  // Se il campo non è vuoto... 
  if (newActivity.length > 0) {

    // Aggiungo l'attività alla lista
    activities.push(newActivity);

    // Aggiorna lo storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));//JSON.stringify prende un array e lo trasforma in stringa

    // Ora, ridecidi cosa mostrare
    showContent();

    // svuoto il campo
    inputField.value = '';
  
  }


}

// Funzione che crea un template HTML per un'attività
function createActivityTemplate(activity) {
  // Restituisci questo pezzo di HTML
  return `
   <li class="todo-item">
     <div class="todo-check">
       <img src="images/check.svg" alt="Check Icon">
     </div>
     <p class="todo-text">${activity}</p>
   </li>
   `;
}

