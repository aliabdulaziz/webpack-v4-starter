const { env } = require('process');
if (!env.production) {
    require('./../index.html');
}

// import css
import './scss/app.scss'

// import libraries below
import $ from 'jquery';
