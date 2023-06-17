import { createRouter, createWebHistory } from 'vue-router'
import TransactionView from '../views/TransactionView.vue'

const routes = [
  {
    path: '/transactions',
    name: 'transactions',
    props: true,
    component: TransactionView
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../App.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
