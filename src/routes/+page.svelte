<script lang="ts">
  import BigNumberNavigation from '$lib/BigNumberNavigation.svelte';
  import HomeContent from '$lib/HomeContent.svelte';
</script>

<BigNumberNavigation />
<!-- <div class="spacer">&nbsp;</div> -->
<HomeContent />

<style>
  .spacer {
    background: linear-gradient(black, rgb(0, 0, 0, 0));
    height: 30px;
  }
</style>
