import UI from "./ui";

//temp data store and dealing
const weatherData = {
  city: "",
  country: "",
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  API_ID: "6eb21f16aa6a43deba40dd917edec2c7",
  async getData() {
    //requesting data from the server
    try {
      const res = await fetch(
        `${this.BASE_URL}?q=${this.city},${this.country}&units=metric&appid=${this.API_ID}`
      );

      const data = await res.json();

      if (data.cod >= 400) {
        //error
        UI.showMessage(data.message);
        return false;
      } else {
        return data;
      }
    } catch (err) {
      UI.showMessage("Problem in fetching weather");
    }
  },
};

export default weatherData;