<template>
    <div id="searchContainer" class="col-md-6 m-auto align-middle text-center pt-4">
        <img alt="logo" src="../assets/logo.png" class="mb-4">
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="searchGroup"
                          label-for="searchInput"
                          description="You can search for what you want.">
                <b-form-input id="searchInput"
                              type="text"
                              v-model="form.pattern"
                              autofocus>
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" class="mr-2">Search</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "MainSearch",
        data() {
            return {
                form: {
                    pattern: ''
                }
            }
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault()
                this.$router.push('/results/' + encodeURI(this.form.pattern));
            },
            onReset(evt) {
                evt.preventDefault()
                this.form.pattern = ''
            }
        }
    }
</script>

<style scoped>

</style>