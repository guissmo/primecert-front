<script lang="ts">

    import { page } from '$app/stores';
    import { onMount } from "svelte";
    // @ts-ignore
    import JSONbig from "json-bigint";

    type NamedPrime = {
        id: String,
        n: string,
        name: string,
        slug: string
    }
    
    let recentlyNamed: NamedPrime[] = []

    let currentPrime = {}
    let currentPrimeString = "LOADING..."

    
    onMount(async () => {
        currentPrime = await fetch(`http://localhost:8000/view-cert/${$page.params.slug}`)
        .then(async (response) => {
            console.log(`http://localhost:8000/view-cert/${$page.params.slug}`)
            return JSONbig.parse(await response.text())
        })
        .then(data => {
            console.log(data.n)
            return data.n
        }).catch(error => {
            console.log(error);
            return '{}';
        });
        // @ts-ignore
        currentPrimeString = currentPrime.toString(10)
    })
</script>
    
<h1>
        {currentPrimeString}
</h1>
    