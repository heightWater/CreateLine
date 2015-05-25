cb.util.createLine=function(pre,current){
	for(var i=0;i<current.length;i++){
		for(var j=0;j<pre.length;j++){
			CreateLine(pre[j],current[i]);
		};
	};
	
	function CreateLine(preDom,currentDom){
		var preEle = {pageX:pageX(preDom),pageY:pageY(preDom),Ele:preDom,height:preDom.offsetHeight,width:preDom.offsetWidth};
		var currentEle = {pageX:pageX(currentDom),pageY:pageY(currentDom),Ele:currentDom,height:currentDom.offsetHeight,width:currentDom.offsetWidth};
		var line = {x:Math.abs((preEle.pageX-currentEle.pageX)>0?(preEle.pageX-currentEle.pageX-currentEle.width):(preEle.pageX-currentEle.pageX+preEle.width)),y:Math.abs((preEle.pageY-currentEle.pageY)>0?(preEle.pageY-currentEle.pageY+preEle.height/2-currentEle.height/2):(preEle.pageY-currentEle.pageY-currentEle.height/2+preEle.height/2))}; 
		
		line.width = Math.sqrt(line.x*line.x +line.y*line.y);
		line.pageX = (preEle.pageX-currentEle.pageX)>0?(currentEle.pageX+currentEle.width):(preEle.pageX+preEle.width);
		line.pageY = (preEle.pageY-currentEle.pageY)>0?(preEle.pageY+preEle.height/2):(preEle.pageY+preEle.height/2);
		line.angle = 360*Math.atan(line.y/line.x)/(2*Math.PI);
		line.angle =  (preEle.pageX-currentEle.pageX)>0||(preEle.pageY-currentEle.pageY)>0?line.angle:-line.angle;
		//line.angle = 45;
		//line.angle = line.angle*Math.PI/180;
		var style='';//,angle:360*Math.atan(this.y/this.x)/(2*Math.PI)
		var params ={a:Math.cos(line.angle),b:Math.sin(line.angle),c:-Math.sin(line.angle),d:Math.cos(line.angle)}//,e:line.pageX,f:line.pageY
		params.e = line.pageX*(1-params.a)-params.c*line.pageY;
		params.f = Math.abs(line.pageY*(1-params.a)-params.b*line.pageX);
		//var $line = $('<div style="width:'+line.width+'px;-webkit-transform:rotate('+line.angle+'deg);-webkit-transform:translate('+line.pageX+'px,'+line.pageY+'px);border-bottom:1px solid #666666;"></div>')
		var $line = $('<div style="position:absolute;top:'+line.pageY+'px;left:'+line.pageX+'px;-webkit-transform:rotate('+-line.angle+'deg);width:'+line.width+'px;border-bottom:1px solid #E7E7E7;"></div>')
		
		//var $line = $('<div style="-webkit-transform:matrix('+params.a+','+params.b+','+params.c+','+params.d+','+params.e+','+params.f+');width:'+line.width+'px;border-bottom:1px solid #666666;"></div>')
		//var $line = $('<div style="-webkit-transform:matrix('+Math.cos(line.angle)+','+Math.sin(line.angle)+','+Math.sin(line.angle)+','+Math.cos(line.angle)+',0,0);width:'+line.width+'px;border-bottom:1px solid #666666;"></div>')
		$line.css({'-moz-transform-origin':'top left','-webkit-transform-origin': 'top left','-o-transform-origin': 'top left','transform-origin': 'top left'});
		$('body').append($line);
	};
	function pageX(elem) {
		//检查我们是否已经到了根元素
		return elem.offsetParent ?
	    //如果我们还能往上，则将当前偏移与向上递归的值相加
	    elem.offsetLeft + pageX( elem.offsetParent ) :
	    //否则，取当前偏移
	    elem.offsetLeft;
	};
	//计算元素的Y(垂直，顶)位置
	function pageY(elem) {
		//检查我们是否已经到了根元素
		return elem.offsetParent ?
	    //如果我们还能往上，则将当前偏移与向上递归的值相加
	    elem.offsetTop + pageY( elem.offsetParent ) :
	    //否则，取当前偏移
	    elem.offsetTop;
	}
}
