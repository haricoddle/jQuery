$(document).ready(function () {
    $('.cartArea').hide();
    $('#cartLogo').on('click', function () {
        $('.cartArea').toggle(1000);
    });
    $('#searchbar').on('input', function () {
        const searchText = $(this).val().toLowerCase();

        $('.items').each(function () {
            const itemTitle = $(this).find('.title').text().toLowerCase();
            if (itemTitle.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    let itemsPerPage = 3;
    let currentPage = 1;
    let data;

    function appendNextItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        totalItems = data.products.length

        for (let i = startIndex; i < endIndex && i < totalItems; i++) {
            const product = data.products[i];
            let disPrice = product['price'] - ((product['price'] * product['discountPercentage']) / 100);

            $('.container').append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'items',
                    id: 'item' + product['id'],
                })
            );

            $(`#item${product['id']}`).append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'nameDet namDet' + product['id'],
                })
            );

            $(`.namDet${product['id']}`).append(
                $(document.createElement('h2')).prop({
                    type: 'h2',
                    innerHTML: product['title'],
                    class: 'title tit' + product['id']
                }),
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: product['thumbnail'],
                    class: 'thumb img' + product['id']
                })
            );
            $(`#item${product['id']}`).append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'contentdiv conDiv' + product['id']
                })
            );
            $(`.conDiv${product['id']}`).append(
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: product['description'],
                    class: 'desc desc' + product['id']
                }),
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `Ratings:- ${product['rating']}`,
                    class: 'rating rate' + product['id']
                }),
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `Stock:- ${product['stock']}`,
                    class: 'stock st' + product['id']
                }),
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `Brand:- ${product['brand']}`,
                    class: 'brand br' + product['id']
                }),
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `Price :- ${product['price']}`,
                    class: 'price pr' + product['id']
                }),
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `Discount Price :- ${disPrice}`,
                    class: 'disPrice Dpr' + product['id']
                }),
                $(document.createElement('button')).prop({
                    type: 'button',
                    innerHTML: 'ADD TO CART',
                    class: 'addtocart add' + product['id']
                })
            )
            $(`#item${product['id']}`).append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'displaydiv dispDiv' + product['id']
                })
            )
            $(`.dispDiv${product['id']}`).append(
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: product['images'][0],
                    class: 'dispImg img' + product['id']
                }),
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: product['images'][1],
                    class: 'dispImg img' + product['id']
                }),
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: product['images'][2],
                    class: 'dispImg img' + product['id']
                }),
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: product['images'][3],
                    class: 'dispImg img' + product['id']
                })
            )
        }

        currentPage++;
    }

    $.getJSON("https://dummyjson.com/products", function (fetchedData) {
        data = fetchedData;

        appendNextItems();

        let count = 1;
        $('.addtocart').one('click', function (e) {
            let className = $(e.target.parentElement.parentElement).find('h2').text();
            $('.cartItems').append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'cartItemsDiv cartID' + count
                })
            );

            $('.cartID' + count).append(
                $(document.createElement('p')).prop({
                    type: 'p',
                    innerHTML: `${className}`
                })
            );
            $('.cartID' + count).append(
                $(document.createElement('p')).prop({
                    type: 'p',
                    class: 'quantityP qP' + count
                })
            )
            let itemCount = 1;
            $('.qP' + count).append(
                $(document.createElement('button')).prop({
                    type: 'button',
                    innerHTML: '+',
                    class: 'increment incre' + count
                }),
                $(document.createElement('span')).prop({
                    type: 'span',
                    innerHTML: `${itemCount}`,
                    class: 'itemQuantity IQ' + count
                }),
                $(document.createElement('button')).prop({
                    type: 'button',
                    innerHTML: '-',
                    class: 'decerement decre' + count
                })
            )
            $('.incre' + count).on('click', function (e) {
                itemCount++
                $(e.target).siblings('.itemQuantity').text(itemCount)
            })
            $('.decre' + count).on('click', function (e) {
                let itemQuantity = $(e.target).siblings('.itemQuantity');
                itemCount--;
                itemQuantity.text(itemCount);

                if (itemCount === 0) {
                    $(e.target).closest('.cartItemsDiv').remove();
                }
            });
            count++;
        });
    });

    $('#filter').on('change', function (e) {
        const selectedCategory = e.target.value;

        $('.items').each(function () {
            const itemId = $(this).attr('id').substring(4);
            const itemCategory = data.products[itemId - 1]['category'];

            if (selectedCategory === "" || itemCategory === selectedCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#sort').on('change', function () {
        const selectedSortOption = $(this).val();

        switch (selectedSortOption) {
            case 'hightolow':
                $('.items').sort(function (a, b) {
                    const first = parseFloat($(a).find('.disPrice').text().split('Discount Price :- ')[1]);
                    const second = parseFloat($(b).find('.disPrice').text().split('Discount Price :- ')[1]);
                    return second - first;
                }).appendTo('.container');
                break;
            case 'lowtohigh':
                $('.items').sort(function (a, b) {
                    const first = parseFloat($(a).find('.disPrice').text().split('Discount Price :- ')[1]);
                    const second = parseFloat($(b).find('.disPrice').text().split('Discount Price :- ')[1]);
                    return first - second;
                }).appendTo('.container');
                break;
            case 'ratings':
                $('.items').sort(function (a, b) {
                    const ratingA = parseFloat($(a).find('.rating').text().split('Ratings:- ')[1]);
                    const ratingB = parseFloat($(b).find('.rating').text().split('Ratings:- ')[1]);
                    return ratingB - ratingA;
                }).appendTo('.container');
                break;
            default:
                break;
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            appendNextItems();
        }
    });
});
