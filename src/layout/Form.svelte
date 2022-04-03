<script>
  import { createEventDispatcher } from "svelte";
  import { COUNTIES } from "../counties";

  const dispatch = createEventDispatcher();
  let residingCounty;
  let countiesExposed = [];
  const countyList = Object.keys(COUNTIES).sort();

  function handleSubmit(event) {
    dispatch("case", { text: residingCounty });
    dispatch("exposures", {
      text: countiesExposed.filter((item) => item !== residingCounty),
    });
  }
</script>

<div id="form">
  <div class="card w-40 bg-dark text-light">
    <div class="card-body borderless">
      <h4 class="card-title">Measles Reporter</h4>

      <div class="alert alert-success" role="alert">
        <h6 class="card-subtitle color-white">
          Securely connected to HIVE infrastructure.
        </h6>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-3">
          <label for="countyOfResidence" class="form-label"
            >County of Residence</label
          >

          <select
            bind:value={residingCounty}
            id="countyOfResidence"
            class="form-select county-select"
          >
            {#each countyList as county}
              <option value={county}>{county} County</option>
            {/each}
          </select>
        </div>

        <div class="mb-3">
          <label for="exposedCounties" class="form-label"
            >Potentially Exposed Counties</label
          >

          <select
            bind:value={countiesExposed}
            id="exposedCounties"
            class="form-select county-select"
            multiple
          >
            {#each countyList as county}
              <option value={county}>{county} County</option>
            {/each}
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>

<style>
  .borderless {
    border: none;
  }
</style>
