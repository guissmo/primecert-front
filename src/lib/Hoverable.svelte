<script lang="ts">
  import { tap } from 'svelte-gestures';

  export let char: string = '';
  export let locked = false;
  export let displayed = false;
  export let onClick: (event?: MouseEvent) => void = () => {};
  export let onMouseEnter: () => void = () => {};
  export let onMouseLeave: () => void = () => {};
  export let onTouchStart: () => void = () => {};
  let color = '#FFFF';
  switch (char.toLowerCase()) {
    case 'n':
      color = '#FF6666';
      break;
    case 'q':
      color = '#FFC2C2';
      break;
    case 'x':
      color = '#93FF1F';
      break;
    case 'y':
      color = '#C4FF85';
      break;
    case 'a':
      color = '#B1FCFC';
      break;
    case 'b':
      color = '#0AEBEB';
      break;
  }
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a
  class="hoverable"
  data-locked={locked ? 'yes' : 'no'}
  data-displayed={displayed ? 'yes' : 'no'}
  href="#"
  style={`--color: ${color}`}
  on:click|preventDefault={onClick}
  on:touchstart={onTouchStart}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  aria-label={char}
>
  {char}
</a>

<style>
  .hoverable {
    font-family: 'Courier New', Courier, monospace;
    display: inline-block;
    padding: 0 0.5ex;
    color: black;
    /* background-color: var(--color); */
    text-decoration: none;
    border: 3px solid var(--color);
  }
  .hoverable[data-displayed='yes'] {
    border: 3px solid var(--color);
    background: var(--color);
  }
  .hoverable[data-locked='yes'] {
    background-color: var(--color);
    color: black;
    border-color: black;
  }
  @media (orientation: portrait) or (max-width: 900px) {
    .hoverable[data-locked='yes'] {
      border-color: transparent;
    }
  }
</style>
