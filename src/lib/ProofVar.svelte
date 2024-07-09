<script lang="ts">
  import Hoverable from './Hoverable.svelte';

  import BigNumber from './BigNumber.svelte';
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';

  export let name: string;

  const viewedVariable = getContext('viewedVariable') as Writable<string>;
  const lockedVariable = getContext('lockedVariable') as Writable<string>;
</script>

<Hoverable
  displayed={$viewedVariable == name}
  locked={$lockedVariable == name}
  char={name}
  onClick={() => {
    if ($lockedVariable != name) {
      lockedVariable.set(name);
    } else {
      lockedVariable.set('N');
    }
  }}
  onMouseEnter={() => {
    viewedVariable.set(name);
  }}
  onMouseLeave={() => {
    viewedVariable.set($lockedVariable);
  }}
/>
