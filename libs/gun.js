(function ($) {
    $.fn.gun = function (option) {
        let onIndex = 1;
        let onScroll = false;

        if (!option || $.isEmptyObject(option)) {
            option = {
                time: 500,
                nav: null,
            }
        }
        if (!option.time) {
            option.time = 500;
        }
        
        option.class = $(this).selector;
        option.pages = $(this).length;

        function preventCombo() {
            // 滚动后设置一个倒计时 防止频繁出发滚动事件
            if (!onScroll) {
                onScroll = true;
                setTimeout(function () {
                    onScroll = false;
                }, option.time);
                return false;
            } else {
                return true;
            }
        }

        function setMtAndOn() {
            // 通过onIndex的值来设置content的translate值

            function currentOn(className) {
                // 给当前所在屏加上class——on
                $(className).removeClass('on');
                $(className).eq(onIndex - 1).addClass('on');
            }

            let mt = 0;
            mt = (onIndex - 1) * -100;
            $('.gun-content').css({
                'transition': 'all ' + option.time / 1000 + 's ease',
                'transform': 'translateY(' + mt + '%)'
            });
            setTimeout(function () {
                currentOn(option.class);
                if (option.nav) {
                    currentOn('.' + option.nav);
                }
            }, option.time);
        }

        $(document).on('mousewheel keydown', function () {
            if (preventCombo()) {
                return;
            };

            event = event || window.event;
            // 滚轮向下滚动event.wheelDelta为负 onIndex++
            if (event.wheelDelta < 0 || event.keyCode == 40) {
                if (onIndex < option.pages) {
                    onIndex++;
                }
            }
            // 滚轮向上滚动event.wheelDelta为正 onIndex--
            else if (event.wheelDelta > 0 || event.keyCode == 38) {
                if (onIndex > 1) {
                    onIndex--;
                }
            }

            setMtAndOn();
        });

        $('.' + option.nav).each(function (index) {
            $(this).click(function () {
                event.stopPropagation();
                onIndex = index + 1;
                setMtAndOn();
            })
        });

        (function swipe() {
            function slideDirect(dX, dY) {
                // 判断滑动方向  注意移动是与滑动相反的方向　左滑应该右移 
                var abs = Math.abs(dX) - Math.abs(dY);
                if (Math.abs(dX) < 10 && Math.abs(dY) < 10) {
                    // 没有滑动
                    return 0;
                } else if (abs > 0) {
                    if (dX > 0) {
                        // 右滑
                        return 1;
                    } else {
                        // 左滑
                        return -1;
                    }
                } else {
                    if (dY > 0) {
                        // 下滑
                        return 2;
                    } else {
                        // 上滑
                        return -2;
                    }
                }
            }
            // 移动端滑动事件
            var startX = 0;
            var startY = 0;
            var endX = 0;
            var endY = 0;

            $(document).on({
                'touchmove': function () {
                    event.preventDefault();
                },
                'touchstart': function () {
                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;
                },
                'touchend': function () {
                    if (preventCombo()) {
                        return;
                    };

                    endX = event.changedTouches[0].clientX;
                    endY = event.changedTouches[0].clientY;
                    var dX = endX - startX;
                    var dY = endY - startY;
                    switch (slideDirect(dX, dY)) {
                        case -2:
                            if (onIndex < option.pages) {
                                onIndex++;
                            }
                            break;
                        case 2:
                            if (onIndex > 1) {
                                onIndex--;
                            }
                            break;
                    }
                    setMtAndOn();
                }
            });
        })();
    }
})($);