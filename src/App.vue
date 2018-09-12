<template>
  <div id="app" class="container-fluid ml-0">
    <div style="position:fixed; left: 0px; top:0px; z-index: -1000">
      <transition name="fade-canvas">
        <canvas id="canvas" width="800" height="600" v-bind:class="{ focused: !textVisible }"></canvas>
      </transition>
    </div>
    <small style="position:fixed; right: 40px; top: 20px" class="fadein">
      <button id="hide-button" @click="hideContent()">Click here to hide/show the text</button>
    </small>

    <transition name="fade">
      <div v-show="textVisible">
        <div class="border-bottom mt-4 pb-2 ml-2">
          <h1 class="d-none d-sm-block">
            <img style="width: 1.5em; height: 1.5em" class="rounded-circle mr-3" src="./assets/photo.jpg"></img>
            Sergey Grabkovsky
          </h1>
          <nav class="navbar d-block d-sm-none navbar-expand-sm navbar-light p-0">
            <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navigationContent" aria-controls="navigationContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">
              Sergey Grabkovsky
            </a>
            <div class="collapse navbar-collapse" id="navigationContent">
              <Navigation class="mr-auto"></Navigation>
            </div>
          </nav>
        </div>
        <div class="row">
          <aside class="col-12 col-md-3 col-sm-4 p-0 d-none d-sm-block">
            <nav class="navbar navbar-expand flex-sm-column flex-row nav-pills align-items-start py-2">
              <Navigation class="flex-column w-100 justify-content-between"></Navigation>
            </nav>
          </aside>
          <main class="col bg-faded py-3">
            <transition :name="transitionName">
              <router-view class="child-view content"></router-view>
            </transition>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease-in;
}
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-leave, .fade-enter-to {
  opacity: 1;
}

#hide-button {
  background: none;
  border: 0px;
}
#canvas {
  opacity: 0.2;
  transition: opacity .5s;
}
#canvas.focused {
  opacity: 1;
  transition: opacity .5s;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.inline {
    display: inline-block;
}

.indented {
    padding-left: 2em;
    text-indent: -2em;
}


div.content {
    /*margin-left: 170pt;*/
    max-width: 750px;
}

div.content p {
    margin-bottom: 10pt;
}

.experience-item {
    border-left: 3px solid #90aec7;
    border-radius: 8px;
    padding-left: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 16px;
}

.experience-item .company {
    font-weight: bold;
}

.experience-item .location {
    font-style: italic;
}

.experience-item ul {
    margin-top: 4px;
}

.bold {
    font-weight: bold;
}

.navbar.nav-pills .nav-item {
  margin-top: 0.5em;
}
.navbar.nav-pills .nav-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-down-enter, .slide-up-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, 50px);
  transform: translate(0, 50px);
}

.slide-down-leave-active, .slide-up-enter {
  opacity: 0;
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { tryUntil } from '@/helpers/try';
import { ga } from '@/helpers/ga';
import Navigation from '@/components/Navigation.vue';
import { Route } from 'vue-router';
import router from './router';

// Component.registerHooks([
//   'beforeRouteEnter',
//   // 'beforeRouteLeave',
//   'beforeRouteUpdate', // for vue-router 2.2+
// ]);

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  public textVisible = false;
  public created() {
    tryUntil(() => {
      const options = (window as {TriangleOptions?: undefined|{interactivity: boolean}}).TriangleOptions;
      if (!options) {
        return false;
      }
      options.interactivity = false;
      return true;
    }, .5);
  }
  public mounted() {
    this.textVisible = true;
  }
  public hideContent() {
    this.textVisible = !this.textVisible;
  }
  public transitionName = 'slide-left';
  public beforeRouteEnter() {
    console.log('Yay');
  }

  @Watch('$route')
  onPropertyChanged(to: Route, from: Route) {
    ga('send', 'pageview', to.path);
    const routeUrls = Navigation.Routes.map((r) => {
      if (Navigation.isRouterLink(r)) {
        return r.link;
      }
      return null;
    });
    const fromPathIndex = routeUrls.indexOf(from.path);
    const toPathIndex = routeUrls.indexOf(to.path);
    this.transitionName = fromPathIndex < toPathIndex ? 'slide-down' : 'slide-up';
  }
}
</script>