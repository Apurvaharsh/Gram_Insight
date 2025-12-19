import L from "leaflet";

const base = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
};

export const redIcon = new L.Icon({
  ...base,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
});

export const orangeIcon = new L.Icon({
  ...base,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
});

export const greenIcon = new L.Icon({
  ...base,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
});
