// Recupero gli elementi di interesse dalla pagina
const htmlElement = document.documentElement; //solo per riprendere il tag html
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');

// Provo a recuperare la mia posizione
navigator.geolocation.getCurrentPosition(onSuccess, onError);//navigator serve per recuperare opzioni del browser 

// Funzione da eseguire in caso di errore
function onError() {
  // Preparo degli elementi in pagina per far capire che va attivata la geolocalizzazione
  weatherLocation.innerText = '';
  weatherIcon.alt = "Geolocation disattivata";
  weatherIcon.src = "images/geolocation_disabled.png";
  suggestion.innerText = 'Attiva la geolocalizzazione'

  // Disattivare il loading
  htmlElement.className = '';
}

// Funzione da eseguire in caso di successo
async function onSuccess(position) {

  // Recupero latitudine e longitudine
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Prepariamoci a chiamare l'API di Open Weather
  const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
  const units = 'metric';
  const lang = 'it';

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;


  // Chiamo l' API di Open Weather
  const response = await fetch(endpoint);
  const data = await response.json();

  console.log(data);

  const iconCode = data.weather[0].icon;//.icon perchè le immagini sono nominate con numeri specifici
  const description = data.weather[0].description;

  // Riempio gli elementi della pagina
  weatherLocation.innerText = data.name;
  weatherIcon.alt = description;
  weatherIcon.src = `images/${iconCode}.png`;
  weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;//math.floor arrotonda per difetto
  suggestion.innerText =description;//potrebbe anche essere messo uguale a description per avere suggerimento normale

  // Disattivare il loading
  htmlElement.className = '';
}

