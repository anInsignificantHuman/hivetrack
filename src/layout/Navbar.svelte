<style>
  nav {
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark py-3">
  <div class="container-fluid">
    <a href="/" class="navbar-brand ms-md-5 me-3">HIVETrack</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#menu"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="menu">
      <ul class="navbar-nav d-md-flex d-none">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link">Info</a>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link">Resources</a>
        </li>
      </ul>

      <ul
        class="
          navbar-nav
          list-group list-group-horizontal
          d-flex d-md-none
          justify-content-center
          text-center
          "
      >
        <li class="list-group-item bg-dark mx-3 py-0">
          <a href="/" class="nav-link active"
            ><i class="bi bi-house-door-fill" /><br />Home</a
          >
        </li>
        <li class="list-group-item bg-dark mx-3 py-0">
          <a href="/" class="nav-link"
            ><i class="bi bi-info-circle-fill" /><br />Info</a
          >
        </li>
        <li class="list-group-item bg-dark mx-3 py-0">
          <a href="/" class="nav-link"
            ><i class="bi bi-folder-fill" /><br />Resources</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
