<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Aka from './Aka.svelte';
  import BigNumber from './BigNumber.svelte';
  import BigNumberDisplay from './BigNumberDisplay.svelte';
  import PrimeInfoContainer from './PrimeInfoContainer.svelte';
  import PrimeName from './PrimeName.svelte';
  import PrimeNavBar from './PrimeNavBar.svelte';
  import PrimePageContent from './PrimePageContent.svelte';
  import { getContext } from 'svelte';

  export let errorDetails: IntegerErrorResponse | SlugErrorResponse | null | undefined;

  // CONTEXT EXAMPLE
  const myContext = getContext('currentPrime') as Writable<
    IntegerErrorResponse | SlugErrorResponse
  >;
  // ^ NOT NEEDED ON THIS PAGE TBH

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

<BigNumberDisplay>
  {pageTexts.bigLabel}
</BigNumberDisplay>
<PrimeInfoContainer>
  <Aka />
  <PrimeName>{pageTexts.header}</PrimeName>
  <PrimeNavBar />
  <PrimePageContent>Yay.</PrimePageContent>
</PrimeInfoContainer>
