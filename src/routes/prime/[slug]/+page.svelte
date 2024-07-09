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

  // let lockedVariableName = true;
  // let previousVariableName = 'N';
  // let variableName = 'N';
  // let viewedNumber: bigint | undefined = 0n;

  // let lowQ = false;

  let result: GetPrimeInfoResponse | undefined | null;
  async function fetchData() {
    result = await getPrimeInfo($page.params.slug);
    if (result && 'id' in result) {
      primeDetails.set(result);
    }
  }

  let viewedVariable = 'N';

  // CONTEXT
  const primeDetails: Writable<PrimeInfoEntry | null> = writable();
  setContext('primeDetails', primeDetails);
  $: primeDetails.set(result && 'id' in result ? result : null);

  const viewedVariableContext: Writable<string> = writable();
  setContext('viewedVariable', viewedVariableContext);
  $: viewedVariableContext.set(viewedVariable);

  // END CONTEXT

  // function updateViewedNumber(s: string) {
  //   if (typeof primeInfoEntry == 'number') {
  //     return;
  //   }
  //   switch (s) {
  //     case 'N':
  //       viewedNumber = primeInfoEntry?.n;
  //       break;
  //     case 'q':
  //       viewedNumber = primeInfoEntry?.q;
  //       break;
  //     case 'x':
  //       viewedNumber = primeInfoEntry?.x;
  //       break;
  //     case 'y':
  //       viewedNumber = primeInfoEntry?.y;
  //       break;
  //     case 'a':
  //       viewedNumber = primeInfoEntry?.a;
  //       break;
  //     case 'b':
  //       viewedNumber = primeInfoEntry?.b;
  //       break;
  //   }
  // }

  // function viewedVariableName(s: string) {
  //   if (lockedVariableName) {
  //     return;
  //   }
  //   previousVariableName = variableName;
  //   variableName = s;
  //   updateViewedNumber(s);
  // }

  // function restorePreviousVariableName() {
  //   if (lockedVariableName) {
  //     return;
  //   }
  //   variableName = previousVariableName;
  //   updateViewedNumber(previousVariableName);
  // }

  // function toggleLockVariableName(s: string) {
  //   if (!lockedVariableName) lockedVariableName = true;
  //   else {
  //     lockedVariableName = s != variableName;
  //     if (!lockedVariableName) {
  //       previousVariableName = 'N';
  //       return;
  //     }
  //   }
  //   previousVariableName = variableName;
  //   variableName = s;
  //   updateViewedNumber(s);
  // }

  // function st(x: BigInt | undefined) {
  //   if (x == undefined) {
  //     return '...';
  //   }
  //   return x.toString(10);
  // }

  // let Ndisplay = '...';
  // const errorString = '?!?!!';

  export async function loadPrime() {
    primeInfoResponse = await getPrimeInfo($page.params.slug);

    // Update primeInfoResponse
    if (primeInfoResponse) {
      primeInfoEntry = primeInfoResponse;
    }

    // Ndisplay?
    // Ndisplay = (function () {
    //   console.log(primeInfoEntry);
    //   if (primeInfoEntry && typeof primeInfoEntry == 'object') {
    //     return st(primeInfoEntry.n);
    //   }
    //   if (typeof primeInfoEntry == 'number') {
    //     isSmallPrime = Boolean(primeInfoEntry);
    //     return $page.params.slug;
    //   }
    //   return errorString;
    //   //    currentPrime ? st(currentPrime.n) : currentPrime == null ? Number.isNaN(Number($page.params.slug)) || !Number.isInteger(Number($page.params.slug)) ? 'NaN' : ($page.params.slug) : '...'
    // })();

    // // bigInputLogic
    // if (primeInfoEntry == null) {
    //   return;
    // }
    // viewedNumber =
    //   primeInfoEntry && typeof primeInfoEntry != 'number' ? primeInfoEntry.n : undefined;
    // lowQ = Boolean(
    //   primeInfoEntry &&
    //     typeof primeInfoEntry != 'number' &&
    //     primeInfoEntry.q &&
    //     primeInfoEntry.q < 18446744073709551616n,
    // );
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
  .proof-link {
    color: black;
    text-decoration-style: wavy;
    text-decoration-color: green;
  }
  .img-avatar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 128px;
    z-index: 2;
  }
  .tabs {
    display: grid;
    justify-items: flex-end;
  }
  .tab-up {
    font-family: 'Courier New', Courier, monospace;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1ex;
    font-weight: 900;
    cursor: pointer;
    width: 20%;
    background: white;
    font-size: 3rem;
    border: 1px solid white;
    color: black;
    box-shadow: 0px 5px 10px darkgray;
    text-align: center;
  }
  .tab-up {
    align-self: flex-start;
    transform: translate(-25%, -25%);
  }
  .tab-up:hover {
    box-shadow: 0px 5px 10px #666;
  }

  @media only screen and (max-width: 767px) {
    .outer-div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      background: green;
      padding: 0;
    }
    .container-div {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
  }
</style>
