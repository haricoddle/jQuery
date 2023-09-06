$(document).ready(function () {
    let clickNum = 0;
    $('body').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: 'Click here',
            class: 'btn1'
        })
    )
    $('.btn1').on('click', function () {
        clickNum += 1;
        if (clickNum === 1) {
            $('body').append(
                $(document.createElement('h1')).prop({
                    type: 'h1',
                    innerHTML: 'Assignment-3',
                })
            )
        } else if (clickNum === 2) {
            $('body').append(
                $(document.createElement('div')).prop({
                    type: 'div',
                    class: 'imageContainer'
                }));
            $('.imageContainer').append(
                $(document.createElement('img')).prop({
                    type: 'img',
                    src: 'images/img1.jpg',
                    class: 'img1'
                })
            );
            $('body').append(
                $(document.createElement('button')).prop({
                    type: 'button',
                    innerHTML: 'Change Image',
                    class: 'btn2'
                })
            );
            $('.btn2').one('click',function () {
                $('.img1').fadeOut();
                $('.imageContainer').append(
                    $(document.createElement('img')).prop({
                        type: 'img',
                        src: 'images/img2.jpg',
                        class: 'img2'
                    })
                )
            })
        }
    });
});