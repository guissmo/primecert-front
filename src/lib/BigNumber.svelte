<script lang="ts">
  export let label: string = 'N=';
  export let allowScroll: boolean = false;
</script>

<div class="container" style={allowScroll ? 'overflow-x: scroll' : ''}>
  <span class="label">
    <span>{label}</span><slot />
  </span>
</div>

<style>
  .container {
    font-family: 'Courier New', Courier, monospace;
    background-color: white;
    color: black;
    box-shadow: 0px 5px 10px darkgray;
    padding: 0.3ex;
    padding-top: 10ex;
    display: flex;
    flex-shrink: 0;
    white-space: nowrap;
    z-index: 5;
  }
  .label {
    font-size: 10rem;
    flex-grow: 1;
  }
</style>
