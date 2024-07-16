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
    font-size: 10rem;
    flex-grow: 1;
    width: calc(100% - 12rem);
  }
</style>
