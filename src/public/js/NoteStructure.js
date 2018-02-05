/*
 * @Author: CNABS 
 * @Date: 2018-02-02 11:18:42 
 * @Last Modified by: bzhou
 * @Last Modified time: 2018-02-05 15:09:35
 * @Function: Get Note Structure Html
 */
/* eslint-disable */
// eslint-disable-next-line
export
function NoteStructure(options) {
        var defaults = {
            container: '',
            width: 280,
            height: 200,
            maxCols: 5, // for more artistic, should be odd number
            data: [] //note data list
        }
        // Populate defaults
        for (var key in defaults) {
            if (typeof options[key] == 'undefined') {
                options[key] = defaults[key];
            }
        }
        //scope data
        var scope = {
            layerData: [],
            totalNotional: 0
        }
        function buildStructureHtml() {
            let div = document.createElement('div');
            let data = options.data;
            if (data instanceof Array && 
                data.length > 0) {
                    //init data
                    let sum = 0;
                    data.forEach(r => sum += r.Notional);
                    scope.totalNotional = sum;
                //split sperate layer
                const hasRating = data.filter(r => r.Rating !== null).length > 0;
                if (!hasRating) {
                    getLayerWithoutRating();
                } else  {
                    getLayerWithRating();
                }
                //build layer html
                if (scope.layerData.length > 0) {
                    scope.layerData.forEach(function (layer, index) {
                        if (layer instanceof Array && 
                            layer.length > 0) {
                                div.appendChild(getLayerHtml(layer));
                        }
                    });
                }
                document.getElementById(options.container).appendChild(div);
            }
        }
        //sperate layer due to different note name
        function getLayerWithoutRating() {
            let data = options.data;
            let set = new Set();
            data.forEach(function(element) {
                set.add(element.Name.subStr(0, 1));
            }, this);

            Array.from(set).forEach(function (item) {
                scope.layerData.push(data.filter(r => r.Name.subStr(0, 1) == item));
            });
        }
        //sperate layer due to different note rating
        function getLayerWithRating() {
            let data = options.data;
            let set = new Set();
            data.forEach(function(element) {
                set.add(element.Rating);
            }, this);

            Array.from(set).forEach(function (item) {
                if (item === null || item === 'NR') {
                    //筛选评级为NR或者null的非次级证券
                    //筛选评级为NR或者null的次级证券
                    scope.layerData.push((data.filter(r => r.Rating == item && r.IsEquity)).concat(
                        data.filter(r => r.Rating == item && !r.IsEquity)
                    ));
                } else  {
                    scope.layerData.push(data.filter(r => r.Rating == item));                
                }
            })
        }
        //get each layer html format
        function getLayerHtml(layer) {
            let data = options.data;
            let table = document.createElement('table');
            //define table width, height
            table.style.width = options.width + 'px';
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);
            let trHeiht = (layerNotional / scope.totalNotional) * options.height;
            table.style.height = trHeiht + 'px';
            table.className = 'St-Outer-Table';
            let tr = document.createElement('tr');
            //define each note width, name, payment info
            //tip: show only maxCol note
            if (layer.length > options.maxCols) {
                //find the select note
                let selectIdx = -1;
                for (let i = 0; i < layer.length; i++) {
                    if (layer[i].HasShot) {
                        selectIdx = i;
                        break;
                    }
                }
                //choose the method to display col
                if (selectIdx === -1) {
                    layer.length = options.maxCols;
                    buildEachNoteHtml(layer, tr, false, true);
                } else {
                    let idxContainer = [], transferFlag = true; //a container to store the max col note
                    let leftExtra = true, rightExtra = true;
                    let leftStep = 1, rightStep = 1;
                    idxContainer.push(selectIdx); //inital the container
                    while (idxContainer.length < options.maxCols) {
                        if (transferFlag) {
                            let temp = selectIdx - leftStep;
                            if (temp > -1) {
                                idxContainer.push(temp);
                            } else {
                                leftExtra = false;
                            }
                            leftStep++;
                        } else {
                            let temp = selectIdx + rightStep;
                            if (temp < layer.length) {
                                idxContainer.push(temp);
                            } else {
                                rightExtra = false;
                            }
                            rightStep++;
                        }
                        transferFlag = !transferFlag;
                    }
                    //find the special maxCols note
                    let allIndex = ',' + idxContainer.join(',') + ',';
                    let tempLayer = [];
                    layer.forEach(function(item, ind) {
                        if (allIndex.indexOf(',' + ind + ',') !== -1) {
                            tempLayer.push(item);
                        }
                    });
                    if (tempLayer.length > 0) {
                        buildEachNoteHtml(tempLayer, tr, leftExtra, rightExtra);
                    }
                }
            } else {
                buildEachNoteHtml(layer, tr, false, false);
            }
            table.appendChild(tr);
            return table;
        }

        function buildEachNoteHtml(layer, tr, hasLeftExtra, hasRightExtra) {
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);
            layer.forEach(function(note, idx) {
                let td = document.createElement('td');
                //define td width
                td.style.width = (note.Notional / layerNotional) * options.width + 'px';
                td.className = 'St-Inner-Td';
                //add background yellow color
                if (note.HasShot) {
                    td.className = 'St-Select';
                }
                //add payment info
                let payDiv = document.createElement('div');
                payDiv.style.height = (1 - (note.Principal / note.Notional)) * 100 + '%'; //not pay percent
                payDiv.className = 'St-Payment';
                //add text info
                let span = document.createElement('span');
                if ((hasLeftExtra && idx === 0 ) || 
                (hasRightExtra && idx == layer.length -1)) {
                    span.innerHTML = '...';
                } else {
                    span.innerHTML = note.Name;
                }
                span.className = 'St-Inner-Text';
                payDiv.appendChild(span);
                td.appendChild(payDiv);
                tr.appendChild(td);
            }, this);
        }
        buildStructureHtml();
    }

