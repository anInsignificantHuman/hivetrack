<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./layout/Navbar.svelte";
  import Form from "./layout/Form.svelte";
  import Map from "./layout/Map.svelte";

  const e = {
    1980: 385000000,
  };

  async function getData() {
    const res = await fetch("https://www.cdc.gov/measles/cases-outbreaks.html");
    const html = await res.text();
    const dom = new DOMParser();
    const doc = dom.parseFromString(html, "text/html");
    return 0;
  }

  const promise = getData();
</script>

<main>
  <Navbar />

  <section class="bg-dark px-md-5 py-5 text-light text-center container-fluid">
    <h1>text here that is epicly cool</h1>
  </section>

  <Map />
</main>
