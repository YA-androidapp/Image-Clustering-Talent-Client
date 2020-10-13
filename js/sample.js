function next_K(K) {
    const index = Ks.findIndex(item => item === String(K))
    if (-1 == index || Ks.length - 1 <= index) {
        return "";
    } else {
        return Ks[index + 1];
    }
}

function prev_K(K) {
    const index = Ks.findIndex(item => item === String(K))
    if (-1 == index || 0 == index) {
        return "";
    } else {
        return Ks[index - 1];
    }
}


function isNullOrUndef(o) {
    return (typeof o === "undefined" || o === null);
}

function array_shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        if (i == j) continue;
        var k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
    }
    return arr;
}

function uniq(array) {
    return Array.from(new Set(array));
}

function getSamplingImages(K, selected_clus) {
    console.log(K, selected_clus);
    console.log("userobjects", userobjects);

    if (isNullOrUndef(K)) {
        K = '2';
    }

    filtered_userobjects = {};
    if (isNullOrUndef(selected_clus)) {
        for (let clus_index = 1; clus_index <= K; clus_index++) {
            filtered_userobjects[String(clus_index)] = (
                userobjects.filter(function (item) {
                    if ((item.K == K) && (item.clus == clus_index)) return true;
                }));
        }
    } else {
        // K=(n-1)の時に同じクラスタに所属していた(K=n)のクラスタを探す
        found_users_pre = (
            userobjects.filter(function (item) {
                if ((item.K == prev_K(K)) && (item.clus == selected_clus)) return true;
            }));
        console.log("found_users_pre", found_users_pre);

        target_users = [];
        found_users_pre.forEach(elem => {
            target_users.push(elem.i);
        });

        found_users = (
            userobjects.filter(function (item) {
                if ((item.K == K) && (target_users.includes(item.i))) return true;
            }));

        target_clusters = [];
        found_users.forEach(elem => {
            target_clusters.push(elem.clus);
        });
        target_clusters = uniq(target_clusters);

        target_clusters.forEach(clus_index => {
            filtered_userobjects[String(clus_index)] = (
                userobjects.filter(function (item) {
                    if ((item.K == K) && (item.clus == clus_index)) return true;
                }));
        });
    }
    console.log("filtered_userobjects", filtered_userobjects);

    let insertElement = "";


    insertElement += '<li class="list-group-item">';
    insertElement += '<details id="details_k-' + K + '" open><summary>K=' + K + '</summary><div id="k-' + K + '">';

    Object.keys(filtered_userobjects).forEach(key => {
        // console.log("key", key, "val", filtered_userobjects[key]);
        // filtered_userobjects[key].forEach(elem => {
        array_shuffle(filtered_userobjects[key]).slice(0, 4).forEach(elem => {
            if ("" == next_K(K)) {
                insertElement += '<div class="card" style="width: 320px;">' +
                    '<img src="images/' + elem.filename + '" class="card-img-top"><div class="card-body"><p class="card-text">' + elem.filename.split('_')[0] + 'さん</p></div></div>';
            } else {
                insertElement += '<img src="images/' + elem.filename + '" class="img-thumbnail" width="160px" onclick="getSamplingImages(\'' + next_K(K) + '\', \'' + elem.clus + '\');">';
            }
        });
    });
    insertElement += '</div></details>';
    insertElement += '</li>';

    document.getElementById('output_thumbnails_list').innerHTML += insertElement;
    randomize_elements(K);
    document.getElementById('details_k-' + prev_K(K)) && document.getElementById('details_k-' + prev_K(K)).removeAttribute('open');
}

$(function () {
    document.getElementById("get_sampling_image_k-4").onclick = function () {
        getSamplingImages(4, null);
    }

    document.getElementById("clear-list").onclick = function () {
        document.getElementById('output_thumbnails_list').innerHTML = '';
    }
});
