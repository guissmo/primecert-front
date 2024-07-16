<script lang="ts">
  export let s: string | undefined = undefined;
</script>

<span class="info">
  {#if s}
    <img class="img-avatar" alt="a robot" src={`https://robohash.org/${s}}?set=set4`} />
  {/if}
  <slot />
</span>

<style>
  .info {
    grid-area: info;
    font-size: 3rem;
  }
  .img-avatar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 128px;
    z-index: 2;
  }
</style>
