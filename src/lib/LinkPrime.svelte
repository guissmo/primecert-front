<script>
  export let primeHref = '';

  const highlightColors = [
    '#ffadad',
    '#ffd6a5',
    '#fdffb6',
    '#caffbf',
    '#9bf6ff',
    '#a0c4ff',
    '#bdb2ff',
    '#ffc6ff',
  ];

  export let color = highlightColors[Math.floor(Math.random() * highlightColors.length)];
</script>

<a href={`/cert/${primeHref}`} class="clickable-prime" style={`--color: ${color}`}>
  <slot />
</a>

<style>
  .clickable-prime {
    display: inline-block;
    font-family: 'Courier New', Courier, monospace;
    text-decoration: none;
    padding: 0 1ex;
    color: black;
    background-color: var(--color);
    text-decoration: none;
  }
</style>
