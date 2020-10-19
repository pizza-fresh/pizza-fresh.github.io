"use strict";

$(document).ready(function () {
  svg4everybody({});
  /* Прелоадер */

  window.onload = function () {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  };
  /* Скролл до верха */


  var scrollTop = function scrollTop() {
    $('.scroll-top').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('.scroll-top').addClass('active');
      } else {
        $('.scroll-top').removeClass('active');
      }
    });
  };
  /* Открытие поиска при клике, очистка поиска и закрытия поиска по боди и крестику */


  var headerSearch = function headerSearch() {
    $(document).on('click', '.search__btn', function () {
      $(this).parent().toggleClass('search--active');
    });
    $(document).on('click', '.search__input', function () {
      $(this).parent().addClass('search__form--active');
    });
    $(document).on('click', '.search__clear-icon', function () {
      $('.search__input').val('');
    });
    $(document).on('click', '.search__close ', function () {
      $(this).closest('.search').removeClass('search--active');
    });
    $("body").click(function (e) {
      if ($(e.target).closest(".search--active").length === 0 && $('.search--active').length) {
        $(".search").removeClass('search--active');
        $(".search__form").removeClass('search__form--active');
        $('.search__input').val('');
      }
    });
  };
  /* Селект (выпадашка) */


  var customSelect = function customSelect() {
    $(document).on('click', '.select__header', function () {
      var sel = $(this).parent();

      if (sel.hasClass('select--active')) {
        sel.removeClass('select--active');
      } else {
        $('.select').removeClass('select--active');
        sel.addClass('select--active');
      }
    });
    $(document).on('click', '.select__item', function () {
      var val = $(this).find('.select__value').text(),
          sel = $(this).closest('.select');
      sel.removeClass('select--active');
      sel.find('.select__current').text(val);
    });
    $("body").click(function (e) {
      if ($(e.target).closest(".select--active").length === 0 && $('.select--active').length) {
        $(".select").removeClass('select--active');
      }
    });
  };
  /* Слайдер */


  var sliderRow = function sliderRow() {
    $('.slider__inner').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      prevArrow: '.slider__nav--prev',
      nextArrow: '.slider__nav--next',
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });
  };
  /* Удаление товара из корзины */


  var productRemove = function productRemove() {
    $(document).on('click', '.remove', function () {
      if ($(this).closest('.upload__left, .upload-doc__inner').find('.upload__item, .upload-doc__item').length === 1) {
        $(this).closest('.upload__left, .upload-doc__inner').remove();
      }

      $(this).closest('.upload__item, .upload-doc__item').remove();
    });
  };
  /* Прикрепление файла PDF */


  var fileUpload = function fileUpload() {
    $(".file-upload input[type=file]").change(function () {
      var filename = $(this).val().replace(/.*\\/, "");
      $(this).closest('.file-upload').find('.file-upload__text').html(filename);
    });
  };
  /* Галерея + Слайдер */


  $('.gallery__right a').click(function (e) {
    if ($('.gallery__left img').attr('src') !== $(this).attr('href')) {
      $('.gallery__left img').hide().attr('src', $(this).attr('href')).fadeIn(1000);
    }

    e.preventDefault();
  });
  $('.gallery__right a img').click(function () {
    $('.gallery__right a img').fadeTo(500, 1).css({
      'border': 'none'
    });
    $(this).fadeTo(500, 0.6).css({
      'border': '2px solid #0B6AA1'
    });
  });

  var gallerySlider = function gallerySlider() {
    $('.gallery__inner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      focusOnSelect: true,
      infinite: false,
      rows: 3,
      slidesPerRow: 2,
      prevArrow: '.gallery__nav--prev',
      nextArrow: '.gallery__nav--next',
      responsive: [{
        breakpoint: 768,
        settings: {
          vertical: false,
          rows: 4,
          slidesPerRow: 1,
          arrows: false
        }
      }, {
        breakpoint: 526,
        settings: {
          vertical: false,
          rows: 3,
          slidesPerRow: 1,
          arrows: false
        }
      }, {
        breakpoint: 376,
        settings: {
          vertical: false,
          rows: 2,
          slidesPerRow: 1,
          arrows: false
        }
      }]
    });
  };
  /* Popup окно */


  var popupLink = function popupLink() {
    $('.popup-link').magnificPopup({
      showCloseBtn: false,
      type: 'inline',
      midClick: true,
      mainClass: 'mfp-fade',
      removalDelay: 350
    });
    $(document).on('click', '.remove', function () {
      $.magnificPopup.close();
    });
  };
  /* Яндекс-карта */


  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [55.794887, 37.712812],
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      balloonContent: 'Название компании, <br> Адрес: адрес, <br> Телефон: +7 (981) 123-45-67, <br> График работы: с 9:00 до 18:00'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'static/images/general/marker.png',
      iconImageSize: [37, 50],
      iconImageOffset: [-50, -38]
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  });
  /* Валидация */

  var formValidate = function formValidate() {
    jQuery.validator.addMethod("minlenghtphone", function (value) {
      return value.replace(/\D+/g, '').length > 10;
    });
    $('form').each(function () {
      $(this).on('submit', function () {
        $(this).validate({
          rules: {
            name: 'required',
            phone: {
              required: true,
              minlenghtphone: true
            },
            username: 'required',
            password: 'required',
            confirm_password: 'required',
            email: 'required',
            organization: 'required',
            message: 'required',
            agree: 'required'
          },
          onkeyup: false,
          messages: {
            name: 'Введите ваше имя',
            phone: 'Введите ваш телефон',
            username: 'Введите имя пользователя',
            organization: 'Введите название организации',
            password: 'Введите пароль',
            confirm_password: 'Подтверждение пароля',
            email: 'Введите адрес электронной почты',
            message: 'Заполните текст сообщения',
            agree: 'Согласитесь с нашими условиями'
          }
        });

        if ($(this).valid()) {
          var wrap = $(this)[0].closest('.popup-sending');

          if (wrap) {
            $(wrap).siblings('.popup-success').show();
            $(wrap).hide();
          }
        }

        return false;
      });
    });
  };
  /* Показать пароль по иконке */


  var toggleShowPassword = function toggleShowPassword() {
    $(document).on('click', '.form__password', function () {
      var inp = $(this).siblings('input');

      if (inp.attr('type') === 'text') {
        inp.attr('type', 'password');
        $(this).addClass('view');
      } else {
        inp.attr('type', 'text');
        $(this).removeClass('view');
      }

      return false;
    });
  };
  /* Фильтр */


  var filterToggle = function filterToggle() {
    $(document).on('click', '.filter__toggle', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp();
      } else {
        $(this).addClass('active');
        $(this).next().slideDown();
      }
    });
  };
  /* Всплывающая шапка при скролле вверх */


  var headerFixed = function headerFixed() {
    var tempScrollTop,
        currentScrollTop = $(window).scrollTop();
    $(window).scroll(function () {
      currentScrollTop = $(window).scrollTop();

      if (currentScrollTop > $('.header-fixed').height()) {
        $('body').addClass('fixed');

        if (tempScrollTop > currentScrollTop) {
          $('.header-fixed').addClass('show');
        } else {
          $('.header-fixed').removeClass('show');
        }
      } else {
        $('body').removeClass('fixed');
        $('.header-fixed').removeClass('show');
      }

      tempScrollTop = currentScrollTop;
    });
  };
  /* Скролл к секции */


  $("[data-scroll]").on("click", function () {
    var blockId = $(this).data('scroll'),
        blockOffset = $(blockId).offset().top;
    $("html, body").animate({
      scrollTop: blockOffset - 70
    }, 700);
  });
  /* Рейтинг звезд */

  var ratingItemList = document.querySelectorAll('.rating__item');
  var ratingItemArray = Array.prototype.slice.call(ratingItemList);
  ratingItemArray.forEach(function (item) {
    return item.addEventListener('click', function () {
      var itemValue = item.dataset.itemValue;
      item.parentNode.dataset.totalValue = itemValue;
    });
  });
  /* Слайдшоу с таймером */

  $("#slideshow > a:gt(0)").hide();
  setInterval(function () {
    $('#slideshow > a:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slideshow');
  }, 3000);
  $("#slideshow-2 > a:gt(0)").hide();
  setInterval(function () {
    $('#slideshow-2 > a:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slideshow-2');
  }, 3000);
  $("#slideshow-3 > a:gt(0)").hide();
  setInterval(function () {
    $('#slideshow-3 > a:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slideshow-3');
  }, 3000);
  scrollTop();
  headerSearch();
  customSelect();
  sliderRow();
  productRemove();
  fileUpload();
  gallerySlider();
  popupLink();
  formValidate();
  toggleShowPassword();
  filterToggle();
  headerFixed();
});
/* Маска телефона */

var inputs = document.querySelectorAll('input[type="tel"]');
var im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}