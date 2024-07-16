<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  // @ts-ignore
  import { JSONParse } from 'json-with-bigint';

  import Hoverable from '$lib/Hoverable.svelte';
  import { PUBLIC_BASE_API_URL } from '$env/static/public';
  import PrimeNavBar from '$lib/PrimeNavBar.svelte';
  import PrimePageHeader from '$lib/PrimePageHeader.svelte';
  import Aka from '$lib/Aka.svelte';
  import PrimePageContent from '$lib/PrimePageContent.svelte';
  import { getPrimeInfo } from '$lib/fetch';
  import BigNumberNavigation from '$lib/BigNumberNavigation.svelte';
  import BigNumber from '$lib/BigNumber.svelte';
  import PrimePageError from '$lib/PrimePageError.svelte';

  import { setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import PrimePageProof from '$lib/PrimePageProof.svelte';

  let primeInfoEntry: GetPrimeInfoResponse;
  let primeInfoResponse: GetPrimeInfoResponse | undefined | null;

  let result: GetPrimeInfoResponse | undefined | null;
  async function fetchData() {
    result = await getPrimeInfo($page.params.slug);
    if (result && 'id' in result) {
      primeDetails.set(result);
    }
  }

  let viewedVariable = 'N';

  // BEGIN CONTEXTS
  const primeDetails: Writable<PrimeInfoEntry | null> = writable();
  setContext('primeDetails', primeDetails);
  $: primeDetails.set(result && 'id' in result ? result : null);

  const viewedVariableContext: Writable<string> = writable();
  setContext('viewedVariable', viewedVariableContext);
  $: viewedVariableContext.set(viewedVariable);
  // END CONTEXTS

  export async function loadPrime() {
    primeInfoResponse = await getPrimeInfo($page.params.slug);

    // Update primeInfoResponse
    if (primeInfoResponse) {
      primeInfoEntry = primeInfoResponse;
    }
  }

  onMount(fetchData);
</script>

{#if result == undefined}
  <BigNumber />
  <div class="info-div">
    <span class="prime-info-container">
      <Aka />
      <PrimePageHeader>loading.</PrimePageHeader>
      <PrimeNavBar />
      <PrimePageContent>Hmm.</PrimePageContent>
    </span>
  </div>
{:else if result == null || !('id' in result)}
  <PrimePageError errorDetails={result} />
{:else}
  <PrimePageProof />
{/if}

<style>
  .info-div {
    flex-grow: 1;
    padding-left: 10ex;
    padding-right: 10ex;
    padding-top: 5ex;
    max-width: 100vw;
    overflow-y: scroll;
  }
  .prime-info-container {
    font-family: Georgia, Times, 'Times New Roman', serif;
    gap: 1rem;
    display: grid;
    justify-content: flex-start;
    align-items: baseline;
    grid-template-areas:
      'aka prime-name'
      'nav-bar info';
  }
</style>
