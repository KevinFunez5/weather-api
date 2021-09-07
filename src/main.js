import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function checkNumber(number) {
  if (number < 0) {
    return new Error("Not a valid number!");
  } else {
    return true;
  }
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${Math.round((parseInt(response.main.temp) - 273.15) * 9/5 + 32)} degrees.`);
      $('.showClouds').text(`The clouds is ${response.clouds.all}%`);
    }

    try {
      const isNumberValid = checkNumber(city);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError("Not a valid number!");
      } else {
        console.log("Try was successful, so no need to catch!");
        $('#displayNumber').text("This number is valid. You may continue.");
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
    
  });
});