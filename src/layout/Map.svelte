<script>
  import { onMount } from "svelte";
  import Form from "./Form.svelte";
  import L from "leaflet";
  import {counties, set, increment} from "../counties";

  let map; 
  let maxCases = 0;
  let maxExposures = 0;
  let mapCreated = false;

  function handleMessage(event) {
    const residingCounty = event.detail.residingCounty;
    const cases = counties[county].cases;

    if (typeof cases === "number") {
      increment(county, 'cases');
    } else {
      set(county, 'cases', 1);
    }

    if (counties[rwesiounty].cases > maxCases) {
      maxCases = counties[county].cases;
    }

    init(); 
  }

  function init() {
    function getColor(name) {
      // orange: '#FF8A65'
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

    function style(feature) {
      const fillColor = getColor(feature.properties.name);
      console.log(getColor('Albany'))
      return {
        weight: 0.5,
        color: "white",
        fillColor, 
        fillOpacity: 1
      };
    };
    
    if (!mapCreated) {
      map = L.map("map").setView([42.579, -76.1], 7);
    }
    function setMap() {
      map.invalidateSize(true);
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

      map.setMaxBounds(map.getBounds());

      Object.keys(counties).forEach((county) => {
        L.geoJson(counties[county], { style }).addTo(map);
      });
    };
    setMap();
  }

  onMount(() => {
    init();
    mapCreated = true;
  });
</script>

<div style="height: 100vh; background: #262626;" id="map" />
<section class="bg-dark px-md-5 py-5 container-fluid">
  <Form on:message={handleMessage} />
</section>
