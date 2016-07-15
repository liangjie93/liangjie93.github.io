(function () {
	//幻灯片轮播
	Current = 0;
	ClickState = true;
	num = $("#IndexBanner .Item").size();
	i = 0;
	for (i = 0; i < num; i++) {
		$("#PicNum").append("<li></li>");
	}
	theInt = null;
	$("#IndexBanner .Item").eq(0).fadeIn(500);
	$("#PicNum li").eq(0).addClass("cur");
	$("#PicNum li").each(function (i) {
		$(this).click(function () {
			HuanDeng(i);
			Change(i);
			Current = i;
		});
	});
	HuanDeng = function (p) {
		clearInterval(theInt);
		theInt = setInterval(function () {
			p++;
			if (p >= num) {
				p = 0;
			}
			Change(p);
			Current = p;
		}, 5000);
	}
	HuanDeng(0);
	function Change(num) {
		$("#IndexBanner .Item").fadeOut(1300);
		$("#IndexBanner .Item").eq(num).fadeIn(1300, function () {
			ClickState = true;
		});
		$("#PicNum li").removeClass("cur");
		$("#PicNum li").eq(num).addClass("cur");
	}
	    var allHeight=$("body").height();
		var topHeight=$(".top").height();
		var bannerHeight=$(".banner").height();
		var firstHeight=topHeight+bannerHeight;
		var floorHeight=$(".floor").height();
		var floorBoxHeight=$(".floorBox").height();
		var secondHeight=firstHeight+floorBoxHeight;
		//悬浮框的变化
		$(window).scroll(function(){
			var iscrollTop = $(window).scrollTop();
			if(iscrollTop<=(secondHeight-478)){
				$(".windFloat").css("display","block");
			}else{
				$(".windFloat").css("display","none");
			}
			var i=Math.round((iscrollTop-firstHeight)/floorHeight);
	    })

})()