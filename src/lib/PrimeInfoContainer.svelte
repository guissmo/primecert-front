<div class="outer-container">
  <span class="container">
    <slot />
  </span>
</div>

<style>
  .outer-container {
    flex-grow: 1;
    padding-left: 10ex;
    padding-right: 10ex;
    padding-top: 5ex;
    max-width: 100vw;
    overflow-y: scroll;
  }
  .container {
    font-family: Georgia, Times, 'Times New Roman', serif;
    gap: 1rem;
    display: grid;
    justify-content: flex-start;
    align-items: baseline;
    grid-template-areas:
      'aka prime-name'
      'nav-bar info';
  }
</style>
