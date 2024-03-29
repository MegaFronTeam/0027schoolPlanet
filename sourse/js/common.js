"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.closest('.dd-group__item')).toggleClass('active');
							$(this.closest('.dd-group__item').querySelector('.dd-content-js')).slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
					});

				});

				let filterLinks = document.querySelectorAll('.filter a');
				if (filterLinks.length > 0) {
					for (const filterLink of filterLinks) {
						filterLink.addEventListener('click', function() {
							if (window.matchMedia("(max-width: 992px)").matches) {
								$('.dd-group__item').removeClass('active');
								$('.dd-group__item .dd-content-js').slideUp(function () {
									$(this).removeClass('active');
								});
							}
						})
					}
				}
			}
		}
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.getCurrentYear('.footer span');
	JSCCommon.imgToSVG();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'screen/'+document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	// modal window
	let menuHasChildrens = document.querySelectorAll('.menu-item-has-children');
	if (menuHasChildrens.length > 0) {
		for (let menuHasChildren of menuHasChildrens) {
			menuHasChildren.firstChild.addEventListener('click', function (e) {
				e.preventDefault();
				if (window.matchMedia("(max-width: 992px)").matches) {
					menuHasChildren.firstChild.classList.toggle('active');
					menuHasChildren.querySelector('.sub-menu').classList.toggle('active');
				}
				// this.insertAdjacentHTML(beforeend, '///')
			})
		}
	};

	let passChangers = document.querySelectorAll('.form-wrap__pass-changer');
	if(passChangers) {
		for (const passChanger of passChangers) {
			passChanger.addEventListener('click', function() {
				let passInput = this.previousElementSibling;
				this.classList.toggle('active');
				passInput.type = passInput.type=='password' ? 'text' : 'password';
			})
		}
	};

	let  sliderWrap = document.querySelectorAll(".sProductCard__slider-wrap");
	sliderWrap.forEach((element) => {
		let thumbs = element.querySelector(".sProductCard__slider-thumbs--js");
		// let loopThumb = (thumbs.querySelector(".swiper-slide").length > 4) ? true : false;
		var sProductCardswiperThumbs = new Swiper(thumbs, {
			// init:false,
			// loop: loopThumb,
			loop: false,
			spaceBetween: 8,
			slidesPerView: 5,
			freeMode: true,
			observeParents: true, 
			watchSlidesProgress: true,
		});
		var sProductCardswiper2 = new Swiper(element.querySelector(".sProductCard__slider--js"), {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1, 
			loopFillGroupWithBlank: true,
			// autoplay: {
			// 	delay: 5000,
			// },
			watchOverflow: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: sProductCardswiperThumbs,
			}
		});
	});

	let cityOptions = document.querySelectorAll('.modal-win__wrap');
	if (cityOptions) {
		for (const cityOption of cityOptions) {
			let cityOptionInnerInputs = cityOption.querySelectorAll('.modal-win__inner input');
			let mainCheckbox =  cityOption.querySelector('.modal-win__item input');
			cityOption.querySelector('.modal-win__plus').addEventListener('click', function() {
				$(this).toggleClass('active');
				let cityOptionInner = cityOption.querySelector('.modal-win__inner');
				$(cityOptionInner).slideToggle();
				cityOption.querySelector('.modal-win__inner').addEventListener('click', function() {
					let arrOfChekedPos = [];
					for (const cityOptionInnerInput of cityOptionInnerInputs) {
						arrOfChekedPos.push(cityOptionInnerInput.checked);
					}
					let checker = arr => arr.every(v => v === true);
					checker(arrOfChekedPos) == true ? (mainCheckbox.checked = true) : (mainCheckbox.checked = false);
				});
			})
			cityOption.querySelector('.custom-input').addEventListener('click', function() {
				for (const cityOptionInnerInput of cityOptionInnerInputs) {
					cityOption.querySelector('.custom-input input').checked == true ? cityOptionInnerInput.checked = 'checked' : cityOptionInnerInput.checked = '';
				};
			});
		}
	};

	let message = document.querySelector('.message');
	if(message) {
		message.querySelector('span').addEventListener('click', function() {
			$(message).removeClass('active');
		})
	};

	const swipertabs = new Swiper('.sVendor__tabs-wrap--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	let vendorList = document.querySelector('.sVendor__list');
	if(vendorList) {
		vendorList.querySelector('a').addEventListener('click', function(e) {
			e.preventDefault();
			$(this).hide();
			$('.sVendor__list li:hidden').slideDown();
		});
		if(vendorList.querySelectorAll('li').length < 3) {
			$(vendorList.querySelector('a')).hide();
		}
	};

	let searchLinkElement = document.querySelector('.top-nav__search-wrap .top-nav__link');
	let searchParentElement = document.querySelector('.top-nav__search-wrap');
	if (searchParentElement) {
		searchLinkElement.addEventListener('click', function(e) {
			if (window.matchMedia("(max-width: 768px)").matches) {
				e.preventDefault();
				searchParentElement.classList.toggle('active');
				document.querySelector('body').classList.toggle('fixed2');
			}
		})
		document.addEventListener('mouseup', (event) => {
			let searchParent = event.target.closest('.top-nav__search-wrap.active');
			let searchLink = event.target.closest('.top-nav__search-wrap .top-nav__link');
			if (!searchParent && !searchLink) {
				searchParentElement.classList.remove('active');
				document.querySelector('body').classList.remove('fixed2');
			}
		});
	};

	let catalogDropdown = document.querySelector('.sCatalog .dd-group');
	if(catalogDropdown) {
		document.addEventListener('mouseup', (event) => {
			if(event.target.closest('.sCatalog .dd-group') !== catalogDropdown) {
				catalogDropdown.querySelector('.dd-group__item').classList.remove('active');
				catalogDropdown.querySelector('.dd-group__content').classList.remove('active');
				$(catalogDropdown.querySelector('.dd-group__content')).slideUp();
			}
		});
	};
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }