
export const jJerryWidgets = ((selector = "", args = {}) => {

    var userAgent = navigator.userAgent.toLowerCase();

    function getStyles(_element) {
        let s = window.getComputedStyle(_element); // Element Styles
        let w = parseInt(s.width);  // Element Width Pixels
        let h = parseInt(s.height); // Element Height Pixels

        return {
            styles: s,
            width: w,
            height: h,
            widthsave: w
        };
    }
    
    var fadeCtrl = null;

    function fadeIn(timefade = 1, params = {}) {
        clearInterval(fadeCtrl);
        let _opacity = 0; //0....100
        let _element = document.getElementById(selector.replace("#", ""));

        // CSS Reset Element
        _element.style.display = "block";
        _element.style.opacity = 0;
        //Cross Browser CSS
        if( userAgent.indexOf( 'msie' ) != -1 ) { // IE
            _element.style.filter  = "alpha(opacity=0)";
        }

        if(params.blocker == true) {
            blockScreenOpen();
            let _styles  = getStyles(_element);
            configureMiddlePosition(_element, _styles.width, _styles.height);
        }

        fadeCtrl = setInterval(function(){
            if((_opacity == 100)) {
                clearInterval(fadeCtrl);

                // Element Automatic Close
                if(parseInt(args.timeout) > 0) {

                    setTimeout(function(){
                        jJerryWidgets(selector).fadeOut();
                    }, parseInt(args.timeout));

                }

            } else {
                _opacity += 2;
                _element.style.opacity = _opacity / 100;
                //Cross Browser CSS
                if( userAgent.indexOf( 'msie' ) != -1 ) { // IE
                    _element.style.filter  = "alpha(opacity=" + _opacity + ")";
                }
            }

        }, timefade);
    }
    
    function fadeOut(timefade = 1, params = {}) {
        clearInterval(fadeCtrl);
        let _opacity = 100; //100....0
        let _element = document.getElementById(selector.replace("#", ""));

        fadeCtrl = setInterval(function(){
            if((_opacity == 0)) {
                clearInterval(fadeCtrl);
                _element.style.display = "none";
                if(params.blocker == true) {
                    blockScreenClose();
                    let _styles  = getStyles(_element);
                    configureMiddlePosition(_element, _styles.width, _styles.height);
                }
            } else {
                _opacity -= 2;
                _element.style.opacity = _opacity / 100;
                //Cross Browser CSS
                if( userAgent.indexOf( 'msie' ) != -1 ) { // IE
                    _element.style.filter = "alpha(opacity=" + _opacity + ")";
                }
            }
            
        }, timefade);
    }

    function fade() {
        if(args.effect == "fadein") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(){
                jJerryWidgets(args.element, args).fadeIn();
            });
        } else if(args.effect == "fadeout") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(){
                jJerryWidgets(args.element).fadeOut();
            });
        } else {
            console.error("Erro on args.effect: function jJerryWidgetsfade(), received:", args.effect);
        }
    }

    var hideShowCtrl = null;

    function show(timefade = 1, params = {}) {
        clearInterval(hideShowCtrl);
        let _element = document.getElementById(selector.replace("#", ""));
        let _styles  = getStyles(_element);
        let _width   = 0;

        // CSS Reset Element
        _element.style.width   = "0px";
        _element.style.height  = "0px";
        _element.style.display = "block";

        if(params.blocker == true) {
            blockScreenOpen();
        }

        hideShowCtrl = setInterval(function(){

            if(_width >= _styles.width) {
                clearInterval(hideShowCtrl);

                // Element Automatic Close
                if(parseInt(args.timeout) > 0) {

                    setTimeout(function(){
                        jJerryWidgets(selector).hide();
                    }, parseInt(args.timeout));

                }

            } else { 
                _width += 10; 
                _element.style.width      = _width + "px"; 
                _element.style.height     = _width + "px"; 
                _element.style.transition = "all 1ms linear";
            }

        }, 1);
    }

    function hide(timefade = 1, params = {}) {
        clearInterval(hideShowCtrl);
        let _element = document.getElementById(selector.replace("#", ""));
        let _styles  = getStyles(_element);
        let _end     = 0;

        hideShowCtrl = setInterval(function(){

            if(_styles.width <= _end) {
                clearInterval(hideShowCtrl);
                // CSS Reset to Element Original Size
                _element.style.width   = _styles.widthsave + "px";
                _element.style.height  = _styles.widthsave + "px";
                _element.style.display = "none";
                if(params.blocker == true) {
                    blockScreenClose();
                }
            } else {
                _styles.width -= 10;
                _element.style.width      = _styles.width + "px";
                _element.style.height     = _styles.width + "px";
                _element.style.transition = "all 1ms linear";
            }

        }, timefade);
    }

    function retract() {
        if(args.command == "show") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(event){
                event.preventDefault();
                jJerryWidgets(args.element, args).show();
            });
        } else if(args.command == "hide") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(event){
                event.preventDefault();
                jJerryWidgets(args.element).hide();
            });
        } else {
            console.error("Erro on args.command: function jJerryWidgetsretract(), received:", args.command);
        }
    }

    /************* Modal::Open *************/

    var modalCtrl = null;
    var loopCtrl  = 0;

    function modalInit(params = {}) {
        modalCtrl = setInterval(function() {

            params.morewidth += (params.styles.width/params.speed);

            if(params.morewidth >= (params.styles.width+params.speed)){
                clearInterval(modalCtrl);
                params.morewidth = (params.styles.width+params.speed);
                if(params.loop == false) {
                    modalFinish(params);
                } else {
                    modalDecrease(params);
                }
            } else {
                params.opacity += ((params.opacity+params.opacdiv)/100);
                params.element.style.width   = params.morewidth + "px";
                params.element.style.height  = params.morewidth + "px";
                params.element.style.opacity = params.opacity;

                configureMiddlePosition(params.element, params.morewidth, params.morewidth);
            }

        }, 1);
    }

    function modalDecrease(params = {}) {
        modalCtrl = setInterval(function(){

            if(params.morewidth <= params.styles.width) {
                clearInterval(modalCtrl);
                params.morewidth = params.styles.width;
                modalIncrease(params);
            } else {
                params.morewidth -= 5;
                params.element.style.width  = params.morewidth + "px";
                params.element.style.height = params.morewidth + "px";

                configureMiddlePosition(params.element, params.morewidth, params.morewidth);
            }

        }, 1);
    }

    function modalIncrease(params = {}) {
        modalCtrl = setInterval(function(){

            if(params.morewidth >= (params.styles.width+params.speed)) {
                clearInterval(modalCtrl);
                params.morewidth = (params.styles.width+params.speed);
                modalFinish(params);
            } else {
                params.morewidth += 10;
                params.element.style.width  = params.morewidth + "px";
                params.element.style.height = params.morewidth + "px";

                configureMiddlePosition(params.element, params.morewidth, params.morewidth);
            }

        }, 1);
    }

    function autoModalClose(params = {}) {
        setTimeout(function(){
            jJerryWidgets(params.sel).modalClose();
        }, parseInt(params.timeout));
    }
    
    function wideElement(params = {}) {
        var _wf = parseInt(params.morewidth);
        modalCtrl = setInterval(function(){

            if(_wf >= parseInt(params.widewidth)) {
                clearInterval(modalCtrl);
            } else {
                _wf += 15;
                params.element.style.width = _wf + "px";
                configureMiddlePosition(params.element, _wf, params.morewidth);
            }
         
        }, 1);
    }

    function modalFinish(params = {}) {
        if(params.loop > 0 && loopCtrl < params.loop && params.loop != false) {
            loopCtrl++;
            modalDecrease(params);
        } else {
            modalCtrl = setInterval(function(){
                                    
                if(params.morewidth <= params.styles.width) {
                    
                    clearInterval(modalCtrl);

                    if(params.wide && params.styles.width) {
                        wideElement(params);
                    }

                    if(parseInt(params.timeout) > 0) {
                        autoModalClose(params);
                    }

                } else {
                    params.morewidth -= 5;
                    params.element.style.width  = params.morewidth + "px";
                    params.element.style.height = params.morewidth + "px";

                    configureMiddlePosition(params.element, params.morewidth, params.morewidth);
                }

            }, 1);
        }
    }

    function modalOpen() {

        clearInterval(modalCtrl);

        let _morewidth = 0;
        let _opacity   = 0;
        let _opacdiv   = 15;
        let _speed     = 40;
        let _element   = document.getElementById(selector.replace("#", ""));
        let _maxheight = parseInt(window.innerHeight - 200);
        let _styles    = getStyles(_element);

        // Fix size for widget width
        if(_styles.width > _maxheight) { _styles.width = _maxheight; }

        // CSS Reset Element
        _element.style.width        = "0px";
        _element.style.height       = "0px";
        _element.style.display      = "block";
        _element.style.position     = "fixed";
        _element.style.zIndex       = "5000";
        _element.style.color        = args.color || "#FEFEFE";
        _element.style.background   = args.bgcolor || "#555555";
        _element.style.borderRadius = "2px";
        _element.style.boxShadow    = "3px 4px 10px #222222";
        _element.style.opacity      = "0";
        _element.style.border       = "solid "+ args.bordercolor +" 1px";
        _element.style.transition   = "all 1ms ease-out";
        
        blockScreenOpen(args.bgscreen);

        modalInit({
            morewidth: _morewidth, //0
            speed: _speed, //40
            styles: _styles, //object width, height, widthsave
            opacity: _opacity, //0
            opacdiv: _opacdiv, //15
            element: _element, //id.selector
            timeout: args.timeout, //time
            wide: args.wide, //true|false
            sel: selector, //#id
            loop: args.loop, //number of exec
            widewidth: args.width //max-wide-width
        });

    }

    /*Modal Handler: Single Flow*/

    /*function modalOpen() {

        clearInterval(modalCtrl);

        let _morewidth = 0;
        let _opacity   = 0;
        let _opacdiv   = 15;
        let _speed     = 40;
        let _element   = document.getElementById(selector.replace("#", ""));
        let _maxheight = parseInt(window.innerHeight - 200);
        let _styles    = getStyles(_element);

        // Fix size for widget width
        if(_styles.width > _maxheight) { _styles.width = _maxheight; }

        // CSS Reset Element
        _element.style.width        = "0px";
        _element.style.height       = "0px";
        _element.style.display      = "block";
        _element.style.position     = "fixed";
        _element.style.zIndex       = "5000";
        _element.style.color        = args.color || "#FEFEFE";
        _element.style.background   = args.bgcolor || "#555555";
        _element.style.borderRadius = "2px";
        _element.style.boxShadow    = "3px 4px 10px #222222";
        _element.style.opacity      = "0";
        _element.style.border       = "solid "+ args.bordercolor +" 1px";
        _element.style.transition   = "all 1ms ease-out";

        // Black Screen Lock
        blockScreenOpen(args.bgscreen);

        // Elastic Effect Init
        modalCtrl = setInterval(function() {
            _morewidth += (_styles.width/_speed);

            // Elastic Effect Final->Max
            if(_morewidth >= (_styles.width+_speed)) {
                clearInterval(modalCtrl);
                _morewidth = (_styles.width+_speed);

                modalCtrl = setInterval(function(){
                    
                    // Elastic Effect Max->Final
                    if(_morewidth <= _styles.width) {
                        clearInterval(modalCtrl);
                        _morewidth = _styles.width;

                        modalCtrl = setInterval(function(){
                            
                            // Elastic Effect Final->Max
                            if(_morewidth >= (_styles.width+_speed)) {
                                clearInterval(modalCtrl);
                                _morewidth = (_styles.width+_speed);

                                modalCtrl = setInterval(function(){
                                    
                                    // Elastic Effect Finally
                                    if(_morewidth <= _styles.width) {
                                        
                                        clearInterval(modalCtrl);

                                        if(args.wide && args.width) {

                                            var _wf = _morewidth;
                                            modalCtrl = setInterval(function(){

                                                if(_wf >= parseInt(args.width)) {
                                                    clearInterval(modalCtrl);
                                                }
                                                _wf += 15;

                                                _element.style.width = _wf + "px";
                                                configureMiddlePosition(_element, _wf, _morewidth);
                                             
                                            }, 1);

                                        }

                                        // Modal Automatic Close
                                        if(parseInt(args.timeout) > 0) {

                                            setTimeout(function(){
                                                jJerryWidgets(selector).modalClose();
                                            }, parseInt(args.timeout));

                                        }

                                    } else {
                                        // Elastic Effect Limit
                                        _morewidth -= 5;
                                        _element.style.width  = _morewidth + "px";
                                        _element.style.height = _morewidth + "px";

                                        // Modal Position on Middle Screen
                                        configureMiddlePosition(_element, _morewidth, _morewidth);
                                    }

                                }, 1);

                            } else {
                                // Elastic Effect Increment
                                _morewidth += 10;
                                _element.style.width  = _morewidth + "px";
                                _element.style.height = _morewidth + "px";

                                // Modal Position on Middle Screen
                                configureMiddlePosition(_element, _morewidth, _morewidth);
                            }

                        }, 1);

                    } else {
                        _morewidth -= 5;
                        _element.style.width  = _morewidth + "px";
                        _element.style.height = _morewidth + "px";

                        // Modal Position on Middle Screen
                        configureMiddlePosition(_element, _morewidth, _morewidth);
                    }

                }, 1);

            } else {
                _opacity += ((_opacity+_opacdiv)/100);
                _element.style.width   = _morewidth + "px";
                _element.style.height  = _morewidth + "px";
                _element.style.opacity = _opacity;

                // Modal Position on Middle Screen
                configureMiddlePosition(_element, _morewidth, _morewidth);
            }

        }, 1);
    }*/

    /************* Modal::Close *************/

    function modalClose() {
        clearInterval(modalCtrl);
        let _widthdown = 0;
        let _opacity   = 100;
        let _opacdiv   = 15;
        let _element   = document.getElementById(selector.replace("#", ""));
        let _styles    = getStyles(_element);

        let params = {
                width: _styles.width,
                height: _styles.height,
                element: _element,
                widthdown: _widthdown,
                widthsave: _styles.widthsave,
                opacity: _opacity
            };

        if(args.wide == true) {
            modalCloseWide(params);
        } else {
            modalCloseDefault(params);
        }
    }

    function modalCloseWide(args) {
        modalCtrl = setInterval(function() {
            
            args.width -= 15;
            
            if(args.width <= args.height) {
                clearInterval(modalCtrl);
                modalCloseDefault(args);
            } else {
                args.element.style.width = args.width + "px";
                configureMiddlePosition(args.element, args.width, args.height);
            }

        }, 1);
    }

    function modalCloseDefault(args) {
        modalCtrl = setInterval(function() {
            
            args.width -= 15;

            if(args.width <= args.widthdown) {
                clearInterval(modalCtrl);
                // CSS Reset to Element Original Size
                args.element.style.width   = args.widthsave + "px";
                args.element.style.height  = args.widthsave + "px";
                args.element.style.display = "none";
                blockScreenClose();
            } else {
                args.opacity -= 2;
                args.element.style.width   = args.width + "px";
                args.element.style.height  = args.width + "px";
                args.element.style.opacity = (args.opacity/100);

                configureMiddlePosition(args.element, args.width, args.width);
            }

        }, 1);
    }

    function modal() {
        if(args.command == "open") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(event){
                event.preventDefault();
                jJerryWidgets(args.element, args).modalOpen();
            });
        } else if(args.command == "close") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(event){
                event.preventDefault();
                jJerryWidgets(args.element, args).modalClose();
            });
        } else {
            console.error("Erro on args.command: function jJerryWidgetsmodal(), received:", args.command);
        }
    }

    function configureMiddlePosition(element_id, element_width, element_height) {
        configureMarginAuto(element_id, element_width);
        configureMarginTop(element_id, element_height);
    }

    function configureMarginAuto(element_id, element_width) {
        var widht_element = parseInt(element_width);
        var screen_width  = window.innerWidth;
        var initial_calc  = parseInt( screen_width ) - parseInt( widht_element );
        var margin_calc   = parseInt( initial_calc ) / 2;
        
        element_id.style.left = (margin_calc - 15) + "px";
    }

    function configureMarginTop(element_id, element_height) {
        var height_element = parseInt(element_height);
        var screen_height  = window.innerHeight;
        var initial_calc   = parseInt( screen_height ) - parseInt( height_element );
        var margin_calc    = parseInt( initial_calc - 30 ) / 2;

        element_id.style.top = margin_calc + "px";
    }

    function setAttributesStyles(element, args) {
        let _styles = "";
        if(args.backColor) { _styles += "background-color: "+args.backColor+";"; }
        if(args.textColor) { _styles += "color: "+args.textColor+";"; }
        if(args.width)     { _styles += "width: "+args.width+";"; }
        if(args.height)    { _styles += "height: "+args.height+";"; }
        if(args.position)  { _styles += "position: "+args.position+";"; }
        if(args.zindex)    { _styles += "z-index: "+args.zindex+";"; }
        if(args.top)       { _styles += "top: "+args.top+";"; }
        if(args.left)      { _styles += "left: "+args.left+";"; }
        if(args.margin)    { _styles += "margin: "+args.margin+";"; }
        if(args.padding)   { _styles += "padding: "+args.padding+";"; }
        if(args.transition){ _styles += "transition: "+args.transition+";"; }
        if(args.textalign) { _styles += "text-align: "+args.textalign+";"; }
        if(args.paddingtop){ _styles += "padding-top: "+args.paddingtop+";"; }
        if(args.fontsize)  { _styles += "font-size: "+args.fontsize+";"; }
        if(args.opacity)   { _styles += "opacity: "+args.opacity+";"; }
        if(args.display)   { _styles += "display: "+args.display+";"; }
        if(args.overflow)  { _styles += "overflow: "+args.overflow+";"; }
        if(args.opacity)   { _styles += "opacity: "+args.opacity+";"; }
        element.setAttribute("style", _styles);
    }

    function blockScreenOpen(bgcolor = "#000000") {
        createHtmlElement({
            element:  "div", 
            attrtype: "id", 
            attrname: "divBlockScreen", 
            append:   "body", 
            styles: {
                backColor: bgcolor,
                width: "100%",
                height: "100%",
                position: "fixed",
                zindex: "900",
                top: "0px",
                left: "0px",
                opacity: "0.8",
                display: "block"
            }
        });
    }

    function blockScreenClose() {
        jJerryWidgets("#divBlockScreen").hidden();
        jJerryWidgets("body").remove("#divBlockScreen");
    }

    function createHtmlElement(args) {
        let htmlElement = document.createElement(args.element);
        htmlElement.setAttribute(args.attrtype, args.attrname);
        setAttributesStyles(htmlElement, args.styles);

        if(args.append == "body") {
            document.body.appendChild(htmlElement);
        } else {
            document.getElementById(args.append).appendChild(htmlElement);
        }

        return htmlElement;
    }

    function click(callback_function, args = {}) {
        document.getElementById(selector.replace("#", ""))
        .addEventListener("click", function(){
            callback_function(args);
        });
    }

    function hidden(params = {}) {
        document.getElementById(selector.replace("#", "")).style.display = "none";
        if(params.blocker == true) {
            blockScreenClose();
        }
    }

    function visible(params = {}) {
        let _element = document.getElementById(selector.replace("#", ""));
        _element.style.display = "block";
        if(params.blocker == true) {
            blockScreenOpen();
            let _styles  = getStyles(_element);
            configureMiddlePosition(_element, _styles.width, _styles.height);
        }
    }

    function html(_context) {
        document.getElementById(selector.replace("#", "")).innerHTML = _context;
    }

    function append(_context) {
        document.getElementById(selector.replace("#", "")).innerHTML += _context;
    }

    function remove(_element) {
        if(selector.indexOf("body") != -1) {
            document.body.removeChild(document.getElementById(_element.replace("#", "")));
        } else {
            document.getElementById(selector.replace("#", ""))
            .removeChild(document.getElementById(_element.replace("#", "")));
        }
    }

    function color(_color) {
        document.getElementById(selector.replace("#", "")).style.color = _color;
    }

    function bgcolor(_bgcolor) {
        document.getElementById(selector.replace("#", "")).style.background = _bgcolor;
    }

    function tooltip() {

        let _message       = (args.context) || "Info: Default Tooltip Message !";
        let _bgcolor       = (args.bgcolor) || "#777777";
        let _color         = (args.color)   || "#FFFFFF";
        let _timein        = (args.timein  == null) ? 1    : args.timein;
        let _timeout       = (args.timeout == null) ? 2000 : args.timeout;
        let _timeout_curr  = "";
        let _close_content = '\
        <a id="a_content" onclick="return  jJerryWidgets(\'#div_tooltip\').hidden();">\
            <div id="div_tooltip_content"></div>\
        </a>';

        createHtmlElement({
            element:  "div", 
            attrtype: "id", 
            attrname: "div_tooltip", 
            append:   "body", 
            styles: {
                backColor: _bgcolor
            }
        });

        createHtmlElement({
            element:  "div", 
            attrtype: "id", 
            attrname: "div_close_tooltip", 
            append:   "div_tooltip", 
            styles: {
                color: _color
            }
        });

        jJerryWidgets("#div_close_tooltip").html(_close_content);

        // CSS Tooltip Element Settings
        document.getElementById('div_tooltip').style.width         = "40%";
        document.getElementById('div_tooltip').style.height        = "auto";
        document.getElementById('div_tooltip').style.padding       = "1%";
        document.getElementById('div_tooltip').style.paddingTop    = "30px";
        document.getElementById('div_tooltip').style.paddingBottom = "30px";
        document.getElementById('div_tooltip').style.bottom        = "50px";
        document.getElementById('div_tooltip').style.left          = "29%";
        document.getElementById('div_tooltip').style.position      = "fixed";
        document.getElementById('div_tooltip').style.border        = "none";
        document.getElementById('div_tooltip').style.boxShadow     = "2px 3px 7px #111111";
        document.getElementById('div_tooltip').style.textAlign     = "center";
        document.getElementById('div_tooltip').style.borderRadius  = "10px";
        document.getElementById('div_tooltip').style.zIndex        = "5000";
        // CSS A-Link Element Settings
        document.getElementById('a_content').style.height     = "100%";
        document.getElementById('a_content').style.width      = "100%";
        document.getElementById('a_content').style.border     = "none";
        document.getElementById('a_content').style.margin     = "0px";
        document.getElementById('a_content').style.padding    = "0px";
        document.getElementById('a_content').style.fontSize   = "15px";
        document.getElementById('a_content').style.display    = "block";
        document.getElementById('a_content').style.textAalign = "center";
        document.getElementById('a_content').style.fontWeight = "bold";

        setTimeout(function(){
            // CSS Persist Fix Bug
            document.getElementById('div_tooltip').style.background = _bgcolor;
            document.getElementById('a_content').style.color        = _color;

            jJerryWidgets("#div_tooltip").fadeIn();

            clearTimeout( _timeout_curr );
            
            jJerryWidgets("#div_tooltip_content").html(_message);

            _timeout_curr = setTimeout(function(){
                clearTimeout( _timeout_curr );
                jJerryWidgets("#div_tooltip").fadeOut();
            }, _timeout );

        }, _timein);
    }

    var mixInCtrl = "";

    function mixIn() {
    }

    var slideInCtrl = "";

    function slideIn(element) {
        clearInterval(slideInCtrl);
        let _element = document.getElementById(element.replace("#", ""));
        let _width = _opacity = 0;

        // CSS Reset Element
        _element.style.width   = "0px";
        _element.style.display = "block";

        slideInCtrl = setInterval(function(){

            if(_width >= 100) {
                clearInterval(slideInCtrl);
            } else {
                _width += 10; 
                _opacity += 10;
                _element.style.opacity = _opacity / 100;
                _element.style.width = _width + "%";
                _element.style.transition = "all 1ms ease-in";
            }

        }, 80);
    }

    function slider(params) {
        // Swap for images list
        let imagelist = [];
        // Slider Controls
        let i = n = 0;
        // Check if exists images on slider div element
        let images = document.querySelectorAll("#slider > .slider_images");
        // Hidden Elements of the Slider to preview prevent
        if(images.length > 0) {
            for(let k = 0; k < images.length; k++) {
                images[k].style.display = "none"; // Preview Prevent
                imagelist.push(images[k].getAttribute("src"));
            }
        } else {
            imagelist = params.images;
        }
        // Slider Init
        let interval = setInterval(function() {
            // Slider Finalize
            if(parseInt(i) == parseInt(params.timeout)) {
                clearInterval(interval);
            }
            // Image List Reset
            if(n == imagelist.length) n = 0;
            // Slider Image View
            jJerryWidgets(selector).html('<img src="'+imagelist[n]+'"" id="image_'+n+'" />');
            // For Fade Effect
            if(params.mode == "fade") {
                jJerryWidgets(selector).fadeIn(parseInt(params.timefade));
            }
            // For Slide Effect
            if(params.mode == "slide") {
                jJerryWidgets(selector).slideIn('#image_'+n);
            }
            // For Mixer Effect
            if(params.mode == "mix") {
                jJerryWidgets(selector).mixIn(parseInt(params.timefade));
            }
            n+=1; i+=1;
            
        }, params.timeout);
    }

    return {
    /*Effects*/
        fadeIn, fadeOut, fade, 
        show, hide, retract, 
    /*Widgets*/
        modalOpen, modalClose, modal, 
        //loaderProgress,
        slideIn, mixIn, slider,
        tooltip,
    /*Mouse Events*/
        click, 
    /*Data Handler*/
        html, append, remove,
    /*Visual Handler*/
        hidden, visible, color, bgcolor,
    /*Request Handler*/
        //ajax, done, fail, submit,
    /*Window Events*/
        //onload, ready, change
    };
});

