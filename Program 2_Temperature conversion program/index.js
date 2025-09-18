const textbox = document.getElementById("textbox"); 
const toFahrenheit = document.getElementById("tofahrenheit"); 
const toCelsius = document.getElementById("tocelsius");       
const result = document.getElementById("result");
let temperature;

function convertTemperature(){

    temperature = parseFloat(textbox.value);
    if(isNaN(temperature)){
        result.innerHTML = "Please enter a valid number";
        return;
    }
    if(toFahrenheit.checked){
        let fahrenheit = (temperature * 9/5) + 32;
        result.textContent = `${fahrenheit.toFixed(2)}°F`;
    } else if(toCelsius.checked){
        let celsius = (temperature - 32) * 5/9;
        result.textContent = `${celsius.toFixed(2)}°C`;
    } else {
        result.textContent = "Please select a conversion option";
    }
}