var Ks = [];
var userobjects = [];



$(function () {
    function convertArray(data) {

        let outputElement = document.getElementById('output_csv');
        outputElement.innerHTML = "...";

        let insertElement = '';

        let classes = ["K", "i", "filename", "clus"];

        const dataArray = [];
        const dataString = data.split('\n');
        // console.log('dataString.length: ' + dataString.length);
        for (let i = 0; i < dataString.length; i++) {
            if (i < 1) {
                insertElement += '';
            } else {
                if ('' != dataString[i].trim()) {
                    dataArray[i] = dataString[i].trim().split('\t');

                    insertElement += '<tr>';
                    // console.log('dataArray[i].length: ' + dataArray[i].length);
                    for (let j = 0; j < dataArray[i].length; j++) {
                        if (0 == j) {
                            Ks.push(String(dataArray[i][j]));
                        }
                        if (2 == j) {
                            insertElement += `<td><a href="images/${dataArray[i][j]}" target="_blank"><img width="64px" src="images/${dataArray[i][j]}"></a></td>`
                        }
                        insertElement += `<td class="${classes[j]}">${dataArray[i][j]}</td>`
                    }
                    insertElement += '</tr>\n';

                    var userobj = { K: dataArray[i][0], i: dataArray[i][1], filename: dataArray[i][2], clus: dataArray[i][3] };
                    userobjects.push(userobj);
                }
            }
        }
        Ks = uniq(Ks);

        outputElement = document.getElementById('output_csv');
        outputElement.innerHTML = insertElement;

        loadSortjs();
    }

    function getCsvData(dataPath) {
        // alert("getCsvData");
        const request = new XMLHttpRequest();
        request.addEventListener('load', (event) => {
            // alert("Load");
            const response = event.target.responseText;
            convertArray(response);
        });
        request.open('GET', dataPath, true);
        request.send();
    }

    getCsvData('./data/dat.tsv');

    document.getElementById("get_csv_data").onclick = function () {
        // alert("Reload");
        getCsvData('./data/dat.tsv');
    }
});
