<script>
  import { onMount } from "svelte";
  import L from "leaflet";
  import counties from "../counties";

  onMount(() => {
    function getColor(name) { 
      return ['#CC444B', '#DA5552', '#DF7373', '#E39695', '#FF8A65', ''][Math.floor(Math.random() * 6)]; 
    }

    const style = (feature) => {
      const fillColor = getColor(feature.properties.name); 
      return {
        weight: 0.5,
        opacity: 1, 
        color: "white",
        fillColor, 
        fillOpacity: fillColor ? 0.7 : 0.1
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

      Object.keys(counties).forEach((county) => {
        L.geoJson(counties[county], { style: style }).addTo(map);
      });
    };
    setMap();
  });
</script>

<div style="height: 100vh; background: #262626;" id="map" />
