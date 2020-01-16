
import {Ev} from './modules/module_event.js';
import {Rq} from './modules/module_request.js';

$(document).ready(function() {
    Ev.init();
    Rq.getName();
    Rq.getData();
});
