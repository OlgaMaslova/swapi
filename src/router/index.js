import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Films from '@/components/Films'
import People from '@/components/People'
import DetailFilm from '@/components/DetailFilm'
import DetailCharacter from '@/components/DetailCharacter'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/films',
      name: 'Films',
      component: Films
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/film/:id',
      name: 'detail-film',
      component: DetailFilm
    },
    {
      path: '/people/:name',
      name: 'detail-character',
      component: DetailCharacter
    }
  ]
})
