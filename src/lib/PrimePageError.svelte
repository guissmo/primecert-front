<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Aka from './Aka.svelte';
  import BigNumber from './BigNumber.svelte';
  import BigNumberDisplay from './BigNumberDisplay.svelte';
  import PrimeInfoContainer from './PrimeInfoContainer.svelte';
  import PrimeName from './PrimePageHeader.svelte';
  import PrimeNavBar from './PrimeNavBar.svelte';
  import PrimePageContent from './PrimePageContent.svelte';
  import { getContext } from 'svelte';
  import { error } from '@sveltejs/kit';

  export let errorDetails: IntegerErrorResponse | SlugErrorResponse | null | undefined;

  const pageTexts = (function () {
    if (!errorDetails) {
      return {
        bigLabel: `:-(`,
        header: 'a non-prime integer.',
      };
    } else {
      switch (errorDetails.error) {
        case 'COMPOSITE':
          return {
            bigLabel: `N=${errorDetails.n}`,
            header: 'a non-prime integer.',
          };
        case 'LOW_PRIME':
          return {
            bigLabel: `N=${errorDetails.n}`,
            header: 'a small prime number.',
          };
        case 'TOO_HIGH':
          return {
            bigLabel: `N=${errorDetails.n}`,
            header: 'a number that is too large.',
          };
        case 'NOT_FOUND':
          return {
            bigLabel: `${errorDetails.slug}`,
            header: 'a name that is not in the database.',
          };
        default:
          return {
            bigLabel: `:O`,
            header: 'an unexpected error.',
          };
      }
    }
  })();
</script>

<BigNumberDisplay label={pageTexts.bigLabel} />
<PrimeInfoContainer>
  <Aka />
  <PrimeName>{pageTexts.header}</PrimeName>
  <PrimeNavBar />
  {#if !errorDetails}
    <PrimePageContent>Boo.</PrimePageContent>
  {:else if errorDetails.error == 'NOT_FOUND'}
    <PrimePageContent>What?</PrimePageContent>
  {:else if errorDetails.error == 'COMPOSITE'}
    <PrimePageContent>It's divisible by a prime that is less than itself!</PrimePageContent>
  {:else if errorDetails.error == 'LOW_PRIME'}
    <PrimePageContent>
      It is an integer less than 2<sup>64</sup> and it passes the Baillie–PSW primality test!
    </PrimePageContent>
  {/if}
</PrimeInfoContainer>
