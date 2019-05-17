var newItem = (item) => {
    $img = $('<img>').attr('class', 'image').attr('src', item.image)
    $h3 = $('<h3>').attr('class', 'name').text(item.name)
    $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

    $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
    $col = $('<div>').attr('class', 'col-*').append($item)

    $('#product-list').append($col)
}

$('#query').on('click', function() {
    $.get('https://kchen-teach.github.io/hw2/product.json', function(response) {
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