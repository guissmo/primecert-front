<script lang="ts">
  export let n: string;
</script>

<div class="container">
  <a href={`/prime/${n}`} class="go-button">Go</a>
</div>

<style>
  .container {
    height: 0;
    display: grid;
    justify-items: flex-end;
    z-index: 10;
  }
  .go-button {
    font-family: 'Courier New', Courier, monospace;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1ex;
    font-weight: 900;
    cursor: pointer;
    width: 20%;
    background: white;
    font-size: 2rem;
    border: 1px solid white;
    color: black;
    box-shadow: 0px 5px 10px darkgray;
    text-align: center;
    align-self: flex-start;
    transform: translate(-25%, -25%);
  }
  .go-button:hover {
    box-shadow: 0px 5px 10px #666;
  }

  @media (orientation: portrait) or (max-width: 900px) {
    .go-button {
      font-size: 1rem;
    }
  }
</style>
