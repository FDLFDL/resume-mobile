function touchMove() {
    var winW = document.documentElement.clientWidth;
    var desW = 640;
    var fontSize = 100;
    var rem = desW / fontSize;
    if (winW > desW) {
        winW = desW;
    }
    document.documentElement.style.fontSize = winW / rem + 'px';
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
        e.preventDefault();
        var step = 1 / 4;
        var moveTime = +new Date();
        if (moveTime - this.startTime > 35) {
            var moveTouchY = e.changedTouches[0].pageY;
            var moveTouchX = e.changedTouches[0].pageX;
            var movePosY = moveTouchY - this.startY;
            var movePosX = moveTouchX - this.startX;
            if (Math.abs(movePosY) > Math.abs(movePosX)) {
                this.flag = true;
                var index = this.index;
                this.style.webkitTransition = "";
                [].forEach.call(oLis, function () {
                    arguments[0].id = "";
                    if (arguments[1] != index) {
                        arguments[0].style.display = "none"
                    }
                    arguments[0].firstElementChild.id = "";
                });
                if (movePosY > 0) {/*>*/
                    this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
                    duration = -winW + movePosY;
                } else {/*<*/
                    this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
                    duration = winW + movePosY;
                }
                this.style.webkitTransform = 'translate(0,' + movePosY + 'px) scale(' + (1 - Math.abs(this.startY / 2 - movePosY) / winW * step) + ')';
                oLis[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";
                this.style.webkitTransition = "1.5s linear";
                oLis[this.prevSIndex].id = 'zIndex';
                oLis[this.prevSIndex].style.display = "block";
            }
        }
    }

    function end() {
        if (this.flag) {
            oLis[this.prevSIndex].style.webkitTransition = "1.2s ease-out";
            oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function (ev) {
                if (ev.target.tagName == "LI") {
                    this.style.webkitTransition = "";
                }
                this.firstElementChild.id = "page" + (this.index + 1);
            }, false);
        }
        this.flag = false;
    }
}

touchMove();