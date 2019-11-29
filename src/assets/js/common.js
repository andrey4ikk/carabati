jQuery(function ($) {

	$( document ).tooltip({
      items: ".tooltip",
      position: { 
      	my: "bottom-30", 
      	at: "center", 
      	using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      },
      content: function() {
        var element = $( this );
          var text = element.find('.tooltip__content').html();
          return text;
      }
		});
		
		$('.photo-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			// fade: true,
			infinite: true, 
			// autoplay: true,
			autoplaySpeed: 5000,
			cssEase: 'linear',
			prevArrow: '<i class="slick-prev"></i>',
			nextArrow: '<i class="slick-next"></i>',
		});
		
    //TODO check product list
    $('.gallery-list .product-list').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 1500,
      prevArrow: '<i class="slick-back-product"></i>',
	  nextArrow: '<i class="slick-next-product"></i>',
	  responsive: [
		{
		  breakpoint: 1150,
		  settings: {
			arrows: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
		  }
		},
		{
			breakpoint: 900,
			settings: {
			  arrows: true,
			  slidesToShow: 2,
			  slidesToScroll: 2,
			  infinite: true,
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  arrows: true,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  infinite: true,
			}
		  },
	  ]
	});
	
    $('.room-slider').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  adaptiveHeight: true,
		variableWidth: true,
		infinite: true, 
		prevArrow: $('.slick-arrows').find('.slick-next-slider'),
		nextArrow: $('.slick-arrows').find('.slick-back-slider'),
		swipe: true,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				dots: true,
			}
		},
		]
	});
	
		$(function() {
			$('.faq-block__title').matchHeight();
		});

		if ( $(window).width() >= 768 ) {
			$(function() {
				function sameHeight(columnHeight) {
					var blockHeight = 0;
			
					columnHeight.each(function() {
						thisHight = $(this).height();
						if (thisHight > blockHeight) {
							blockHeight = thisHight;
						}
					});
			
					columnHeight.height(blockHeight);
				}
				sameHeight($('.devraag-slider__title'));
			});
		}


		// slider blocks troef
			
		$('.slider-troef__blocks').slick({
			slidesToShow: 4,
			slidesToScroll: 2,
			// mobileFirst: true,
			arrows: false,
			// dots: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						arrows: false,
						slidesToShow: 2,
						slidesToScroll: 2,
						dots: true,
						}
				},
				{
					breakpoint: 576,
					settings: {
						arrows: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
					}
					}
			]
		});

		// find link and hover or not
		
		$(window).resize(function() {
			if ( $(window).width() > 767 ) {
				$('.slider-troef__item:not(:has(.slider-troef__link))').addClass('no-hover');
			}
		})

		if ( $(window).width() > 767 ) {
			$('.slider-troef__item:not(:has(.slider-troef__link))').addClass('no-hover');
		}


		// trends

		$('.trends__slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
				}
			]
		});
	
		$('.gestelde-vragen__slider').slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			arrows: false,
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
				}
			]
		});

		if( $('.devraag-slider__item').last().children().length == 0) {
			$('.devraag-slider__item').last().css('display','none');
		}

		// tabs slider

		$('.aanbod-carousel__images').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			speed: 800,
			centerMode: true,
			variableWidth: true,
			draggable: false,
			swipe: false,
			asNavFor: '.aanbod-inf__blocks',
			prevArrow: $('.aanbod__arrow-left'),
			nextArrow: $('.aanbod__arrow-right')
		});

		$('.aanbod-inf__blocks').slick({
			fade: true,
			swipe: false,
			adaptiveHeight: true,
			asNavFor: '.aanbod-carousel__images'
		});

		// tabs slider click tabs

		$('.aanbod-tabs .aanbod-tabs__item').click(function(e) {
			e.preventDefault();
			slideIndex = $(this).index();
			$( '.aanbod-carousel__images' ).slickGoTo( parseInt(slideIndex) );
		});

		$('.aanbod-tabs .aanbod-tabs__item').click(function(e) {
			e.preventDefault();
			slideIndex = $(this).index();
			$( '.aanbod-inf__blocks' ).slickGoTo( parseInt(slideIndex) );
		});

		// click tab

		$('.aanbod-tabs__item').click(function() {
			$('.aanbod-tabs__item').removeClass('current-tab');
			$(this).addClass('current-tab');
		})

		// tabs slider click arrows

		var indexTab = $('.aanbod-images__img.slick-current').attr('data-slick-index');
		$('.aanbod-tabs__item').eq(indexTab).addClass('current-tab');

		$('.aanbod__arrow-left').click(function() {
			var indexTab = $('.aanbod-images__img.slick-current').attr('data-slick-index');
			$('.aanbod-tabs__item.current-tab').removeClass('current-tab');
			$('.aanbod-tabs__item').eq(indexTab).addClass('current-tab');
		})
		$('.aanbod__arrow-right').click(function() {
			var indexTab = $('.aanbod-images__img.slick-current').attr('data-slick-index');
			$('.aanbod-tabs__item.current-tab').removeClass('current-tab');
			$('.aanbod-tabs__item').eq(indexTab).addClass('current-tab');
		})


		new WOW({
			offset: 100
		}).init();

		$("#selectBackground ul li a").click(function(e) {
			e.preventDefault();
		$("#selectBackground ul li a").removeClass('active');
			$(this).addClass('active');
		})

		$(window).on('load resize', function() {
			if ($(window).width() < 576) {
			  $('.subcategory .product-list:not(.slick-initialized)').slick({
				dots: true,
				infinite: true,
				arrows: false,
				slidesToShow: 1,
			  });
			} else {
			  $(".subcategory .product-list.slick-initialized").slick("unslick");
			}
		  });


		// menu

		$(window).resize(function() {
			if ( $(window).width() <= 767 ) {
				$('.header__top-menu #menu-top-navigation').appendTo('.header__menu');
				$('.header__menu li.contact-menu-item').appendTo('.header__menu');
				$('.header__menu-btn.open').css('display', 'flex');
				$('.header__menu').css('visibility', 'hidden');
	
				$('.header__menu-btn.open').click(function() {
					$(this).hide();
					$('.header__menu-btn.close').show();
					$('.header__menu').css('background', '#2b2b2b');
					$('.header__menu').css('visibility', 'visible');
				})
				
				$('.header__menu-btn.close').click(function() {
					$(this).hide();
					$('.header__menu-btn.open').show();
					$('.header__menu').css('visibility', 'hidden');
					$('.header__menu').css('background', 'transparent');
					$('.header__menu a').css('transition', 'none');
				})
			} else {
				$('.header__menu #menu-top-navigation').appendTo('.header__top-menu');
				$('.header__menu li.contact-menu-item').appendTo('.header__menu #menu-main-navigation');
				$('.header__menu').css({visibility:'visible', background:'transparent'});
				$('.header__menu-btn.open').css('display', 'none');
				$('.header__menu-btn.close').css('display', 'none');
				$('.header__top-menu ul').show();
				$('.header__menu ul').show();
			}
		})

		if ( $(window).width() <= 767 ) {
			$('.header__top-menu #menu-top-navigation').appendTo('.header__menu');
			$('.header__menu li.contact-menu-item').appendTo('.header__menu');

			$('.header__menu-btn.open').click(function() {
				$(this).hide();
				$('.header__menu-btn.close').show();
				$('.header__menu').css('background', '#2b2b2b');
				$('.header__menu').css('visibility', 'visible');
			})
			
			$('.header__menu-btn.close').click(function() {
				$(this).hide();
				$('.header__menu-btn.open').show();
				$('.header__menu').css('visibility', 'hidden');
				$('.header__menu').css('background', 'transparent');
				$('.header__menu a').css('transition', 'none');
			})
		}
		
		var contactText = $('.header__menu .contact-menu-item a').text();
		$('.header__menu .contact-menu-item a').empty();
		$('.header__menu .contact-menu-item a').append('<span>');
		$('.header__menu .contact-menu-item a span').text(contactText);
		
		
		//sticky calculator sidebar
		if ($('.calc-sidebar').length) {
			var sidebar = new StickySidebar('.sidebar', {
		        containerSelector: '.sticky-wrapper',
		        innerWrapperSelector: '.calc-sidebar-wrapper',
		        bottomSpacing: 60,
		        resizeSensor : true
		    });
		}

		//scoll to the site section
		var navLink = $('.js-scroll-to');
		navLink.click(function(){
			var section = $(this).data('section');
			$('html, body').animate({
				scrollTop: $("#" + section).offset().top
			}, 1500);
			return false;
		});

		$('.slider-troef__title').matchHeight({byRow: false});
		$('.slider-troef__description').matchHeight({byRow: false});
		$('.slider-troef__link-wrapper').matchHeight({byRow: false});

		$(document).on("wheel", "input[type=number]", function (e) {
		    $(this).blur();
		});

	// $(window).resize(function() {
	// 	if ($(window).width() <= 575 ) {
	// 		$(".container-menu__title").click(function(){
	// 		var target = $(this).parent().children(".container-menu__menu-footer");
	// 		$(target).slideToggle();
	// 		});

	// 		$(".container-menu__title").click(function() {
	// 			$("container-menu__menu-footer,.footer-tabs__wrapper").css('display','block');
	// 		})
	
	// 		$(".container-menu__title,.footer-tabs__wrapper").click(function () {
	// 			$(this).addClass("down");
	// 		})
	// 		}
	// 	else {
	// 		$(".container-menu__menu-footer").css("display","block");
	// 	}
	// })

(function( $ ) {
  var win = $(this);
  $(window).on('resize', function() {
	$('.container-menu__navigation').children(".container-menu__menu-footer").css("display", "");
	$('.nav').children(".nav__menu-list").css("display", "");
	$(".footer-menu__navigation").children(".socials").css("display", "");
	$(".footer-tabs").children(".footer-tabs__wrapper").css("display", "");
  });
    
  
  $('.container-menu__navigation').on("click", ".container-menu__title",  function() {
    if (win.width() < 576) {
      $(this).toggleClass("down").next().slideToggle();       
    }
  });
  $('.nav').on("click", ".nav__title", function() {
    if (win.width() < 576) {
      $(this).toggleClass("down").next().slideToggle();       
    }
  });
  $('.footer-menu__navigation').on("click", ".footer-menu__navigation-title", function() {
    if (win.width() < 576) {
      $(this).toggleClass("down").next().slideToggle();       
    }
  });
  $('.footer-tabs').on("click", ".footer-tabs__tabs-title", function() {
    if (win.width() < 576) {
      $(this).toggleClass("down").next().slideToggle();       
    }
  });

	$(window).load(function(){
		function set_roomslider_height(){
				var slider_height =  $('.room-slider .slick-list').height();
				$('.room-slider').height(slider_height);
				console.log(slider_height);
		}
		if ($('.room-slider').length){

			$('.room-slider').on('init', function(){
				set_roomslider_height();
			});	

			$(window).on('resize', function(){
				set_roomslider_height();
			});
		}
		
	    $('.room-slider').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  adaptiveHeight: true,
			variableWidth: true,
			infinite: true, 
			prevArrow: $('.slick-arrows').find('.slick-next-slider'),
			nextArrow: $('.slick-arrows').find('.slick-back-slider'),
			swipe: true,
			responsive: [
			{
				breakpoint: 767,
				settings: {
					dots: true,
				}
			},
			]
		});
	});
	})(jQuery);

})



