<script>
  import { onMount } from "svelte";
  import ListAudios from "./ListAudios.svelte";

  let recording = false;
  let media = [];
  let mediaRecorder = null;
  let srcArray = [];

  onMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => media.push(e.data);
    mediaRecorder.onstop = function () {
      const blob = new Blob(media, { type: "audio/ogg; codecs=opus" });
      media = [];
      srcArray.push(window.URL.createObjectURL(blob));
      srcArray = srcArray;

      console.log(srcArray);
    };
  });

  function startRecord() {
    const record = document.getElementById("record");
    const stopRecord = document.getElementById("stopRecord");
    record.setAttribute("disabled", true);
    stopRecord.removeAttribute("disabled");
    recording = true;
    mediaRecorder.start();
  }

  function stopRecord() {
    const record = document.getElementById("record");
    const stopRecord = document.getElementById("stopRecord");
    stopRecord.setAttribute("disabled", true);
    record.removeAttribute("disabled");
    recording = false;
    mediaRecorder.stop();
  }

  function removeItem(index) {
    srcArray.splice(index, 1);
    srcArray = srcArray;
  }
</script>

<div>
  <main class="main-container">
    <h1>Gravador de áudio</h1>
    <div>
      <button type="button" id="record" on:click={() => startRecord()}
        >Gravar</button
      >
      <button
        type="button"
        id="stopRecord"
        on:click={() => stopRecord()}
        disabled>Parar</button
      >
      {#if recording}
        <span class="recording">Gravando</span>
      {:else}
        <span>Aguardando</span>
      {/if}
    </div>
    <div>
      {#each srcArray as item, i}
        <ListAudios
          bind:audioSrc={item}
          on:itemremovido={() => removeItem(i)}
        />
      {/each}
    </div>
  </main>
</div>

<style>
  button {
    cursor: pointer;
  }

  .main-container {
    padding: 32px;
  }

  .recording {
    color: red;
    font-weight: bold;
  }
</style>
