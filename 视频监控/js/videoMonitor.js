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




