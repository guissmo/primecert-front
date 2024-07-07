<script lang="ts">
  import LinkPrime from './LinkPrime.svelte';
  import { fetchPrimeGeneric } from './fetch';
  export let title: string;
  export let endpoint: string;
  export let width: string = '90%';

  async function fetchPrimeList() {
    return fetchPrimeGeneric(endpoint);
  }

  function getPrimeHref(item: NamedPrimeEntry) {
    return item.slug ? item.slug : item.n;
  }

  function getPrimeLabel(item: NamedPrimeEntry) {
    return item.name
      ? item.name
      : item.n.substring(0, 5) + '...' + item.n.substring(item.n.length - 5);
  }
</script>

<div class="prime-list" style={`width: ${width}`}>
  <h3>{title}</h3>
  {#await fetchPrimeList()}
    <div>Loading...</div>
  {:then data}
    {#each data as item}
      <p>
        <LinkPrime primeHref={getPrimeHref(item)}>
          {getPrimeLabel(item)}
        </LinkPrime>
      </p>
    {/each}
  {/await}
</div>
