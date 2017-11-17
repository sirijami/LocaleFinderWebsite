
$(function(){
		'use strict';
		$("#btnSearch").click(function(){
	      var searchVal = $("#search-input").val();
	      window.open("../html/neighborDetail.html?name="+searchVal);
		});

  	var closeCtrl = $('#btn-search-close'),
  		searchContainer = $('.search'),
  		inputSearch = $('.search__input');

  	function init() {
  		initEvents();
  	}

  	function initEvents() {
			inputSearch.focus(function(){
				searchContainer.addClass('search--open');
			}
		);
			closeCtrl.click(function(){
				searchContainer.removeClass('search--open');
				inputSearch.blur();
	  		inputSearch.value = '';
			});
  		document.addEventListener('keyup', function(ev) {
  			// escape key.
  			if( ev.keyCode == 27 ) {
  				closeSearch();
  			}
  		});
  	}
  	init();
});
