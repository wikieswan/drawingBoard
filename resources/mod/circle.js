/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-21 16:45:20
 * @version $Id$
 */

define([],function(){
	return function(svg,cx,cy,r){
		var circle = svg.append('circle')
			.attr('cx',cx)
			.attr('cy',cy)
			.attr('r',r);
		return circle;		
	}
});