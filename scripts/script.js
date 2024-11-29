
$(document).ready(function(){

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

    let items = document.querySelectorAll('.about-actions-item');
    console.log(items);

    let activeItem = items[0];
    let id = document.querySelector('#company-content');

    items.forEach(item => {
        item.addEventListener('click', () => {

            if (id) {
                id.classList.remove('active');
            }
            id = document.querySelector(`#${item.dataset.content}`);
            id.classList.add('active');
            console.log(id);

            if (activeItem) {
                activeItem.classList.remove('active');
            }
            activeItem = item;
            activeItem.classList.add('active');

        });
    });

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

    let toggleSlick = () => {
        if($(window).width() < 620) {
            $('.collaboration-items').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
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

