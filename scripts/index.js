window.addEventListener("load", () => {
  var timezone = document.querySelector(".location-timezone");
  var temp = document.querySelector(".temperature");
  var summary = document.querySelector(".description");
  const x = document.getElementsByTagName("BODY")[0];
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

      cold = "fbewof";

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/8d72407c3fc165393d7389065b4ae247/${lat},${long}`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          const { temperature, icon } = data.currently;

          //Timezone added the the HTML
          timezone.innerHTML = data.timezone;

          //Temperature added the the HTML
          var tempC = (temperature - 32) * (5 / 9);
          temp.innerHTML = Math.ceil(tempC) + " ˚C";

          //Summary added the the HTML
          summary.innerHTML = data.hourly.summary;

          if (temperature > 45) {
            temp.classList.add("hot");
          } else {
            temp.classList.add("cold");
          }
        });
    });
  }
});
