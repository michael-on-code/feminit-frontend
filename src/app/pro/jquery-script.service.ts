import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import 'popper.js';
// import 'perfect-scrollbar';
// import 'waves';
import 'jquery-sparkline';

@Injectable({
  providedIn: 'root'
})
export class JqueryScriptService {

  constructor() {
  }

  getDashboardScripts() {
    // this.perfectScroller();
    // this.waves();
    this.sidebarMenuJS();
    // this.stickyKitJS();
    this.customJS();

  }

  customJS() {
    $(function () {
      'use strict';
      $(function () {
        $('.preloader').fadeOut();
      }), $(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation();
      });
      const e = function () {
        (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1170 ? ($('body').addClass('mini-sidebar'), $('.navbar-brand span').hide(), $('.sidebartoggler i').addClass('ti-menu')) : ($('body').removeClass('mini-sidebar'), $('.navbar-brand span').show());
        let e = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
        (e -= 55) < 1 && (e = 1), e > 55 && $('.page-wrapper').css('min-height', e + 'px');
      };
      $(window).ready(e), $(window).on('resize', e), $('.sidebartoggler').on('click', function () {
        $('body').hasClass('mini-sidebar') ? ($('body').trigger('resize'), $('body').removeClass('mini-sidebar'), $('.navbar-brand span').show()) : ($('body').trigger('resize'), $('body').addClass('mini-sidebar'), $('.navbar-brand span').hide());
      }), $('.nav-toggler').click(function () {
        $('body').toggleClass('show-sidebar'), $('.nav-toggler i').toggleClass('ti-menu'), $('.nav-toggler i').addClass('ti-close');
      }), $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
        $('.app-search').toggle(200);
      }), $('.right-side-toggle').click(function () {
        $('.right-sidebar').slideDown(50), $('.right-sidebar').toggleClass('shw-rside');
      }), $('.floating-labels .form-control').on('focus blur', function (e) {
        // @ts-ignore
        $(this).parents('.form-group').toggleClass('focused', 'focus' === e.type || this.value.length > 0);
      }).trigger('blur') /*$(function () {
        $('[data-toggle="tooltip"]').tooltip();
      }), $(function () {
        $('[data-toggle="popover"]').popover();
      }), $('.scroll-sidebar, .right-side-panel,
      .message-center, .right-sidebar').perfectScrollbar(), ù
      $('#chat, #msg, #comment, #todo').perfectScrollbar()*/, $('body').trigger('resize'), $('.list-task li label').click(function () {
        $(this).toggleClass('task-done');
      }), /*$('a[data-action="collapse"]').on('click', function (e) {
        e.preventDefault(), $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus'),
          $(this).closest('.card').children('.card-body').collapse('toggle');
      }),*/ $('a[data-action="expand"]').on('click', function (e) {
        e.preventDefault(), $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress'), $(this).closest('.card').toggleClass('card-fullscreen');
      }), $('a[data-action="close"]').on('click', function () {
        $(this).closest('.card').removeClass().slideUp('fast');
      });
      let a,
        i = ['skin-default', 'skin-green', 'skin-red', 'skin-blue', 'skin-purple', 'skin-megna', 'skin-default-dark', 'skin-green-dark', 'skin-red-dark', 'skin-blue-dark', 'skin-purple-dark', 'skin-megna-dark'];

      function s(e) {
        let a, s;
        return $.each(i, function (e) {
          $('body').removeClass(i[e]);
        }), $('body').addClass(e), a = 'skin', s = e, 'undefined' != typeof Storage ? localStorage.setItem(a, s) : window.alert('Please use a modern browser to properly view this template!'), !1;
      }

      (a = function (e) {
        if ('undefined' != typeof Storage) {
          return localStorage.getItem(e);
        }
        window.alert('Please use a modern browser to properly view this template!');
      }('skin')) && $.inArray(a, i) && s(a), $('[data-skin]').on('click', function (e) {
        $(this).hasClass('knob') || (e.preventDefault(), s($(this).data('skin')));
      }), $('#themecolors').on('click', 'a', function () {
        $('#themecolors li a').removeClass('working'), $(this).addClass('working');
      });
    });
  }

  sidebarMenuJS() {
    $(function () {
      const url = window.location;
      let element = $('ul#sidebarnav a').filter(function () {
        // @ts-ignore
        return this.href === url;
      }).addClass('active').parent().addClass('active');
      while (true) {
        if (element.is('li')) {
          element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');

        } else {
          break;
        }
      }
      $('#sidebarnav a').on('click', function (e) {

        if (!$(this).hasClass('active')) {
          // hide any open menus and remove all other classes
          $('ul', $(this).parents('ul:first')).removeClass('in');
          $('a', $(this).parents('ul:first')).removeClass('active');

          // open our new menu and add the open class
          $(this).next('ul').addClass('in');
          $(this).addClass('active');

        } else if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).parents('ul:first').removeClass('active');
          $(this).next('ul').removeClass('in');
        }
      });
      $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
      });
    });
  }
}
