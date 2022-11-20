import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Sign from '../pages/Sign.vue'

let history = createWebHistory();
let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/Sign',
        component: Sign
    }
]

export default createRouter({ history, routes })