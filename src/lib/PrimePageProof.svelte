<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Aka from './Aka.svelte';
  import BigNumberDisplay from './BigNumberDisplay.svelte';
  import PrimeNavBar from './PrimeNavBar.svelte';
  import PrimePageContent from './PrimePageContent.svelte';
  import PrimePageHeader from './PrimePageHeader.svelte';
  import { getContext } from 'svelte';
  import PrimeInfoContainer from './PrimeInfoContainer.svelte';
  import PrimeName from './PrimeName.svelte';

  const primeDetails = getContext('primeDetails') as Writable<PrimeInfoEntry>;
</script>

<BigNumberDisplay>
  {$primeDetails.n}
</BigNumberDisplay>
<PrimeInfoContainer>
  <Aka />
  <PrimePageHeader>
    <PrimeName />
  </PrimePageHeader>
  <PrimeNavBar />
  <PrimePageContent>Yay.</PrimePageContent>
</PrimeInfoContainer>
