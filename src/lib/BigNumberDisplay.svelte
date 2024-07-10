<script lang="ts">
  import { getContext } from 'svelte';
  import BigNumber from './BigNumber.svelte';
  import type { Writable } from 'svelte/store';

  export let label: string | undefined = undefined;

  const primeDetails = getContext('primeDetails') as Writable<PrimeInfoEntry>;
  const viewedVariable = getContext('viewedVariable') as Writable<string>;

  let bigNumberDisplay: string = '...';
  $: if (!label && $viewedVariable.length == 1) {
    bigNumberDisplay = $primeDetails[$viewedVariable.toLowerCase()];
  }
</script>

{#if label}
  <BigNumber allowScroll {label} />
{:else}
  <BigNumber allowScroll label={`${$viewedVariable}=`}>{bigNumberDisplay}</BigNumber>
{/if}
