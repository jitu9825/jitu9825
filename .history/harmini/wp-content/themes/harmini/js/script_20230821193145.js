/*------------------------------------------------------------------
[Master Scripts]

Project:    Harmini template
Version:    1.2.7

[Table of contents]

[Components]
	-Preloader
	-Equal Height function
	 screen navigation open
	-Full screen navigation open
	-Fixed header
	-Screen rezise events
	-Screen resize
	-Fix centered container
	-Banner slider
	-Portfolio items & filtering
	-Blog items & filtering
	-Image carousel
	-Image carousel
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Coming soon countdown
	
-------------------------------------------------------------------*/

"use strict";

/*------------------------------------------------------------------
[ Preloader ]
*/
jQuery(window).on('load', function () {
    var $preloader = jQuery('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

jQuery(document).ready(function() {


	/*------------------------------------------------------------------
	[ Equal Height function ]
	*/
	function equalHeight(group) {
        if(jQuery(window).width() > '768') {
			var tallest = 0;
	       	jQuery(group).each(function() {
	            var thisHeight = jQuery(this).css('height', "").height();
	            if(thisHeight > tallest) {
	                tallest = thisHeight;
	            }
	        });
	        jQuery(group).height(tallest);
	    } else {
	    	jQuery(group).height('auto');
	    }
    }

    /*------------------------------------------------------------------
	[ Navigation open ]
	*/
	jQuery('.fullscreen-nav-button').on("click", function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.full-screen-nav').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.full-screen-nav').fadeIn();
			jQuery('.fsn-container .cell').css('height', jQuery('.fsn-container').height());
		};
	});

	jQuery('.default-nav-button').on("click", function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
		} else {
			jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
		};
	});

	/*------------------------------------------------------------------
	[ Mobile menu ]
	*/
	
	var nav_status = "";
	if(jQuery('.navigation').hasClass('active')) {
		nav_status = 'active';
	}

	jQuery(window).on("load resize", function(){
		if(jQuery(window).width() <= '1200') {
			jQuery('.navigation .menu-item-has-children > a').on("click", function(){
				if(!jQuery(this).hasClass('active')) {
					jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
					return false;
				}
			});
			if(nav_status == 'active') {
				jQuery('.navigation').removeClass('active');
				jQuery('.nav-button').removeClass('hidden');
			}
		} else {
			if(nav_status == 'active') {
				jQuery('.navigation').addClass('active');
				jQuery('.nav-button').addClass('hidden').removeClass('active');
			}
		}

		if(jQuery(window).width() > '1200') {
			if(jQuery('.navigation > ul > li').length > 7) {
				jQuery('.navigation').addClass('min');
			}
			if(jQuery('.navigation > ul > li').length > 8) {
				jQuery('.navigation').addClass('min2');
			}
		} else {
			jQuery('.navigation').removeClass('min').removeClass('min2');
		}
	});

	jQuery('.side-header .navigation .menu-item-has-children > a').on("click", function(){
		if(!jQuery(this).hasClass('active')) {
			jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
			return false;
		}
	});

	jQuery('#wpadminbar').addClass('wpadminbar');

	/*------------------------------------------------------------------
	[ Fixed header ]
	*/
	
	if(jQuery('.header').hasClass('transperent')){
		var h_class = 'transperent';
	}
	jQuery(window).on("load resize scroll", function(){
		if ( jQuery(document).scrollTop() > 0 ) {
			jQuery('.header').addClass('fixed').removeClass('transperent');
		} else {
			jQuery('.header').removeClass('fixed');
			if (h_class == 'transperent') {
				jQuery('.header').addClass('transperent');
			}
		}
	});

	/*------------------------------------------------------------------
	[ Screen rezise events ]
	*/
	
	jQuery(window).on("load resize scroll", function(){
		jQuery('.fsn-container .cell').css('height', jQuery('.fsn-container').height());
		jQuery('.side-header .container > .cell').css('height', jQuery('.side-header').height());
	});

	/*------------------------------------------------------------------
	[ Screen resize ]
	*/
	jQuery(window).on("load resize", function(){
		jQuery('.banner:not(.fixed-height)').each(function(){
			jQuery(this).css('height', jQuery(window).outerHeight()-jQuery('.header-space').height()-jQuery('#wpadminbar').height());
			jQuery(this).find('.item').css('height', jQuery(window).outerHeight()-jQuery('.header-space').height()-jQuery('#wpadminbar').height());
		});
		jQuery('.banner.fixed-height').each(function(){
			jQuery(this).find('.item').css('height', jQuery(this).height());
		});

		jQuery('.image-slider:not(.fixed-height)').each(function(){
			jQuery(this).css('height', jQuery(window).outerHeight()-jQuery('.header-space').height()-jQuery('#wpadminbar').height());
			jQuery(this).find('.item').css('height', jQuery(window).outerHeight()-jQuery('.header-space').height()-jQuery('#wpadminbar').height());
		});
		jQuery('.image-slider.fixed-height').each(function(){
			jQuery(this).find('.item').css('height', jQuery(this).height());
		});

	    jQuery('.header-space').css('height', jQuery('.header').outerHeight()+jQuery('.ypromo-site-bar').outerHeight());

	    equalHeight(jQuery(".article-item-col"));

	    jQuery('main.fw-main-row').css('min-height', jQuery(window).height()-jQuery('.header-space').height()-jQuery('.footer').outerHeight());

	    jQuery('#content-wrap').css('margin-bottom', jQuery('.footer').outerHeight());

	});

    /*------------------------------------------------------------------
	[ Fix centered container ]
	*/
	jQuery(window).on("load resize", function(){
		jQuery('.centered-container').each(function() {
			var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
				height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

			jQuery(this).css('width', '').css('height', '');

			if ( width & 1 ) {jQuery(this).css('width', (width+1)+'px');}

			if ( height & 1 ) {jQuery(this).css('height', (height+1)+'px');}
		});
	});

	/*------------------------------------------------------------------
	[ Blog items & filtering ]
	*/
	jQuery(window).on("load", function(){
		jQuery('.filter-items, .portfolio-items').each(function(){
			var $grid = jQuery(this).isotope();

			if($grid.hasClass('masonry')){
				console.log('masonry');
				var $grid = jQuery(this).isotope({
					itemSelector: 'article',
					masonry: {
						columnWidth: 'article'
					}
				});
			} else {
				console.log('grid');
				var $grid = jQuery(this).isotope({
					itemSelector: 'article'
				});
			}

			jQuery(this).prev('.filter-button-group').on( 'click', 'button', function() {
				jQuery(this).addClass('active').siblings().removeClass('active');
				var filterValue = jQuery(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});
		});
	});
	
	/*------------------------------------------------------------------
	[ Full sreen navigation ]
	*/
	
	jQuery(window).on("load resize", function(){
		jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function(){
			if(!jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
				return false;
			}
		});
	});

	/*------------------------------------------------------------------
	[ Animation ]
	*/
	
	jQuery(window).on("load scroll", function(){
		jQuery('.animateNumber').each(function(){
			var num = parseInt(jQuery(this).attr('data-num'));
			
			var top = jQuery(document).scrollTop()+(jQuery(window).height());
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top && !jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').animateNumber({ number: num },2000);
			}
		});
		jQuery('.animateProcent').each(function(){
			var num = parseInt(jQuery(this).attr('data-num'));
			var percent_number_step = jQuery.animateNumber.numberStepFactories.append('%');
			var top = jQuery(document).scrollTop()+(jQuery(window).height());
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top && !jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').animateNumber({ number: num, numberStep: percent_number_step },2000);
			}
		});
	});

	/*------------------------------------------------------------------
	[ Comment reply ]
	*/

	jQuery('.replytocom').on('click', function(){
		var id_parent = jQuery(this).attr('data-id');
		jQuery('#comment_parent').val(id_parent);
		jQuery('#commentform-heading h3').appendTo(jQuery(this).parents('.comment-item'));
		jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
		return false;
	});

	jQuery('#cancel-comment-reply-link').on('click', function(){
		jQuery('#comment_parent').val('0');
		jQuery('.commentform-heading').appendTo(jQuery('#commentform-heading'));
		jQuery('#respond').appendTo(jQuery('#commentform-area'));
		jQuery('#cancel-comment-reply-link').hide();
		return false;
	});

	/*------------------------------------------------------------------
	[ Popup image ]
	*/
	
	if(jQuery('.popup-link').length > 0) {
		jQuery('.popup-link').magnificPopup({
			type: 'image',
			mainClass: 'mfp-fade'
		});
	}
	
	if(jQuery('.popup-gallery').length > 0) {
		jQuery('.popup-gallery').magnificPopup({
			type: 'image',
			delegate: 'a',
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
		});
	}

	/*------------------------------------------------------------------
	[ Parallax ]
	*/

	jQuery(window).on('load scroll', function(){
		jQuery('.background-parallax').each(function(){
			jQuery(this).css('background-position','50% ' + ((jQuery(window).scrollTop()-jQuery(this).offset().top) / 2) + 'px');
		});
	});

	/*------------------------------------------------------------------
	[ Fix side ]
	*/
	
	if(jQuery('.fix-side').length > 0) {
		jQuery('.fix-side').stick_in_parent();
	}
});


/*------------------------------------------------------------------
[ Popup gallery ]
*/
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element
			console.log(figureEl);
            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.getElementsByTagName("a")[0]; // <a> element

            
            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return ((el.tagName && el.tagName.toUpperCase() === 'ARTICLE') || (el.tagName && el.tagName.toUpperCase() === 'LI') || (el.tagName && el.tagName.toUpperCase() === 'DIV'));
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
/*
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
*/
        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

if(jQuery('.my-gallery').length > 0) {
	jQuery('body').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>')
	initPhotoSwipeFromDOM('.my-gallery');
}
