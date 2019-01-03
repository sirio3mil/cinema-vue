<template>
    <div class="tapeDetailMain">
        <h1>{{originalTitle}}</h1>
        <b-form-input v-model="tapeId" type="text" placeholder="enter tape id"></b-form-input>
        <b-button variant="primary" @click="getLanguage">Get Tape Details</b-button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "TapeDetail",
        data () {
            return {
                tapeId: '',
                originalTitle: ''
            }
        },
        methods: {
            async getLanguage () {
                try {
                    const res = await axios.post(
                        'https://api.reynier.es/graphql', {
                            query: `
                                {
                                    getTape(tapeId:` + this.tapeId + `){
                                        originalTitle
                                    }
                                }
                            `
                        })
                    this.originalTitle = res.data.data.getTape.originalTitle
                } catch (e) {
                    console.log('err', e)
                }
            }
        }
    }
</script>

<style scoped>

</style>