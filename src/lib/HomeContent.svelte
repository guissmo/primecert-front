<script lang="ts">
  import HomeHeader from './HomeHeader.svelte';
  import PrimeList from './PrimeList.svelte';
</script>

<div class="home-grid">
  <div class="header-container about-container">
    <HomeHeader title="About" />
  </div>
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
  <div class="header-container list-container">
    <HomeHeader title="Lists" />
  </div>
  <div class="sub-content list-content">
    <PrimeList title="Recently Named" endpoint="recently-named" />
    <PrimeList title="Unnamed" endpoint="unnamed" />
  </div>
</div>

<style>
  .home-grid {
    display: grid;
    padding-left: 1ex;
    padding-right: 1ex;
    grid-template-rows: calc(15ex) 1fr;
    grid-template-columns: 2fr 3fr;
    column-gap: 3ex;
    row-gap: 2ex;
    grid-template-areas:
      'about-container list-container'
      'aboutcontent listcontent';
    overflow-y: scroll;
    height: 100%;
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
  .header-container {
    font-size: 2rem;
    padding: 1ex;
    align-self: flex-end;
  }
  .about-container {
    grid-area: about-container;
  }
  .about-content {
    grid-area: aboutcontent;
    overflow-y: scroll;
  }
  .list-container {
    grid-area: list-container;
  }
  .list-content {
    grid-area: listcontent;
  }
  @media (orientation: portrait) or (max-width: 900px) {
    .home-grid {
      display: block;
    }
    .about-content {
      font-size: 2rem;
      height: fit-content;
    }
    .sub-content {
      font-size: 1rem;
    }
    .list-content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
