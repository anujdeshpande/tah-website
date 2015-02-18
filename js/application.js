// nav.js
$(document).ready(function() {
  
  'use strict';

  var body = document.body,
    mask = document.createElement("div"),
    toggleSlideLeft = document.querySelector( ".toggle-slide-left" ),
    toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
    toggleSlideTop = document.querySelector( ".toggle-slide-top" ),
    toggleSlideBottom = document.querySelector( ".toggle-slide-bottom" ),
    togglePushLeft = document.querySelector( ".toggle-push-left" ),
    togglePushRight = document.querySelector( ".toggle-push-right" ),
    togglePushTop = document.querySelector( ".toggle-push-top" ),
    togglePushBottom = document.querySelector( ".toggle-push-bottom" ),
    slideMenuLeft = document.querySelector( ".slide-menu-left" ),
    slideMenuRight = document.querySelector( ".slide-menu-right" ),
    slideMenuTop = document.querySelector( ".slide-menu-top" ),
    slideMenuBottom = document.querySelector( ".slide-menu-bottom" ),
    pushMenuLeft = document.querySelector( ".push-menu-left" ),
    pushMenuRight = document.querySelector( ".push-menu-right" ),
    pushMenuTop = document.querySelector( ".push-menu-top" ),
    pushMenuBottom = document.querySelector( ".push-menu-bottom" ),
    activeNav
  ;
  mask.className = "mask";

  /* slide menu left */
  toggleSlideLeft.addEventListener( "click", function(){
    classie.add( body, "sml-open" );
    document.body.appendChild(mask);
    activeNav = "sml-open";
  } );

  /* slide menu right */
  toggleSlideRight.addEventListener( "click", function(){
    classie.add( body, "smr-open" );
    document.body.appendChild(mask);
    activeNav = "smr-open";
  } );

  /* slide menu top */
  toggleSlideTop.addEventListener( "click", function(){
    classie.add( body, "smt-open" );
    document.body.appendChild(mask);
    activeNav = "smt-open";
  } );

  /* slide menu bottom */
  toggleSlideBottom.addEventListener( "click", function(){
    classie.add( body, "smb-open" );
    document.body.appendChild(mask);
    activeNav = "smb-open";
  } );

  /* push menu left */
  togglePushLeft.addEventListener( "click", function(){
    classie.add( body, "pml-open" );
    document.body.appendChild(mask);
    activeNav = "pml-open";
  } );

  /* push menu right */
  togglePushRight.addEventListener( "click", function(){
    classie.add( body, "pmr-open" );
    document.body.appendChild(mask);
    activeNav = "pmr-open";
  } );

  /* push menu top */
  togglePushTop.addEventListener( "click", function(){
    classie.add( body, "pmt-open" );
    document.body.appendChild(mask);
    activeNav = "pmt-open";
  } );

  /* push menu bottom */
  togglePushBottom.addEventListener( "click", function(){
    classie.add( body, "pmb-open" );
    document.body.appendChild(mask);
    activeNav = "pmb-open";
  } );

  /* hide active menu if mask is clicked */
  mask.addEventListener( "click", function(){
    classie.remove( body, activeNav );
    activeNav = "";
    document.body.removeChild(mask);
  } );

  /* hide active menu if close menu button is clicked */
  [].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){
    el.addEventListener( "click", function(){
      classie.remove( body, activeNav );
      activeNav = "";
      document.body.removeChild(mask);
    } );
  });


});
/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/*!
    SlickNav Responsive Mobile Menu v1.0.1
    (c) 2014 Josh Cope
    licensed under MIT
*/
;(function ($, document, window) {
    var
    // default settings object.
        defaults = {
            label: '',
            duplicate: true,
            duration: 200,
            easingOpen: 'swing',
            easingClose: 'swing',
            closedSymbol: '&#9658;',
            openedSymbol: '&#9660;',
            prependTo: 'body',
            parentTag: 'a',
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
            init: function () {},
            open: function () {},
            close: function () {}
        },
        mobileMenu = 'slicknav',
        prefix = 'slicknav';

    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $this = this,
            menu = $(this.element),
            settings = this.settings,
            iconClass,
            menuBar;

        // clone menu if needed
        if (settings.duplicate) {
            $this.mobileNav = menu.clone();
            //remove ids from clone to prevent css issues
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('id');
            });
        } else {
            $this.mobileNav = menu;
        }

        // styling class for the button
        iconClass = prefix + '_icon';

        if (settings.label === '') {
            iconClass += ' ' + prefix + '_no-text';
        }

        if (settings.parentTag == 'a') {
            settings.parentTag = 'a href="#"';
        }

        // create menu bar
        $this.mobileNav.attr('class', prefix + '_nav');
        menuBar = $('<div class="' + prefix + '_menu"></div>');
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        $(settings.prependTo).prepend(menuBar);
        menuBar.append($this.mobileNav);

        // iterate over structure adding additional structure
        var items = $this.mobileNav.find('li');
        $(items).each(function () {
            var item = $(this),
                data = {};
            data.children = item.children('ul').attr('role', 'menu');
            item.data('menu', data);

            // if a list item has a nested menu
            if (data.children.length > 0) {

                // select all text before the child menu
                // check for anchors

                var a = item.contents(),
                    containsAnchor = false;
                    nodes = [];

                $(a).each(function () {
                    if (!$(this).is('ul')) {
                        nodes.push(this);
                    } else {
                        return false;
                    }

                    if($(this).is("a")) {
                        containsAnchor = true;
                    }
                });

                var wrapElement = $(
                    '<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>'
                );

                // wrap item text with tag and add classes unless we are separating parent links
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) {
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix+'_row');
                } else
                    $(nodes).wrapAll('<span class="'+prefix+'_parent-link '+prefix+'_row"/>').parent();

                item.addClass(prefix+'_collapsed');
                item.addClass(prefix+'_parent');

                // create parent arrow. wrap with link if parent links and separating
                var arrowElement = $('<span class="'+prefix+'_arrow">'+settings.closedSymbol+'</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //append arrow
                $(nodes).last().after(arrowElement);


            } else if ( item.children().length === 0) {
                 item.addClass(prefix+'_txtnode');
            }

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function(event){
                //Ensure that it's not a parent
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix+'_parent')) {
                        //Emulate menu close if set
                        $($this.btn).click();
                    }
            });

            //also close on click if parent links are set
            if (settings.closeOnClick && settings.allowParentLinks) {
                item.children('a').children('a').click(function (event) {
                    //Emulate menu close
                    $($this.btn).click();
                });

                item.find('.'+prefix+'_parent-link a:not(.'+prefix+'_item)').click(function(event){
                    //Emulate menu close
                        $($this.btn).click();
                });
            }
        });

        // structure is in place, now hide appropriate items
        $(items).each(function () {
            var data = $(this).data('menu');
            if (!settings.showChildren){
                $this._visibilityToggle(data.children, null, false, null, true);
            }
        });

        // finally toggle entire menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // accessibility for menu button
        $this.mobileNav.attr('role','menu');

        // outline prevention when using mouse
        $(document).mousedown(function(){
            $this._outlines(false);
        });

        $(document).keyup(function(){
            $this._outlines(true);
        });

        // menu button click
        $($this.btn).click(function (e) {
            e.preventDefault();
            $this._menuToggle();
        });

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) {
            e.preventDefault();
            $this._itemClick($(this));
        });

        // check for enter key on menu button and menu parents
        $($this.btn).keydown(function (e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._menuToggle();
            }
        });

        $this.mobileNav.on('keydown', '.'+prefix+'_item', function(e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._itemClick($(e.target));
            }
        });

        // allow links clickable within parent tags if set
        if (settings.allowParentLinks && settings.nestedParentLinks) {
            $('.'+prefix+'_item a').click(function(e){
                    e.stopImmediatePropagation();
            });
        }
    };

    //toggle menu
    Plugin.prototype._menuToggle = function (el) {
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix+'_collapsed')) {
            btn.removeClass(prefix+'_collapsed');
            btn.addClass(prefix+'_open');
        } else {
            btn.removeClass(prefix+'_open');
            btn.addClass(prefix+'_collapsed');
        }
        btn.addClass(prefix+'_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
    };

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) {
        var $this = this;
        var settings = $this.settings;
        var data = el.data('menu');
        if (!data) {
            data = {};
            data.arrow = el.children('.'+prefix+'_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix+'_parent-link')) {
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
            }
            el.data('menu', data);
        }
        if (data.parent.hasClass(prefix+'_collapsed')) {
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix+'_collapsed');
            data.parent.addClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        } else {
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix+'_collapsed');
            data.parent.removeClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        }
    };

    // toggle actual visibility and accessibility tags
    Plugin.prototype._visibilityToggle = function(el, parent, animate, trigger, init) {
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate) {
            duration = settings.duration;
        }

        if (el.hasClass(prefix+'_hidden')) {
            el.removeClass(prefix+'_hidden');
            el.slideDown(duration, settings.easingOpen, function(){

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire open callback
                if (!init) {
                    settings.open(trigger);
                }
            });
            el.attr('aria-hidden','false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
        } else {
            el.addClass(prefix+'_hidden');
            el.slideUp(duration, this.settings.easingClose, function() {
                el.attr('aria-hidden','true');
                items.attr('tabindex', '-1');
                $this._setVisAttr(el, true);
                el.hide(); //jQuery 1.7 bug fix

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire init or close callback
                if (!init){
                    settings.close(trigger);
                }
                else if (trigger == 'init'){
                    settings.init();
                }
            });
        }
    };

    // set attributes of element and children based on visibility
    Plugin.prototype._setVisAttr = function(el, hidden) {
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
            });
        } else {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
            });
        }
    };

    // get all 1st level items that are clickable
    Plugin.prototype._getActionItems = function(el) {
        var data = el.data("menu");
        if (!data) {
            data = {};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.'+prefix+'_item'));
            el.data('menu', data);
        }
        return data.links;
    };

    Plugin.prototype._outlines = function(state) {
        if (!state) {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
        } else {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
        }
    };

    Plugin.prototype.toggle = function(){
        var $this = this;
        $this._menuToggle();
    };

    Plugin.prototype.open = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_collapsed')) {
            $this._menuToggle();
        }
    };

    Plugin.prototype.close = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_open')) {
            $this._menuToggle();
        }
    };

    $.fn[mobileMenu] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once due to methods
                if (!$.data(this, 'plugin_' + mobileMenu)) {

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + mobileMenu, new Plugin( this, options ));
                }
            });

        // If is a string and doesn't start with an underscore or 'init' function, treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + mobileMenu);

                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });

            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
}(jQuery, document, window));

// jquery.onepage-scroll.min.js
!function(e){var t={sectionContainer:"section",easing:"ease",animationTime:1e3,pagination:true,updateURL:false,keyboard:true,beforeMove:null,afterMove:null,loop:true,responsiveFallback:false,direction:"vertical"};e.fn.swipeEvents=function(){return this.each(function(){function i(e){var i=e.originalEvent.touches;if(i&&i.length){t=i[0].pageX;n=i[0].pageY;r.bind("touchmove",s)}}function s(e){var i=e.originalEvent.touches;if(i&&i.length){var o=t-i[0].pageX;var u=n-i[0].pageY;if(o>=50){r.trigger("swipeLeft")}if(o<=-50){r.trigger("swipeRight")}if(u>=50){r.trigger("swipeUp")}if(u<=-50){r.trigger("swipeDown")}if(Math.abs(o)>=50||Math.abs(u)>=50){r.unbind("touchmove",s)}}}var t,n,r=e(this);r.bind("touchstart",i)})};e.fn.onepage_scroll=function(n){function o(){var t=false;var n=typeof r.responsiveFallback;if(n=="number"){t=e(window).width()<r.responsiveFallback}if(n=="boolean"){t=r.responsiveFallback}if(n=="function"){valFunction=r.responsiveFallback();t=valFunction;typeOFv=typeof t;if(typeOFv=="number"){t=e(window).width()<valFunction}}if(t){e("body").addClass("disabled-onepage-scroll");e(document).unbind("mousewheel DOMMouseScroll MozMousePixelScroll");i.swipeEvents().unbind("swipeDown swipeUp")}else{if(e("body").hasClass("disabled-onepage-scroll")){e("body").removeClass("disabled-onepage-scroll");e("html, body, .wrapper").animate({scrollTop:0},"fast")}i.swipeEvents().bind("swipeDown",function(t){if(!e("body").hasClass("disabled-onepage-scroll"))t.preventDefault();i.moveUp()}).bind("swipeUp",function(t){if(!e("body").hasClass("disabled-onepage-scroll"))t.preventDefault();i.moveDown()});e(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(e){e.preventDefault();var t=e.originalEvent.wheelDelta||-e.originalEvent.detail;u(e,t)})}}function u(e,t){deltaOfInterest=t;var n=(new Date).getTime();if(n-lastAnimation<quietPeriod+r.animationTime){e.preventDefault();return}if(deltaOfInterest<0){i.moveDown()}else{i.moveUp()}lastAnimation=n}var r=e.extend({},t,n),i=e(this),s=e(r.sectionContainer);total=s.length,status="off",topPos=0,leftPos=0,lastAnimation=0,quietPeriod=500,paginationList="";e.fn.transformPage=function(t,n,r){if(typeof t.beforeMove=="function")t.beforeMove(r);if(e("html").hasClass("ie8")){if(t.direction=="horizontal"){var s=i.width()/100*n;e(this).animate({left:s+"px"},t.animationTime)}else{var s=i.height()/100*n;e(this).animate({top:s+"px"},t.animationTime)}}else{e(this).css({"-webkit-transform":t.direction=="horizontal"?"translate3d("+n+"%, 0, 0)":"translate3d(0, "+n+"%, 0)","-webkit-transition":"all "+t.animationTime+"ms "+t.easing,"-moz-transform":t.direction=="horizontal"?"translate3d("+n+"%, 0, 0)":"translate3d(0, "+n+"%, 0)","-moz-transition":"all "+t.animationTime+"ms "+t.easing,"-ms-transform":t.direction=="horizontal"?"translate3d("+n+"%, 0, 0)":"translate3d(0, "+n+"%, 0)","-ms-transition":"all "+t.animationTime+"ms "+t.easing,transform:t.direction=="horizontal"?"translate3d("+n+"%, 0, 0)":"translate3d(0, "+n+"%, 0)",transition:"all "+t.animationTime+"ms "+t.easing})}e(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(e){if(typeof t.afterMove=="function")t.afterMove(r)})};e.fn.moveDown=function(){var t=e(this);index=e(r.sectionContainer+".active").data("index");current=e(r.sectionContainer+"[data-index='"+index+"']");next=e(r.sectionContainer+"[data-index='"+(index+1)+"']");if(next.length<1){if(r.loop==true){pos=0;next=e(r.sectionContainer+"[data-index='1']")}else{return}}else{pos=index*100*-1}if(typeof r.beforeMove=="function")r.beforeMove(next.data("index"));current.removeClass("active");next.addClass("active");if(r.pagination==true){e(".onepage-pagination li a"+"[data-index='"+index+"']").removeClass("active");e(".onepage-pagination li a"+"[data-index='"+next.data("index")+"']").addClass("active")}e("body")[0].className=e("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,"");e("body").addClass("viewing-page-"+next.data("index"));if(history.replaceState&&r.updateURL==true){var n=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(index+1);history.pushState({},document.title,n)}t.transformPage(r,pos,next.data("index"))};e.fn.moveUp=function(){var t=e(this);index=e(r.sectionContainer+".active").data("index");current=e(r.sectionContainer+"[data-index='"+index+"']");next=e(r.sectionContainer+"[data-index='"+(index-1)+"']");if(next.length<1){if(r.loop==true){pos=(total-1)*100*-1;next=e(r.sectionContainer+"[data-index='"+total+"']")}else{return}}else{pos=(next.data("index")-1)*100*-1}if(typeof r.beforeMove=="function")r.beforeMove(next.data("index"));current.removeClass("active");next.addClass("active");if(r.pagination==true){e(".onepage-pagination li a"+"[data-index='"+index+"']").removeClass("active");e(".onepage-pagination li a"+"[data-index='"+next.data("index")+"']").addClass("active")}e("body")[0].className=e("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,"");e("body").addClass("viewing-page-"+next.data("index"));if(history.replaceState&&r.updateURL==true){var n=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(index-1);history.pushState({},document.title,n)}t.transformPage(r,pos,next.data("index"))};e.fn.moveTo=function(t){current=e(r.sectionContainer+".active");next=e(r.sectionContainer+"[data-index='"+t+"']");if(next.length>0){if(typeof r.beforeMove=="function")r.beforeMove(next.data("index"));current.removeClass("active");next.addClass("active");e(".onepage-pagination li a"+".active").removeClass("active");e(".onepage-pagination li a"+"[data-index='"+t+"']").addClass("active");e("body")[0].className=e("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,"");e("body").addClass("viewing-page-"+next.data("index"));pos=(t-1)*100*-1;if(history.replaceState&&r.updateURL==true){var n=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(t-1);history.pushState({},document.title,n)}i.transformPage(r,pos,t)}};i.addClass("onepage-wrapper").css("position","relative");e.each(s,function(t){e(this).css({position:"absolute",top:topPos+"%"}).addClass("section").attr("data-index",t+1);e(this).css({position:"absolute",left:r.direction=="horizontal"?leftPos+"%":0,top:r.direction=="vertical"||r.direction!="horizontal"?topPos+"%":0});if(r.direction=="horizontal")leftPos=leftPos+100;else topPos=topPos+100;if(r.pagination==true){paginationList+="<li><a data-index='"+(t+1)+"' href='#"+(t+1)+"'></a></li>"}});i.swipeEvents().bind("swipeDown",function(t){if(!e("body").hasClass("disabled-onepage-scroll"))t.preventDefault();i.moveUp()}).bind("swipeUp",function(t){if(!e("body").hasClass("disabled-onepage-scroll"))t.preventDefault();i.moveDown()});if(r.pagination==true){if(e("ul.onepage-pagination").length<1)e("<ul class='onepage-pagination'></ul>").prependTo("body");if(r.direction=="horizontal"){posLeft=i.find(".onepage-pagination").width()/2*-1;i.find(".onepage-pagination").css("margin-left",posLeft)}else{posTop=i.find(".onepage-pagination").height()/2*-1;i.find(".onepage-pagination").css("margin-top",posTop)}e("ul.onepage-pagination").html(paginationList)}if(window.location.hash!=""&&window.location.hash!="#1"){init_index=window.location.hash.replace("#","");if(parseInt(init_index)<=total&&parseInt(init_index)>0){e(r.sectionContainer+"[data-index='"+init_index+"']").addClass("active");e("body").addClass("viewing-page-"+init_index);if(r.pagination==true)e(".onepage-pagination li a"+"[data-index='"+init_index+"']").addClass("active");next=e(r.sectionContainer+"[data-index='"+init_index+"']");if(next){next.addClass("active");if(r.pagination==true)e(".onepage-pagination li a"+"[data-index='"+init_index+"']").addClass("active");e("body")[0].className=e("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,"");e("body").addClass("viewing-page-"+next.data("index"));if(history.replaceState&&r.updateURL==true){var a=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+init_index;history.pushState({},document.title,a)}}pos=(init_index-1)*100*-1;i.transformPage(r,pos,init_index)}else{e(r.sectionContainer+"[data-index='1']").addClass("active");e("body").addClass("viewing-page-1");if(r.pagination==true)e(".onepage-pagination li a"+"[data-index='1']").addClass("active")}}else{e(r.sectionContainer+"[data-index='1']").addClass("active");e("body").addClass("viewing-page-1");if(r.pagination==true)e(".onepage-pagination li a"+"[data-index='1']").addClass("active")}if(r.pagination==true){e(".onepage-pagination li a").click(function(){var t=e(this).data("index");i.moveTo(t)})}e(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(t){t.preventDefault();var n=t.originalEvent.wheelDelta||-t.originalEvent.detail;if(!e("body").hasClass("disabled-onepage-scroll"))u(t,n)});if(r.responsiveFallback!=false){e(window).resize(function(){o()});o()}if(r.keyboard==true){e(document).keydown(function(t){var n=t.target.tagName.toLowerCase();if(!e("body").hasClass("disabled-onepage-scroll")){switch(t.which){case 38:if(n!="input"&&n!="textarea")i.moveUp();break;case 40:if(n!="input"&&n!="textarea")i.moveDown();break;case 32:if(n!="input"&&n!="textarea")i.moveDown();break;case 33:if(n!="input"&&n!="textarea")i.moveUp();break;case 34:if(n!="input"&&n!="textarea")i.moveDown();break;case 36:i.moveTo(1);break;case 35:i.moveTo(total);break;default:return}}})}return false}}(window.jQuery)
// plugins.js
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render,keyframe:r.keyframe},ft=r.forceHeight!==!1,ft&&(Vt=r.scale||1),mt=r.mobileDeceleration||x,dt=r.smoothScrolling!==!1,gt=r.smoothScrollingDuration||E,vt={targetTop:it.getScrollTop()},Gt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Gt?(st=t.getElementById("skrollr-body"),st&&at(),X(),Dt(o,[y,S],[T])):Dt(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==$t||e!==Mt)&&($t=t,Mt=e,_t=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.26"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",m="touchcancel",p="touchend",d="skrollable",g=d+"-before",v=d+"-between",h=d+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=.004,E=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",I=/^(?:input|textarea|button|select)$/i,P=/^\s+|\s+$/g,N=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,V=/^(@?[a-z\-]+)\[(\w+)\]$/,z=/-([a-z0-9_])/g,q=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,M=/\{\?\}/g,$=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,_=/[a-z\-]+-gradient/g,B="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(B=n.match(e)||+n==n&&t[n].match(e))break;if(!B)return B=G="",r;B=B[0],"-"===B.slice(0,1)?(G=B,B={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[B]):G="-"+B.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[B.toLowerCase()+"RequestAnimationFrame"],r=Pt();return(Gt||!t)&&(t=function(t){var n=Pt()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Pt(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[B.toLowerCase()+"CancelAnimationFrame"];return(Gt||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],Bt=0,e=t.getElementsByTagName("*")):e.length===r&&(e=[e]),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=dt,f=yt,u=!1;if(a&&H in i&&delete i[H],i.attributes){for(var m=0,p=i.attributes.length;p>m;m++){var g=i.attributes[m];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name)if("data-emit-events"!==g.name){var v=g.name.match(N);if(null!==v){var h={props:g.value,element:i,eventType:g.name.replace(z,q)};s.push(h);var y=v[1];y&&(h.constant=y.substr(1));var T=v[2];/p$/.test(T)?(h.isPercentage=!0,h.offset=(0|T.slice(0,-1))/100):h.offset=0|T;var b=v[3],S=v[4]||b;b&&b!==A&&b!==F?(h.mode="relative",h.anchors=[b,S]):(h.mode="absolute",b===F?h.isEnd=!0:h.isPercentage||(h.offset=h.offset*Vt))}}else u=!0;else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var k,w,x;!a&&H in i?(x=i[H],k=lt[x].styleAttr,w=lt[x].classAttr):(x=i[H]=Bt++,k=i.style.cssText,w=Ct(i)),lt[x]={element:i,styleAttr:k,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f,emitEvents:u,lastFrameIndex:-1},Dt(i,[d],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Pt(),o=it.getScrollTop();return pt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},pt.topDiff||(pt.done&&pt.done.call(it,!1),pt=r),it},n.prototype.stopAnimateTo=function(){pt&&pt.done&&pt.done.call(it,!0),pt=r},n.prototype.isAnimatingTo=function(){return!!pt},n.prototype.isMobile=function(){return Gt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,Gt?Kt=s.min(s.max(t,0),Ot):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return Gt?Kt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Ot},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),wt(),Dt(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="",o.style.height=a.style.height="",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Ot=0,Vt=1,ut=r,mt=r,zt="down",qt=-1,Mt=0,$t=0,_t=!1,pt=r,dt=r,gt=r,vt=r,ht=r,Bt=0,yt=r,Gt=!1,Kt=0,Tt=r};var X=function(){var n,i,l,c,d,g,v,h,y,T,b,S;St(o,[f,u,m,p].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(d=o.clientY,g=o.clientX,T=e.timeStamp,I.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=v=d,l=g,y=T;break;case u:I.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=d-v,S=T-b,it.setScrollTop(Kt-h,!0),v=d,b=T;break;default:case m:case p:var a=i-d,k=l-g,w=k*k+a*a;if(49>w){if(!I.test(n.tagName)){n.focus();var x=t.createEvent("MouseEvents");x.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(x)}return}n=r;var E=h/S;E=s.max(s.min(E,3),-3);var A=s.abs(E/mt),F=E*A+.5*mt*A*A,C=it.getScrollTop()-F,D=0;C>Ot?(D=(Ot-C)/F,C=Ot):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f,u,m,p=o.clientHeight,d=At();for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],u=l.offset,m=d[l.constant]||0,l.frame=u,l.isPercentage&&(u*=p,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),l.frame+=m,ft&&!l.isEnd&&l.frame>Ot&&(Ot=l.frame);for(Ot=s.max(Ot,Ft()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],m=d[l.constant]||0,l.isEnd&&(l.frame=Ot-l.offset+m);e.keyFrames.sort(Nt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,m=u.length,p=u[0],y=u[u.length-1],T=p.frame>f,b=f>y.frame,S=T?p:y,k=s.emitEvents,w=s.lastFrameIndex;if(T||b){if(T&&-1===s.edge||b&&1===s.edge)continue;switch(T?(Dt(c,[g],[h,v]),k&&w>-1&&(xt(c,p.eventType,zt),s.lastFrameIndex=-1)):(Dt(c,[h],[g,v]),k&&m>w&&(xt(c,y.eventType,zt),s.lastFrameIndex=m)),s.edge=T?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=S.frame;break;default:case"set":var x=S.props;for(o in x)l.call(x,o)&&(a=nt(x[o].value),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Dt(c,[d,v],[g,h]),s.edge=0);for(var E=0;m-1>E;E++)if(f>=u[E].frame&&u[E+1].frame>=f){var A=u[E],F=u[E+1];for(o in A.props)if(l.call(A.props,o)){var C=(f-A.frame)/(F.frame-A.frame);C=A.props[o].easing(C),a=rt(A.props[o].value,F.props[o].value,C),a=nt(a),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a)}k&&w!==E&&("down"===zt?xt(c,A.eventType,zt):xt(c,F.eventType,zt),s.lastFrameIndex=E);break}}},Z=function(){_t&&(_t=!1,Et());var e,t,n=it.getScrollTop(),o=Pt();if(pt)o>=pt.endTime?(n=pt.targetTop,e=pt.done,pt=r):(t=pt.easing((o-pt.startTime)/pt.duration),n=0|pt.startTop+t*pt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=vt.targetTop-n;a&&(vt={startTop:qt,topDiff:n-qt,targetTop:n,startTime:Lt,endTime:Lt+gt}),vt.endTime>=o&&(t=U.sqrt((o-vt.startTime)/gt),n=0|vt.startTop+t*vt.topDiff)}if(Gt&&st&&i.setStyle(st,"transform","translate(0, "+-Kt+"px) "+Tt),ht||qt!==n){zt=n>qt?"down":qt>n?"up":zt,ht=!1;var l={curTop:n,lastTop:qt,maxTop:Ot,direction:zt},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),qt=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}Lt=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(V),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return $.lastIndex=0,e=e.replace($,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(_.lastIndex=0,e=e.replace(_,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return M.lastIndex=0,e[0].replace(M,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Dt(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Ct(n),n.style.cssText=r.styleAttr,Dt(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(z,q).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{B&&(n[B+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,mt,pt,dt,gt,vt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1,t.defaultPrevented=!0}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Yt.push({element:t,name:a,listener:n})},kt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},wt=function(){for(var e,t=0,r=Yt.length;r>t;t++)e=Yt[t],kt(e.element,e.name,e.listener);Yt=[]},xt=function(e,t,r){ct.keyframe&&ct.keyframe.call(it,e,t,r)},Et=function(){var e=it.getScrollTop();Ot=0,ft&&!Gt&&(a.style.height=""),j(),ft&&!Gt&&(a.style.height=Ot+o.clientHeight+"px"),Gt?it.setScrollTop(s.min(it.getScrollTop(),Ot)):it.setScrollTop(e,!0),ht=!0},At=function(){var e,t,r=o.clientHeight,n={};for(e in ut)t=ut[e],"function"==typeof t?t=t.call(it):/p$/.test(t)&&(t=t.slice(0,-1)/100*r),n[e]=t;return n},Ft=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Ct=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Dt=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=It(i).replace(It(o[l])," ");i=Ht(i);for(var c=0,f=n.length;f>c;c++)-1===It(i).indexOf(It(n[c]))&&(i+=" "+n[c]);t[a]=Ht(i)},Ht=function(e){return e.replace(P,"")},It=function(e){return" "+e+" "},Pt=Date.now||function(){return+new Date},Nt=function(e,t){return e.frame-t.frame},Ot=0,Vt=1,zt="down",qt=-1,Lt=Pt(),Mt=0,$t=0,_t=!1,Bt=0,Gt=!1,Kt=0,Yt=[];"function"==typeof define&&define.amd?define("skrollr",function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.skrollr=i})(window,document);
// main.js
$(document).ready(function() {

  var i = 0;
  var frame_sections = [0, 2050, 8550, 12500, 18900, 30200, 32700];
  var frame_durations = [7000, 7000, 5000, 8000, 16000, 3000];
  var current_frame = frame_sections[i];
  // console.log(current_frame);

  function call_next_frame() {
    var next_frame;
    if (i == frame_sections.length - 1) {
      next_frame = frame_sections[i];
      // console.log('Next frame is ' + next_frame);
      return next_frame;
    } else { 
      next_frame = frame_sections[++i];
      // console.log('Next frame is ' + next_frame);
      return next_frame;
    }
  }

  function call_prev_frame() {
    var prev_frame;
    if (i == 0) {
      prev_frame = frame_sections[i];
      // console.log('Prev frame is ' + prev_frame);
      return prev_frame;
    } else { 
      prev_frame = frame_sections[--i];
      // console.log('Prev frame is ' + prev_frame);
      return prev_frame;
    }
  }

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left //up
      case 38:  if (!$('*').is(':animated')) {
                  $('html, body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
                  // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
                } else {
                  // console.log ('Up Scroll Stopped');
                  return;
                }
                break;

      case 39: //right //down
      case 40:  if (!$('*').is(':animated')) {
                  $('html, body').stop().scrollTo(call_next_frame(), { duration: frame_durations[i-1], easing : 'swing' });
                  // console.log('Down i = ' + (i-1) + ' ' + frame_durations[i -1]);
                } else {
                  // console.log ('Down Scroll Stopped');
                  return;
                }
                break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $('html, body').bind({'mousewheel DOMMouseScroll onmousewheel touchmove scroll MozMousePixelScroll': 
    function(e) {
      if (e.target.id == 'el') return;
      e.preventDefault();
      e.stopPropagation();

      //Determine Direction
      if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
        //Up
        if (!$('*').is(':animated')) {
          $('html, body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
          // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
        } else {
          // console.log ('Up Scroll Stopped');
          return;
        }

      } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
        //Up
        if (!$('*').is(':animated')) {
          $('html, body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
          // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
        } else {
          // console.log ('Up Scroll Stopped 2');
          return;
        }

      } else {
        //Down
        if (!$('*').is(':animated')) {
          $('html, body').stop().scrollTo(call_next_frame(), { duration: frame_durations[i-1], easing : 'swing' });
          // console.log('Down i = ' + (i-1) + ' ' + frame_durations[i -1]);
        } else {
          // console.log ('Down Scroll Stopped');
          return;
        }
      }
    }
  });

});
