function $(selector){ 	//selector="btn"
	return $.prototype.init(selector);
}

$.prototype = {
	init:function(selector){
		this.dom = document.getElementById(selector);
		return this;
	},
	click:function(fun){
		this.dom.onclick = fun;
	}
}