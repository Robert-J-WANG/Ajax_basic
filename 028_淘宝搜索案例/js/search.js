window.addEventListener('DOMContentLoaded', function () {
    var ipt = document.querySelector('.ipt');

    var listBox = document.querySelector('.listBox');
    var cacheObj = {};
    ipt.addEventListener('keyup', function () {
        clearTimeout(timer);
        var input = this.value;
        if (input.length <= 0) {
            listBox.style.display = 'none';
        }

        if (input in cacheObj) {
            listBox.innerHTML = '';
            renderSuggestList(cacheObj[input]);
        } else {
            debounceSearch(input);
        }
    })

    //发起jsonp请求
    function getSuggestList(keyWords) {
        $.ajax({
            url: `https://suggest.taobao.com/sug?q=${keyWords}`,
            dataType: 'jsonp',
            success: function (res) {
                listBox.innerHTML = '';
                renderSuggestList(res);
            }
        });
    }

    //定义渲染函数
    function renderSuggestList(res) {
        var text = ipt.value;
        cacheObj[text] = res;

        if (res.result.length <= 0) {
            listBox.style.display = 'none';
        }
        for (var i = 0; i < res.result.length; i++) {
            listBox.style.display = 'block';
            listBox.innerHTML += `<div class="suggest-item">${res.result[i][0]}</div>`;
        }
    }

    //定义延时器
    var timer = null;

    //定义防抖函数
    function debounceSearch(keyWords) {
        timer = setTimeout(function () {
            getSuggestList(keyWords);
        }, 500);
    }
})