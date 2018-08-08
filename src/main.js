import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'
import { request } from 'http';

Vue.use(VueResource);

// All http request will go to this url; append to this path as needed
Vue.http.options.root = "https://vuejs-http-6bd59.firebaseio.com/"

Vue.http.interceptors.push( (request, next) => {
  console.log(request);
  
  // Intercept the request:
  // change method from POST to PUT
  if(request.method == 'POST') { request.method = 'PUT'; }

  // Intercept the response:
  // Override vue-resource's response.json() method to return the body in a 'messages' key
  next(response => {
    response.json= () => { return { messages: response.body} }
  });
} );



new Vue({
  el: '#app',
  render: h => h(App)
})
