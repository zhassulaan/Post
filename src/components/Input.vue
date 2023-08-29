<template>
	<input
		v-if="type === 'text'"
		class='input'
		type='text'
		:value='text_value'
    :placeholder='text'
		@input='handleInput($event.target.value)'
	/>
	<div class='input' v-if="type === 'file'">
		<label class='input-label'>{{ text }}</label>
		<input
			class='input-url'
			type='file'
			:value='file_value'
			accept='image/*'
			@change='handleInput($event.target.files[0])'
		/>
	</div>
</template>

<script setup>
	const emit = defineEmits(['input']);
	const props = defineProps({
		type: String,
		id: String,
		text: String,
		text_value: String,
		file_value: File,
	});

	function handleInput(value) {
		if (value !== '' || value !== null) {
			if (typeof value === 'object') {
        const reader = new FileReader();

        reader.onload = function (event) {
          const image_url = event.target.result;
					emit('input', props.id, image_url);
        };
        reader.readAsDataURL(value);
      } else {
				emit('input', props.id, value);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.input {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 53px;
		border: none;
		border-radius: 10px;
		background-color: var(--clr-grey);
		color: var(--clr-black);
		font-size: 15px;
		font-weight: 500;
		padding: 0 1.5625vw;
		opacity: .75;
		&::placeholder {
			color: var(--clr-black);
		}
	}
</style>
