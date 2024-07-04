<script lang="ts">

    import { page } from '$app/stores';
    import { onMount } from "svelte";
    // @ts-ignore
    import JSONbig from "json-bigint";

    import Hoverable from '$lib/Hoverable.svelte';

    type NamedPrime = {
        id: String,
        n: string,
        name: string,
        slug: string
    }
    
    let recentlyNamed: NamedPrime[] = []

    let currentPrime : null | {
        name: string,
        n: bigint,
        q: bigint,
        a: bigint,
        b: bigint,
        x: bigint,
        y: bigint
    } = null;

    let lockedVariableName = true;
    let previousVariableName = 'N';
    let variableName = 'N';
    let viewedNumber : bigint | undefined = 0n;

    let lowQ = false;

    function updateViewedNumber(s: string) {
        switch(s){
            case 'N': viewedNumber = currentPrime?.n; break;
            case 'q': viewedNumber = currentPrime?.q; break;
            case 'x': viewedNumber = currentPrime?.x; break;
            case 'y': viewedNumber = currentPrime?.y; break;
            case 'a': viewedNumber = currentPrime?.a; break;
            case 'b': viewedNumber = currentPrime?.b; break;
        }
    }
 
    function viewedVariableName(s: string) {
        if(lockedVariableName) {
            return;
        }
        previousVariableName = variableName;
        variableName = s;
        updateViewedNumber(s);
    }

    function restorePreviousVariableName() {
        if(lockedVariableName) {
            return;
        }
        variableName = previousVariableName;
        updateViewedNumber(previousVariableName);
    }

    function toggleLockVariableName(s: string) {
        if(!lockedVariableName) lockedVariableName = true
        else {
            lockedVariableName = s != variableName
            if(!lockedVariableName) {
                previousVariableName = 'N'
                return;
            }
        }
        previousVariableName = variableName;
        variableName = s;
        updateViewedNumber(s);
    }

    function st(x : BigInt | undefined) {
        if (x == undefined) {
            return '...'
        }
        return x.toString(10)
    }
    
    onMount(async () => {
        currentPrime = await fetch(`http://localhost:8000/get-all-info/${$page.params.slug}`)
        .then(async (response) => {
            console.log(`http://localhost:8000/get-all-info/${$page.params.slug}`)
            return JSONbig.parse(await response.text())
        })
        .then(data => {
            return data
        }).catch(error => {
            return {
                n: 'ERROR',
                name: 'ERROR',
            };
        });
        viewedNumber = currentPrime ? currentPrime.n : undefined;
        lowQ = Boolean(currentPrime && currentPrime.q && currentPrime.q < 18446744073709551616n)
    })
</script>

<div class="outer-div">
    <div class="container-div">
        <div class="big-number-container">
            <span class="big-number">
                {variableName+"="}{currentPrime ? st(viewedNumber) : ''}
            </span>
        </div>
        {#if currentPrime}
        <div class="info-div">
            <span class="prime-info-container">
            <span class="aka">a.k.a.</span>
            <span class="prime-name">{
                currentPrime ? (currentPrime.name ? `The ${currentPrime.name} Prime` : 'An Unnamed Prime') : 'Loading...'
            }</span>
            <span class="spacer"><img class='img-avatar' alt='a robot' src={`https://robohash.org/${st(currentPrime.n)}?set=set4`} /></span>
            <span class="info">
                <p class="theorem">The point P: ( <Hoverable displayed={variableName == "x"} locked={lockedVariableName && variableName == "x"} char="x" onClick={() => toggleLockVariableName("x")} onMouseEnter={() => viewedVariableName("x")} onMouseLeave={() => restorePreviousVariableName()} />, <Hoverable displayed={variableName == "y"} locked={lockedVariableName && variableName == "y"} char="y" onClick={() => toggleLockVariableName("y")} onMouseEnter={() => viewedVariableName("y")} onMouseLeave={() => restorePreviousVariableName()}/> ) on the elliptic curve
                <br>&nbsp;&nbsp; E: y<sup>2</sup> = x<sup>3</sup> + <Hoverable displayed={variableName == "a"} locked={lockedVariableName && variableName == "a"} char="a" onClick={() => toggleLockVariableName("a")} onMouseEnter={() => viewedVariableName("a")} onMouseLeave={() => restorePreviousVariableName()}/>x + <Hoverable displayed={variableName == "b"} locked={lockedVariableName && variableName == "b"} char="b" onClick={() => toggleLockVariableName("b")} onMouseEnter={() => viewedVariableName("b")} onMouseLeave={() => restorePreviousVariableName()} />, &nbsp;&nbsp; defined modulo <Hoverable displayed={variableName == "N"} locked={lockedVariableName && variableName == "N"} char="N" onClick={() => toggleLockVariableName("N")} onMouseEnter={() => viewedVariableName("N")} onMouseLeave={() => restorePreviousVariableName()}/>
                <br>has order <Hoverable displayed={variableName == "q"} locked={lockedVariableName && variableName == "q"} char="q" onClick={() => toggleLockVariableName("q")} onMouseEnter={() => viewedVariableName("q")} onMouseLeave={() => restorePreviousVariableName()} /> &gt; (N<sup>1/4</sup> + 1)<sup>2</sup>.</p>
                <p class="theorem">Since <Hoverable displayed={variableName == "q"} locked={lockedVariableName && variableName == "q"} char="q" onClick={() => toggleLockVariableName("q")} onMouseEnter={() => viewedVariableName("q")} onMouseLeave={() => restorePreviousVariableName()}/> {#if lowQ}
                    <span>is prime because it is less than 2<sup>64</sup> and does not pass <a class="proof-link" href="https://en.wikipedia.org/wiki/Baillie%E2%80%93PSW_primality_test" target="_blank">the Baillie–PSW test</a>,</span>
                    {:else}
                    <span><a class="proof-link" on:mouseenter={() => viewedVariableName('q')} on:mouseleave={() => restorePreviousVariableName()} href={currentPrime && currentPrime.q ? `/prime/${st(currentPrime.q)}` : './'} data-sveltekit-reload>is prime</a>,</span>
                    {/if} then <Hoverable displayed={variableName == "N"} locked={lockedVariableName && variableName == "N"} char="N" onClick={() => toggleLockVariableName("N")} onMouseEnter={() => viewedVariableName("N")} onMouseLeave={() => restorePreviousVariableName()}/> is also prime.</p>
            </span>
            </span>
        </div>
        {:else}
        <div class="info-div">
            &nbsp;
        </div>
        {/if}
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
            justify-content: flex-start;
            flex-direction: column;
            overflow: hidden;
        }
        .big-number-container {
            width: 100%;
            overflow-x: scroll;
            font-family:'Courier New', Courier, monospace;
            background-color: none;
            color: black;
            box-shadow: 0px 5px 10px darkgray;
            /* scrollbar-width: none; */
            padding: 0.3ex;
            padding-top: 10ex;
        }
        .big-number {
            font-size: 10rem;
        }
        /* .big-number-container::-webkit-scrollbar {
            display: none;
        } */
        .info-div {
            flex-grow: 1;
            padding-left: 10ex;
            padding-right: 10ex;
            padding-top: 5ex;
            max-width: 100vw;
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
            "aka prime-name"
            "spacer info";
        }
        .aka {
            font-size: 5rem;
            opacity: 0.5;
            grid-area: "aka";
        }
        .prime-name {
            font-size: 5rem;
            font-weight: 900;
            overflow-x: scroll;
            overflow-y: none;
            white-space: nowrap;
            text-overflow: ellipsis;
            
        }
        .spacer {
            grid-area: "spacer";
            width: 80%;
            justify-self: center;
            align-self: flex-start;
        }
        .info {
            grid-area: "info";
            font-size: 3rem;
        }
        .proof-link {
            color: black;
            text-decoration-style: wavy;
            text-decoration-color: green;
        }
        .img-avatar {
            width: 128px;
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