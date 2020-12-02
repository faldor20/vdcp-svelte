<script lang="typescript">
import { onMount } from "svelte";


	import {vdcp} from "./vdcp"
	
	let vdcpHost="http://localhost:8000"
	
	let times:vdcp.VDCPTimes={times:new Map()};
	
	let config:vdcp.Config={ports:[]};
	
	onMount(async()=>{
		config= await vdcp.getData(vdcpHost);
		for (let i = 0; i < config.ports.length; i++) {
			const port = config.ports[i];
			
				times.times[i]=[];
			
		} 
	})
</script>

<main>
	<h1>VDCP time setter</h1>
	<p>Please set your times below:</p>
	<ul>
		{#each config.ports as port ,i}
		<li>
			{port.name}
			{port.port}
			{#each port.segments as seg,j}
				{seg}
				<input type=number bind:value={times.times[i][j]} >
			{/each}
		</li>
	{/each}
	</ul>
	<button type="submit" on:click={vdcp.setData(vdcpHost,times)}>set Times</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>