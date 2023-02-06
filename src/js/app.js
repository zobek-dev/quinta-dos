import Alpine from 'alpinejs';
import Swiper,{Navigation, Pagination, Controller} from 'swiper';
import fslightbox from 'fslightbox';

window.Alpine = Alpine;
Alpine.start();


window.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('.fslightbox')){
    fslightbox.initialize({
      selector: '.fslightbox'
    })
  }
})

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }   
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

546
// Carousels

class MarcasCarousel extends HTMLElement{
  constructor(){
    super();
    this.carousel = this.querySelector('.marcas-carousel');
    this.pagination = this.querySelector('.swiper-pagination');

    this.swiper = new Swiper(this.carousel, {
      modules: [Pagination],
      slidesPerView: 2,
      spaceBetween: 16,
      breakpoints: {
        550: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 6
        }
      },
      pagination:{
        el: this.pagination,
        clickeable: true
      }
    })
  }
}

customElements.define('marcas-carousel', MarcasCarousel);

class ProductCarousel extends HTMLElement{
  constructor(){
    super();
    this.thumbnail = this.querySelector('.product-thumbnail');
    this.gallery = this.querySelector('.product-gallery');
    this.count = Number(this.gallery.dataset.count);

    this.thumb = new Swiper(this.thumbnail, {
      modules: [Controller],
      spaceBetween: 16,
      slidesPerView: 3,
      loop: true,
      breakpoints: {
        600:{
          slidesPerView: 5
        }
      },
      centeredSlides: true,
      loopedSlides: this.count,
      slideToClickedSlide: true
    })

    this.gall = new Swiper(this.gallery, {
      modules:[Controller],
      slidesPerView: 1,
      loop: true,
      autoHeight: true,
      centeredSlides: true,
      loopedSlides: this.count
    })


    this.gall.controller.control = this.thumb;
    this.thumb.controller.control = this.gall;
  }
}

customElements.define('product-carousel', ProductCarousel);

//Iconos

class IconsCarousel extends HTMLElement {
  constructor(){
    super();

    this.carousel = this.querySelector('.carousel-icons');
    this.pagination = this.querySelector('.swiper-pagination');

    this.swiper = new Swiper(this.carousel, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        550: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 4
        }
      },
      pagination: {
        el: this.pagination,
        clickable: true
      }
    })
  }
}

customElements.define('carousel-icons', IconsCarousel);

//Carousel Desarme

class DesarmeCarousel extends HTMLElement{
  constructor(){
    super();
    this.carousel = this.querySelector('.carousel-desarme');
    this.next = this.querySelector('.swiper-button-next');
    this.prev = this.querySelector('.swiper-button-prev');

    this.swiper = new Swiper(this.carousel, {
      modules: [Navigation],
      slidesPerView: 1.5,
      spaceBetween: 16,
      breakpoints: {
        550: {
          slidesPerView: 2.5
        },
        1024: {
          slidesPerView: 3.5
        }
      },
      navigation:{
        nextEl: this.next,
        prevEl: this.prev
      }
    })

  }
}

customElements.define('carousel-desarme', DesarmeCarousel);

