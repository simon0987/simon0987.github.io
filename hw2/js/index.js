var newItem = (item) => {
    $img = $('<img>').attr('class', 'image').attr('src', item.image)
    $h3 = $('<h3>').attr('class', 'name').text(item.name)
    $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

    $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
    $col = $('<div>').attr('class', 'col-*').append($item)

    $('#product-list').append($col)
}

$('#query').on('click', function() {
    $.get('https://js.kchen.club/B12345678/query', function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#product-list').empty();
                // 資料庫有回傳資料
                var items = response.data
                for (var i = 0; i < items.length; i++) {
                    newItem(items[i])
                }
            } else {
                $('#message').text('查無相關資料')
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }

        console.log(response)
    }, "json")
})

$('#add').on('click', function() {
    new_data = {
        sid: "B12345678",
        data: {
            "name": "dog",
            "price": 123,
            "count": 2,
            "image": "https://github.com/nashory/gans-awesome-applications/blob/master/jpg/gans.jpg"
        }
    };
    $.post('https://js.kchen.club/B12345678/insert', new_data, function(response) {
        if (response) {
            if (response.result) {
                var item = response.data
                newItem(item);
            }
        }
        console.log(response);
    }, "json")
})