<template>
	<form @submit="onSubmit" class="add-form">
		<div class="form-control">
			<label>42 Intra Username</label>
			<input type="text" name="username" placeholder="e.g. tmullan"/>
		</div>
		<div class="form-control">
			<label>Password</label>
			<input type="password" name="password" placeholder="e.g. password123"/>
		</div>
		<input type="submit" value="Login" class="btn btn-block" />
	
	</form>

</template>

<script lang="ts">
// import MyButton from './Button.vue'

export default {
	name: 'LoginComponent',
	props: {

	},
	components: {
		// MyButton
	},
	methods: {
		onSubmit(e: Event) {
			e.preventDefault()
			alert("Can't login yet bro")
			return
		}
	}
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 20%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  text-align: center;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>

