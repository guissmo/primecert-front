<script lang="ts">
  import { PUBLIC_BASE_API_URL } from '$env/static/public';
  import { getContext } from 'svelte';
  import PrimePageHeader from './PrimePageHeader.svelte';
  import type { Writable } from 'svelte/store';

  async function handleSubmit(e: SubmitEvent) {
    const target = e.target as HTMLFormElement;
    e.preventDefault();
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

    const response = await fetch(ACTION_URL, {
      method: 'POST',
    });

    // get response body
    const responseJson = await response.json();

    if ('error' in responseJson) {
      alert(responseJson.error);
    } else {
      location.reload();
    }
  }

  const primeDetails = getContext('primeDetails') as Writable<PrimeInfoEntry>;
</script>

{#if $primeDetails.name}
  <PrimePageHeader>{$primeDetails.name}</PrimePageHeader>
{:else}
  <PrimePageHeader>
    <form
      class="name-it-form"
      action={`${PUBLIC_BASE_API_URL}/claim-prime/${$primeDetails.id}`}
      on:submit|preventDefault={handleSubmit}
    >
      <input name="name" class="prime-name-input" placeholder="An Unnamed Prime" minlength="4" />
      <button class="name-it link" type="submit">Name It</button>
    </form>
  </PrimePageHeader>
{/if}

<style>
  .prime-name-input {
    font-size: 5rem;
    font-weight: 900;
    font-family: Georgia, Times, 'Times New Roman', serif;
    border: none;
    outline: none;
    box-shadow: 0px 5px 10px darkgray;
    width: 50rem;
    z-index: 2;
  }
  .name-it {
    font-size: 3rem;
    font-weight: 900;
    font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
    text-transform: uppercase;
    border: none;
    outline: none;
    box-shadow: 0px 5px 10px darkgray;
    padding: 5px;
    margin-left: 2rem;
    background: white;
  }
  .link {
    font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
    font-weight: 900;
    font-size: 1rem;
    background: white;
    color: black;
    box-shadow: 0px 5px 5px darkgray;
    text-align: center;
    padding: 1em;
    text-decoration: none;
    cursor: pointer;
  }
  .link:hover {
    box-shadow: 0px 5px 5px #666;
  }
  @media (orientation: portrait) or (max-width: 900px) {
    .prime-name-input {
      font-size: 2rem;
      width: 90%;
    }
    .name-it {
      font-size: 1rem;
      margin-left: 1rem;
      min-width: fit-content;
      min-height: fit-content;
    }
    .name-it-form {
      font-size: 2.5rem;
    }
  }
</style>
