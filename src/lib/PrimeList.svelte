<script lang="ts">
  import LinkPrime from './LinkPrime.svelte';
  import { fetchGeneric } from './fetch';

  export let title: string;
  export let endpoint: string;
  export let width: string = '90%';

  async function fetchPrimeList() {
    return fetchGeneric(endpoint);
  }
</script>

<div class="prime-list" style={`width: ${width}`}>
  <h3>{title}</h3>
  {#await fetchPrimeList()}
    <div>Loading.</div>
  {:then data}
    {#each data as item}
      <p>
        <LinkPrime name={item.name} slug={item.slug} />
      </p>
    {/each}
  {/await}
</div>
