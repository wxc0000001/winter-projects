function getByClass(clsName,parent){
	//传来了父元素的ID ／ 没有传父元素则使用document
	var oParent=parent?document.getElementById(parent):document,
		eles=[],
		// * 获取oParent下的所有元素
		elements=oParent.getElementsByTagName('*');
	for (var i = 0; i < elements.length; i++) {
		//从所有元素中取得想要的
		if (elements[i].className==clsName) {
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(){
	var oTitle=getByClass('','')[0];
	//鼠标点击事件
	oTitle.onmousedown=fnDown;
}

function fnDown() {
	// body...
	var oDrag=document.getElementById('');
	document.onmousemove=function(event) {
		// body...
		event = event || window.event;
		oDrag.style.left=event.clientX+'px'-;
		oDrag.style.top=event.clientY+'px'-;
	}
}

//有边框的动画中获取css中的属性值
function getStyle(obj, attr){
	if(obj.currentStyle) return obj.currentStyle[attr];
	else return getComputedStyle(obj,false)[attr];
}