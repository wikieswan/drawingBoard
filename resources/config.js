/**
 * Created by wikies.wan on 2015/3/2.
 */
requirejs.config({
    baseUrl: 'resources',
    urlArgs: '0.0.0',
    paths: {
        'jquery':'bower_lib/jquery',
        'domReady':'lib/domReady',
        'app': 'app',
        'mod' : 'mod'
    },
    shim: {
        
    },
    waitSeconds: 100
});


requirejs(['domReady','mod/tab','mod/rect','mod/circle','mod/point','mod/line','mod/removeGh'],function(domReady,tab,rect,circle,point,line,removeGh) {
domReady(function () {
    $('.tab').click(function(e){
        tab(e);
    })
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var svg = d3.select('.svg').append('svg')
        .attr('width',width+margin.left+margin.right)
        .attr('height',height+margin.top+margin.bottom);

    var ghStack = [];
    
    $('svg').on('click',function(e){
        if(!e) e = window.event;
        var x = e.offsetX,
            y = e.offsetY;
        var cate = $('#left .current').data('cate');
        var target = e.target;
       

        if($(target).attr('obj')==='gh'){

            return false;
        }
      
        if(cate==='select'){

        }
        else if(cate==='point'){
            var _point = point(svg,x,y);
            ghStack.push({
                type:'add',
                cate:'point',
                value:_point
            });

        }
        else if(cate==='line'){

        }
    });
    function stopBubble(e) {
        //如果提供了事件对象，则这是一个非IE浏览器
        if ( e && e.stopPropagation )
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        else
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
    }
    $('.svg').on('mousedown',function(e){
        console.log(22)
 
        if(!e) e = window.event;
        var x0 = e.offsetX,
            y0 = e.offsetY;
        var cate = $('#left .current').data('cate');
        if(cate==='line'){
            var _line = line(svg,x0,y0,x0,y0);
            $(this).on('mousemove',function(em){
                var xm = em.offsetX,
                    ym = em.offsetY;
                //按下shift键画水平直线
                if(e.shiftKey&&!e.altKey){ 
                    ym=y0;
                }
                //按下alt键画垂直直线
                else if(!e.shiftKey&&e.altKey){ 
                    xm=x0;
                }
                _line.reDraw(xm,ym);
                
            });
            
            $(this).on('mouseup',function(ee){
                $('.svg').off('mousemove');
                var _x1 = _line.line.attr('x1'),
                    _y1 = _line.line.attr('y1'),
                    _x2 = _line.line.attr('x2'),
                    _y2 = _line.line.attr('y2');
                console.log(_x1-_x2===0&&_y1-_y2===0)
                if(_x1-_x2===0&&_y1-_y2===0){
                    removeGh({
                        type:'add',
                        cate:'line',
                        value : _line,

                    })
                }
                else{
                    ghStack.push({
                        type:'add',
                        cate:'line',
                        value : _line
                    });
                }
            });
        }
        
    })


    $(document).keydown(function(e){
        if(!e) e = window.event;
        // ctrlKey + z 
        if(e.ctrlKey){
            if((e.keyCode || e.which) == 90){
                if(ghStack.length<1)
                    return false;
                var _pop = ghStack.pop();
                removeGh(_pop)
            }
        }
    });

});
});
