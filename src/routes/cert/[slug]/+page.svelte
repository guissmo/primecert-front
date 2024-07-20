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
  import PrimeInfoContainer from '$lib/PrimeInfoContainer.svelte';
  import LoadingText from '$lib/LoadingText.svelte';
  import { MetaTags } from 'svelte-meta-tags';

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
  <PrimeInfoContainer>
    <Aka />
    <PrimePageHeader><LoadingText /></PrimePageHeader>
    <PrimeNavBar />
    <PrimePageContent>
      <LoadingText text="Finding your prime..." /><br />
      <LoadingText text="Retrieving data..." /><br />
      <LoadingText text="Generating catvatar..." />
    </PrimePageContent>
  </PrimeInfoContainer>
{:else if result == null || !('id' in result)}
  <PrimePageError errorDetails={result} />
{:else}
  <MetaTags
    title={result.name ? result.name : result.n}
    titleTemplate="%s | PrimeCert"
    description="Explore the world of primes and name or own your favorite prime numbers greater than 2^64!"
    canonical={result.slug
      ? `https://primecert.guissmo.com/cert/${result.slug}`
      : `https://primecert.guissmo.com/cert/${result.n}`}
    openGraph={{
      url: result.slug
        ? `https://primecert.guissmo.com/cert/${result.slug}`
        : `https://primecert.guissmo.com/cert/${result.n}`,
      title: 'PrimeCert',
      description:
        'Explore the world of primes and name or own your favorite prime numbers greater than 2^64!',
      siteName: 'PrimeCert',
    }}
  />
  <PrimePageProof />
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
</style>
