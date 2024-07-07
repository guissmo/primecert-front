<script lang="ts">
  import PrimeList from './PrimeList.svelte';
</script>

<div class="content">
  <div class="header-container about-header"><span class="header">About</span></div>
  <div class="sub-content about-content">
    <h3>Wanna name a prime?</h3>
    <p>
      You could either type a prime above, click submit and name it, or choose one of the unnamed
      primes and name it!
    </p>
    <h3>Just browsing?</h3>
    <p>You could also just browse the other named primes!</p>
    <h3>How?</h3>
    <p>
      We are using <a href="https://pari.math.u-bordeaux.fr/">PARI/GP</a> under the hood to compute primality
      certificates.
    </p>
  </div>
  <div class="header-container list-header"><span class="header">Lists</span></div>
  <div class="sub-content list-content">
    <PrimeList title="Recently Named" endpoint="/primes/recently-named" />
    <PrimeList title="Unnamed" endpoint="/primes/unnamed" />
  </div>
</div>

<style>
  .content {
    display: grid;
    /* padding-top: calc(15ex + 10rem); */
    padding-left: 1ex;
    padding-right: 1ex;
    grid-template-columns: 2fr 3fr;
    column-gap: 3ex;
    row-gap: 0.5ex;
    grid-template-areas:
      'aboutheader listheader'
      'aboutcontent listcontent';
    overflow-y: scroll;
    height: 100%;
  }
  .header-container {
    font-size: 2rem;
    padding: 1ex;
  }
  .header {
    font-family: 'Courier New', Courier, monospace;
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
</style>
