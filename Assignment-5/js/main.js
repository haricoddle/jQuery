$(document).ready(function () {
    $('.cartArea').hide();
    $('#cartLogo').on('click', function () {
        $('.cartArea').toggle(1000);
    })
    $('#searchbar').on('input', function () {
        const searchText = $(this).val().toLowerCase();
        console.log(searchText);

        if (categoryCheck === undefined) {
            $('.container').empty(); 
            if (searchText === '') {
                for (let i = 0; i < productData.length; i++) {
                    bodyContents(productData[i]);
                }
                console.log('nothing is searched')
            } else {
                for (let i = 0; i < productData.length; i++) {
                    const itemTitle = productData[i]['title'].toLowerCase();
                    if (itemTitle.includes(searchText)) {
                        bodyContents(productData[i]);
                    }
                }
            }
        } else {
            $('.items').each(function () {
                const itemTitle = $(this).find('.title').text().toLowerCase();
                if (itemTitle.includes(searchText)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
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

    let data;
    let productData;
    let itemsPerPage = 3;
    let currentPage = 1;
    $.getJSON("https://dummyjson.com/products", function (fetchedData) {
        data = fetchedData;
        productData = data.products;
        appendNextItems();
    })
    let categoryCheck;
    $('#filter').on('change', function (e) {
        const selectedCategory = e.target.value;
        categoryCheck = selectedCategory;
        $(window).unbind();
        $('.container').empty();
        for (let i = 0; i < productData.length; i++) {
            let product = productData[i];
            let disPrice = product['price'] - ((product['price'] * product['discountPercentage']) / 100);

            if (selectedCategory.includes(product['category'])) {
                bodyContents(product);
            }
            else if (selectedCategory === '') {
                appendNextItems();
            }
        }
    });

    let count = 1;

    function appendNextItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        totalItems = data.products.length

        for (let i = startIndex; i < endIndex && i < totalItems; i++) {
            const products = data.products[i];
            let disPrice = products['price'] - ((products['price'] * products['discountPercentage']) / 100);
            bodyContents(products)
        }
        currentPage++;
    }

    let totalAmount = 0;

    function bodyContents(product) {
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
        );
        $(`.add${product['id']}`).on('click', function (e) {
            let className = $(e.target.parentElement.parentElement).find('h2').text();
            let amtArea = $('.TotalAmt');
            let priceAmt = parseFloat($(e.target.parentElement).find('.disPrice').text().split('Discount Price :- ')[1]);
            let existingCartItem = $('.cartItemsDiv:contains(' + className + ')');
            console.log(existingCartItem)
            if (existingCartItem.length > 0) {
                let itemQuantity = existingCartItem.find('.itemQuantity');
                let itemCount = parseInt(itemQuantity.text());
                ++itemCount;
                console.log(itemCount)
                itemQuantity.text(itemCount);
                console.log(priceAmt)
                console.log(totalAmount)
                totalAmount += priceAmt;
                console.log(totalAmount)
                amtArea.text(totalAmount.toFixed(2));
            } else {
                totalAmount += priceAmt;
                console.log(totalAmount)
                amtArea.text(totalAmount.toFixed(2));
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
                );

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
                        class: 'decrement decre' + count
                    })
                );

                count++;

                $('.incre' + (count - 1)).on('click', function (e) {
                    let itemQuantity = $(e.target).siblings('.itemQuantity');
                    let itemCount = parseInt(itemQuantity.text());
                    itemCount++;
                    console.log(itemCount)
                    itemQuantity.text(itemCount);
                    totalAmount += priceAmt;
                    amtArea.text(totalAmount.toFixed(2));
                });

                $('.decre' + (count - 1)).on('click', function (e) {
                    let itemQuantity = $(e.target).siblings('.itemQuantity');
                    let itemCount = parseInt(itemQuantity.text());
                    itemCount--;
                    console.log(itemCount)
                    totalAmount -= priceAmt;
                    amtArea.text(totalAmount.toFixed(2));

                    if (itemCount === 0) {
                        $(e.target).closest('.cartItemsDiv').remove();
                    } else {
                        itemQuantity.text(itemCount);
                    }
                });
            }
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            appendNextItems();
        }
    });
});
