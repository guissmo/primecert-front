<nav class="nav-bar">
  <a href="/" class="link">HOME</a>
  <a
    href="#"
    on:click={() => {
      history.back();
    }}
    class="link">BACK</a
  >
</nav>

<style>
  .nav-bar {
    grid-area: nav-bar;
    width: 80%;
    justify-self: center;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .link {
    font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
    font-weight: 900;
    font-size: 1rem;
    background: white;
    color: black;
    box-shadow: 0px 5px 5px darkgray;
    text-align: center;
    padding: 1em;
    text-decoration: none;
    cursor: pointer;
  }
  .link:hover {
    box-shadow: 0px 5px 5px #666;
  }
</style>
