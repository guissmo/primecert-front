<script lang="ts">

    import { onMount } from "svelte";
    // @ts-ignore
    import JSONbig from "json-bigint";
    import Hoverable from '$lib/Hoverable.svelte';
	import { PUBLIC_SVELTE_BASE_API_URL } from "$env/static/public";

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

    const highlightColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff']
    
    onMount(async () => {
        unnamed = await fetch(`${PUBLIC_SVELTE_BASE_API_URL}/primes/unnamed`)
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

        recentlyNamed = await fetch(`${PUBLIC_SVELTE_BASE_API_URL}/primes/recently-named`)
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
        
    <form on:submit={()=>{
        // @ts-ignore
        // window.location = `/prime/${inputValue}`
    }}>
    <div class="outer-div">
        <div class="container-div">
            <div style="position: fixed">
                <div class="big-number-container">
                    <span class="big-number-label">N=</span><input bind:value={inputValue} class="big-number" placeholder="........................................." maxlength="199"/>
                </div>
                <div class="tabs">
                    <a href={`/prime/${inputValue}`} class='tab-up'>Go</a>
                </div>
            </div>
            <div class="content">
                <div class="header-container about-header"><span class="header">About</span></div>
                <div class="sub-content about-content">
                    <h3>Wanna name a prime?</h3>
                    <p>You could either type a prime above, click submit and name it, or choose one of the unnamed primes and name it!</p>
                    <h3>Just browsing?</h3>
                    <p>You could also just browse the other named primes!</p>
                    <h3>How?</h3>
                    <p>We are using <a href="https://pari.math.u-bordeaux.fr/">PARI/GP</a> under the hood to compute primality certificates.</p>
                </div>
                <div class="header-container list-header"><span class="header">Lists</span></div>
                <div class="sub-content list-content">
                    <div class="prime-list">
                    <h3>Named Primes</h3>
                    {#each recentlyNamed as item}
                    <p><a href={`/prime/${item.slug}`} style={`--color: ${highlightColors[Math.floor(Math.random()*highlightColors.length)]}`} class="clickable-prime">{item.name}</a></p>
                    {/each}
                    </div>
                    <div class="prime-list">
                    <h3>Unnamed Primes</h3>
                        {#each unnamed as item}
                        <p><a href={`/prime/${item.n}`} style={`--color: ${highlightColors[Math.floor(Math.random()*highlightColors.length)]}`} class="clickable-prime">{item.n.substring(0, 5)}... ...{item.n.substring(item.n.length-5, item.n.length)}</a></p>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
<style>
    .outer-div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            padding: 0;
            align-items: flex-start;
            overflow-x: hidden;
        }
        .container-div {
            background: white;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
        }
        .tabs {
            height: 0;
            display: grid;
            justify-items: flex-end;
        }
        .tab-up {
            font-family:'Courier New', Courier, monospace;
            text-transform: uppercase;
            text-decoration: none;
            padding: 1ex;
            font-weight: 900;
            cursor: pointer;
            width: 20%;
            background: white;
            font-size: 2rem;
            border: 1px solid white;
            color: black;
            box-shadow: 0px 5px 10px darkgray;
            text-align: center;
        }
        .tab-up {
            align-self: flex-start;
            transform: translate(-25%, -25%);
        }
        .tab-up:hover {
            box-shadow: 0px 5px 10px #666;
        }
        .big-number-container {
            width: 100%;
            font-family:'Courier New', Courier, monospace;
            background-color: white;
            color: black;
            box-shadow: 0px 5px 10px darkgray;
            /* scrollbar-width: none; */
            padding: 0.3ex;
            padding-top: 10ex;
            display: flex;
            flex-shrink: 0;
        }
        .big-number-label {
            font-size: 10rem;
        }
        .big-number {
            all: unset;
            display: inline-block;
            font-size: 10rem;
            flex-grow: 1;
            width: 100%;
        }
        .content {
            display: grid;
            padding-top: calc(15ex + 10rem);
            padding-left: 1ex;
            padding-right: 1ex;
            grid-template-columns: 2fr 3fr;
            column-gap: 3ex;
            row-gap: 0.5ex;
            grid-template-areas:
            "aboutheader listheader"
            "aboutcontent listcontent";
        }
        .header-container {
            font-size: 2rem;
            padding: 1ex;
        }
        .header {
                z-index: 3;
                font-family:'Courier New', Courier, monospace;
                text-transform: uppercase;
                padding: 1ex;
                font-weight: 900;
                cursor: pointer;
                background: white;
                border: 1px solid white;
                color: black;
                box-shadow: 0px 5px 10px darkgray;
            }
        .sub-content {
            font-family: Georgia, Times, 'Times New Roman', serif;
            background: white;
            box-shadow: 0px 5px 10px darkgray;
            font-size: 3ex;
            padding: 3ex;
        }
        .list-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        .about-header {
            grid-area: aboutheader;
        }
        .about-content {
            grid-area: aboutcontent;
            overflow-y: scroll;
        }
        .list-header {
            grid-area: listheader;
        }
        .list-content {
            grid-area: listcontent;
        }
        .prime-list {
            width: 90%;
        }
        .clickable-prime {
            display: inline-block;
            font-family:'Courier New', Courier, monospace;
            text-decoration: none;
            padding: 0 1ex;
            color: black;
            background-color: var(--color);
            text-decoration: none;
        }
</style>
    