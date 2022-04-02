<script lang="ts">
  import Navbar from "./layout/Navbar.svelte";
  import Map from "./layout/Map.svelte";

  async function getData() {
    const res = await fetch("https://www.cdc.gov/measles/cases-outbreaks.html");
    const html = await res.text();
    const dom = new DOMParser();
    const doc = dom.parseFromString(html, "text/html");
    return 0;
  }

  const promise = getData();
</script>

<style>
  main {
    background-color: #212529 !important;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
  }
</style>

<main>
  <Navbar />
  <Map />
</main>
