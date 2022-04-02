<script>
  import { onMount } from "svelte";
  import Form from "./Form.svelte";
  import L from "leaflet";
  import colorGradient from "javascript-color-gradient";
  import { counties, set, increment } from "../counties";

  let map;
  let maxCases = 1;
  let maxExposures = 1;
  let mapCreated = false;
  const ACCURACY = 100;

  function handleCase(event) {
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
  }

  function handleExposures(event) {
    const countyList = event.detail.text;
    countyList.forEach((county) => {
      const exposures = counties[county].exposures;
      if (typeof exposures === "number") {
        increment(county, "exposures");
      } else {
        set(county, "exposures", 1);
      }
      if (counties[county].exposures > maxExposures) {
        maxExposures = counties[county].exposures;
      }
    });

    init();
  }

  function getColor(name) {
    // return ["#4DB6AC", "#E39695", "#DF7373", "#DA5552", "#CC444B", '#FF8A65'][Math.floor(Math.random()*6)]
    const cases = counties[name].cases || 0;
    const ratio = cases / maxCases;

    if (cases === 0) {
      return "#ffffff";
    }

    colorGradient.setGradient("#ffb5b5", "#9e0000");
    colorGradient.setMidpoint(ACCURACY);
    colorGradient.getArray();

    const unit = 1 / ACCURACY;

    console.log(ratio * ACCURACY)

    return colorGradient.getColor(
      Math.trunc(Math.round(ratio * ACCURACY))
    );
  }

  function init() {
    function style(feature) {
      const fillColor = getColor(feature.properties.name);
      return {
        weight: 0.5,
        color: "white",
        fillColor,
        fillOpacity: fillColor === "#ffffff" ? 0.4 : 1,
      };
    }

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
      <Form on:case={handleCase} on:exposures={handleExposures} />
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
