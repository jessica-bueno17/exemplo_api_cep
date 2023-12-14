import 'vuetify/styles';

import './style.css'
import App from './App.vue';
import { vMaska } from "maska";

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';

import axios from 'axios';
import VueAxios from 'vue-axios';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App).directive("maska", vMaska);

app.use(VueAxios, axios);

const vuetify = createVuetify({
    components,
    directives
});

app.use(vuetify);

app.mount('#app');
