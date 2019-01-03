<template>
    <div class="tapeDetailMain">
        <h1>{{originalTitle}}</h1>
        <input v-model="tapeId" placeholder="edit me">
        <button @click="getLanguage">Get Tape Details</button>
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