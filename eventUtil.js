<script>
//判断浏览器支持的事件处理类型，跨浏览器事件处理程序
var eventUtil={
  //element,type,handler分别为添加事件的元素，动作(click等)，和执行函数
  //添加事件
  addHandler: function(element,type,handler){
    if(element.addEventListener){   //dom 2级事件处理
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){  //IE事件处理
      element.attachEvent('on'+type, handler);
    }else{                          //dom 0级事件处理
      element['on'+type]=handler;
    }
  },
  //删除事件
  removeHandler: function(element,type,handler){
    if(element.removeEventListener){   //dom 2级事件处理
      element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){  //IE事件处理
      element.detachEvent('on'+type, handler);
    }else{                          //dom 0级事件处理
      element['on'+type]=null;
    }
  },
  //获取事件
  getEvent: function(event){
    return event?event:window.event;
  },
  //获取事件类型
  getType: function(event){
    return event.type;
  },
  //获取事件元素
  getElement: function(event){
    return event.target || event.srcElement;
  },
  //阻止默认程序
  preventDefault: function(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue=false;
    }
  },
  //阻止冒泡
  stopPropagation: function(event){
    if(event.stopPropagation){
      event.stopPropagation();
    }else{
      event.cancelBubble=true;
    }
  }
}
//添加调用方法eg：eventUtil.addHandler(button1, 'click', showMes);
//删除调用方法eg: eventUtil.removeHandler(button1, 'click', showMes);
</script>
