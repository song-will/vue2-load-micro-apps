import '../public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

Vue.config.productionTip = false

let instance = null


function renderApp({ container, initUrl, ...rest }) {
  let router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/load-mirco-app' : '/',
    mode: initUrl ? 'abstract' : 'history',
    routes,
  });
  instance = new Vue({
    router,
    render: h => h(App, { props: rest })
  }).$mount(container ? container.querySelector('#app') : '#app')
  if (initUrl) {
    router.push(initUrl)
  }
  return instance
}
console.log(window.__POWERED_BY_QIANKUN__)
if (!window.__POWERED_BY_QIANKUN__) {
  renderApp()
}

export async function mount(props) {
  console.log('load micro app props', props)
  renderApp(props);
}

export async function bootstrap(props) {
  console.log('bootstrap----')
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}

// // 增加 update 钩子以便主应用手动更新微应用
// export async function update(props) {
//   renderPatch(props);
// }
