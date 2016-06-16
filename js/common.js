function touchMove() {
    var winW = document.documentElement.clientWidth;
    var desW = 640;
    var fontSize = 100;
    var rem = desW / fontSize;
    if (winW > desW) {
        winW = desW;
    }
    document.documentElement.style.fontSize = winW / rem + 'px';
    var audioDemo = document.querySelector("#audioDemo"),
        musicBtn = document.querySelector("#music");
    window.setTimeout(function () {
        audioDemo.play();
        audioDemo.addEventListener("canplay", function () {
            musicBtn.style.display = "block";
            musicBtn.className = "musicMove";
        }, false);
        musicBtn.addEventListener("touchend", function () {
            if (audioDemo.paused) {
                audioDemo.play();
                musicBtn.className = "musicMove";
                return;
            }
            audioDemo.pause();
            musicBtn.className = "";
        }, false);
    }, 500);
    document.addEventListener("touchmove", function (ev) {
        ev.preventDefault();
    }, false);
    var oLis = document.querySelectorAll("#banner>li");
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });
    function start(e) {
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
        this.startTime = +new Date();
    }
    function move(e) {
        e.preventDefault();this.style.webkitTransition = "";
        var step = 1 / 4;
        var moveTime = +new Date();
        if (moveTime - this.startTime > 30) {
            var moveTouchY = e.changedTouches[0].pageY;
            var moveTouchX = e.changedTouches[0].pageX;
            var movePosY = moveTouchY - this.startY;
            var movePosX = moveTouchX - this.startX;
            if (Math.abs(movePosX) > Math.abs(movePosY)) {
                this.flag = true;
                var index = this.index;
                [].forEach.call(oLis, function () {
                    if (arguments[1] != index) {
                        arguments[0].style.display = "none";
                    }
                    arguments[0].id = "";
                });
                var slate = 0;
                if (movePosX > 0) {/*>*/
                    this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
                    slate = 3.5;
                    duration = -winW + movePosX;

                } else {/*<*/
                    this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
                    slate = -3.5;
                    duration = winW + movePosX;
                }
                this.style.webkitTransform = 'translate( ' + slate + 'rem) scale('
                    + (Math.abs(this.startX - movePosX) / winW * step) + ')';
                this.style.webkitTransition = "1s ease-out";
                oLis[this.prevSIndex].style.webkitTransform = "translate(" + duration + "px,0)";
                oLis[this.prevSIndex].id = 'zIndex';
                oLis[this.prevSIndex].style.display = "block";
            }
        }
    }
    function end() {
        if (this.flag) {
            oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevSIndex].style.webkitTransition = "1s ease-out";
            var that = this.index;
            oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                oLis[that].style.webkitTransform = "translate(0,0)";
            });
            this.flag = false;
        }
    }
}
touchMove();