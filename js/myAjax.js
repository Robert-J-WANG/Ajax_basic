function resolveData(data) {
    var arr = [];
    for (var k in data) {
        var str = `${k}=${data[k]}`;
        arr.push(str);
    }
    return arr.join('&');
}

function myAjax(option) {
    var xhr = new XMLHttpRequest();
    var join = resolveData(option.data);

    if (option.method.toUpperCase() === 'GET') {
        xhr.open(option.method, `${option.url}?${join}`);
        xhr.send();
    } else if (option.method.toUpperCase() === 'POST') {
        xhr.open(option.method, option.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(join);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            option.success(result);
        }
    }
}