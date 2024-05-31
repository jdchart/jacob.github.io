<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { writable } from 'svelte/store';

  let json_getter;
  let json_filename = "Load a json file";
  let audio_getter;
  let audio_filename = "Load an audio file";

  const dataStore = writable([]);
  
  let lastClickedNode = null;

  let audioContext = null;
  let audioBuffer = null;
  let audioSource = null;

  function handleFileUploadAudio(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function(e) {
        try {
          const audioData = e.target.result;
          await loadAudio(audioData);
          audio_filename = file.name;
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  async function loadAudio(audioData) {
    try {
      audioContext = new AudioContext();
      audioBuffer = await audioContext.decodeAudioData(audioData);
    } catch (error) {
      console.error('Error decoding audio data:', error);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          dataStore.set(jsonData["slices"]);
          json_filename = file.name;
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  onMount(() => {
    dataStore.subscribe(data => {
      if (data.length > 0) {
        const svg = d3.select('#scatter-plot')
          .attr('width', 500)
          .attr('height', 500);

        svg.selectAll('*').remove();

        const container = svg.append('g');

        const xScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.x)])
          .range([0, 500]);

        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.y)])
          .range([500, 0]);

        container.selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 5)
          .attr('fill', 'black')
          .on('click', function(event, d) {
            console.log(d.start, d.end);
            playSegment(d.start, d.end);
            if (lastClickedNode) {
              lastClickedNode.attr('fill', 'black');
            }
            d3.select(this).attr('fill', 'red');
            lastClickedNode = d3.select(this);
          });

        svg.call(d3.zoom().on('zoom', zoomed));

        function zoomed(event) {
          const { transform } = event;
          container.attr('transform', transform);
        }
      }
    });
  });

  function playSegment(startTime, endTime) {
    stopPlayback();
    if (audioContext && audioBuffer) {
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;
      audioSource.connect(audioContext.destination);
      audioSource.start(0, startTime, endTime - startTime);
    }
  }

  function playPlaybackFull(){
    if (audioContext && audioBuffer) {
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;
      audioSource.connect(audioContext.destination);
      audioSource.start();
    }
  }

  function stopPlayback() {
    if (audioSource) {
      audioSource.stop();
      audioSource.disconnect();
    }
  }

  function handle_json_click(){
    json_getter.click();
  }

  function handle_audio_click(){
    audio_getter.click();
  }
</script>

<div class="container">
    <svg id="scatter-plot"></svg>
    <div class="buttons">
        <div class="input">
            <button on:click={() => handle_json_click()}>json</button>
            <input bind:this={json_getter} type="file" accept=".json" on:change={handleFileUpload} />
            <p>{json_filename}</p>
        </div>
        <div class="input">
          <button on:click={() => handle_audio_click()}>audio</button>
            <input bind:this={audio_getter} type="file" accept=".mp3, .wav" on:change={handleFileUploadAudio} />
            <p>{audio_filename}</p>
        </div>
        <button on:click={playPlaybackFull}>Play</button>
    <button on:click={stopPlayback}>Stop</button>
    </div>
    
</div>

<style>
  p, button{
    font-size: 0.75em;
    font-family: 'Input-Mono-Narrow-Thin', monospace;
  }
  p{
    color: white;
  }

  svg {
    border: 1px solid black;
    width: 500px;
    height: 500px;
  }

  .buttons{
    width: 500px;
    background-color: grey;
  }

  input{
    display: none;
  }

  .input{
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    gap: 1em;
  }
</style>