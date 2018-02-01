window.onload=function(){
	//页面初始化加载
	waterfall('main','box');
	//模拟的后台数据
	var dataInt={"data":[{"src":"1.jpeg"},{"src":"2.jpeg"},{"src":"3.jpeg"},{"src":"4.jpeg"},{"src":"5.jpeg"}]}
	window.onscroll=function(){
		if (checkScrollSlide()) {
			var oParent=document.getElementById('main');
			//渲染后台数据
			for (var i = 0; i < dataInt.data.length; i++) {
				//创建一个新box
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				//创建新的pic
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				//创建图片
				var oImage=document.createElement('img');
				oImage.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImage);
			}
			//使新增的数据块重新排列
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//取出main下所有box
	var oParent=document.getElementById(parent);
	var oboxs=getByClass(box,oParent);
	//计算页面显示的列数
	var boxWidth=oboxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/boxWidth);
	//设置main的宽度
	oParent.style.cssText='width:'+boxWidth*cols+'px;margin: 0 auto;';
	//将每列的高度存放到数组中
	var hArr=[];
	for (var i = 0; i < oboxs.length; i++) {
		if(i<cols){
			//第一行
			hArr.push(oboxs[i].offsetHeight);
		}else{
			//第二行及以后
			var minH=Math.min.apply(null, hArr);//最小值
			var index=getMinhIndex(hArr,minH);//最小值的索引
			//设置盒子新的位置
			oboxs[i].style.position='absolute';
			oboxs[i].style.top=minH+'px';
			oboxs[i].style.left=boxWidth*index+'px';
			//oboxs[i].style.left=oboxs[index].offsetLeft+'px';
			//更新数组
			hArr[index]+=oboxs[i].offsetHeight;
		}
	}

}

//检测是否具备加载新图片的条件
function checkScrollSlide(){
	//取所有盒子
	var oParent=document.getElementById('main');
	var oboxs=getByClass('box',oParent);
	//最后一个盒子高度+一半自身高度
	var lastBoxH=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
	//页面滚走的距离
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	//浏览器高度
	var height=document.body.clientHeight||document.documentElement.clientHeight;

	return (lastBoxH<scrollTop+height)?true:false;
}

//获取最小值的索引
function getMinhIndex(arr,val){
	for (var i in arr) {
		if (arr[i]===val) {
			return i;
		}
	}
}

function getByClass(clsName,parent){
	//传来了父元素的ID ／ 没有传父元素则使用document
	var eles=[],
		// * 获取oParent下的所有元素
		elements=parent.getElementsByTagName('*');
	for (var i = 0; i < elements.length; i++) {
		//从所有元素中取得想要的
		if (elements[i].className==clsName) {
			eles.push(elements[i]);
		}
	}
	return eles;
}