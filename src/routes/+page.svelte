<script lang="ts">

    import { onMount } from "svelte";
    // @ts-ignore
    import JSONbig from "json-bigint";

    type UnnamedPrime = {
        id: String,
        n: string
    }

    type NamedPrime = {
        id: String,
        n: string,
        name: string,
        slug: string
    }
    
    let inputValue = ''
    let unnamed: UnnamedPrime[] = []
    let recentlyNamed: NamedPrime[] = []

    
    onMount(async () => {
        unnamed = await fetch("http://localhost:8000/primes/unnamed")
        .then(async (response) => {
            return JSONbig.parse(await response.text())
        })
        .then(data => {
            const ret = data.map( (onePrime: UnnamedPrime) => {
                return {
                    id: onePrime.id,
                    //@ts-ignore
                    n: onePrime.n.toString(10)
                }
            })
            return ret
        }).catch(error => {
            console.log(error);
            return '{}';
        });

        recentlyNamed = await fetch("http://localhost:8000/primes/recently-named")
        .then(async (response) => {
            return JSONbig.parse(await response.text())
        })
        .then(data => {
            const ret = data.map( (onePrime: NamedPrime) => {
                return {
                    id: onePrime.id,
                    //@ts-ignore
                    n: onePrime.n.toString(10),
                    name: onePrime.name,
                    slug: onePrime.slug,
                }
            })
            return ret
        }).catch(error => {
            console.log(error);
            return '{}';
        });
        });
    </script>
    
    <h1>
        <form on:submit={()=>{}}>
            <input id='in' bind:value={inputValue}/>
            <button type='submit'>Submit</button>
        </form>
        <ul>
            {#each unnamed as item}
            <li>{item.n}</li>
            {/each}
        </ul>
        <ul>
            {#each recentlyNamed as item}
            <li>{item.name}, {item.n}</li>
            {/each}
        </ul>
    </h1>
    