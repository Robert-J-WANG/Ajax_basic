import {template} from "./template-web";

$(function () {
    $.get('http://www.liulongbin.top:3006/api/news', function (res) {
        if (res.status !== 200) {
            return alert('获取新闻列表失败！');
        }
        var news = template('tpl', res);
        $('.news-list').html(news);
    })
})

