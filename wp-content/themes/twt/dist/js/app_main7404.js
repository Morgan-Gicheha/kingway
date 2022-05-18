/** DOCUMENT READY START **/
(function($){

    // if ($(".store-locator-options")[0]){
    //
    //     jQuery('.store-locator-options').find('option').remove();
    //
    //     $.getJSON( "https://apix.locationbank.net/Api/LocationWeb?Id=229c9ffb-f729-4455-b0a2-ac61974c7074", function( stores ) {
    //         console.log( stores );
    //         $.each( stores, function( key, storedetails ) {
    //             jQuery('.store-locator-options select').append('<option value="'+storedetails.locationName+'">'+storedetails.locationName+'</option>');
    //             console.log(storedetails);
    //         });
    //     });
    // };
// var shop_hero_slider = $('#shop-hero-slider');
//
//
// if (shop_hero_slider.length > 0) {
//     shop_hero_slider.slick({
//         dots: false,
//         arrows: true,
//         infinite: true,
//         autoplay: false,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplaySpeed: 3000,
//         speed: 1000,
//
//
//     })
//     $(window).on('resize', function () {
//         shop_hero_slider.slick('resize');
//     });
// }
/** GLOBAL FUNCTIONS START **/




/** Mobile Mega Menu Start **/
$(window).on("load resize",function(e){
  if ($(window).width() <= 991) {
    $('#mobile_header_main_menu .mobile_has_sub_menu > a').click(function (e) {
      e.preventDefault();
      $(this).parent().addClass('mobile_sub_menu_expand');
    });
    $('.mobile-menu-back').click(function (e) {
      e.preventDefault();
      $(this).parents('.mobile_has_sub_menu').removeClass('mobile_sub_menu_expand');
    });
  };
});
/** Mobile Mega Menu End **/

$("#custom_mobile_nav_toggler").click(function(e){
  $('body').toggleClass('overflow-hidden');
});



/** Multi Modal Start **/
$(document).on('hidden.bs.modal', '.modal', function () {
  $('.modal:visible').length && $(document.body).addClass('modal-open');
});
/** Multi Modal End **/

/** TOOLTIPS **/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})




/** Capitalize first letter of each work and make rest of word lowercase **/
function capitalize_words(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


/** Function to auto close modals when clicking outside of them **/
$(document).on('click', function(e){
  var clicked = e.target;
  if (clicked.id == 'request_quote_popup' || clicked.id == 'wishlist_popup' || clicked.id == 'cart_popup' || clicked.id == 'search_popup' || clicked.id == 'login_popup' || clicked.id == 'register_popup' || clicked.id == 'forgot_popup') {
    $("#"+clicked.id).modal('hide');
  }
});


$('#topbar-right-menu .dropdown-toggle').on('click', function(e){
  e.preventDefault();
  var dropdown_ul = $(this).next();
  dropdown_ul.toggle();
});

/** GLOBAL FUNCTIONS END **/



/**  DISPLAY LOGIN AND REGISTARTION POPUPS - START **/

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else
  {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}

if (getCookie('show_login_pop')) {
  setTimeout(function(){
    jQuery('#loggedinmodal').modal('toggle');
    document.cookie = "show_login_pop=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, 1000);
}

if (getCookie('show_popup_after_registration')) {
  setTimeout(function(){
    jQuery('#registeredmodal').modal('toggle');
    document.cookie = "show_popup_after_registration=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, 1000);
}


if (!$('body').hasClass('logged-in')) {
  var browse_quote_list_btn = $('.yith_ywraq_add_item_browse_message a');
  if (browse_quote_list_btn.html() == 'Browse the list') {
    browse_quote_list_btn.attr('href', '#');
    browse_quote_list_btn.attr('data-bs-target', '#request_quote_popup');
    browse_quote_list_btn.attr('data-bs-toggle', 'modal');
  }
}
/**  DISPLAY LOGIN AND REGISTARTION POPUPS - END **/




/** Display Password Strenght Indicator - START **/
$( 'body' ).on( 'keyup', '#reg_password_modal', function( event ) {
  wdmChkPwdStrength(
      // password field
      $('#reg_password_modal'),
      // strength status
      $('#password_strength'),
      // confirm password field
      '',
      // Submit button
      $('#register_submit_btn'),
      // blacklisted words which should not be a part of the password
      ['admin', 'happy', 'hello', '1234', 'password']
  );
});

function wdmChkPwdStrength( $pwd, $strengthStatus, $confirmPwd, $submitBtn, blacklistedWords ) {
  var pwd = $pwd.val();
  var confirmPwd = '';
  var hint = $('#forgot_password_strength_hint');
  if ($confirmPwd === '') {
    confirmPwd = pwd;
  } else {
    confirmPwd = $confirmPwd.val();
  }


  // extend the blacklisted words array with those from the site data
  blacklistedWords = blacklistedWords.concat( wp.passwordStrength.userInputDisallowedList() );

  // every time a letter is typed, reset the submit button and the strength meter status
  // disable the submit button
  $submitBtn.attr( 'disabled', 'disabled' );
  $strengthStatus.removeClass( 'short bad good strong' );

  // calculate the password strength
  var pwdStrength = wp.passwordStrength.meter( pwd, blacklistedWords, confirmPwd ); 
  // check the password strength
  switch ( pwdStrength ) {
    case 2:
      $strengthStatus.addClass('bad').html(pwsL10n.bad + ' - Please enter a stronger password.');
      hint.show();
      break;

    case 3:
      $strengthStatus.addClass('good').html(pwsL10n.good + ' - Please enter a stronger password.');
      hint.show();
      break;

    case 4:
      $strengthStatus.addClass('strong').html(pwsL10n.strong);
      hint.hide();
      break;

    case 5:
      $strengthStatus.addClass('short').html(pwsL10n.mismatch);
      break;

    default:
      $strengthStatus.addClass('short').html(pwsL10n.short + ' - Please enter a stronger password.');
      hint.show();
  }

  // set the status of the submit button
  if ( 4 === pwdStrength && pwd === confirmPwd ) {
    $submitBtn.removeAttr( 'disabled' );
  }

  return pwdStrength;

}

/** Display Password Strenght Indicator - END **/
$('#press-office-ajax-load-more').click(function(e){

    e.preventDefault();

    var button = $(this),
        data = {
            'action': 'press_office_ajax_load_more',
            'query': scripts_params.posts,
            'page' : scripts_params.current_page,
            'nonce' : scripts_params.ajax_nonce
        };

    $.ajax({
        url : scripts_params.ajaxurl,
        data : data,
        type : 'POST',
        beforeSend : function ( xhr ) {
            button.text('Loading...');
        },
        success : function( data ){
            if( data ) {
                $('.press_office_posts_container').append(data);
                scripts_params.current_page++;
                if (toString(scripts_params.current_page) === toString(scripts_params.max_page)){
                    button.remove();
                }
            } else {
                button.remove();
            }
        }
    });

});
if($("#press_order").length !== 0) {
    $('#press_order')
        .selectric({
            onChange: function(){
                $('#press_office_select_order input[name="cat"]').val($('#press_order').val());
                $('#press_office_select_category input[name="order"]').val($('#sort_order').val());
                $('#press_office_select_category').submit();
            }
        });
}

if($("#sort_order").length !== 0) {
    $('#sort_order')
        .selectric({
            onChange: function () {
                $('#press_office_select_category input[name="order"]').val($('#sort_order').val());
                $('#press_office_select_order input[name="cat"]').val($('#press_order').val());
                $('#press_office_select_category').submit();
            }
        });
}

if($("#multimedia_order").length !== 0) {
    $('#multimedia_order')
        .selectric({
            onChange: function () {
                $('#multimedia_select_order').submit();
            }
        });
}

if($(".variations select").length !== 0) {
    $('.variations select').selectric();
}

// $('.finder-selectric .finder-size-select').selectric();
// $(window).scroll(function() {
//     var windowBottom = $(this).scrollTop() + $(this).innerHeight();
//     // console.log(windowBottom);
//     $(".fade_this").each(function() {
//         /* Check the location of each desired element */
//         var objectBottom = $(this).offset().top + $(this).outerHeight();
//         // console.log($(this).id +' offset top: '+ $(this).offset().top);
//         // console.log($(this).id +' outerHeight: '+ $(this).outerHeight());
//         // console.log($(this).id +' outerHeight: '+ objectBottom);
//
//         var objectBottom = $(this).offset().top + (($(this).outerHeight() / 100) * 10);
//
//         /* If the element is completely within bounds of the window, fade it in */
//         if (objectBottom < windowBottom) { //object comes into view (scrolling down)
//             if ($(this).css("opacity")==0) {
//                 $(this).fadeTo(500,1);
//             }
//         } else { //object goes out of view (scrolling up)
//             if ($(this).css("opacity")==1) {
//                 $(this).fadeTo(500,0);
//             }
//         }
//     });
// }).scroll(); //invoke scroll-handler on page-load

/* Product Tabs */
$(".individual-tabnav li > a").removeClass("active");
$(".individual-tabnav li > a").eq(0).addClass("active");
$(".individual-tab-item-wrap > .individual-tab-item").eq(0).addClass("individual-tab-item-active");
$(".individual-tabnav li > a").each(function (i) {
    $(this).click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) return false;
        else {
            $(".individual-tabnav li > a").removeClass("active");
            $(this).addClass("active")
            $(".individual-tab-item-wrap > .individual-tab-item").removeClass("individual-tab-item-active");
            $(".individual-tab-item-wrap > .individual-tab-item").eq(i).addClass("individual-tab-item-active");
        }
    })

});



/* Product Features Slider */
var $slider = $('.individual-tab-slider');
var $progressBar = $('.individual-tab-slider-one');
var $progressBarLabel = $( '.slider__label' );

$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

    $progressBar
        .css('background-size', calc + '% 100%')
        .attr('aria-valuenow', calc );

    $progressBarLabel.text( calc + '% completed' );
});

if ($(window).width() < 991) {
    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

        $progressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc );

        $progressBarLabel.text( calc + '% completed' );
    });

}


// Handle quantity on page load
var tempOldValue = $('.quantity').find('.qty').val();
if (tempOldValue > 1) {
    $('.single-tyre-quantity input').val(tempOldValue);
}

// Handle quantity selector changes
$(".single-tyre-quantity .button").on("click", function() {
    var $button = $(this);
    var $parent = $button.parent();
    var oldValue = $('.quantity').find('.qty').val();

    if ($button.text() == "+") {
        var newVal = parseFloat(oldValue) + 1;
    } else {

        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
        }
    }

    $('.quantity').find('.qty').val(newVal).change();
    $('.single-tyre-quantity input').val(newVal);

    // if (jQuery("#ywapo_ctrl_id_7_0")[0]) {
    //     jQuery('#ywapo_ctrl_id_7_0').click();
    //     jQuery('#ywapo_ctrl_id_7_0').click();
    // }

});


$('.single-tyre-tab-trigers ul li:first-child').addClass('single-tyre-tab-active');
$('.single-tyre-tab-item').hide();
$('.single-tyre-tab-item').eq(0).show();
// Click function
$('.single-tyre-tab-trigers ul li').click(function(){
    $('.single-tyre-tab-trigers ul li').removeClass('single-tyre-tab-active');
    $(this).addClass('single-tyre-tab-active');
    $('.single-tyre-tab-item').hide();
    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();
    return false;
});

$slider.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    centerMode: false,
    centerPadding: '234px',
    infinite: true,
    loop: true,
    navigation:false,
    autoplaySpeed: 1500,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                arrows: true,
                centerPadding: '104px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 991,
            settings: {
                arrows: true,
                centerPadding: '34px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                autoplay: true,
                arrows: false,
                centerMode:true,
                centerPadding: '0',
                slidesToShow: 1
            }
        }
    ]
});

// if ($(".single-tyre-quantity")[0]){
//     $('.quantity .input-text').get(0).type = 'text';
//     jQuery('.quantity .input-text').insertBefore(jQuery('.quantity'));
// }

// Currency Formatter for ZA Prices.
var formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

if ($(".variations_form")[0]){

    // jQuery('.single_variation').bind('DOMSubtreeModified', function(){
    // jQuery('.variations .selectric-wrapper').bind('DOMSubtreeModified', function(){
    jQuery('.variations .selectric-wrapper select').selectric().on('change', function(){

        console.log("selection changed!!!!");

        setTimeout(function () {

            var woocommerce_variation_data = $('.single_variation');

            var current_price = parseInt(woocommerce_variation_data.find('.woocommerce-variation-price .woocommerce-Price-amount bdi').text().slice(0,-2).replace('R','').replace(' ',''));
            var current_price_cents = woocommerce_variation_data.find('.woocommerce-variation-price .woocommerce-Price-amount bdi').text().slice(-2);

            var varstock = parseInt($('.woocommerce-variation-availability .stock').attr('data-stock'));
            var stock_threshold = parseInt(scripts_params.stock_threshold);

            console.log('Stock: '+varstock);
            console.log('Threshold: '+stock_threshold);

            if (woocommerce_variation_data.is(":hidden")) {
                jQuery('.single-tyre-btn-group .cartbtn').attr('disabled', 'disabled');
                jQuery('.add-request-quote-button').attr('disabled', 'disabled');
                jQuery('.price-to-update').html("R 0<dfn>00</dfn>");
                jQuery('.single-tyre-value').hide();
                $('.woocommerce_variation_flag').replaceWith('<div class="woocommerce_variation_flag mt-2" style="display:none;"></div>');
                jQuery('.variations .selectric-wrapper select').selectric('refresh');
            } else {

                $('.price-to-update').html(formatter.format(current_price)+"<dfn>"+current_price_cents+"</dfn>");

                console.log("Has Price:");
                console.log(current_price > 0);

                console.log("Above Threshold:");
                console.log(varstock >= stock_threshold);

                console.log("COMBO:");
                console.log(current_price > 0 && varstock >= stock_threshold);


                if(current_price > 0 && varstock >= stock_threshold){
                    jQuery('.single-tyre-btn-group .cartbtn').removeAttr('disabled');
                    jQuery('.add-request-quote-button').removeAttr('disabled');
                    jQuery('.single-tyre-value').show();
                    jQuery('.variable_cart_btn_container').show();
                    jQuery('.variations .selectric-wrapper select').selectric('refresh');
                } else {
                    jQuery('.single-tyre-btn-group .cartbtn').attr('disabled', 'disabled');
                    $('.single-tyre-value').hide();
                    jQuery('.variable_cart_btn_container').hide();
                    $('.woocommerce_variation_flag').replaceWith('<div class="woocommerce_variation_flag mt-2" style="display:none;"></div>');
                    jQuery('.variations .selectric-wrapper select').selectric('refresh');
                }

            }

        }, 300);

    });
}


    $('form.variations_form').on('show_variation', function(event, data){
        setTimeout(function () {
            $('.woocommerce_variation_flag').replaceWith(data.variation_flag).show();
        }, 300);
});

// if (jQuery(".add-to-quote")[0]){
//     // jQuery('.single-tyre-btn-group .cartbtn').remove();
//     // jQuery('.yith-ywraq-add-to-quote').prependTo('.single-tyre-btn-group');
//     jQuery('.yith-ywraq-add-to-quote').appendTo('.single-tyre-btn-group');
//
//     setTimeout(function(){
//         jQuery('.ywapo_group_container_checkbox').hide();
//         jQuery('.yith_wapo_group_total').hide();
//     }, 1000);
//
// }

// if (jQuery(".single-tyre-price")[0]){
//     if(!jQuery('.product-type-variable')[0]){
//         jQuery('.yith-ywraq-add-to-quote').remove();
//     }
// }

// if (jQuery("#ywcnp_suggest_price_single")[0]){
//     if(!jQuery('.product-type-variable')[0]){
//         jQuery('.yith-ywraq-add-to-quote').remove();
//     }
// }

// if (jQuery(".yith-wcwl-wishlistexistsbrowse .feedback")[0]){
//     jQuery('#wishlist-heart').text('BROWSE WISHLIST');
// }
//
// jQuery('#wishlist-heart').on('click', function(event ){
//     if( $("#wishlist-heart").text().indexOf('BROWSE WISHLIST') >= 0) {
//
//     } else {
//         event.preventDefault();
//         jQuery('.yith-wcwl-add-button a').click();
//         jQuery('#wishlist-heart').text('BROWSE WISHLIST');
//     }
// });

// jQuery('.riview-link a').on('click', function() {
//     jQuery('#review_form_wrapper').toggle();
//     jQuery('.commentlist').toggleClass('showall');
// });


var $relatedslider = $('.individual-tab-slider-two');
var $relatedprogressBar = $('.similar-tyre-progressbar');
var $relatedprogressBarLabel = $( '.slider__label' );

$relatedslider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

    $relatedprogressBar
        .css('background-size', calc + '% 100%')
        .attr('aria-valuenow', calc );

    $relatedprogressBarLabel.text( calc + '% completed' );
});

if ($(window).width() < 991) {
    $relatedslider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

        $relatedprogressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc );

        $relatedprogressBarLabel.text( calc + '% completed' );
    });

}
$relatedslider.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    centerMode: true,
    centerPadding: '385px',
    infinite: true,
    loop: true,
    navigation:false,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                arrows: true,
                centerPadding: '134px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 991,
            settings: {
                arrows: true,
                centerPadding: '104px',
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 767,
            settings: {
                autoplay: true,
                arrows: false,
                centerMode:true,
                centerPadding: '0',
                slidesToShow: 1
            }
        }
    ]
});



$('.add-request-quote-button').on('click', function(){
    setTimeout(function(){
        location.reload();
    },500);
});

$('.yith-wcwl-add-button a').on('click', function(){
    setTimeout(function(){
        location.reload();
    },500);
});



$('#single-product-cross-sells ul li a').on('mouseover', function(){
    var display_text = $('#display_crosssell_title');
    var hover_text = $(this).attr('data-crosstitle');
    display_text.html(hover_text);
}).on('mouseout', function(){
    var display_text = $('#display_crosssell_title');
    var default_text = $('#single-product-cross-sells ul li a[data-crossdefault="true"]').attr('data-crosstitle');
    display_text.html(default_text);
});



var $showroom_slider = $('.showroom-tab-slider');
var $showroom_progressBar = $('.showroom-tab-slider-one');
var $showroom_progressBarLabel = $( '.showroom-tab-slider-one .slider__label' );


$showroom_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

    $showroom_progressBar
        .css('background-size', calc + '% 100%')
        .attr('aria-valuenow', calc );

    $showroom_progressBarLabel.text( calc + '% completed' );
});

if ($(window).width() < 991) {
    $showroom_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

        $showroom_progressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc );

        $showroom_progressBarLabel.text( calc + '% completed' );
    });

}


/**
 * Initiate SLICK slider for showroom on single product page.
 */
$showroom_slider.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    centerMode: false,
    centerPadding: '234px',
    infinite: true,
    loop: true,
    navigation:false,
    autoplaySpeed: 1500,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                arrows: true,
                centerPadding: '104px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 991,
            settings: {
                arrows: true,
                centerPadding: '34px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                autoplay: true,
                autoplaySpeed: 3500,
                arrows: true,
                centerMode:true,
                centerPadding: '',
                slidesToShow: 1
            }
        }
    ]
});
$('.showroom_tab a').on('click', function(){
    $showroom_slider.slick('refresh');
});
$(window).on("load resize",function(e){
    $showroom_slider.slick('refresh');
});


/**
 * Add lightbox effect for showroom images when clicked on.
 */
$('#tab-showroom .simple_lightbox a').each(function(i){
    $(this).simpleLightbox({nav: true});
});


/**
 * Controls single product page, "more info" button scroll to action
 */
$('button.scrollto').on('click', function(){
    var target = $(this).attr('href');
    var target_position = $(target).position();
    scrollTo({top: target_position.top, left: target_position.left, behavior: 'smooth'});
});



$('.yith_ywraq_add_item_browse_message a').on('click', function(e){
    e.preventDefault();
    $('#request_quote_popup').modal('toggle');
});
/** js to collpase expand filters on shop page **/
$('.widget-title').click(function(acc) {    
  var dropDown = $(this).closest('.woocommerce_filter_widget').find('ul, form');
  $(this).closest('#shop_filters_collapse').find('ul, form').not(dropDown).slideUp();
  
  if ($(this).hasClass('close')) {
    $(this).removeClass('close');
  } else {
    $(this).closest('#shop_filters_collapse').find('.widget-title.close').removeClass('close');
    $(this).addClass('close');
  }
  
  dropDown.stop(false, true).slideToggle();
  acc.preventDefault();
});

/** Selectric Tyre filter Disabled Enabled **/
$(document).on('change', '.finder-selectric select.finder-size-select', function () {
  // $(this).parents(".col-lg-2").next().find('select.finder-size-select').select2('open');
  $(this).parents(".col-lg-2").next().find('select.finder-size-select').next().addClass("select2-active");
});


/** Tabs Mobile **/
$('#tab_selector').on('change', function (e) {
  $('.nav-tyre-finder li .nav-link').eq($(this).val()).tab('show');
});


$(window).on("load resize",function(e){
  if ($(window).width() <= 991) {
    /** Sidebar Filter Toggle  **/
    $(".btn-filter-collapse").click(function(e){
      $("body").toggleClass("overflow-hidden");
      if($(this).parent().hasClass("sticky")){
      }
      else {
        $(this).parent().addClass("sticky");
      }
    });

    /** Select 2 Hide Show **/
    $('.type-finder-wrap .row > div:not(:first-child) .finder-selectric').hide();
    // $(document).on('change', '.finder-selectric', function () {
    //   $(this).parents(".col-lg-2").next().find('.finder-selectric').show();
    //   $('.select2-dropdown').show();
    //   setTimeout(function() {
    //     jQuery('.select2-dropdown').slideDown(500);
    //   });
    // });

    /** Filter Sticky **/
    if($(".mobile-filter-button").length > 0) {
      if($("body").hasClass("logged-in")) {
        var stickNavTopPos = 154;
      }
      else {
        var stickNavTopPos = 121;
      }
    
      var stickyNavTop = $('.mobile-filter-button').offset().top - stickNavTopPos;
      var stickyNav = function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
          $('.mobile-filter-button').addClass('sticky');
        }
        else {
          $('.mobile-filter-button').removeClass('sticky');
        }
      };
      $(window).scroll(function() {
        stickyNav();
      });
    }
  }
  else {
    $('.type-finder-wrap .row > div:not(:first-child) .finder-selectric').show();
  }
});
$('.finder-selectric .finder-size-select').select2({
  width: '100%',
  dropdownPosition: 'below',
}).on('select2:open', function (e) {
  $('.select2-dropdown').hide();
  setTimeout(function () {
    jQuery('.select2-dropdown').slideDown(500);
  });
});


$('#store_selector').select2({
  allowClear: true,
  width: '100%'
});


/**
 * Vehicle
 */
$('.finder_select_make').one('select2:open', function (e) {
  $('input[aria-controls^="select2-vehicle_make-"]').prop('placeholder', 'Search Make');
});

$('.finder_select_model').one('select2:open', function (e) {
  $('input[aria-controls^="select2-vehicle_model-"]').prop('placeholder', 'Search Model');
});

$('.finder_select_variant').one('select2:open', function (e) {
  $('input[aria-controls^="select2-vehicle_variant-"]').prop('placeholder', 'Search Variant');
});


/**
 * Tyres
 */
$('.finder_select_wheel_width').one('select2:open', function (e) {
  $('input[aria-controls^="select2-tyre_width-"]').prop('placeholder', 'Search Width');
});

$('.finder_select_wheel_profile').one('select2:open', function (e) {
  $('input[aria-controls^="select2-tyre_profile-"]').prop('placeholder', 'Search Profile');
});

$('.finder_select_wheel_diameter').one('select2:open', function (e) {
  $('input[aria-controls^="select2-tyre_diameter-"]').prop('placeholder', 'Search Diameter');
});

$('.finder_select_wheel_load_index').one('select2:open', function (e) {
  $('input[aria-controls^="select2-tyre_load_index-"]').prop('placeholder', 'Search Load Index');
});

$('.finder_select_wheel_speed_index').one('select2:open', function (e) {
  $('input[aria-controls^="select2-tyre_speed_index-"]').prop('placeholder', 'Search Speed Index');
});


$(document).on("select2:open", "select", function() {
  $('.select2-results__options').niceScroll({
    cursorcolor: "#d8d8d8",
    cursorwidth: "5px",
    autohidemode: false,
    cursorborder: "0",
    horizrailenabled: false,
  });
});
$('#search_input').on('input', function(e){
    var srcval = $('#search_input').val();

    if( srcval.length >= 3) {
        $('#search-results').html('');
        $('#search-loader').show();
        jQuery("#search_popup").modal('show');

        e.preventDefault();
        setTimeout(function () {
            var data = {
                'search_data': srcval,
                'action': 'site_search_ajax',
                'nonce': scripts_params.ajax_nonce
            };

            $.ajax({
                url: scripts_params.ajaxurl,
                data: data,
                type: 'POST',
                beforeSend: function (xhr) {
                    // button.text('Loading...');
                },
                success: function (data) {
                    $('#search-results').html('');
                    $('#search-loader').hide();
                    $('#search-results').append(data);
                }
            });
        }, 1500);

    }

});
function store_locator_overlay() {
    var window_width = $(window).width();
    if (window_width > 991) {
        var alignment_target = $('#header > .container-fluid > .row').position();
        var map_overlay = $('#wpsl-search-overlay');
        map_overlay.css('margin-left', alignment_target.left + 'px');
    }
}
$(window).on("load resize",function(e){
    store_locator_overlay();
});
store_locator_overlay();

var other_multimedia_slider = $('#other_multimedia_section #single_recent_posts_slider');

if (other_multimedia_slider) {
    other_multimedia_slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400,
        arrows: true,
        infinite: false,
        loop: true,
        navigation: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: true,
                    centerPadding: '134px',
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    arrows: false,
                    slidesToShow: 1
                }
            }
        ]
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var slider_slides = $('#single_recent_posts_slider .slick-track .slick-slide');
        var progressBar = $('.single_recent_posts_slider_progress');
        var progressBarLabel = $('.slider__label');
        var slides_lenght = $(slider_slides).length;
        if ($(window).width() < 767) {
            var calc = ((nextSlide + 1) / (slides_lenght)) * 100;
        } else if ($(window).width() < 992) {
            var calc = ((nextSlide + 2) / (slides_lenght)) * 100;
        } else {
            var calc = ((nextSlide + 3) / (slides_lenght)) * 100;
        }
        progressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc);
        progressBarLabel.text(calc + '%');
    });
}
//----------------TYRE FINDER - VEHICLE SEARCH START ------------------//

// TYRE FINDER - VEHICLE SEARCH - MAKE
function autofill_tyre_finder_vehicle_data__make() {

    var $select_make = $('#tyre_finder__vehicle .finder_select_make');
    var $select_model = $('#tyre_finder__vehicle .finder_select_model');
    var $select_variant = $('#tyre_finder__vehicle .finder_select_variant');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_make',
            'nonce': $('#tyre_finder__vehicle input[name="nonce"]').val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {
            $select_make.children().remove().end();
            $select_model.children().remove().end();
            $select_variant.children().remove().end();

            $select_make.append(new Option("Makes Loading...", ""));
            $select_model.append(new Option("MODEL", "")).prop('disabled', true);
            $select_variant.append(new Option("VARIANT", "")).prop('disabled', true);
        },
        success : function( data ){
            $select_make.children().remove().end();
            $select_make.append(new Option("- MAKE -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_make.append(new Option(capitalize_words(element[0]), element[0]));
                }
            });

        }
    });

}
autofill_tyre_finder_vehicle_data__make();




$('#tyre_finder__vehicle .finder_select_make').on('change', function(){
    if ($(this).val() !== '' || $(this).val() !== null) {
        autofill_tyre_finder_vehicle_data__model();
    }
});



// TYRE FINDER - VEHICLE SEARCH - MODEL
function autofill_tyre_finder_vehicle_data__model() {

    var $select_make = $('#tyre_finder__vehicle .finder_select_make');
    var $select_model = $('#tyre_finder__vehicle .finder_select_model');
    var $select_variant = $('#tyre_finder__vehicle .finder_select_variant');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_model',
            'nonce': $('#tyre_finder__vehicle input[name="nonce"]').val(),
            'make': $select_make.val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {
            $select_model.children().remove().end();
            $select_variant.children().remove().end();

            $select_model.append(new Option("Models Loading...", "")).prop('disabled', false);
            $select_variant.append(new Option("VARIANT", "")).prop('disabled', true);
            jQuery('.finder-selectric').show();
        },
        success : function( data ) {
            $select_model.children().remove().end();
            $select_model.append(new Option("- MODEL -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_model.append(new Option(capitalize_words(element[0]), element[0]));
                }
            });

        }
    });

}



// TYRE FINDER - VEHICLE SEARCH - VARIANT
function autofill_tyre_finder_vehicle_data__variant() {

    var $select_make = $('#tyre_finder__vehicle .finder_select_make');
    var $select_model = $('#tyre_finder__vehicle .finder_select_model');
    var $select_variant = $('#tyre_finder__vehicle .finder_select_variant');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_variant',
            'nonce': $('#tyre_finder__vehicle input[name="nonce"]').val(),
            'make': $select_make.val(),
            'model': $select_model.val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {
            $select_variant.children().remove().end().prop('disabled', false);
            $select_variant.append(new Option("Variants Loading...", ""));
        },
        success : function( data ) {
            $select_variant.children().remove().end();
            $select_variant.append(new Option("- VARIANTS -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_variant.append(new Option(capitalize_words(element[0]), element[0]));
                }
            });
        }
    });

}

$('#tyre_finder__vehicle .finder_select_model').on('change', function(){
    if ($(this).val() !== '' || $(this).val() !== null) {
        autofill_tyre_finder_vehicle_data__variant();
    }
});



// TYRE FINDER - VEHICLE SEARCH - SUBMIT
$('#tyre_finder__vehicle').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
        url : scripts_params.ajaxurl,
        data : data,
        type : 'POST',
        success : function( data ){
            if( data ) {
                window.location.replace(data);
            }
        }
    });
 });

//----------------TYRE FINDER - VEHICLE SEARCH END ------------------//













//----------------TYRE FINDER - TYRE SEARCH START ------------------//

// TYRE FINDER - TYRE SEARCH - WIDTH
function autofill_tyre_finder_vehicle_data__width() {

    var $select_width = $('#tyre_finder__tyre .finder_select_wheel_width');
    var $select_profile = $('#tyre_finder__tyre .finder_select_wheel_profile');
    var $select_diameter = $('#tyre_finder__tyre .finder_select_wheel_diameter');
    // var $select_load_rate = $('#tyre_finder__tyre .finder_select_wheel_load_index');
    // var $select_speed_index = $('#tyre_finder__tyre .finder_select_wheel_speed_index');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_width',
            'nonce': $('#tyre_finder__tyre input[name="nonce"]').val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {

            $select_width.children().remove().end();
            $select_profile.children().remove().end();
            $select_diameter.children().remove().end();
            // $select_load_rate.children().remove().end();
            // $select_speed_index.children().remove().end();

            $select_width.append(new Option("Widths Loading...", ""));
            $select_profile.append(new Option("Profile", "")).prop('disabled', true);
            $select_diameter.append(new Option("Diameter", "")).prop('disabled', true);
            // $select_load_rate.append(new Option("Load Index", "")).prop('disabled', true);
            // $select_speed_index.append(new Option("Speed Index", "")).prop('disabled', true);
        },
        success : function( data ){
            $select_width.children().remove().end();
            $select_width.append(new Option("- WIDTH -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_width.append(new Option(element, element));
                }
            });
        }
    });

}
autofill_tyre_finder_vehicle_data__width();



// TYRE FINDER - TYRE SEARCH - PROFILE
function autofill_tyre_finder_vehicle_data__profile() {

    var $select_width = $('#tyre_finder__tyre .finder_select_wheel_width');
    var $select_profile = $('#tyre_finder__tyre .finder_select_wheel_profile');
    var $select_diameter = $('#tyre_finder__tyre .finder_select_wheel_diameter');
    // var $select_load_rate = $('#tyre_finder__tyre .finder_select_wheel_load_index');
    // var $select_speed_index = $('#tyre_finder__tyre .finder_select_wheel_speed_index');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_profile',
            'nonce': $('#tyre_finder__tyre input[name="nonce"]').val(),
            'width': $select_width.val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {

            $select_profile.children().remove().end();
            $select_diameter.children().remove().end();
            // $select_load_rate.children().remove().end();
            // $select_speed_index.children().remove().end();

            $select_profile.append(new Option("Profiles Loading...", "")).prop('disabled', false);
            $select_diameter.append(new Option("Diameter", "")).prop('disabled', true);
            // $select_load_rate.append(new Option("Load Index", "")).prop('disabled', true);
            // $select_speed_index.append(new Option("Speed Index", "")).prop('disabled', true);
        },
        success : function( data ){
            $select_profile.children().remove().end();
            $select_profile.append(new Option("- PROFILE -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_profile.append(new Option(element, element));
                }
            });
        }
    });

}

$('#tyre_finder__tyre .finder_select_wheel_width').on('change', function(){
    if ($(this).val() !== '' || $(this).val() !== null) {
        autofill_tyre_finder_vehicle_data__profile();
    }
});



// TYRE FINDER - TYRE SEARCH - DIAMETER
function autofill_tyre_finder_vehicle_data__diameter() {

    var $select_width = $('#tyre_finder__tyre .finder_select_wheel_width');
    var $select_profile = $('#tyre_finder__tyre .finder_select_wheel_profile');
    var $select_diameter = $('#tyre_finder__tyre .finder_select_wheel_diameter');
    // var $select_load_rate = $('#tyre_finder__tyre .finder_select_wheel_load_index');
    // var $select_speed_index = $('#tyre_finder__tyre .finder_select_wheel_speed_index');

    $.ajax({
        url : scripts_params.ajaxurl,
        data : {
            'action': 'vehicle_data__get_diameter',
            'nonce': $('#tyre_finder__tyre input[name="nonce"]').val(),
            'width': $select_width.val(),
            'profile': $select_profile.val(),
        },
        dataType: "json",
        type : 'POST',
        beforeSend : function ( xhr ) {

            $select_diameter.children().remove().end();
            // $select_load_rate.children().remove().end();
            // $select_speed_index.children().remove().end();

            $select_diameter.append(new Option("Diameters Loading...", "")).prop('disabled', false);
            // $select_load_rate.append(new Option("Load Index", "")).prop('disabled', true);
            // $select_speed_index.append(new Option("Speed Index", "")).prop('disabled', true);
        },
        success : function( data ){
            $select_diameter.children().remove().end();
            $select_diameter.append(new Option("- DIAMETER -", ''));
            jQuery.each(data, function(index, element){
                if (element != '') {
                    $select_diameter.append(new Option(element, element));
                }
            });
        }
    });

}

$('#tyre_finder__tyre .finder_select_wheel_profile').on('change', function(){
    if ($(this).val() !== '' || $(this).val() !== null) {
        autofill_tyre_finder_vehicle_data__diameter();
    }
});



// TYRE FINDER - TYRE SEARCH - Load Index
// function autofill_tyre_finder_vehicle_data__load_index() {
//
//     var $select_width = $('#tyre_finder__tyre .finder_select_wheel_width');
//     var $select_profile = $('#tyre_finder__tyre .finder_select_wheel_profile');
//     var $select_diameter = $('#tyre_finder__tyre .finder_select_wheel_diameter');
//     var $select_load_rate = $('#tyre_finder__tyre .finder_select_wheel_load_index');
//     var $select_speed_index = $('#tyre_finder__tyre .finder_select_wheel_speed_index');
//
//     $.ajax({
//         url : scripts_params.ajaxurl,
//         data : {
//             'action': 'vehicle_data__get_load_index',
//             'nonce': $('#tyre_finder__tyre input[name="nonce"]').val(),
//             'width': $select_width.val(),
//             'profile': $select_profile.val(),
//             'diameter': $select_diameter.val(),
//         },
//         dataType: "json",
//         type : 'POST',
//         beforeSend : function ( xhr ) {
//
//             $select_load_rate.children().remove().end();
//             $select_speed_index.children().remove().end();
//
//             $select_load_rate.append(new Option("Load Index Loading...", "")).prop('disabled', false);
//             $select_speed_index.append(new Option("Speed Index", "")).prop('disabled', true);
//         },
//         success : function( data ){
//             $select_load_rate.children().remove().end();
//             $select_load_rate.append(new Option("- LOAD INDEX -", ''));
//             jQuery.each(data, function(index, element){
//                 if (element != '') {
//                     $select_load_rate.append(new Option(element, element));
//                 }
//             });
//         }
//     });
//
// }
//
// $('#tyre_finder__tyre .finder_select_wheel_diameter').on('change', function(){
//     if ($(this).val() !== '' || $(this).val() !== null) {
//         autofill_tyre_finder_vehicle_data__load_index();
//     }
// });



// TYRE FINDER - TYRE SEARCH - Speed Index
// function autofill_tyre_finder_vehicle_data__speed_index() {
//
//     var $select_width = $('#tyre_finder__tyre .finder_select_wheel_width');
//     var $select_profile = $('#tyre_finder__tyre .finder_select_wheel_profile');
//     var $select_diameter = $('#tyre_finder__tyre .finder_select_wheel_diameter');
//     var $select_load_rate = $('#tyre_finder__tyre .finder_select_wheel_load_index');
//     var $select_speed_index = $('#tyre_finder__tyre .finder_select_wheel_speed_index');
//
//     $.ajax({
//         url : scripts_params.ajaxurl,
//         data : {
//             'action': 'vehicle_data__get_speed_index',
//             'nonce': $('#tyre_finder__tyre input[name="nonce"]').val(),
//             'width': $select_width.val(),
//             'profile': $select_profile.val(),
//             'diameter': $select_diameter.val(),
//             'load_rate': $select_load_rate.val(),
//         },
//         dataType: "json",
//         type : 'POST',
//         beforeSend : function ( xhr ) {
//             $select_speed_index.children().remove().end();
//             $select_speed_index.append(new Option("Speed Index Loading...", "")).prop('disabled', false);
//         },
//         success : function( data ){
//             $select_speed_index.children().remove().end();
//             $select_speed_index.append(new Option("- LOAD INDEX -", ''));
//             jQuery.each(data, function(index, element){
//                 if (element != '') {
//                     $select_speed_index.append(new Option(element, element));
//                 }
//             });
//         }
//     });
//
// }
//
// $('#tyre_finder__tyre .finder_select_wheel_load_index').on('change', function(){
//     if ($(this).val() !== '' || $(this).val() !== null) {
//         autofill_tyre_finder_vehicle_data__speed_index();
//     }
// });



// TYRE FINDER - TYRE SEARCH
$('#tyre_finder__tyre').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
        url : scripts_params.ajaxurl,
        data : data,
        type : 'POST',
        success : function( data ){
            if( data ) {
                window.location.replace(data);
            }
        }
    });
});

//----------------TYRE FINDER - TYRE SEARCH END ------------------//











//----------------TYRE FINDER - REGISTRATION SEARCH START ------------------//

// TYRE FINDER - REGISTRATION SEARCH
// $('#tyre_finder__registration').on('submit', function(e){
//     e.preventDefault();
//     var data = $(this).serializeArray();
//     $.ajax({
//         url : scripts_params.ajaxurl,
//         data : data,
//         type : 'POST',
//         success : function( data ){
//             if( data ) {
//                 console.log(data); //@TODO: Remove once done
//             }
//         }
//     });
// });

//----------------TYRE FINDER - REGISTRATION SEARCH END ------------------//
$('#evoucher_code_check_form').submit(function(e){

    e.preventDefault();

    var results_container = $('#evoucher_code_check_results');
    var results_inner = $('#evoucher_code_check_results_inner');

    var data = {
        'action': 'enigma_check_evoucher_code',
        'evoucher_code': $('#evoucher_code_check').val(),
        'nonce' : $('#evoucher_code_check_form input[name="nonce"]').val()
    };

    $.ajax({
        url : scripts_params.ajaxurl,
        data : data,
        type : 'POST',
        beforeSend : function ( xhr ) {
            $('#evoucher_code_check_form fieldset').attr('disabled', 'disabled');
            if (results_container.is(':visible')) {
                results_container.hide();
            }
            results_inner.html('');
        },
        success : function( data ){
            if( data ) {
                $('#evoucher_code_check_form fieldset').removeAttr('disabled');
                if (!results_container.is(':visible')) {
                    results_container.show();
                }
                results_inner.html(data);
            }
        }
    });

});
})(jQuery);
/** DOCUMENT READY END **/
