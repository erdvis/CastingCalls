(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  // Remove or comment out the old overlayMenu function and mobile menu click handler

  
  // Portfolio Slider
  var swiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = new Array();

      $.each(words, function (key, value) {
        newstr = '<span class="word">';

        for (var i = 0, l = value.length; i < l; i++) {
          newstr += "<span class='letter' style='transition-delay:" + (delay + stagger * count) + "ms;'>" + value[i] + "</span>";
          count++;
        }
        newstr += '</span>';

        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:" + delay + "ms;'>&nbsp;</span>");
    });
  }

  // init Isotope
  var initIsotope = function () {

    $('.grid').each(function () {

      // $('.grid').imagesLoaded( function() {
      // images have loaded
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        // layoutMode: 'fitRows',
        filter: filterValue
      });

      // bind filter button click
      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // change is-checked class on buttons
      $('.button-group').each(function (i, buttonGroup) {
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
      // });

    });
  }

  window.addEventListener("load", (event) => {
    //isotope
    $('.isotope-container').isotope({
      // options
      itemSelector: '.item',
      layoutMode: 'masonry'
    });



    // Initialize Isotope
    var $container = $('.isotope-container').isotope({
      // options
      itemSelector: '.item',
      layoutMode: 'masonry'
    });

    // After Isotope layout, refresh AOS
    setTimeout(function() {
      if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }
    }, 500);

    $(document).ready(function () {
      //active button
      $('.filter-button').click(function () {
        $('.filter-button').removeClass('active');
        $(this).addClass('active');
      });
    });

    // Filter items on button click
    $('.filter-button').click(function () {
      var filterValue = $(this).attr('data-filter');
      if (filterValue === '*') {
        // Show all items
        $container.isotope({ filter: '*' });
      } else {
        // Show filtered items
        $container.isotope({ filter: filterValue });
      }
    });

  });
  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  $(document).ready(function () {

    // Video popup handler
    $('.video-link').click(function(e) {
      e.preventDefault();
      var videoUrl = $(this).attr('href');
      
      // Create modal
      var modalHtml = `
        <div class="modal fade video-modal" id="videoModal">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body p-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                <div class="ratio ratio-16x9">
                  <iframe src="${videoUrl}" 
                          title="YouTube video player" 
                          frameborder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    
      // Remove existing modal if any
      $('.video-modal').remove();
      
      // Add modal to body
      $('body').append(modalHtml);
      
      // Show modal
      var videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
      videoModal.show();
      
      // Clean up when modal is hidden
      $('#videoModal').on('hidden.bs.modal', function () {
        $(this).remove();
      });
    });

    initTextFx();
    initChocolat();

    AOS.init({
      duration: 1200,
      // once: true,
    })

  });

  // Language switcher functionality
  document.addEventListener('DOMContentLoaded', function() {
    const langLinks = document.querySelectorAll('.language-switcher .nav-link');
    
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            langLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            // Here you can add logic to switch language
            // switchLanguage(lang);
        });
    });
  });

  // Mobile menu functionality
  document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#one-page-menu .nav-link');
    const header = document.querySelector('header');
    const body = document.body;
    const menuBtn = document.querySelector('.menu-btn');
    
    // Toggle menu function
    function toggleMenu(e) {
        if (e) e.preventDefault();
        
        if (!body.classList.contains('nav-active')) {
            // Opening menu
            header.style.transform = 'translate3d(0, 0, 0)';
            body.classList.add('nav-active');
            menuBtn.classList.add('active');
        } else {
            // Closing menu
            header.style.transform = 'translate3d(-100%, 0, 0)';
            body.classList.remove('nav-active');
            menuBtn.classList.remove('active');
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (window.innerWidth < 992) {
            header.style.transform = 'translate3d(-100%, 0, 0)';
            body.classList.remove('nav-active');
            menuBtn.classList.remove('active');
        }
    }
    
    // Remove old event listener and add new one
    menuBtn.removeEventListener('click', toggleMenu);
    menuBtn.addEventListener('click', toggleMenu);
    
    // Update menu links click handling
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                closeMobileMenu();
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                            if (window.AOS && typeof window.AOS.refresh === 'function') {
                                setTimeout(() => { window.AOS.refresh(); }, 400);
                            }
                        }, 300);
                    }
                }
            }
        });
    });
  });

  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })


})(jQuery);