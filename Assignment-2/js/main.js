$(document).ready(function() {
    $('.slider1').fadeIn(2000);
    $('.radiobtn1').prop('checked', true)
    $('.slider1').siblings().hide(); 

    setInterval(function() {
        let currentSlider = $('.slider:visible');
        let currentRad = $('.radiobtn:checked')
        let nextSlider = currentSlider.next('.slider');
        let nextRad = currentRad.next('.radiobtn');
        if (nextSlider.length === 0) {
            nextSlider = $('.slider:first');
        }
        if (nextRad.length === 0) {
            nextRad = $('.radiobtn:first');
        }
        currentSlider.fadeOut(2000);
        currentRad.prop('checked', false).delay(2000);
        nextRad.prop('checked',true)
        nextSlider.fadeIn(2000);
    }, 4000);

    $('.radiobtn5').on('change', function() {
        if ($('.radiobtn5').is(':checked')) {
            $('.slider5').fadeIn(1000);
            $('.slider5').siblings().hide();
        }
    });
    $('.radiobtn4').on('change', function() {
        if ($('.radiobtn4').is(':checked')) {
            $('.slider4').fadeIn(1000);
            $('.slider4').siblings().hide();
        }
    });
    $('.radiobtn3').on('change', function() {
        if ($('.radiobtn3').is(':checked')) {
            $('.slider3').fadeIn(1000);
            $('.slider3').siblings().hide();
        }
    });
    $('.radiobtn2').on('change', function() {
        if ($('.radiobtn2').is(':checked')) {
            $('.slider2').fadeIn(1000);
            $('.slider2').siblings().hide();
        }
    });
    $('.radiobtn1').on('change', function() {
        if ($('.radiobtn1').is(':checked')) {
            $('.slider1').fadeIn(1000);
            $('.slider1').siblings().hide();
        }
    });
});
