window.onload = function () {
  FE.external_utility.init();
  FE.global.init();
  FE.components.init();
};

var FE = {

  global: {

    toggleElement: function(clickedElement, elementToToggle, showStyle, hideStyle) {
      var clickedElem = document.querySelector(clickedElement);
      var elemToToggle = document.querySelector(elementToToggle);

      elemToToggle.classList.add(hideStyle);
      clickedElem.addEventListener('click', function(event) {
        if(elemToToggle.classList.contains(hideStyle)) {
            elemToToggle.classList.remove(hideStyle);
            elemToToggle.classList.add(showStyle);
        } else {
            elemToToggle.classList.remove(showStyle);
            elemToToggle.classList.add(hideStyle);
        }
      });
    },

    toggleChildElement: function(clickedElement, elementToToggle, showStyle, hideStyle) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToToggle;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          event.preventDefault();
          elemToToggle = this.querySelector(elementToToggle);
          if(elemToToggle.classList.contains(hideStyle)) {
            elemToToggle.classList.remove(hideStyle);
            elemToToggle.classList.add(showStyle);
          } else {
            elemToToggle.classList.remove(showStyle);
            elemToToggle.classList.add(hideStyle);
          }
        });
      });
    },

    showElement: function(clickedElement, elementToShow, showStyle, hideStyle) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToShow;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          event.preventDefault();
          if(this.querySelector(elementToShow)) {
            elemToShow = this.querySelector(elementToShow);
            elemToShow.classList.remove(hideStyle);
            elemToShow.classList.add(showStyle);
          } else {
            elemToShow = document.querySelector(elementToShow);
            elemToShow.classList.remove(hideStyle);
            elemToShow.classList.add(showStyle);
          }
        });
      });
    },

    addActiveClass: function(clickedElement) {
      var elemList = document.querySelectorAll(clickedElement);
      var listParent = document.querySelector(clickedElement).parentNode;

      for(var i = 0; i < elemList.length; i += 1) {
        elemList[i].addEventListener('click', function(event) {
          var activeElem = listParent.querySelector('.is-active');
          activeElem.classList.remove('is-active');
          this.classList.add('is-active');
        });
      }
    },

    closestByClass: function(el, clazz) {
      while (el.className != clazz) {
          el = el.parentNode;
          if (!el) {
            console.log('ju1');
              return null;
          }
      }

      return el;
    },

    init: function () {

      FE.global.addActiveClass('.header__nav-item');
      FE.global.toggleElement('.header__right .header__mobile-nav-button', '.mobile-nav', 'fade-in', 'fade-out');
      FE.global.toggleElement('.mobile-nav__header .mobile-nav__close', '.mobile-nav', 'fade-in', 'fade-out');
      FE.global.toggleChildElement('.mobile-nav__nav-item-title', '.mobile-nav__drop-sub', 'slide-down', 'slide-up');
    }

  },

  components: {

    mobileNav: function() {

      var navItem = document.querySelectorAll('.mobile-nav__nav-item-title');

      navItem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          if(this.classList.contains('is-active')) {
              this.classList.remove('is-active');
          } else {
              this.classList.add('is-active');
          }
        });
      });

      var mobileNav = document.querySelector('.mobile-nav');
      var navOpen = document.querySelector('.header__mobile-nav-button-inner');
      var navClose = document.querySelector('.mobile-nav__close');
      var body = document.querySelector('body');

      navOpen.addEventListener('click', function(event) {
        if(body.classList.contains('overlay-active')) {
          body.classList.remove('overlay-active');
        } else {
            body.classList.add('overlay-active');
        }
      });
      navClose.addEventListener('click', function(event) {
        body.classList.remove('overlay-active');
      });
    },

    tabSelect: function() {
      var tabNavItems = document.querySelectorAll('.tab-select__header-nav-list-item');
      var tabSelectTabs = document.querySelectorAll('.tab-select__tab');
      var tabSpans = document.querySelectorAll('.tab-select__header-nav-list-item span');

      for(var i = 0; i < tabNavItems.length; i += 1) {
        tabNavItems[i].setAttribute('data-index', i);
        tabNavItems[i].addEventListener('click', function(event) {
          event.preventDefault();

          for(var k = 0; k < tabSpans.length; k += 1) {
            tabSpans[k].classList.remove('is-active');
          }

          this.querySelector('span').classList.add('is-active');

          for(var j = 0; j < tabSelectTabs.length; j += 1) {
            tabSelectTabs[j].classList.remove('is-active');
          }

          var currentItemIndex = this.getAttribute('data-index');
          if(tabSelectTabs[(tabSelectTabs.length - 1) - currentItemIndex].classList.contains('is-active')) {
            tabSelectTabs[(tabSelectTabs.length - 1) - currentItemIndex].classList.remove('is-active');
          } else {
            tabSelectTabs[(tabSelectTabs.length - 1) - currentItemIndex].classList.add('is-active');
          }

        });
      }
    },

    collectionsGrid: function() {
      var gridBody = document.querySelectorAll('.collections-grid__body');
      var moreButton = document.querySelector('.collections-grid__more');
      var displayNum = document.querySelector('.collections-grid__display-num');
      var gridHeader = document.querySelectorAll('.collections-grid__header');
      var gridFooter =  document.querySelectorAll('.collections-grid__footer');

      for(var i = 0; i < gridBody.length; i += 1) {
        var gridCol = gridBody[i].querySelectorAll('.collections-grid__column');
        for(var a = 3; a < gridCol.length; a += 1) {
          gridCol[a].classList.add('slide-up');
        }

        var totalNum = gridHeader[i].querySelector('.collections-grid__total-num');
        totalNum.textContent = gridCol.length + ' ';
        var gridCta = gridFooter[i].querySelectorAll('.collections-grid__more');
        for(var e = 0; e < gridCta.length; e += 1) {
          gridCta[e].addEventListener('click', function(event) {
            event.preventDefault();

            var innerWrap = FE.global.closestByClass(event.target, 'collections-grid__inner');
            var colElements = innerWrap.querySelectorAll('.collections-grid__column');
            var displayNumElem = innerWrap.querySelector('.collections-grid__display-num');
            var colElementsVisible = innerWrap.querySelectorAll('.collections-grid__column:not(.slide-down)');
            var offTop = innerWrap.offsetTop;

            if(this.classList.contains('open')) {
              this.classList.remove('open');
              this.classList.add('close');
              window.scrollTo(0, offTop);
            } else {
              this.classList.remove('close');
              this.classList.add('open');
            }

            displayNumElem.textContent = colElementsVisible.length + ' ';
            for(var j = 0; j < colElements.length; j += 1) {
              if(colElements[j].classList.contains('slide-up')) {
                colElements[j].classList.remove('slide-up');
                colElements[j].classList.add('slide-down');
                this.innerHTML = 'Discover less';
              } else if(colElements[j].classList.contains('slide-down')) {
                  colElements[j].classList.remove('slide-down');
                  colElements[j].classList.add('slide-up');
                  this.innerHTML = 'Discover more';
              }
            }
          });
        }
      }
    },

    init: function () {

      FE.components.mobileNav();
      FE.components.tabSelect();
      FE.components.collectionsGrid();
    }

  },

  external_utility: {

    handleInview: function() {
      var arrElements = [{
          element: '.hero__cta'
        },
        {
          element: '.hero__image-container'
        },
        {
          element: '.intro .info-content'
        },
        {
          element: '.manifesto .info-content'
        },
        {
          element: '.collections__exotic .info-content'
        },
        {
          element: '.collections__classic .info-content'
        },
        {
          element: '.collections__natural .info-content'
        },
        {
          element: '.collections__exotic .collections__image'
        },
        {
          element: '.collections__natural .collections__image'
        },
        {
          element: '.collections__body'
        },
        {
          element: '.overview .info-content'
        },
        {
          element: '.surfaces__section'
        },
        {
          element: '.locate__box'
        },
        {
          element: '.locate__box-login'
        },
        {
          element: '.tab-select__body'
        },
        {
          element: '.collections-grid__column'
        },
        {
          element: '.collections-grid__more'
        },
        {
          element: '.overview__info-column'
        },
        {
          element: '.tab-select__footer-inner'
        }
      ];

      for (var i = 0; i < arrElements.length; i++) {
        if (document.querySelectorAll(arrElements[i].element).length > 0) {
          inView(arrElements[i].element)
            .on('enter', section => {
              section.classList.add('is-inview');
            });
        }
      }
      arrElements.splice(0, arrElements.length);
    },

    headRoom: function() {
      var myElement = document.querySelector("header");
      var headroom  = new Headroom(myElement, {
        offset: 0
      });
      headroom.init();
    },

    init: function () {
      FE.external_utility.headRoom();
      FE.external_utility.handleInview();
    }
  },
};
