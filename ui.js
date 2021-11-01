import storage from "./storage";
import weatherData from "./weather";

//User Interface/DOM related properties and methods
const UI = {
  loadSelector() {
    const cityElm = document.querySelector("#city");
    const cityInfoElm = document.querySelector("#w-city");
    const iconElm = document.querySelector("#w-icon");
    const temperatureElm = document.querySelector("#w-temp");
    const pressureElm = document.querySelector("#w-pressure");
    const humidityElm = document.querySelector("#w-humidity");
    const feelElm = document.querySelector("#w-feel");
    const formElm = document.querySelector("#form");
    const countryElm = document.querySelector("#country");
    const messageElm = document.querySelector("#messageWrapper");
    return {
      cityElm,
      countryElm,
      cityInfoElm,
      iconElm,
      temperatureElm,
      pressureElm,
      humidityElm,
      feelElm,
      formElm,
      messageElm,
    };
  },
  hideMessage() {
    const { messageElm } = this.loadSelector();
    setTimeout(() => {
      messageElm.innerHTML = "";
    }, 2000);
  },
  showMessage(msg) {
    const { messageElm } = this.loadSelector();
    const elm = `<div class='alert alert-danger'>${msg}</div>`;
    messageElm.innerHTML = elm;
    //hiding message
    this.hideMessage();
  },
  validateInput(city, country) {
    if (city === "" || country === "") {
      this.showMessage("please provide necessary information");
      return false;
    }
    return true;
  },
  getInput() {
    const { cityElm, countryElm } = this.loadSelector();
    const city = cityElm.value;
    const country = countryElm.value;

    //validate input
    const isValidated = this.validateInput(city, country);
    // if(!isValidated) return;
    return { city, country, isValidated };
  },
  clearInput() {
    const { cityElm, countryElm } = this.loadSelector();
    cityElm.value = "";
    countryElm.value = "";
  },
  getIcon(iconCode) {
    return "https://openweathermap.org/img/w/" + iconCode + ".png";
  },
  async getAndPopulateUI() {
    //load data from localStorage
    const { city, country } = storage.getData();
    //setting to weatherData and calling API
    weatherData.city = city;
    weatherData.country = country;
    //calling API
    const data = await weatherData.getData();
    //populate UI
    console.log(this);
    if (data) {
      this.populateUI(data);
    }
  },
  populateUI(data) {
    const {
      cityInfoElm,
      iconElm,
      temperatureElm,
      pressureElm,
      humidityElm,
      feelElm,
    } = this.loadSelector();
    // console.log(data);

    const { main, weather, name: cityName } = data;

    const url = this.getIcon(weather[0].icon);

    //setting element
    cityInfoElm.textContent = cityName;
    feelElm.textContent = weather[0].main;
    temperatureElm.textContent = `Temperature: ${main.temp}°C`;
    pressureElm.textContent = `Pressure: ${main.pressure} Kpa`;
    humidityElm.textContent = `Humidity: ${main.humidity}`;
    iconElm.setAttribute("src", url);
  },
  init() {
    const { formElm } = this.loadSelector();
    formElm.addEventListener("submit", async (e) => {
      e.preventDefault();
      //take input
      const { city, country, isValidated } = this.getInput();
      //clear input
      this.clearInput();
      if (isValidated) {
        //saving data to local storage
        storage.city = city;
        storage.country = country;
        //saving to local storage
        storage.saveData();
        //setting city and country
        weatherData.city = city;
        weatherData.country = country;
        //getting data from API
        const data = await weatherData.getData();
        //populate UI
        if (data) {
          this.populateUI(data);
        }
      }
    });
    window.addEventListener("DOMContentLoaded", this.getAndPopulateUI.bind(UI)); //In this function by default this means window object,so we are binding (UI as this) because we are not calling getAndPopulateUI function here.

    //if we use arrow function
    // window.addEventListener("DOMContentLoaded", () => {
    //   this.getAndPopulateUI()
    // });
  },
};

export default UI;
