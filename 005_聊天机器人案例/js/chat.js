$(function () {
    $('.input_sub').on('click', function () {
        var text = $('.input_txt').val().trim();
        if (text.length <= 0) {
            return $('.input_txt').val('');
        }

        $('.talk_list').append(`<li class="right_word"><img src="img/person02.png"/><span>${text}</span></li>`);
        $('.input_txt').val('');
        resetui();
        getMsg(text);
    })

    $('.input_txt').on('keyup', function (e) {
        if (e.key === 'Enter') {
            $('.input_sub').click();
        }
    })

    function getMsg(text) {
        $.ajax({
            types: 'POST',
            url: 'https://api.ownthink.com/bot',
            data: {spoken: text},
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    $('.talk_list').append(`<li class="left_word"><img src="img/person01.png"/><span>${msg}</span></li>`);
                    resetui();
                }
            }
        })
    }
})