<script lang="ts">
  export let text: string = 'Loading...';
</script>

<span class="loading-text">{text}</span>

<style>
  .loading-text {
    animation: cubic-bezier(0.4, 0, 0.2, 1) 0.5s infinite loading-text;
  }
  @keyframes loading-text {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
</style>
