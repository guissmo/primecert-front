<script lang="ts">
  export let visible = true;
</script>

<span class="aka" style={`visibility: ${visible ? 'visible' : 'hidden'}`}> a.k.a. </span>

<style>
  .aka {
    font-size: 5rem;
    opacity: 0.5;
    grid-area: aka;
  }
</style>
