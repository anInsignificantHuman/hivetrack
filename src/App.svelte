<script lang="ts">
  import Navbar from "./layout/Navbar.svelte";
  import Map from "./layout/Map.svelte";
</script>

<main>
  <Navbar />
  <Map />
</main>

<style>
  main {
    background-color: #212529 !important;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
  }
</style>
