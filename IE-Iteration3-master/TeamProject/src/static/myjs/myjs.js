$(function (){
    console.log("success")
    var form1 = $("#form1");
  var ac_index = 1;
    fastFeedback(form1);
    $("#bmrBtn").click(function(){
        if(whetherShowValue(form1)){
            $("#bmrRes").text(parseInt(BMRCalculator(form1)*7));
            $("#d_bmrRes").text(parseInt(BMRCalculator(form1)));
            $("#ac_level").text(getActivityLevel(getMETList()));
            $("#ac_cal").text(parseInt(getWeeklyAcCal(getMETList())))
        }else{
            alert("weight or height may be wrong input");
        }
    });

    $("#ac_list").on("click",".add_ac",function(){

        ac_index++;
        var de_value = $(this).parent().parent().find(".detail_selections ").val();
        var time = $(this).parent().parent().find(".ac_time").val();

        if(de_value>0 && time >20){
            var temp = $("#ac_row_1").clone().attr({id:"ac_row_"+ac_index});
            temp.find(".ac_time").val("");
            temp.find(".ac_selections").attr({id:"select_ac_"+ac_index});
            temp.find(".detail_selections").attr({id:"select_ac_detail_"+ac_index});
            temp.find(".detail_selections").empty();
            temp.find(".ac_time").attr({id:"ac_time_"+ac_index});
            temp.find(".ac_time").css({"box-shadow":"","border":"1px soild #600"});
            temp.appendTo("#ac_list");
        }
        else{
            alert("Choose activity or input reasonable time please~");
        }
        timeFeedback(form1);
    });

    $("#ac_list").on("click",".del_ac",function(){

        var row_id = $(this).parent().parent().attr("id");
        if (row_id !== "ac_row_1") {
            $(this).parent().parent().remove();
        }
        else{
            alert("Cannot remove Because This is the first row")
        }

    });
});


var ac_data = [
                [["Please choose Activity first",0]],
                [["Non-hunting, general",4.3]],
                [["Shooting baskets",4.5],["Leisure play, Non-match",6],["play game in half-field ",6.5],["Game",8]],
                [["Cricket",4.8]],
                [["Leisure, 10km/hr",3.5],["Leisure, 15km/hr",5.8],["20km/hr",8],["BMX",8.5],["Unicycling",5]],
                [["Aerobic low impact",5],["Aerobic general",7.3],["Ballet, Modern, Jazz, vigorous effort",6.8]],
                [["Finshing",3.5]],
                [["Training",4],["Game",8]],
                [["Gymnastics",3.8]],
                [["Training",5.3],["Moderate pace",10.3]],
                [["Training",5.3],["Moderate pace",10.3]],
                [["Training", 6.5],["Game",8]],
                [["Training",8]],
                [["Training",5],["Game",6]],
                [["Backstroke, recreational",4.8],["Backstroke, general", 9.5],["Breaststroke, recreational",5.3],["Breaststroke, general",10.3],["Butterfly",13.8],["Freestyle",5.8],["Sidestroke",7]],
                [["Training",7]["Game",10]],
                [["Slower pace, novice performers",5.3],["Moderate pace",10.3]],
                [["Hitting balls, non-game play",5],["Doubles",6],["Training",7.3], ["Singles",8]],
                [["Shot, discus, hammer throw", 4],["High jump, long jump, javelin, pole vault",6],["Steeplechase, hurdles",10]],
                [["Game in gymnasium",6],["Game in beach",8]]
              ];

function provide_Detail(obj){

    var selected_id = obj.id.replace(/[^0-9]/ig,"");
    var de_id = "select_ac_detail_" + selected_id;
    var act = document.getElementById(obj.id);
    var de = document.getElementById(de_id);
    var act_index = act.selectedIndex;
    var de_content = ac_data[act_index];

    de.length = 0;

    for(var i = 0; i < de_content.length;i++){
        var op = document.createElement("option");
        op.innerHTML = de_content[i][0];
        op.value = de_content[i][1];
        de.add(op);
    }
}



function BMRCalculator(form1){
    var age = parseInt(form1.find("#age").val());
    var weight = parseFloat(parseFloat(form1.find("#weight").val()).toFixed(2));
    var height = parseFloat(parseFloat(form1.find("#height").val()).toFixed(2));
    var factor = get_Ac_Factor(getMETList());
    // 先判断性别
    // Male
    if (form1.find("#gender").val() === "0") {
        return factor*(66+(13.75*weight)+(5*height)-(6.8*age));
    }else{
        return factor*(665+(9.6*weight)+(1.8*height)-(4.7*age));
    }
}

function fastFeedback(form1){
    var heightInput = form1.find("#height");
    var weightInput = form1.find("#weight");

    heightInput.blur(function(event){
        var height = $(this).val();
        vHeight(height, event);

        if (!isVHeight(height)) {
            $(this).css({"box-shadow":"0 0 4px #811","border":"1px soild #600"});
        }else{
            $(this).css({"box-shadow":"0 0 4px #181","border":"1px soild #060"});
        }
    })

    weightInput.blur(function(event){
        var weight = $(this).val();
        vWeight(weight, event);

        if (!isVWeight(weight)) {
            $(this).css({"box-shadow":"0 0 4px #811","border":"1px soild #600"});
        }else{
            $(this).css({"box-shadow":"0 0 4px #181","border":"1px soild #060"});
        }
    })
}

function timeFeedback(form1){
    var timeList = form1.find(".ac_time");
    var idList = [];
    for(var i = 0; i < timeList.length; i++){
        idList.push(timeList[i].id);
    }
    for(var i = 0; i < idList.length; i++){
        t_id = "#"+idList[i];
        var temp = form1.find(t_id);
        temp.blur(function(event){
            var ac_time = $(this).val();
            if (!isVTime(ac_time)){
                $(this).parent().find("span").text("The reasonable time should be in 20 to 3000");
                $(this).css({"box-shadow":"0 0 4px #811","border":"1px soild #600"});
            }
            else{
                $(this).parent().find("span").text("");
                $(this).css({"box-shadow":"0 0 4px #181","border":"1px soild #060"});
            }
        })
    }

}

function vHeight(height, event){
    if(!isVHeight(height)){
        $("#height-feedback").text("The reasonable height should be in 50 to 250");
        event.preventDefault();
    }else{
        $("#height-feedback").text("");
    }
}

function vWeight(weight, event){
    if(!isVWeight(weight)){
        $("#weight-feedback").text("The reasonable weight should be in 10 to 200");
        event.preventDefault();
    }else{
        $("#weight-feedback").text("");
    }
}

function vTime(ac_min, ac_row_id, event){
    if(!isVTime(time)){
        $("#time-feedback_"+ac_row_id).text("The reasonable time should be in 20 to 3000");
    }
    else{
        $("#time-feedback_"+ac_row_id).text("");
    }

}

function whetherShowValue(form1){
    var height = form1.find("#height").val();
    var weight = form1.find("#weight").val();
    return isVHeight(height) && isVWeight(weight);

}

function isVTime(ac_time){
    return (ac_time>20 && ac_time<3500);
}

function isVHeight(height){
    return (height < 250 && height > 50 );
}

function isVWeight(weight){
    return (weight < 200 && weight > 10);
}

function getMETList(){
    var tempList = [];
    t = $(".ac_time");
    de = $(".detail_selections");
    for(var i =0; i < de.length; i++){
        tempList.push([parseInt(t[i].value),parseFloat(de[i].value)]);
    }
    return tempList;
}

function getActivityLevel(m_list){
    var met = 0;
        var valueOfPE = parseInt($("#PEClass").val());
        met += valueOfPE;
    for(var i = 0; i < m_list.length; i++){
        met = met + (m_list[i][0]*m_list[i][1]);
    }
    if(met<=600){
        return "Sedentary";
    }
    else if(met>600 && met<=1500){
        return "Lightly";
    }
    else if(met > 1500 && met <= 2500){
        return "Moderately";
    }
    else if(met > 2500){
        return "Very Active";
    }
}

function get_Ac_Factor(m_list){

    var met = 0;
        var valueOfPE = parseInt($("#PEClass").val());
        met =+ valueOfPE;
    for(var i = 0; i < m_list.length; i++){
        met = met + (m_list[i][0]*m_list[i][1]);
    }
    if(met<=600){
        return 1.1;
    }
    else if(met>600 && met<=1500){
        return 1.275;
    }
    else if(met > 1500 && met <= 2500){
        return 1.35;
    }
    else if(met > 2500){
        return 1.525;
    }

}

function getWeeklyAcCal(m_list){
        var valueOfPE = parseInt($("#PEClass").val());
    var cal = 0;
        cal += valueOfPE;
    var weight = parseFloat($("#weight").val());
    for(var i = 0; i < m_list.length; i++){
        cal += ((weight*m_list[i][1]*3.5)/200)*m_list[i][0]
    }
    return cal;
}

function op_ex(evt, level_ac) {
    var i, ex_content, examples;
    ex_content = document.getElementsByClassName("ex_content");
    for (i = 0; i < ex_content.length; i++) {
        ex_content[i].style.display = "none";
    }
    examples = document.getElementsByClassName("examples");
    for (i = 0; i < examples.length; i++) {
        examples[i].className = examples[i].className.replace(" active", "");
    }
    document.getElementById(level_ac).style.display = "block";
    evt.currentTarget.className += " active";
}
