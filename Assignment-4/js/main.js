$(document).ready(function () {
    $('.cart').hide();
    $('#cartLogo').on('click', function () {
        $('.cart').fadeToggle(1000);
    });
    $('#searchBar').on('input', function () {
        const searchText = $(this).val().toLowerCase();

        $('.item').each(function () {
            const itemTitle = $(this).find('.itemName').text().toLowerCase();
            if (itemTitle.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
                // $('#searchError').html('<h1>Element not found</h1>')
            }
        });
    });

    $('#items').append(
        $(document.createElement('div')).prop({
            type: 'div',
            class: 'itemHolder'
        })
    );

    $('.addToCart1').on('click', function (e) {
        addProducts(e, 1);
        addIncrement(1)
        $('.addToCart1').unbind()
    });
    $('.addToCart2').one('click', function (e) {
        addProducts(e, 2);
        addIncrement(2)
        $('.addToCart2').unbind()

    });
    $('.addToCart3').one('click', function (e) {
        addProducts(e, 3);
        addIncrement(3);
        $('.addToCart3').unbind()
    });
    $('.addToCart4').one('click', function (e) {
        addProducts(e, 4);
        addIncrement(4);
        $('.addToCart4').unbind();
    });
    $('.addToCart5').one('click', function (e) {
        addProducts(e, 5);
        addIncrement(5)
        $('.addToCart5').unbind()
    });
    $('.addToCart6').one('click', function (e) {
        addProducts(e, 6);
        addIncrement(6)
        $('.addToCart6').unbind()
    });
    $('.addToCart7').one('click', function (e) {
        addProducts(e, 7);
        addIncrement(7)
        $('.addToCart7').unbind()
    });
    $('.addToCart8').one('click', function (e) {
        addProducts(e, 8);
        addIncrement(8)
        $('.addToCart8').unbind()
    });
    $('.addToCart9').one('click', function (e) {
        addProducts(e, 9);
        addIncrement(9)
        $('.addToCart9').unbind()
    });

    function addProducts(e, num) {
        $('.itemHolder').append(
            $(document.createElement('p')).prop({
                type: 'p',
                innerHTML: $(e.target.parentElement).find('p:first').text(),
                class: `itemss${num}`
            })
        )
    };
    function addIncrement(num) {
        let count = 1;
        $('.itemHolder').append(
            $(document.createElement('div')).prop({
                type: 'div',
                class: `itemDiv${num}`
            })
        )
        $(`.itemDiv${num}`).append(
            $(document.createElement('p')).prop({
                type: 'p',
                class: `quantity-sec${num} quantsec `
            })
        );
        $(`.quantity-sec${num}`).append(
            $(document.createElement('button')).prop({
                type: 'button',
                innerHTML: '+',
                class: `plus${num} plus`
            }),
            $(document.createElement('span')).prop({
                type: 'span',
                innerHTML: `${count}`,
                class: `qunty${num}`
            }),
            $(document.createElement('button')).prop({
                type: 'button',
                innerHTML: '-',
                class: `minus${num} minus`
            })
        )
        $(`.plus${num}`).on('click', function () {
            $(`.qunty${num}`).html(++count)
        })
        $(`.minus${num}`).on('click', function () {
            if (count > 0) {
                $(`.qunty${num}`).html(--count);
                if (count === 0) {
                    $(`.itemss${num}`).remove();
                    $(`.quantity-sec${num}`).remove();
                }
            }
        })
    }
    $('.checkout').one('click', function(){
     alert('Thanks for Choosing us ,Happy Riding');   
    })
})
