var root = window.player;
var dataList,len; 
var audio = root.audioManager;
var control;
var timer;
function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success: function(res){
            console.log(res)
            dataList = res;
            len = dataList.length;
            control = new root.controlIndex(len);
            root.render(res[0]);
            audio.getAudio(res[0].audio);
            root.pro.renderAllTime(res[0].duration);
            bindEvent();
        },
        error: function(err){
            console.log(err);
        }
    })
}

function bindEvent(){
    $('body').on('play:change',function(e, index){
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        if(audio.status == 'play'){
            rotated(0);
            audio.play()
            root.pro.start();
        }
        $('.img-box').attr('data-deg', 0)
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
        root.pro.renderAllTime(dataList[index].duration);
    })
    $('.prev').on('click',function(){
        var nowIndex = control.prev();
        $('body').trigger('play:change', nowIndex);
    })
    $('.next').on('click',function(){
        var nowIndex = control.next();
        $('body').trigger('play:change', nowIndex);
    })
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            var deg = $('.img-box').attr('data-deg');
            console.log(deg)
            rotated(deg);
            audio.play();
            root.pro.start();
        }else{
            clearInterval(timer);
            audio.pause();
            root.pro.stop();
        }
        $('.play').toggleClass('playing');
    })
}

function rotated(deg){
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg', deg)
        $('.img-box').css({
            'transform': 'rotateZ('+deg+'deg)',
            'transition': 'all 1s linear'
        })
    },200)

}

function bindTouch(){
    $('.slider-point').on('touchstart',function(){

    }).on('touchmove',function(){

    }).on('touchend',function(){

    })
}
getData("../mock/data.json");


// 信息+图片渲染到页面
// 点击按钮切换
// 音频播放，暂停 切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切歌