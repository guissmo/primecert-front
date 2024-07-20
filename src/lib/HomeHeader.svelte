<script lang="ts">
  export let title: string;
</script>

<span class="header">
  {title}
</span>

<style>
  .header {
    font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
    text-transform: uppercase;
    padding: 1ex;
    font-weight: 900;
    cursor: pointer;
    background: white;
    border: 1px solid white;
    color: black;
    box-shadow: 0px 5px 10px darkgray;
  }

  @media (orientation: portrait) or (max-width: 900px) {
    .header {
      font-size: 1rem;
    }
  }
</style>
