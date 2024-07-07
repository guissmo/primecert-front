<div class="outer-div">
  <div class="container-div">
    <slot />
  </div>
</div>

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
</style>
