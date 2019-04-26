function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success: function(res){
            console.log(res);
        },
        error: function(err){
            console.log(err);
        }
    })
}

getData("../mock/data.json");

// 信息+图片渲染到页面
// 点击按钮切换
// 音频播放，暂停 切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切歌