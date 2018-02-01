$(window).on('load',function(){
	waterfall();
	var dataInt={"data":[{"src":"1.jpeg"},{"src":"2.jpeg"},{"src":"3.jpeg"},{"src":"4.jpeg"},{"src":"5.jpeg"}]}
	$(window).on('scroll', function() {
		if (checkScrollSlide()) {
			$.each(dataInt.data, function(index, val) {
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src', 'images/'+$(val).attr('src')).appendTo(oPic);
			});
			waterfall();
		}
	});
})

function waterfall(){
	//取所有box
	var $boxs=$('#main>div');
	//计算宽度和列数
	var w=$boxs.eq(0).outerWidth(); //outerWidth为加过填充之后的宽度
	var cols=Math.floor($(window).width()/w);
	//设置css
	$('#main').width(cols*w).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index, el) {
		var h = $boxs.eq(index).outerHeight();
		if (index<cols) {
			//第一行图片
			hArr[index]=h;
		}else{
			//第二行及以后
			var minH=Math.min.apply(null, hArr);
			var minHIndex=$.inArray(minH, hArr);
			$(el).css({
				'position':'absolute',
				'top': minH + 'px',
				'left': minHIndex * w + 'px',
			})
			//更新数组
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	});
}

function checkScrollSlide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}