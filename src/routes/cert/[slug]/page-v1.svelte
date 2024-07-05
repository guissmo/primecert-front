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

<div class="outer-div">
    <div class="container-div">
        <span class="big-number-container">
            <span class="big-number number-begin">{currentPrimeString}</span>
        </span>
        <div class="spacer">

        </div>
        <span class="big-number-container">
            <span class="big-number number-end">{currentPrimeString}</span>
        </span>
    </div>
</div>

<style>

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
            background: white;
            display: flex;
            justify-content: center;
            flex-direction: column;
            overflow: hidden;
        }
        .spacer {
            width: 100%;
            flex-grow: 1;
        }
        .big-number-container {
            width: 100%;
            font-family:'Courier New', Courier, monospace;
            background-color: none;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .big-number {
            width: 100%;
            overflow: hidden;
            text-overflow: '...';
            font-family:'Courier New', Courier, monospace;
            font-size: 10em;
            background-color: orange;
            color: black;
            padding: 0.3ex;
        }
        .number-begin {
            direction: ltr;
            align-self: flex-start;
            transform: rotate(-3deg) translate(-0.1em, -1.1em);
            padding-top: calc(0.3ex + 1.1em);
        }
        .number-end {
            direction: rtl;
            text-align: right;
            align-self: flex-end;
            transform: rotate(-3deg) translate(0.1em, 1.1em);
            padding-bottom: calc(0.3ex + 1.1em);
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
            background: red;
            overflow: hidden;
        }
    }
</style>