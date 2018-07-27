# jquery.videoMonitor.js
如何去快速阅读一个插件与简单的去写一个插件

### 基本使用

## 基本思想
-----响应领导分享活动，最近改源码问题比较多，阅读不少插件，写个简单关于插件的分享，希望对前端与前端有兴趣的同学一起讨论。抛砖引
玉，欢迎来踩，对大家有点点帮助都好。首先，为什么要去学习读写插件，这是对自己的锻炼，js基础加强。为什么要加强js基础，我始终觉得学
好js后万千框架如过眼云烟，就好比树干与树枝，树枝只会一段时间在某个高度，而后会被时间剪掉，而树干是可以长出树枝的。所以不要因为不
熟悉一种新的框架感到懊恼。如果你得树干够粗你得树枝会更高。准确来说这不是一个插件，只是本周我的一个需求，写一个video监控。九宫格
可切换12，16宫格并且适配各种高宽比例。以他实例改成一个简单的插件。


## 原始逻辑代码
```
(function($){
    function init(id){
        type(0,id,[16,9]);
        type(1,id,[3,2]);
        type(2,id,[4,3]); 
    }

    function type(index,id,arr){
        var subMian = $("." + id)[0];

        var subMianHeight = subMian.offsetHeight;
        var subMianWidth = subMian.offsetWidth;
        
        var videoWidth = $($("." + id + " video")[index]).width();
        var widthBySubMianHeight = subMianHeight/arr[1]*arr[0];
        if(Math.abs(videoWidth - widthBySubMianHeight) < 1){
            return
        }
        var widthP = widthBySubMianHeight/subMianWidth*100;
        if(widthP > 100){
            widthP = 100;
            heightP = subMianWidth*arr[1]/arr[0]/subMianHeight*100;
            $($("." + id + " video")[index]).css({"height":heightP  + "%"});
        }
        $($("." + id + " video")[index]).css({"width":widthP + "%"});
    }

    init("sub-main");
    html(9,"sub-main")
    

    function html(num,className){
        var html = ''; 
        for(var i= 0;i<num;i++){
            html += '<div class="'+className+'"><video src="video/demo.mp4" controls="controls"></video><div class="microphone"><img src="img/microphone.png"></div><div class="video-camera"><img src="img/video-camera.png"></div></div>'
        }
        
        $('.main').html(html);

        $(".microphone").click(function(){
            if(this.firstElementChild.getAttribute('src') == "img/microphone.png"){
                this.firstElementChild.src = 'img/microphone-close.png';
            }else{
                this.firstElementChild.src = 'img/microphone.png'
            }
        })
    
        $(".video-camera").click(function(){
            if(this.firstElementChild.getAttribute('src') == "img/video-camera.png"){
                this.firstElementChild.src = 'img/video-camera-close.png';
            }else{
                this.firstElementChild.src = 'img/video-camera.png'
            }
        })
    }

    $("#headType").click(function(e){
        var id = e.target.id == "" ? e.target.parentElement.id : e.target.id;
        switch(id){
            case "headType9":
                html(9,"sub-main");
                $('#'+id).addClass('active');
                $('#'+id).siblings().removeClass('active');
                init("sub-main");
                break;
            case "headType12":
                html(12,"sub-main12");
                $('#'+id).addClass('active');
                $('#'+id).siblings().removeClass('active');
                init("sub-main12");
                break;
            case "headType16":
                html(16,"sub-main16");
                $('#'+id).addClass('active');
                $('#'+id).siblings().removeClass('active');
                init("sub-main16");
                break;
            }
    })
})(jQuery)

```

## 改后代码
```
;(function($, window, document, undefined){
    var defaults = {};
    function VideoMonitor(options){
        this.elem = null;
        this.init(options,9,"sub-main");
    }

    VideoMonitor.prototype = {
        constructor : VideoMonitor,
        
        init:function(options,num,className){
            this.id = options.id;
            this.arr = options.arr;
            this.elem = document.getElementById(this.id);
            this.render(num,className);
            this.bindEvent();        
        },
        render:function(num,className){
            var html = ''; 
            for(var i= 0;i<num;i++){
                html += '<div class="'+className+'"><div class = "ks-name">哈哈</div><video src="video/demo.mp4" controls="controls"></video><div class="microphone"><img src="img/microphone.png"><div class="open-tip">开启音频通话</div></div><div class="video-camera"><img src="img/video-camera.png"><div class="open-tip">开启视频通话</div></div></div>'
            }
            
            $('.main').html(html);

            $(".microphone").click(function(){
                if(this.firstElementChild.getAttribute('src') == "img/microphone.png"){
                    this.firstElementChild.src = 'img/microphone-close.png';
                    this.lastElementChild.innerText = "关闭音频通话";
                }else{
                    this.firstElementChild.src = 'img/microphone.png';
                    this.lastElementChild.innerText = "开启音频通话"
                }
            })
        
            $(".video-camera").click(function(){
                if(this.firstElementChild.getAttribute('src') == "img/video-camera.png"){
                    this.firstElementChild.src = 'img/video-camera-close.png';
                    this.lastElementChild.innerText = "关闭视频通话";
                }else{
                    this.firstElementChild.src = 'img/video-camera.png';
                    this.lastElementChild.innerText = "开启视频通话";
                }
            })

            $('.microphone img').hover(function(){
                $(this).siblings().show();
            },function(){
                $(this).siblings().hide();
            })
        
            $('.video-camera img').hover(function(){
                $(this).siblings().show();
            },function(){
                $(this).siblings().hide();
            })

            for(var i = 0;i < num; i++){
                this.type(i,className,this.arr[i]);
            }
        },
        type:function(index,className,arr){
            var subMian = $("." + className)[0];
            
            var subMianHeight = subMian.offsetHeight;
            var subMianWidth = subMian.offsetWidth;
            
            var videoWidth = $($("." + className + " video")[index]).width();
            var widthBySubMianHeight = subMianHeight/arr[1]*arr[0];
            if(Math.abs(videoWidth - widthBySubMianHeight) < 1){
                return
            }
            var widthP = widthBySubMianHeight/subMianWidth*100;
            if(widthP > 100){
                widthP = 100;
                heightP = subMianWidth*arr[1]/arr[0]/subMianHeight*100;
                $($("." + className + " video")[index]).css({"height":heightP  + "%"});
            }
            $($("." + className + " video")[index]).css({"width":widthP + "%"});
        },
        bindEvent:function(){
            var self = this;

            $("#"+this.id).click(function(e){
                var id = e.target.id == "" ? e.target.parentElement.id : e.target.id;
                switch(id){
                    case "headType9":
                        self.render(9,"sub-main");
                        $('#'+id).addClass('active');
                        $('#'+id).siblings().removeClass('active');
                        break;
                    case "headType12":
                        self.render(12,"sub-main12")
                        $('#'+id).addClass('active');
                        $('#'+id).siblings().removeClass('active');
                        
                        break;
                    case "headType16":
                        self.render(16,"sub-main16")
                        $('#'+id).addClass('active');
                        $('#'+id).siblings().removeClass('active');
                        break;
                }
            });

        }
    }
    $.fn.videoMonitor = function (options) {
        options = $.extend(defaults, options || {});
 
        return new VideoMonitor( options);
    }

})(jQuery, window, document);
```

## 写的思路也是读的思路

原型模式设计的插件类似我们超声中的时间插件，bootstrap。甚至vue框架种接口设计，它的实例化即订阅观察者设计模式有机会再探讨。如果我
们简单的修改此类的插件，如何使用去看他的default或者options的object中参数。换位思考，如果你是作者你会在哪里使用这些参数，当你只
想改某一处是搜索这个参数，然后顺着它们去摸逻辑。而如果阅读整体理解，需要从他的构造函数进入，每个构造函数会去调用原型中init方法，
而所有的方法都在原型中即Function.propotype.xxx。一步一步往下追，就不会一头雾水。例vue框架中vue实例构造。


```
// 从五个文件导入五个方法（不包括 warn）
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 Vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 将 Vue 作为参数传递给导入的五个方法
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// 导出 Vue
export default Vue

而他的某一方法
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // ... _init 方法的函数体，此处省略
  }
}
```
如果不是很熟悉原型构造器这样的词语，这个时候读懂一份插件你就有深刻理解了。而当我们熟练了js这些基本的使用与js设计模式
(我有一本介绍模式不错的书有需要找我，任何语言设计模式都是有帮助的)

这个时候我们去学习某个框架还是vue：

```
var vm = new Vue({
    el: '#app',
    data: {
        test: 1
    }
})
```
当我第一眼看到这段代码，我就立马想起了，这不就是实例构造，入门已经如此容易你还会觉得很难去用吗。如果把我们九宫格的封装去掉，单独拉出来：
```
var array = [[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9]];
var videoMonitor = new VideoMonitor({
    arr:array,
    id:'headType'
})
```
是不是像极了。当然这只是基本，如果有下次，当对vue有更深后希望再好好聊。毕竟作者太强，我太弱。我毕竟也没用过，讲错希望大神放过。


## 搞这些的作用
当然会有同学问，一个单页面简单逻辑，搞这么多骚操作有luan用,那我只能说真的很有用。我们的项目中每一个大的tab都有一个表格，而这个表格又有
很多操作初始化增删改查等，如果想象把这个表格写成一个构造函数，那么只要一个new，我们的后端伙伴只要简单的ajax请求后调用我们构造的实例方
法就好了，每一个这样的页面会减少多少代码呢？就像九宫格，我们的伙伴只要在arr加入他要的比例video，后面他们就不操心，即使再有一个9宫格需求，
无非在new一个。华为他们的项目有自己的tiny.ui构建自己的风格，我也希望有一天我们壮大到有自己的yizhen.ui。构建自己风格，即不零散也不依赖
bootstrap。


#### html
```
<div class="head-type" id="headType">
</div>
```

#### script
```
var array = [[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9]];
$("#headType").videoMonitor({
    arr:array,
    id:'headType'
})

```

### Options
arr:16个格子中你需要的比例的video三种(16/9,4/3,3/2)最多16个
id:'headType'一个简单切换tab，demo不准确使用id只是一个demo

## 写在最后
为什么代码有js又有jq，只是我想起什么方法就用了。所有这些都是鄙人的愚见。如有高见要尽快指出，别误己误认。没有功劳也有苦劳(技术活该赏)，谢谢大家的观看。