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

var array = [[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9],[4,3],[3,2],[16,9]];
// var videoMonitor = new VideoMonitor({
//     arr:array,
//     id:'headType'
// })

$("#headType").videoMonitor({
    arr:array,
    id:'headType'
})



