const axios = require('axios');
axios.defaults.baseURL = "http://127.0.0.1:5000"

axios.get('/').then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
})

axios.get('/isbn/2').then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
})

axios.get('/author/Unknown').then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
})

axios.get('/title/The Book Of Job').then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
})