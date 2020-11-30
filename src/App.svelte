<script lang="typescript">

	import {vdcp} from "./vdcp"
	
	let vdcpHost="localhost"
	
	let times:vdcp.Times={times:new Map()};
	

	let ports= vdcp.getData(null);
</script>

<main>
	<h1>VDCP time setter</h1>
	<p>Please set your times below:</p>
	<ul>
		{#each ports as port}
		<li>
			{port.name}
			{port.port}
			<input type=number bind:value={times.times[port.port]} >
		</li>
	{/each}
	</ul>
	<button type="submit" on:click={vdcp.setData(null,times)}>set Times</button>
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