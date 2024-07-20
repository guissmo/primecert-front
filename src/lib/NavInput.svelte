<script lang="ts">
  export let inputValue = '';
  export let placeholder = '.........................................';
  export let onBlur: () => void = () => {};
</script>

<input bind:value={inputValue} class="big-number" {placeholder} maxlength="199" on:blur={onBlur} />

<style>
  .big-number {
    all: unset;
    display: inline-block;
    flex-grow: 1;
    width: calc(100% - 12rem);
  }
  @media (orientation: portrait) or (max-width: 900px) {
    .big-number {
      width: calc(100% - 5rem);
    }
  }
</style>
