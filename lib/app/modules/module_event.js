
import {jJerryWidgets} from '../../vendor/jjerry/jjerry-widgets.js';

export const Ev = (() => {

	function init() {

	    $("#data-panel").hide();

	    $('#closeModal').on("click", function() {
	        jJerryWidgets("#modal", {
	            wide: true,
	            width: "800px"
	        }).modalClose();
	    });
	}

	return {
		init
	};

})();