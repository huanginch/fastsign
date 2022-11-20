import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Sign from '../pages/Sign.vue'

let history = createWebHistory();
let routes = [
    {
        path: '/fastsign/',
        component: Home
    },
    {
        path: '/fastsign/Sign',
        component: Sign
    }
]

export default createRouter({ history, routes })