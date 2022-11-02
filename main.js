let searchForm = document.querySelector("#searchForm");
let searchInput = document.querySelector("#searchInput");
let searchSubmit = document.querySelector("#searchSubmit");
let userIP = document.querySelector("#userIP");
let userLocation = document.querySelector("#userLocation");
let userTimezone = document.querySelector("#userTimezone");
let userISP = document.querySelector("#userISP");

searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (searchInput.value !== "") {
    getInformation(searchInput.value);
  } else {
    return null;
  }
}

function startInformation() {
  let apiUrl = `
https://geo.ipify.org/api/v2/country,city?apiKey=at_rMw8oKvGImIERRAesF1Iof1odYBlT`;
  axios.get(apiUrl).then(showResult);
}

function getInformation(ip) {
  let apiUrl = `
https://geo.ipify.org/api/v2/country,city?apiKey=at_rMw8oKvGImIERRAesF1Iof1odYBlT&ipAddress=${ip}&domain=${ip}`;
  axios.get(apiUrl).then(showResult);
}

function showResult(response) {
  console.log(response.data);
  userIP.innerHTML = response.data.ip;
  userLocation.innerHTML = `${response.data.location.city}, ${response.data.location.country}`;
  userTimezone.innerHTML = response.data.location.timezone;
  userISP.innerHTML = response.data.isp;
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = "";
  }
  var map = L.map("map").setView(
    [response.data.location.lat, response.data.location.lng],
    13
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var blackIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46, 56],
  });

  L.marker([response.data.location.lat, response.data.location.lng], {
    icon: blackIcon,
  }).addTo(map);
}

startInformation();
