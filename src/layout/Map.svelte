<script>
  import { onMount } from "svelte";
  import L from "leaflet";
  import counties from "../counties";

  onMount(() => {
    const style = (feature) => {
      return {
        weight: 0.5,
        color: "white",
      };
    };

    const setMap = () => {
      let map = L.map("map").setView([42.579, -76.1], 7);
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

      counties.forEach((county) => {
        fetch(
          `https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA/NY/${county}.geo.json`
        )
          .then((res) => res.json())
          .then((data) => L.geoJson(data, { style: style }).addTo(map));
      });
    };
    setMap();
  });
</script>

<div style="height: 100vh; background: #262626;" id="map" />
