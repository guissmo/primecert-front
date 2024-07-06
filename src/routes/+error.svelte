<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="outer-div">
	<div class="container-div">
		<div class="big-number-container">
			<span class="big-number-label">E={$page.status}</span>
		</div>
		<div class="tabs">
			<a on:click={() => history.back()} href={'#'} class="tab-up">Back</a>
		</div>
		<div class="content">
			<span class="prime-name">{$page.error?.message}</span>
		</div>
	</div>
</div>

<style>
	.outer-div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background: green;
		padding: 0;
	}
	.container-div {
		height: 100vh;
		width: 100vw;
		background: white;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		overflow: hidden;
	}
	.tabs {
		display: grid;
		justify-items: flex-end;
	}
	.tab-up {
		font-family: 'Courier New', Courier, monospace;
		text-transform: uppercase;
		text-decoration: none;
		padding: 1ex;
		font-weight: 900;
		cursor: pointer;
		width: 20%;
		background: white;
		font-size: 3rem;
		border: 1px solid white;
		color: black;
		box-shadow: 0px 5px 10px darkgray;
		text-align: center;
	}
	.tab-up {
		align-self: flex-start;
		transform: translate(-25%, -25%);
	}
	.tab-up:hover {
		box-shadow: 0px 5px 10px #666;
	}
	.big-number-container {
		width: 100%;
		font-family: 'Courier New', Courier, monospace;
		background-color: none;
		color: black;
		box-shadow: 0px 5px 10px darkgray;
		/* scrollbar-width: none; */
		padding: 0.3ex;
		padding-top: 10ex;
		display: flex;
		flex-shrink: 0;
	}
	.big-number-label {
		font-size: 10rem;
	}
	.big-number {
		all: unset;
		display: inline-block;
		font-size: 10rem;
		flex-grow: 1;
		width: 100%;
	}
	.content {
		display: grid;
		padding-left: 10%;
		padding-right: 10%;
		grid-template-columns: 1fr 2fr;
		column-gap: 3ex;
		row-gap: 1ex;
		grid-template-areas:
			'aboutheader listheader'
			'aboutcontent listcontent';
	}
	.prime-name {
		font-size: 5rem;
		font-weight: 900;
		overflow-x: scroll;
		overflow-y: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-family: Georgia, Times, 'Times New Roman', serif;
		padding-top: 1rem;
	}
</style>
