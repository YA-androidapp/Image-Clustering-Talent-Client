function loadSortjs() {
    var options = {
        valueNames: ["K", "i", "filename", "clus"]
    };
    var userList = new List('users', options);
    userList.sort('K', { order: 'asc' });
}

function randomize_elements(K) {
    var arr = [];
    $("div#k-" + K + " img.img-thumbnail").each(function () {
        arr.push($(this)[0].outerHTML);
    });

    for (var i = arr.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }

    $("div#k-" + K + " img.img-thumbnail").each(function () {
        $(this).remove();
    });

    for (i = 0; i < arr.length; i++) {
        $("div#k-" + K).append(arr[i]);
    }
}
