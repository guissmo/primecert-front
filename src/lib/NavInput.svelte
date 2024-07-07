<script lang="ts">
  export let inputValue = '';
</script>

<input
  bind:value={inputValue}
  class="big-number"
  placeholder="........................................."
  maxlength="199"
/>

<style>
  .big-number {
    all: unset;
    display: inline-block;
    font-size: 10rem;
    flex-grow: 1;
    width: 100%;
  }
</style>
