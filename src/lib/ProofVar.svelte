<script lang="ts">
  import Hoverable from './Hoverable.svelte';

  export let name: string;

  let variableName = 'N';
  let lockedVariableName = 'N';
</script>

<Hoverable
  displayed={variableName == name}
  locked={Boolean(lockedVariableName) && variableName == name}
  char={name}
  onClick={() => {}}
  onMouseEnter={() => {}}
  onMouseLeave={() => {}}
/>
