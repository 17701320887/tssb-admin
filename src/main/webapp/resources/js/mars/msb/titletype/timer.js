var HH=23;
var MM=59;
var SS=59;
var mode={};
var LOOP;

function loopInit(id,sign){
	LOOP=true;
	change(id,sign);
}
function loopBreak(){
	LOOP=false;
}
function getTag(id,tagName,str,attr){
	var tagArray=document.getElementById(id).getElementsByTagName(tagName);
	for(var i=0;i<tagArray.length;i++){
		if(eval("tagArray[i]."+attr)==str){
			return tagArray[i];
		}
	}
}
function setMode(id,hms){
	var selectInputPre = getTag(id,'input',mode[id+"mode"],'name');
	var selectInput = getTag(id,'input',hms,'name');
	selectInputPre.style.backgroundColor="#FFFFFF";
	mode[id+"mode"]=hms;
	selectInput.style.backgroundColor="#7FFFD4";
}
function change(id,sign){
	if(LOOP){
		var num=getTag(id,'input',mode[id+"mode"],'name').value-0;
		var changeNum=eval(num+sign+1)+"";
		if(changeNum>=0&changeNum<=eval(mode[id+"mode"])){
			changeNum=complete(changeNum);
			getTag(id,'input',mode[id+"mode"],'name').value=changeNum;
		}
		setTimeout("change('"+id+"','"+sign+"')",200);
	}
   initVal(id);
}
function complete(num){
	while(!(num.length==2)){
		num="0"+num;
	}
	return num;
}
function returnTimer(id){
	var strHH=getTag(id,'input','HH','name').value;
	var strMM=getTag(id,'input','MM','name').value;
	var strSS=getTag(id,'input','SS','name').value;
	return strHH+':'+strMM+':'+strSS;
}
function checkNum(id,sign,value){
	if(value<10){
		value=complete(value);
		getTag(id,'input',sign,'name').value=value;
        initVal(id);
	}else{
		if(value>eval(sign)){
			getTag(id,'input',sign,'name').value=eval(sign);
            initVal(id);
		}
	}
}
function keyDown(id,key,onFocusObject){
	var nextObject;
	if(onFocusObject.name=='HH'){
		nextObject='MM';
	}else if(onFocusObject.name=='MM'){
		nextObject='SS';
	}else if(onFocusObject.name=='SS'){
		nextObject='HH';
	}
	if(!((key>=48 && key<=57)||(key>=96 && key<=105)||(key==8)||(key==46)||(key>=37 && key<=40))){
		event.returnValue=false;
	}
	if(key==37||key==39){
		getTag(id,'input',nextObject,'name').focus();
	}
	if(key==38){
		loopInit(id,'+');
	}
	if(key==40){
		loopInit(id,'-');
	}

}
function keyUp(key){
	if(key==38||40){
		loopBreak();
    }
}
function showTimer(tempId){
    var timeVal = $("#"+tempId).prev().find("input").val();
    var hh = 10,mm=10,ss=10;
    if(timeVal){
        var timeModel = timeVal.split(":");
        hh = timeModel[0];
        mm = timeModel[1];
        ss = timeModel[2];
    }
	mode[tempId+"mode"] = "HH";
	var timerConent='<table cellpadding="0" cellspacing="0" style="border:#949495 1px solid;table-layout : fixed" >'+
		'<tr style="display: block; width:95px;height:30px; padding-left: 10px; border-radius: 3px; ">'+
		'<td width="60" style="border:0px;display:block; height: 28px;line-height: 28px; float: left;"><input type="text"  maxlength="2" style="border:0;background:transparent;width:15px;" name="HH" value="'+hh+'" onchange="checkNum('+"'"+tempId+"',"+"'HH',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','HH'"+')"/><input type="text"  style="border:0;background:transparent;width:6px;" readOnly=true  value=":"/><input type="text"  maxlength="2" style="border:0;background:transparent;width:15px;" name="MM" value="'+mm+'" onchange="checkNum('+"'"+tempId+"',"+"'MM',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','MM'"+')"/><input type="text"  style="border:0;background:transparent;width:6px;"  readOnly=true value=":"/><input type="text"  maxlength="2" style="border:0;background:transparent;width:15px; " name="SS" value="'+ss+'" onchange="checkNum('+"'"+tempId+"',"+"'SS',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','SS'"+')"/></td>'+
		'<td width="20" style="background: #eee; border:0px;display:block; height: 28px;line-height: 28px; float: right;"><input type="button" hidefocus="true" style=" margin-top: 2px; outline: none; border-width:0px;display:block;background:url(/resources/image/msb/up.jpg) no-repeat; background-size: 60% 60%; background-position: 5px 2px; width:20px;height:14px;" onmouseup="loopBreak()" onmousedown="loopInit('+"'"+tempId+"','+'"+')"/><input type="button" hidefocus="true" style="border-width:0px; display: block; background:url(/resources/image/msb/down.jpg) no-repeat; outline: none; background-size: 60% 60%;background-position: 5px 2px; width:20px;height:14px;" onmouseup="loopBreak()" onmousedown="loopInit('+"'"+tempId+"','-'"+')"/></td>'+
		'</tr>'+
		'</table>';
	document.getElementById(tempId).innerHTML=timerConent;
    initVal(tempId);

}

/**
 * 初始化时间
 * @param timeId
 */
function initVal(timeId) {
    var obj;
    if(timeId=="time1"){
        obj = $("input[name='doTime']");
    }else if(timeId=="time2"){
        obj = $("input[name='countDownTime']");
    }else if(timeId=="time3"){
        obj = $("input[name='courseLimitTime']");
    }
    obj.val(returnTimer(timeId));
}