<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { writable } from 'svelte/store';

  // Store to hold the data
  const dataStore = writable([]);
  
  // Store for the last clicked node
  let lastClickedNode = null;

  // Store for the audio context and buffer
  let audioContext = null;
  let audioBuffer = null;
  let audioSource = null;



  // Function to handle file upload
  function handleFileUploadAudio(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function(e) {
        try {
          const audioData = e.target.result;
          await loadAudio(audioData);
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



  // Function to handle file upload
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          dataStore.set(jsonData["slices"]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  onMount(() => {
    // Subscribe to data store and update the scatter plot when data changes
    dataStore.subscribe(data => {
      if (data.length > 0) {
        const svg = d3.select('#scatter-plot')
          .attr('width', 500)
          .attr('height', 500);

        svg.selectAll('*').remove();  // Clear previous elements

        const container = svg.append('g'); // Create a container for zooming

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
            // Reset color of the previous clicked node
            if (lastClickedNode) {
              lastClickedNode.attr('fill', 'black');
            }
            // Change color of the clicked node
            d3.select(this).attr('fill', 'red');
            lastClickedNode = d3.select(this);
          });

        // Enable zoom behavior on the container
        svg.call(d3.zoom().on('zoom', zoomed));

        function zoomed(event) {
          const { transform } = event;
          container.attr('transform', transform); // Apply zoom to the container
        }
      }
    });
  });

  function playSegment(startTime, endTime) {
    if (audioContext && audioBuffer) {
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;
      audioSource.connect(audioContext.destination);
      audioSource.start(0, startTime, endTime - startTime);
    }
  }

  function stopPlayback() {
    if (audioSource) {
      audioSource.stop();
      audioSource.disconnect();
    }
  }
</script>

<div class="container">
    <svg id="scatter-plot"></svg>
    <div class="buttons">
        <div class="input">
            <p>json</p>
            <input type="file" accept=".json" on:change={handleFileUpload} />
        </div>
        <div class="input">
            <p>audio</p>
            <input type="file" accept=".mp3, .wav" on:change={handleFileUploadAudio} />
        </div>
    </div>
    <button on:click={stopPlayback}>Stop</button>
</div>





<style>
  svg {
    border: 1px solid black;
    width: 500px;
    height: 500px;
  }

  .buttons{
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    width: 500px;
    background-color: grey;
    gap: 1em;
  }

  .input{
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
</style>
