define([],function(){
	return function(ghObj){
		var type = ghObj['type'],
			cate = ghObj['cate'],
			obj = ghObj['value'];
		console.log(ghObj)
		if(type==='add'){
			if(cate==='point'){
				obj.remove();
			}
			else if(cate==='line'){
				obj.startP.remove();
				obj.line.remove();
				obj.endP.remove();
			}
		}
		else if(type==='mod'){

		}
		
	}
})