<span class="prime-name">
  <slot />
</span>

<style>
  .prime-name {
    font-size: 5rem;
    font-weight: 900;
    overflow-x: scroll;
    overflow-y: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 10px;
  }

  @media (orientation: portrait) or (max-width: 900px) {
    .prime-name {
      font-size: 4rem;
      white-space: inherit;
      text-overflow: none;
      text-align: center;
    }
  }
</style>
