
$(document).ready(function(){

    // -------------------------------------------- Код для точки следящей за курсором

    $("body").prepend('<div id="circle" class="circle-cursor"></div>', '<div id="min-circle" class="circle-cursor-min"></div>');

    var cursor = {
        delay: 10,
        _x: 0,
        _y: 0,
        endX: (window.innerWidth / 2),
        endY: (window.innerHeight / 2),
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector('#min-circle'),
        $outline: document.querySelector('#circle'),

        init: function() {
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;

            this.setupEventListeners();
            this.animateDotOutline();
        },

        setupEventListeners: function() {
            var self = this;

            document.querySelectorAll('a').forEach(function(el) {
                el.addEventListener('mouseover', function() {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                });
                el.addEventListener('mouseout', function() {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                });
            });

            document.addEventListener('mousedown', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            document.addEventListener('mouseup', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });

            document.addEventListener('mousemove', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();

                self.endX = e.clientX;
                self.endY = e.clientY;
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            });

            document.addEventListener('mouseenter', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            });

            document.addEventListener('mouseleave', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            });
        },

        animateDotOutline: function() {
            var self = this;

            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';

            requestAnimationFrame(this.animateDotOutline.bind(self));
        },

        toggleCursorSize: function() {
            var self = this;

            if (self.cursorEnlarged) {
                self.$dot.style.transform = "translate(-50%, -50%) scale(3.02)";
                self.$outline.style.transform = 'translate(-50%, -50%) scale(0)';
            } else {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        },

        toggleCursorVisibility: function() {
            var self = this;

            if (self.cursorVisible) {
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            } else {
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            }
        }
    }
    cursor.init();

    // -------------------------------------------- Код для библиотеки wow js

    const wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animate__animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true       // act on asynchronously loaded content (default is true)
        }
    );
    wow.init();

    // -------------------------------------------- Анимация блока о нас

    let items = document.querySelectorAll('.about-actions-item');

    let activeItem = items[0];
    let id = document.querySelector('#company-content');

    items.forEach(item => {
        item.addEventListener('click', () => {

            if (id) {
                id.classList.remove('active');
            }
            id = document.querySelector(`#${item.dataset.content}`);
            id.classList.add('active');

            if (activeItem) {
                activeItem.classList.remove('active');
            }
            activeItem = item;
            activeItem.classList.add('active');

        });
    });

    // -------------------------------------------- Карусель для новостей

    $('.news-items').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: false,
        dots: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 801,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
        ]
    });

    // -------------------------------------------- Карусель для партнеров

    let toggleSlick = () => {
        if($(window).width() < 620) {
            $('.collaboration-items').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            });
        } else {
            $('.collaboration-items').slick("unslick");
        }
    }

    $(window).resize(toggleSlick);
    toggleSlick();

});
