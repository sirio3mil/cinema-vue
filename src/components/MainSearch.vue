<template>
    <div id="mainSearchContainer" class="col-md-6 m-auto align-middle">
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
        </b-form>
        <b-button type="submit" variant="primary" class="mr-2">Search</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "MainSearch",
        data() {
            return {
                form: {
                    pattern: ''
                },
                results: []
            }
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault()
                try {
                    const res = await axios.post(
                        'https://api.reynier.es/graphql', {
                            query: `
                                {
                                    search(pattern:"` + this.form.pattern + `"){
                                        searchParam
                                        rowType
                                        rowTypeId
                                        objectId
                                        original
                                        year
                                        internalId
                                        imdbNumber
                                    }
                                }
                            `
                        })
                    this.results = res.data.data.search
                } catch (e) {
                    console.log('err', e)
                }
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