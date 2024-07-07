<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  // @ts-ignore
  import { JSONParse } from 'json-with-bigint';

  import Hoverable from '$lib/Hoverable.svelte';
  import { PUBLIC_BASE_API_URL } from '$env/static/public';
  import PrimeNavBar from '$lib/PrimeNavBar.svelte';
  import PrimeName from '$lib/PrimeName.svelte';
  import Aka from '$lib/Aka.svelte';
  import PrimePageContent from '$lib/PrimePageContent.svelte';
  import { getPrimeInfo } from '$lib/fetch';
  import BigNumberNavigation from '$lib/BigNumberNavigation.svelte';
  import BigNumber from '$lib/BigNumber.svelte';
  import PrimePageError from '$lib/PrimePageError.svelte';
  import BigNumberDisplay from '$lib/BigNumberDisplay.svelte';

  type NamedPrime = {
    id: String;
    n: string;
    name: string;
    slug: string;
  };

  let recentlyNamed: NamedPrime[] = [];

  let primeInfoEntry: GetPrimeInfoResponse;
  let primeInfoResponse: GetPrimeInfoResponse | undefined | null;

  let lockedVariableName = true;
  let previousVariableName = 'N';
  let variableName = 'N';
  let viewedNumber: bigint | undefined = 0n;

  let lowQ = false;

  let result: GetPrimeInfoResponse | undefined | null;
  async function fetchData() {
    result = await getPrimeInfo($page.params.slug);
  }

  function updateViewedNumber(s: string) {
    if (typeof primeInfoEntry == 'number') {
      return;
    }
    switch (s) {
      case 'N':
        viewedNumber = primeInfoEntry?.n;
        break;
      case 'q':
        viewedNumber = primeInfoEntry?.q;
        break;
      case 'x':
        viewedNumber = primeInfoEntry?.x;
        break;
      case 'y':
        viewedNumber = primeInfoEntry?.y;
        break;
      case 'a':
        viewedNumber = primeInfoEntry?.a;
        break;
      case 'b':
        viewedNumber = primeInfoEntry?.b;
        break;
    }
  }

  function viewedVariableName(s: string) {
    if (lockedVariableName) {
      return;
    }
    previousVariableName = variableName;
    variableName = s;
    updateViewedNumber(s);
  }

  function restorePreviousVariableName() {
    if (lockedVariableName) {
      return;
    }
    variableName = previousVariableName;
    updateViewedNumber(previousVariableName);
  }

  function toggleLockVariableName(s: string) {
    if (!lockedVariableName) lockedVariableName = true;
    else {
      lockedVariableName = s != variableName;
      if (!lockedVariableName) {
        previousVariableName = 'N';
        return;
      }
    }
    previousVariableName = variableName;
    variableName = s;
    updateViewedNumber(s);
  }

  function st(x: BigInt | undefined) {
    if (x == undefined) {
      return '...';
    }
    return x.toString(10);
  }

  let Ndisplay = '...';
  const errorString = '?!?!!';

  let isSmallPrime = false;

  async function loadPrime() {
    primeInfoResponse = await getPrimeInfo($page.params.slug);

    if (primeInfoResponse) {
      primeInfoEntry = primeInfoResponse;
    } else {
      primeInfoEntry = null;
    }

    Ndisplay = (function () {
      console.log(primeInfoEntry);
      if (primeInfoEntry && typeof primeInfoEntry == 'object') {
        return st(primeInfoEntry.n);
      }
      if (typeof primeInfoEntry == 'number') {
        isSmallPrime = Boolean(primeInfoEntry);
        return $page.params.slug;
      }
      return errorString;
      //    currentPrime ? st(currentPrime.n) : currentPrime == null ? Number.isNaN(Number($page.params.slug)) || !Number.isInteger(Number($page.params.slug)) ? 'NaN' : ($page.params.slug) : '...'
    })();
    if (primeInfoEntry == null) {
      return;
    }
    viewedNumber =
      primeInfoEntry && typeof primeInfoEntry != 'number' ? primeInfoEntry.n : undefined;
    lowQ = Boolean(
      primeInfoEntry &&
        typeof primeInfoEntry != 'number' &&
        primeInfoEntry.q &&
        primeInfoEntry.q < 18446744073709551616n,
    );
  }

  onMount(loadPrime);

  async function handleSubmit(e: SubmitEvent) {
    const target = e.target as HTMLFormElement;
    const ACTION_URL = new URL(target.action);

    const formData = new FormData(target);
    const data = new URLSearchParams();
    let name = '';
    for (let [key, value] of formData) {
      if (key === 'name') {
        name = value as string;
      }
    }

    const slug = name.toLowerCase().replaceAll(' ', '-');

    const queryParams = new URLSearchParams(formData as any);
    queryParams.append('slug', slug);

    ACTION_URL.search = queryParams.toString();

    console.log(data);
    console.log(formData);

    const response = await fetch(ACTION_URL, {
      method: 'POST',
    });
    console.log(response);
    await loadPrime();
  }
</script>

{#await fetchData()}
  <BigNumber />
  <div class="info-div">
    <span class="prime-info-container">
      <Aka />
      <PrimeName>loading.</PrimeName>
      <PrimeNavBar />
      <PrimePageContent>Hmm.</PrimePageContent>
    </span>
  </div>
{:then}
  {#if !result || !('id' in result)}
    <PrimePageError errorDetails={result} />
  {:else if 'error' in result}
    <BigNumber label="N=" />
    <div class="info-div">
      <span class="prime-info-container">
        <Aka />
        <PrimeName>{result['error']}</PrimeName>
        <PrimeNavBar />
        <PrimePageContent>Sad.</PrimePageContent>
      </span>
    </div>
  {:else}
    <BigNumberDisplay>
      {result.n}
    </BigNumberDisplay>
    <div class="info-div">
      <span class="prime-info-container">
        <Aka />
        {#if result.name}
          <PrimeName>{result.name}</PrimeName>
        {:else}
          <PrimeName>
            <form
              action={`${PUBLIC_BASE_API_URL}/claim-prime/${result.id}`}
              on:submit|preventDefault={handleSubmit}
            >
              <input
                name="name"
                class="prime-name-input"
                placeholder="An Unnamed Prime"
                minlength="4"
              />
              <button class="name-it" type="submit">Name It</button>
            </form>
          </PrimeName>
        {/if}
        <PrimeNavBar />
        <PrimePageContent>Yay.</PrimePageContent>
      </span>
    </div>
  {/if}
{/await}

<!-- <div class="outer-div">
  <div class="container-div">
    <div class="big-number-container">
      <span class="big-number">
        {variableName + '='}{typeof primeInfoEntry == 'object'
          ? viewedNumber == BigInt(0)
            ? ''
            : st(viewedNumber)
          : Ndisplay}
      </span>
    </div>
    {#if Ndisplay == errorString}
      <div class="info-div">
        <span class="prime-info-container">
          <Aka />
          <PrimeName>there was a problem.</PrimeName>
          <PrimeNavBar />
          <PrimePageContent>Sad.</PrimePageContent>
        </span>
      </div>
    {/if}
    {#if typeof primeInfoEntry == 'number'}
      <div class="info-div">
        <img
          class="img-avatar"
          alt="a robot"
          src={`https://robohash.org/${primeInfoEntry.toString(10)}?set=set4`}
        />
        <span class="prime-info-container">
          <Aka />
          <span class="prime-name"
            ><Hoverable
              displayed={variableName == 'N'}
              locked={true}
              char="N"
              onClick={() => {}}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            /> is {isSmallPrime ? 'prime' : 'not prime'}.</span
          >
          <PrimeNavBar />
          <span class="info"> Isn't that interesting? </span>
        </span>
      </div>
    {/if}
    {#if primeInfoEntry && typeof primeInfoEntry == 'object'}
      <div class="info-div">
        <img
          class="img-avatar"
          alt="a robot"
          src={`https://robohash.org/${st(primeInfoEntry.n)}?set=set4`}
        />
        <span class="prime-info-container">
          <Aka />
          {#if primeInfoEntry.name}
            <span class="prime-name">{primeInfoEntry.name}</span>
          {/if}
          {#if !primeInfoEntry.name}
            <form
              action={`${PUBLIC_BASE_API_URL}/claim-prime/${primeInfoEntry.id}`}
              on:submit|preventDefault={handleSubmit}
            >
              <input
                name="name"
                class="prime-name-input"
                placeholder="An Unnamed Prime"
                minlength="4"
              />
              <button class="name-it" type="submit">Name It</button>
            </form>
          {/if}
          <PrimeNavBar />
          <span class="info">
            <p class="theorem">
              The point P: ( <Hoverable
                displayed={variableName == 'x'}
                locked={lockedVariableName && variableName == 'x'}
                char="x"
                onClick={() => toggleLockVariableName('x')}
                onMouseEnter={() => viewedVariableName('x')}
                onMouseLeave={() => restorePreviousVariableName()}
              />, <Hoverable
                displayed={variableName == 'y'}
                locked={lockedVariableName && variableName == 'y'}
                char="y"
                onClick={() => toggleLockVariableName('y')}
                onMouseEnter={() => viewedVariableName('y')}
                onMouseLeave={() => restorePreviousVariableName()}
              /> ) on the elliptic curve
              <br />&nbsp;&nbsp; E: y<sup>2</sup> = x<sup>3</sup> + <Hoverable
                displayed={variableName == 'a'}
                locked={lockedVariableName && variableName == 'a'}
                char="a"
                onClick={() => toggleLockVariableName('a')}
                onMouseEnter={() => viewedVariableName('a')}
                onMouseLeave={() => restorePreviousVariableName()}
              />x + <Hoverable
                displayed={variableName == 'b'}
                locked={lockedVariableName && variableName == 'b'}
                char="b"
                onClick={() => toggleLockVariableName('b')}
                onMouseEnter={() => viewedVariableName('b')}
                onMouseLeave={() => restorePreviousVariableName()}
              />, &nbsp;&nbsp; defined modulo <Hoverable
                displayed={variableName == 'N'}
                locked={lockedVariableName && variableName == 'N'}
                char="N"
                onClick={() => toggleLockVariableName('N')}
                onMouseEnter={() => viewedVariableName('N')}
                onMouseLeave={() => restorePreviousVariableName()}
              />
              <br />has order <Hoverable
                displayed={variableName == 'q'}
                locked={lockedVariableName && variableName == 'q'}
                char="q"
                onClick={() => toggleLockVariableName('q')}
                onMouseEnter={() => viewedVariableName('q')}
                onMouseLeave={() => restorePreviousVariableName()}
              /> &gt; (N<sup>1/4</sup> + 1)<sup>2</sup>.
            </p>
            <p class="theorem">
              Since <Hoverable
                displayed={variableName == 'q'}
                locked={lockedVariableName && variableName == 'q'}
                char="q"
                onClick={() => toggleLockVariableName('q')}
                onMouseEnter={() => viewedVariableName('q')}
                onMouseLeave={() => restorePreviousVariableName()}
              />
              {#if lowQ}
                <span
                  >is prime because it is less than 2<sup>64</sup> and is a pseudoprime according to
                  <a
                    class="proof-link"
                    href="https://en.wikipedia.org/wiki/Baillie%E2%80%93PSW_primality_test"
                    target="_blank">the Baillie–PSW test</a
                  >,</span
                >
              {:else}
                <span
                  ><a
                    class="proof-link"
                    on:mouseenter={() => viewedVariableName('q')}
                    on:mouseleave={() => restorePreviousVariableName()}
                    href={primeInfoEntry && primeInfoEntry.q
                      ? `/prime/${st(primeInfoEntry.q)}`
                      : './'}
                    data-sveltekit-reload>is prime</a
                  >,</span
                >
              {/if} then <Hoverable
                displayed={variableName == 'N'}
                locked={lockedVariableName && variableName == 'N'}
                char="N"
                onClick={() => toggleLockVariableName('N')}
                onMouseEnter={() => viewedVariableName('N')}
                onMouseLeave={() => restorePreviousVariableName()}
              /> is also prime.
            </p>
          </span>
        </span>
      </div>
    {:else}
      <div class="info-div">&nbsp;</div>
    {/if}
  </div>
</div> -->

<style>
  .info-div {
    flex-grow: 1;
    padding-left: 10ex;
    padding-right: 10ex;
    padding-top: 5ex;
    max-width: 100vw;
    overflow-y: scroll;
  }
  .theorem {
    margin-top: 0;
    margin-bottom: 24px;
    line-height: 1.6;
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
  .prime-name-input {
    font-size: 5rem;
    font-weight: 900;
    font-family: Georgia, Times, 'Times New Roman', serif;
    border: none;
    outline: none;
    box-shadow: 0px 5px 10px darkgray;
    padding: 10px;
    width: 50rem;
    z-index: 2;
  }
  .name-it {
    font-size: 3rem;
    font-weight: 900;
    font-family: 'Courier New', Courier, monospace;
    text-transform: uppercase;
    border: none;
    outline: none;
    box-shadow: 0px 5px 10px darkgray;
    padding: 10px;
    margin-left: 2rem;
    background: white;
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
