//local storage data
const storage = {
  city: '',
  country: '',
  saveData() {
    localStorage.setItem("BD-WEATHER-CITY", this.city);
    localStorage.setItem("BD-WEATHER-COUNTRY", this.country);
  },
  getData() {
    const city = localStorage.getItem("BD-WEATHER-CITY") || "Pabna";
    const country = localStorage.getItem("BD-WEATHER-COUNTRY") || "BD";

    return { city, country };
  },
};

export default storage;
