import Search from './components/Search.vue'
import Results from './components/Results.vue'

export default [

    {path: '/', component: Search},
    {path: '/results/:pattern', component: Results}
]