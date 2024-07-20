<script lang="ts">
  import BigNumberNavigation from '$lib/BigNumberNavigation.svelte';
  import HomeContent from '$lib/HomeContent.svelte';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Own A Prime Certificate"
  titleTemplate="%s | PrimeCert"
  description="Explore the world of primes and name or own your favorite prime numbers greater than 2^64!"
  canonical="https://primecert.guissmo.com"
  openGraph={{
    url: 'https://primecert.guissmo.com',
    title: 'PrimeCert',
    description:
      'Explore the world of primes and name or own your favorite prime numbers greater than 2^64!',
    siteName: 'PrimeCert',
  }}
/>
<BigNumberNavigation />
<HomeContent />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
</style>
