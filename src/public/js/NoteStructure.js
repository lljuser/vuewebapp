/*
 * @Author: CNABS 
 * @Date: 2018-02-02 11:18:42 
 * @Last Modified by: bzhou
 * @Last Modified time: 2018-02-06 11:55:22
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
            div.style.width = options.width + 'px';
            div.style.height = options.height + 'px';
            div.className = 'St_Out_Div';
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
            let outDiv = document.createElement('div');
            //define table width, height
            outDiv.style.width = options.width + 'px';
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);
            let divHeiht = (layerNotional / scope.totalNotional) * options.height;
            outDiv.style.height = divHeiht + 'px';
            outDiv.style.width = options.width + 'px';
            outDiv.className = 'St_Inner_Div';
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
                    buildEachNoteHtml(layer, outDiv, divHeiht, false, true);
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
                        buildEachNoteHtml(tempLayer, outDiv, divHeiht, leftExtra, rightExtra);
                    }
                }
            } else {
                buildEachNoteHtml(layer, outDiv, divHeiht, false, false);
            }
            return outDiv;
        }

        function buildEachNoteHtml(layer, outDiv, divHeiht, hasLeftExtra, hasRightExtra) {
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);
            layer.forEach(function(note, idx) {
                let noteDiv = document.createElement('div');
                //define td width
                noteDiv.style.width = ((note.Notional / layerNotional) * options.width - 2) + 'px'; //minus the border px
                noteDiv.style.height = divHeiht + 'px';
                noteDiv.className = layer.length > 1 ? 'St_Inner_Td' : 'St_Inner_Td_Single';
                //add background yellow color
                if (note.HasShot) {
                    noteDiv.className = layer.length > 1 ? 'St_Select' : 'St_Select_Single';
                }
                if (layer.length > 1 && idx === layer.length - 1) {
                    noteDiv.style.styleFloat = 'right'; //ie
                    noteDiv.style.cssFloat = 'right'; //火狐
                }
                //add payment info
                let payDiv = document.createElement('div');
                payDiv.style.height = (1 - (note.Principal / note.Notional)) * 100 + '%'; //not pay percent
                payDiv.style.width = noteDiv.style.width;
                payDiv.className = 'St_Payment';
                //add text info
                let span = document.createElement('span');
                if ((hasLeftExtra && idx === 0 ) || 
                (hasRightExtra && idx == layer.length -1)) {
                    span.innerHTML = '...';
                } else {
                    span.innerHTML = formatPercent(note.Name, note.Notional, scope.totalNotional);
                }
                span.className = 'St_Inner_Text';
                span.style.lineHeight = divHeiht + 'px';
                span.style.width = noteDiv.style.width;
                noteDiv.appendChild(span);
                noteDiv.appendChild(payDiv);
                outDiv.appendChild(noteDiv);
            }, this);
        }

        function formatPercent(text, cur, total) {
            let ratio = ((cur / total) * 100).toFixed(0) + '%';
            return [text, ' ', ratio].join('');
        }
        buildStructureHtml();
    }

