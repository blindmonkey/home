import Vue from 'vue';
import Router from 'vue-router';
import About from './views/About.vue';
import Experience from './views/Experience.vue';
import Projects from './views/Projects.vue';

Vue.use(Router);

console.log('Creating new router');
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    { path: '/about', component: About },
    { path: '/experience', component: Experience },
    { path: '/projects', component: Projects },
    { path: '*', redirect: '/about' }
  ],
});
