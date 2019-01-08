<template>
    <div id="resultsContainer">
        <div id="searchBarContainer" class="p-2">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-input-group prepend="Search by">
                    <b-form-input id="searchInput"
                                  type="text"
                                  v-model="form.pattern">
                    </b-form-input>
                    <b-input-group-append>
                        <b-btn type="submit" variant="primary">Search</b-btn>
                        <b-btn type="reset" variant="danger">Reset</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-form>
        </div>
        <div id="searchResultsContainer" class="p-2">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Results",
        data() {
            return {
                form: {
                    pattern: ''
                },
                results: []
            }
        },
        mounted() {
            this.form.pattern = decodeURI(this.$route.params.pattern)
            this.getSearchResults()
        },
        methods: {
            async getSearchResults () {
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
            async onSubmit(event) {
                event.preventDefault()
                this.getSearchResults()
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