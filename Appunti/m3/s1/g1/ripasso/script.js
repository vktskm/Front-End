import { call, $ } from './Modules/smart-fn.js';
call('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => console.log(res));
$('#test');
console.log('ciao');
let x = 2;