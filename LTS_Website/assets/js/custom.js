(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.trending-box');
	const filtersElem = document.querySelector('.trending-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.trending-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Remove jQuery burger logic to avoid conflict with header.htm script
	// Menu Dropdown Toggle
	// if($('.menu-trigger').length){
	// 	$(".menu-trigger").on('click', function() {	
	// 		$(this).toggleClass('active');
	// 		$('.header-area .nav').slideToggle(200);
	// 	});
	// }


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
	
	
	function includeHTML(callback) {
  		const elements = document.querySelectorAll('[include-html]');
  		let remaining = elements.length;

		  if (remaining === 0 && callback) return callback();

 		 elements.forEach((el) => {
 			   const file = el.getAttribute('include-html');
   		 if (!file) return;

 		   fetch(file)
   		   .then(response => {
   		     if (!response.ok) throw new Error(`Could not load ${file}`);
   		     return response.text();
  		    })
   		   .then(content => {
   		     el.innerHTML = content;
  		      el.removeAttribute('include-html');
  		    })
  		    .catch(err => {
   		     console.error(err);
   		     el.innerHTML = "<div style='color: red;'>Include failed: " + file + "</div>";
   		   })
   		   .finally(() => {
    		    remaining--;
   		     if (remaining === 0 && callback) callback();
   		   });
	});

	}

	// Creator Hub Modal functionality
	function setupCreatorHubModal() {
	  // Updated IDs to match header.htm
	  var btn = document.getElementById('creatorHubBtn');
	  var modal = document.getElementById('creatorHubModal');
	  var close = document.getElementById('creatorHubClose');
	  if (btn && modal && close) {
	    btn.addEventListener('click', function(e) {
	      e.preventDefault();
	      modal.style.display = 'block';
	    });
	    close.addEventListener('click', function() {
	      modal.style.display = 'none';
	    });
	    window.addEventListener('click', function(event) {
	      if (event.target === modal) {
	        modal.style.display = 'none';
	      }
	    });
	  }
	}

	// Ensure modal setup runs after header is loaded
	$(document).ready(function() {
	  function runStickyAndNav() {
	    var header = document.querySelector('.header-area');
	    if (header) {
	      header.classList.remove('header-sticky');
	      // Highlight active nav link
	      var path = window.location.pathname.split("/").pop();
	      if (path === "" || path === "index.html") path = "index.html";
	      var navLinks = header.querySelectorAll(".nav a");
	      function setActiveNav() {
	        navLinks.forEach(function(link) {
	          if (link.getAttribute("href") === path) {
	            link.classList.add("active");
	          } else {
	            link.classList.remove("active");
	          }
	        });
	      }
	      setActiveNav();
	      window.addEventListener("scroll", function () {
	        header.classList.toggle("header-sticky", window.scrollY > 0);
	        setActiveNav(); // Re-apply active class on scroll
	      });
	      // Setup Creator Hub Modal
	      setupCreatorHubModal();
	    }
	  }

	  if (typeof includeHTML === 'function') {
	    includeHTML(runStickyAndNav);
	  } else {
	    runStickyAndNav();
	  }
	});

})(window.jQuery);