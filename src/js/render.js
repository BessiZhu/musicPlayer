// 实现页面渲染
(function($, root){
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo(info){
        var str = '<div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>';
        $('.song-info').html(str);
    }
    function renderLike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    
    root.render = function (data){
        renderImg(data.image);
        renderInfo(data);
        renderLike(data.isLike);
    };
    
})(window.Zepto, window.player || (window.player = {}))

