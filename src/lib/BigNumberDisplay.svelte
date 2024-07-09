<script lang="ts">
  import { getContext } from 'svelte';
  import BigNumber from './BigNumber.svelte';
  import type { Writable } from 'svelte/store';

  const primeDetails = getContext('primeDetails') as Writable<PrimeInfoEntry>;
  const viewedVariable = getContext('viewedVariable') as Writable<string>;

  let bigNumberDisplay: string = '...';
  $: if ($viewedVariable.length == 1) {
    bigNumberDisplay = $primeDetails[$viewedVariable.toLowerCase()];
  }
</script>

<BigNumber allowScroll label={`${$viewedVariable}=`}>{bigNumberDisplay}</BigNumber>
