<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let audioSrc;
</script>

<div class="audio-item">
  <audio controls src={audioSrc} />
  <button on:click={() => dispatch("itemremovido")}>Excluir</button>
</div>

<style>
  button {
    cursor: pointer;
  }

  .audio-item {
    display: grid;
    align-items: center;
    grid-template-columns: 300px 100px;
    grid-gap: 16px;
    margin-top: 10px;
  }
</style>
