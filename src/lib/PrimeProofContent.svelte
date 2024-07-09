<script lang="ts">
  import { setContext } from 'svelte';
  import Var from './ProofVar.svelte';
  import { writable, type Writable } from 'svelte/store';

  const lockedVariable: Writable<string> = writable();
  setContext('lockedVariable', lockedVariable);
  $: lockedVariable.set('N');
</script>

<span class="info">
  <p class="theorem">
    The point P: ( <Var name="x" />, <Var name="y" /> ) on the elliptic curve
    <br />&nbsp;&nbsp; E: y<sup>2</sup> = x<sup>3</sup> + <Var name="a" />x + <Var name="b" />,
    &nbsp;&nbsp; defined modulo <Var name="N" />
    <br />has order <Var name="q" /> &gt; (N<sup>1/4</sup> + 1)<sup>2</sup>.
  </p>
  <p class="theorem">
    Since <Var name="q" />
    <span><a class="proof-link" href="#" data-sveltekit-reload>is prime</a>,</span>
    then <Var name="N" /> is also prime.
  </p>
</span>

<style>
  .theorem {
    margin-top: 0;
    margin-bottom: 24px;
    line-height: 1.6;
  }
</style>
