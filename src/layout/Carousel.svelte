<script>
  const items = [
    [
      "What is Measles?",
      "Measles is a highly contagious disease caused by a virus responsible for many epidemics. The disease spreads rapidly via air transmission, and can linger in an area for up to two hours. Around 90% of the people around an infected person also contract the Measles virus.",
      "lightcoral",
      "viruses",
    ],
    [
      "What are the symptoms?",
      "People with Measles may present a multitude of different symptoms. These include a high fever, excessive coughing, and redness in the eyes. However, Measles is most easily identified by small red rashes that spread from the head to the body.",
      "lightgoldenrodyellow",
      "mask-face",
    ],
    [
      "How is Measles treated?",
      "As of now, there is no specific antiviral treatment for Measles, but there is a vaccine that helps prevent it. Nonetheless, prevention is always better than treatment. This is the reason that many of the efforts made by H.I.V.E are to raise vaccine awareness.",
      "lightblue",
      "syringe",
    ],
    [
      "What is H.I.V.E.?",
      "The High Institute for Virus Elimination (H.I.V.E.) is an organization that strives to make communities safer by helping mitigate the spread of Measles. HIVETrack helps in our mission by tracking the spread of the disease and where it may go next.",
      "lavender",
      "shield-virus",
    ],
    [
      "What are H.I.V.E.'s goals?",
      "As of now, only 91% of America is vaccinated against Measles. We want to help increase that to around 95% to reach herd immunity and truly keep Measles spread low. We especially want to protect young children, as Measles poses the biggest threat to them.",
      "antiquewhite",
      "bullseye",
    ],
    [
      "Who made this?",
      "H.I.V.E is a fictional task force created by students of New Hyde Park Memorial High School designed to help mitigate the spread of Measles. This website is a proof-of-concept for a Measles tracking system and is only to be used for informational purposes.",
      "aquamarine",
      "thumbs-up",
    ],
  ];
</script>

<div id="carousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner container">
    {#each items as item, idx}
      <div
        class="carousel-item {idx === 0
          ? 'active'
          : ''} card w-40 bg-dark text-light"
        data-bs-interval="10000"
      >
        <div class="card-body borderless text-center">
          <h4 class="card-title">{item[0]}</h4>
          <p class="card-text">
            <br />
            {item[1]}
          </p>
          <span style="color: {item[2]}; font-size: 2.5rem;"
            ><i class="fa-solid fa-{item[3]}" /></span
          >
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .borderless {
    border: none;
  }
</style>
