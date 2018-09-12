<template>
  <ul class="navbar-nav">
    <li v-for="route in routes" class="nav-item">
      <span v-if="route.link != null">
        <router-link tag="a" role="presentation" v-bind:to="route.link" active-class="active" class="nav-link flex-row">
          {{ route.text }}
        </router-link>
      </span>
      <span v-if="route.external != null">
        <a :href="route.external" class="nav-link" target="_blank">{{ route.text }} &nbsp;<i class="fa fa-external-link-alt"></i></a>
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ExternalLink {
  external: string;
  text: string;
}
interface RouterLink {
  link: string;
  text: string;
}
type Link = ExternalLink | RouterLink;

@Component({})
export default class Navigation extends Vue {
  public static Routes: Link[] = [
    {link: '/about', text: 'About Me'},
    {link: '/experience', text: 'Experience & Education'},
    {link: '/projects', text: 'Projects'},
    {external: 'files/sergey-grabkovsky-resume.pdf', text: 'Resume'},
    {external: 'https://www.linkedin.com/in/sergey-g/', text: 'LinkedIn'},
    {external: 'https://github.com/blindmonkey', text: 'GitHub'},
  ];

  public routes = Navigation.Routes;

  public static isRouterLink(link: Link): link is RouterLink {
    return (<RouterLink>link).link != null;
  }
}
</script>