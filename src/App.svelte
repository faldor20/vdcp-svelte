
<script lang="typescript">
import { onMount } from "svelte";

	interface ConfigData{
		VDCPSpoofUrl:string
	}

	
	import {vdcp} from "./vdcp"

	let vdcpHost=null;
	let times:vdcp.VDCPTimes={times:new Map()};
	
	let config:vdcp.Config={ports:[]};
	
	onMount(async()=>{
		//read json
		let configJson:ConfigData=await (await fetch('config.json')).json();
		vdcpHost=configJson.VDCPSpoofUrl;
		console.log("read config and got host"+configJson.VDCPSpoofUrl);

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
	<div class="sideways">
		{#each config.ports as port ,i}
		<div class="item" >
			<h3 >
				{port.name}
				{port.port}
			</h3>
			<ul>

			{#each port.segments as seg,j}
			<li>
				{seg}
				<input type=number bind:value={times.times[i][j]} >
				</li>
			{/each}
		</ul>
	</div>
	{/each}
</div>
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
	.sideways{
		justify-content: center;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;


	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>