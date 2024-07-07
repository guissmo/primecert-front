<script lang="ts">
  import BigNumber from './BigNumber.svelte';
  import GoButton from './GoButton.svelte';
  import NavInput from './NavInput.svelte';
  let inputValue = '';
</script>

<BigNumber label="N=">
  <NavInput bind:inputValue />
</BigNumber>
<GoButton n={inputValue} />
