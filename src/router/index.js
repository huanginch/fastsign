import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Sign from '../pages/Sign.vue'

let history = createWebHistory()
let routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Sign',
        name: 'Sign',
        component: Sign
    }
]

export default createRouter({ history, routes })