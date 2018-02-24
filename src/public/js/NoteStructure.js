import router from '../../router/abs';
// import router from ' ./router/abs';
/*
 * @Author: CNABS 
 * @Date: 2018-02-02 11:18:42 
 * @Last Modified by: mingxia.dong
 * @Last Modified time: 2018-02-24 10:44:55
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
            minWidth: 15,
            minHeight: 15,
            maxCols: 5, // for more artistic, should be odd number
            data: [] //note data list
        }
        const px = 'px';
        // Populate defaults
        for (var key in defaults) {
            if (typeof options[key] == 'undefined') {
                options[key] = defaults[key];
            }
        }
        //scope data
        var scope = {
            layerData: [],
            totalNotional: 0,
            minLayerNum: 0,
            minLayerNotional: 0,
            minNoteNum: 0,  //each layer should clear the value
            minNoteNotional: 0, //each layer should clear the value
            accuNotional: 0,
            accuPercent: 0
            //above two props used for the accuracy of each note percent
        }
        function buildStructureHtml() {
            let div = document.createElement('div');
            div.style.width = options.width + px;
            div.style.height = options.height + px;
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
                    //determine the minus height for each layer
                    let layerArr = [];
                    scope.layerData.forEach(function (layer, index) {
                        if (layer instanceof Array && 
                            layer.length > 0) {
                                let sums = 0;
                                layer.forEach(r => sums += r.Notional);
                                let isMinusHeight = (sums / scope.totalNotional) < (options.minHeight / options.height);
                                if (isMinusHeight) {
                                    scope.minLayerNum++;
                                    scope.minLayerNotional += sums;
                                    layerArr[index] = true;
                                } else {
                                    layerArr[index] = false;
                                }
                        }
                    });
                    scope.layerData.forEach(function (layer, index) {
                        if (layer instanceof Array && 
                            layer.length > 0) {
                                div.appendChild(getLayerHtml(layer, scope.minLayerNotional, layerArr[index]));
                        }
                    });
                }
                try{
                document.getElementById(options.container).appendChild(div);
                }
                catch(error){

                }
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
        function getLayerHtml(layer, minLayerNotional, isMinHeight) {
            let data = options.data;
            let outDiv = document.createElement('div');
            //define table width, height
            outDiv.style.width = options.width + px;
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);

            let divHegiht = isMinHeight ? options.minHeight :  
            layerNotional / (scope.totalNotional - scope.minLayerNotional) * (options.height - scope.minLayerNum * options.minHeight);

            outDiv.style.height = divHegiht + px;
            outDiv.style.width = options.width + px;
            outDiv.className = 'St_Inner_Div';
            //set the default width
            scope.minNoteNum = 0;
            scope.minNoteNotional = 0;
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
                    buildEachNoteHtml(layer, outDiv, divHegiht, false, true);
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
                        buildEachNoteHtml(tempLayer, outDiv, divHegiht, leftExtra, rightExtra);
                    }
                }
            } else {
                buildEachNoteHtml(layer, outDiv, divHegiht, false, false);
            }
            return outDiv;
        }

        function buildEachNoteHtml(layer, outDiv, divHegiht, hasLeftExtra, hasRightExtra) {
            let layerNotional = 0;
            layer.forEach((r) => layerNotional += r.Notional);
            // determine the min height num
            let layerArr = [];
            layer.forEach(function(r, index) {
                if (r.Notional / layerNotional < (options.minWidth / options.width)) {
                    scope.minNoteNum++;
                    scope.minNoteNotional += r.Notional;
                    layerArr[index] = true;
                } else {
                    layerArr[index] = false;
                }
            });

            layer.forEach(function(note, idx) {
                let noteDiv = document.createElement('div');
                //define td width
                let noteWidth = layerArr[idx] ? options.minWidth :  
                note.Notional / (layerNotional - scope.minNoteNotional) * (options.width - scope.minNoteNum * (options.minWidth + 2)) - 2;

                noteDiv.style.width = noteWidth + px;
                noteDiv.style.height = divHegiht + px;
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
                    let textSp = document.createElement('span')
                    textSp.innerText = 
                        formatPercent(note.Name, note.Notional, scope.totalNotional);
                    textSp.className = 'St_Text_Min';
                    span.appendChild(textSp);
                }
                span.className = 'St_Inner_Text';
                span.onclick=function(){
                    var pathStr = '/securityDetail/'+note.NoteId;
                    if(options.fromExp)
                    {
                        location.href = 'abs.html#/securityDetail/'+note.NoteId;
                    }
                    else{
                        if(JSON.stringify(router.history.current.query)=='{}')
                        {
                            pathStr = pathStr+'?id='+note.NoteId
                        }
                        router.push(
                            {
                            path:pathStr,
                            },
                        );
                 }
                }
                if (note.HasShot) {
                    span.style.color = '#000';
                }
                span.style.lineHeight = divHegiht + px;
                span.style.width = noteDiv.style.width;
                noteDiv.appendChild(span);
                noteDiv.appendChild(payDiv);
                outDiv.appendChild(noteDiv);
            }, this);
        }

        function formatPercent(text, cur, total) {
            if (total - cur === scope.accuNotional) {
                let lastRatio = (100 - scope.accuPercent) + '%';
                return [text, ' ', lastRatio].join('');
            }
            scope.accuNotional += cur;
            let ratio = ((cur / total) * 100).toFixed(0) + '%';
            scope.accuPercent += parseInt(ratio.substr(0, ratio.length - 1));
            return [text, ' ', ratio].join('');
        }
        buildStructureHtml();
    }

