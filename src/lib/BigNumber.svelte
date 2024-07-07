<script lang="ts">
  export let label: string = '';
</script>

<div class="container">
  <span class="label">
    {label}<slot />
  </span>
</div>

<style>
  .container {
    width: 100%;
    font-family: 'Courier New', Courier, monospace;
    background-color: white;
    color: black;
    box-shadow: 0px 5px 10px darkgray;
    padding: 0.3ex;
    padding-top: 10ex;
    display: flex;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .label {
    font-size: 10rem;
  }
</style>
