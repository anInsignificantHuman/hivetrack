<script>
  import { onMount } from "svelte";
  import Form from "./Form.svelte";
  import L from "leaflet";
  import { counties, set, increment } from "../counties";

  let map;
  let maxCases = 0;
  let maxExposures = 0;
  let mapCreated = false;

  function handleMessage(event) {
    const county = event.detail.text;
    const cases = counties[county].cases;
    if (typeof cases === "number") {
      increment(county, "cases");
    } else {
      set(county, "cases", 1);
    }
    if (counties[county].cases > maxCases) {
      maxCases = counties[county].cases;
    }
    init();
  }
  function getColor(name) {
    // return ["#4DB6AC", "#E39695", "#DF7373", "#DA5552", "#CC444B", '#FF8A65'][Math.floor(Math.random()*6)]
    const cases = counties[name].cases;
    const ratio = cases / maxCases;
    if (typeof cases !== "number") {
      return "#4DB6AC";
    } else if (ratio <= 0.25) {
      return "#E39695";
    } else if (ratio <= 0.5) {
      return "#DF7373";
    } else if (ratio <= 0.75) {
      return "#DA5552";
    }
    return "#CC444B";
  }
  function init() {
    const style = (feature) => {
      const fillColor = getColor(feature.properties.name);
      return {
        weight: 0.5,
        color: "white",
        fillColor,
        fillOpacity: 0.6,
      };
    };

    if (!mapCreated) {
      map = L.map("map").setView([42.579, -76.1], 7);
    }
    function setMap() {
      map.setMaxBounds(map.getBounds());
      map.eachLayer((layer) => {
        map.removeLayer(layer);
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
          minZoom: 7,
          maxZoom: 12,
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(map);

      Object.keys(counties).forEach((county) => {
        L.geoJson(counties[county], { style }).addTo(map);
      });
    }
    setMap();
  }
  onMount(() => {
    init();
    mapCreated = true;
  });
</script>

<div class="row p-0">
  <div class="col-8 p-0">
    <div id="map" />
  </div>
  <div class="col-4 p-0">
    <section class="bg-dark px-md-5 py-5 container-fluid">
      <Form on:message={handleMessage} />
    </section>
  </div>
</div>

<style>
  body {
    overflow: hidden;
  }
  #map {
    background: #262626;
    height: 95vh;
  }
</style>
