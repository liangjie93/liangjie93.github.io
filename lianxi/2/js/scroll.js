// var addEvent = (function(){
//         if (window.addEventListener) {
//             return function(el, sType, fn, capture) {
//                 el.addEventListener(sType, fn, (capture));
//             };
//         } else if (window.attachEvent) {
//             return function(el, sType, fn, capture) {
//                 el.attachEvent("on" + sType, fn);
//             };
//         } else {
//             return function(){};
//         }
//     })(),
//     stopEvent = function(event) {
//         if (event.stopPropagation) {
//             event.stopPropagation();
//         } else {
//             event.cancelBubble = true;
//         }

//         if (event.preventDefault) {
//             event.preventDefault();
//         } else {
//             event.returnValue = false;
//         }
//     }
    // isFirefox 是伪代码，大家可以自行实现
	//以修改
   // mousewheel = window.DOMMouseScroll ? "DOMMouseScroll" : "mousewheel";
	
    // object 是伪代码，你需要注册Mousewheel 事件的元素
    window.onload = function(){
        var i = 0;
        var oBody = document.getElementsByTagName('body');
        var nowTop = 0; 
        var nextTop = 0;
        var speed = 0;
        var playing = true;
        var q = $("#windFloat_con li").length;
        var zz=215+(56*(q-1));
        // console.log(q)
        var _j = "";
        $(".float_line").css("height",zz+"px");
        var cHeight = window.innerHeight||document.documentElement.clientHeight;
        $(document).on('mousewheel DOMMouseScroll',function(event){
           var wheelDelta = event.originalEvent.wheelDelta||-(event.originalEvent.detail);
            // zoomIn, zoomOut 是伪代码，需要实现的缩放事件
            wheelDelta > 0 ? win.prev(): win.next();
			return false;
        }); 
        $(".windFloat_con li").click(function(){
			var j=$(this).index()+2;
            console.log(j);
			i>j ? win.prev(i-j) : win.next(j-i);
        }) 
        var win = {
            prev:function(m){
                if(!playing){
                    return false;
                }
                win.storeTop();
                win.prevTop(m);
                win.animate();
                win.animateDown();
            },
            next:function(m){
                if(!playing){
                    return false;
                } 
                win.storeTop();
                win.nextTop(m);
                win.animate();
                win.animateDown();
            },
            storeTop:function(){
                nowTop = document.body.scrollTop+document.documentElement.scrollTop;
				if(nowTop>0&&i==0){ 
                    console.log(nowTop);
				// 页面刷新初始化
					if(nowTop==110){

						i=1;
					}else if(nowTop == 690){
						i==2;
					}else if(nowTop >600*(8-2)+690){
						i==9;
					}else{
						i=(nowTop-690)/600+2;
					}	
				} 
				speed=nowTop;   
            },
            nextTop:function(m){

            	m?(i+=m):i++; 
                 console.log(i);
                if(i == 1){
                    nextTop = 110;
                }else if(i == 2){
                    nextTop = 690;
                    console.log(i)
                    console.log(nextTop);
                }else if(i >9){
                    i = 9;
                    console.log(i);
                }else{
                    if( i > 2 ){
                        document.getElementById('windFloat').style.position = 'fixed';
                        document.getElementById('windFloat').style.top = '0';
                    }
                    if( i==9 ){
                    	nextTop = nowTop + 1000 - cHeight;
                    }else{
                    	nextTop = nowTop + 600*(m?m:1); 
                    } 
                }
            },
            prevTop:function(m){
                m?(i-=m):i--;
                if( i < 1 ){
                    i = 0;
                    nextTop = 0
                }else if(i == 1){
                     nextTop = 110;
                    document.getElementById('windFloat').style.position = 'absolute';
                    document.getElementById('windFloat').style.top = '-22px';
                }else if(i == 2){
					 nextTop = 690;//第二张的顶部的高度
				}else if( i==8 ){
                	nextTop = nowTop - (1000 - cHeight);
                	console.log(nowTop);
                }else{
                    nextTop = nowTop - 600*(m?m:1);
                }
                console.log(i);
            },
            animate:function(){
                if(!playing){
                    return false;
                }
                playing = false;
                timer=setInterval(function(){
                    if(nextTop > nowTop){//看这里 只要记住初始top值为0,向下滑动就是把top变负值就能理解了
                       // console.log(speed);
                        speed +=30;
                        if(speed > nextTop)speed = nextTop;//如果speed的值超出目标值,将它纠正为目标值
                    }else{
                        speed -=30;
                        if(speed < nextTop)speed = nextTop;
                    }
                    document.body.scrollTop =speed;
					document.documentElement.scrollTop =speed;
                    if(speed == nextTop){//如果speed等于目标值值 退出定时器
                        clearInterval(timer);
                        playing = true;
                    }
                },25);
            },
            animateDown:function(){
                if ( i >= 2 && i < 8 ) { 
                    $(".windFloat_con li").eq(i-2).addClass("checked").siblings().removeClass("checked");
                    $(".windFloat_con li.checked").siblings('li').find('.floatCon_right_con').css({'display':'block','overflow':'hidden'}).animate({height:"0px"},500);
                    $(".floatCon_right_con").eq(i-2).animate({height:"160px"},500);
                };
                
            }
        }

    }