let artiest_index_chart_height = "300px";
// Get dom in html
let artiest_index_chart_dom = document.getElementById("echarts-artiest-index");
let artiest_descr_dom = document.getElementById("echarts-artiest-descr");
let artiest_img_dom = document.getElementById("echarts-artiest-img");
artiest_index_chart_dom.style.height = artiest_index_chart_height;
artiest_img_dom.style.height = artiest_index_chart_height;
// Initial chart
let artiest_index_chart = echarts.init(artiest_index_chart_dom);
//----------------------Data----------------------
//--------------------Location--------------------
let wid_artiest_index = "88%";
let lef_artiest_index = "9%";
let top_artiest_index = "10";
let hei_artiest_index = "95%";
//----------------------Grid----------------------
let artiest_index_chart_grid = {
    width: wid_artiest_index,
    left: lef_artiest_index,
    top: top_artiest_index,
    height: hei_artiest_index,
    tooltip: {show: false},
};
//----------------------Axis----------------------
let artiest_index_chart_xAxis = {
    gridIndex: 0,
    type: 'value',
    show: true,
};
let artiest_index_chart_yAxis = {
    gridIndex: 0,
    type: 'category',
    show: true,
    data: ['Aritest Name'],
};
//---------------------Series---------------------
let artiest_index_chart_list = [];
// let artiest_index_chart_data = [
//     {"name" : "Artiest 1", "value": 1},
//     {"name" : "Artiest 2", "value": 2},
//     {"name" : "Artiest 3", "value": 3},
//     {"name" : "Artiest 4", "value": 4},
//     {"name" : "Artiest 5", "value": 5},
//     {"name" : "Artiest 6", "value": 6},
//     {"name" : "Artiest 7", "value": 7},
// ];
function to_artiest_index_series_list(in_data, in_list) {
    for (let in_key in in_data) {
        // console.log(in_data[in_key])
        in_list.push(
            {
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                gridIndex: 0,
                label: {
                    show: true,
                    position: 'insideLeft',
                    formatter: "Index: " + "{c} " + in_data[in_key]["name"]
                },
                data: [in_data[in_key].value]
            }
        )
    }
    return in_list
}
artiest_index_chart_list = to_artiest_index_series_list(artiest_index_chart_data, artiest_index_chart_list);
//------------------Generate Graph------------------
let artiest_index_chart_option = {
    backgroundColor: chart_config_background_color,
    grid :artiest_index_chart_grid,
    series: artiest_index_chart_list,
    xAxis: artiest_index_chart_xAxis,
    yAxis: artiest_index_chart_yAxis,
    toolbox: chart_config_tool_box,
    tooltip: {show: true},
};
if (artiest_index_chart_option && typeof artiest_index_chart_option === "object") {
     artiest_index_chart.setOption(artiest_index_chart_option, true);
}
//------------------Description ------------------
function set_artiest_description(index){
    document.getElementById("echarts-artiest-descr").innerText = artiest_index_chart_data[index]["artiest_description"];
    document.getElementById("echarts-artiest-img").data = artiest_index_chart_data[index]["pic_url"];
}
set_artiest_description(0);
//---------------------Click ---------------------
artiest_index_chart.on("click", function(param){
    // setTimeout(function(){
        let XHR = new XMLHttpRequest();
        let request_data = {"artiest": artiest_index_chart_data[param.seriesIndex].name};

        XHR.open('POST', "/api/filter_artiest");
        XHR.setRequestHeader('content-type', 'application/json');

        XHR.send(JSON.stringify(request_data));
        XHR.onreadystatechange = function(){
              if(XHR.readyState === 4 && XHR.status === 200){
                  let t_data = JSON.parse(XHR.responseText);
                  console.log(t_data)
                  art_work_in_gallery = t_data;
                  append_images();
              }
        };
    // }, 3000);
    console.log(artiest_index_chart_data[param.seriesIndex])
    set_artiest_description(param.seriesIndex)
});