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
  import PrimeProofContent from './PrimeProofContent.svelte';

  const viewedVariable = getContext('viewedVariable') as Writable<string>;
  $: visibleHeader = $viewedVariable == 'N';
</script>

<BigNumberDisplay />
<PrimeInfoContainer>
  <Aka visible={visibleHeader} />
  <PrimePageHeader>
    <PrimeName />
  </PrimePageHeader>
  <PrimeNavBar />
  <PrimePageContent>
    <PrimeProofContent />
  </PrimePageContent>
</PrimeInfoContainer>
