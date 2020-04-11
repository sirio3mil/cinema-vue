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
            <div v-for="item in results" :key="item.internalId">
                <h5>{{ item.searchParam }}</h5>
                <h6>{{ item.object.tape.originalTitle }} - {{ item.object.tape.detail.year }}</h6>
                <p v-if="item.object.tape.plot">{{ item.object.tape.plot.plot }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import queryString from 'query-string'

    export default {
        name: "Results",
        data() {
            return {
                form: {
                    pattern: ''
                },
                results: [],
                bearerToken: '',
                tokenType: ''
            }
        },
        mounted() {
            this.form.pattern = decodeURI(this.$route.params.pattern)
            this.getSearchResults()
        },
        methods: {
            async getLogin() {
                try {
                    const res = await axios.post('http://cinema.lcl:10580/oauth',
                        queryString.stringify({
                            'grant_type': 'password',
                            'username': 'user_test',
                            'password': 'test',
                            'client_id': 'client_test',
                            'client_secret': 'test',
                            'scope': 'test'
                        }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                    this.bearerToken = res.data.access_token
                    this.tokenType = res.data.token_type
                } catch (e) {
                    console.log('err', e)
                }
            },
            async getSearchResults() {
                if (this.bearerToken === ''){
                    this.getLogin().then(
                        this.getData()
                    )
                }
                else{
                    this.getData()
                }
            },
            async getData() {
                try {
                    const res = await axios.post(
                        'http://cinema.lcl:10580', {
                            query: `
                                {
                                    search(pattern:"` + this.form.pattern + `",rowType:4){
                                        searchParam
                                        object{
                                          tape{
                                            originalTitle
                                            detail{
                                              year
                                            }
                                            plot{
                                              plot
                                            }
                                          }
                                          files{
                                            name
                                            path
                                            extension
                                            downloadName
                                          }
                                        }
                                    }
                                }
                            `
                        }, {
                            headers: {
                                Authorization: this.tokenType + ' ' + this.bearerToken
                            }
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