(function ($, root) {
    // 进度条模块，渲染左右时间 更新进度条
    var startTime, duration, frameId, lastPer = 0;
    // 渲染总时间
    function renderAllTime(time) {
        duration = time;
        time = formatTime(time);
        $('.all-time').html(time);
    }
    // 处理时间格式
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    // 渲染左侧时间
    function start() {
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            update(per);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    // 更新html
    function update(p) {
        var time = p * duration;
        var perX = (p - 1) * 100 + '%';
        time = formatTime(time);
        $('.cur-time').html(time);
        $('.pro-top').css({
            transform: 'translateX('+ perX +')'
        })
    }

    // 停止更新
    function stop() {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop
    }

})(window.Zepto, window.player || (window.player = {}))