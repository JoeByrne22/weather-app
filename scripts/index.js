window.addEventListener("load", () => {
  // getting the time...

  var d = new Date();
  var n = d.toUTCString();
  var e = document.querySelector("#date");
  e.innerHTML = n;

  //getting weather, compared to where you are in the world

  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/8d72407c3fc165393d7389065b4ae247/${lat},${long}`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);

          const { temperature, icon } = data.currently;

          console.log("temperature", temperature);
          console.log("icon", icon);
          console.log("timeZone", data.timezone);
          console.log("summary", data.hourly.summary);
        });
    });
  }
});
