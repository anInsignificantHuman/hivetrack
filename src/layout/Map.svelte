<script>
  import { onMount } from "svelte";
  import Form from "./Form.svelte";
  import L from "leaflet";
  import colorGradient from "javascript-color-gradient";
  import { COUNTIES, increment } from "../counties";
  import { COLORS_ARRAY } from "../colors";

  let counties = COUNTIES;

  Object.keys(counties).forEach((county) => {
    counties[county].cases = 0;
    counties[county].exposures = 0;
  });

  let map;
  $: maxCases = Math.max(...Object.values(counties).map((e) => e.cases));
  $: maxExposures = Math.max(
    ...Object.values(counties).map((e) => e.exposures)
  );
  let mapCreated = false;
  $: ACCURACY_CASES = maxCases + 1;
  $: ACCURACY_EXPOSURES = maxExposures + 1;

  // Object.keys(counties).forEach((county) => {
  //   counties[county].cases = Math.floor(Math.random() * 1000);
  // });

  function handleCase(event) {
    const county = event.detail.text;
    increment(county, "cases");
  }

  function handleExposures(event) {
    const countyList = event.detail.text;
    countyList.forEach((county) => {
      increment(county, "exposures");
    });
    counties = counties;
    refresh();
  }

  function getColor(name) {
    const { cases, exposures } = counties[name];
    const ACCURACY = cases === 0 ? ACCURACY_EXPOSURES : ACCURACY_CASES;

    if (cases === 0 && exposures === 0) return "white";

    const ratio = cases === 0 ? exposures / maxExposures : cases / maxCases;

    colorGradient.setGradient(...COLORS_ARRAY[cases === 0 ? "ORANGE" : "RED"]);
    colorGradient.setMidpoint(ACCURACY);
    colorGradient.getArray();

    return colorGradient.getColor(Math.round(ratio * ACCURACY));
  }

  function refresh() {
    function style(feature) {
      const fillColor = getColor(feature.properties.name);
      return {
        weight: 0.5,
        color: "white",
        fillColor,
        fillOpacity: fillColor === "white" ? 0.4 : 1,
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
        L.geoJson(counties[county], { style })
          .bindTooltip(
            `${county}: ${
              counties[county].cases || counties[county].exposures
            } ${counties[county].cases ? " case(s)" : " exposure(s)"}`
          )
          .addTo(map);
      });
    }

    setMap();
  }

  onMount(() => {
    refresh();
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
  #map {
    background: #262626;
    height: 95vh;
  }
</style>
