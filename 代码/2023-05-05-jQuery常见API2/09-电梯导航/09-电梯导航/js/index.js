$(function () {

    // 优化：用户刷新 导航栏也显示；
    // 问题：当用户在有电梯导航的时候刷新，页面继续在之前那个位置，但是电梯导航却消失了
    // 原因：电梯导航是由页面滚动事件触发的，刷新后没有页面滚动事件不会显示，因此封装成函数在页面首次加载时调用
    getTool()
    function getTool() {
        if ($(document).scrollTop() >= $('.recommend').offset().top) {
            $('.fixedtool').fadeIn()
        } else {
            $('.fixedtool').fadeOut()
        }
    }

    // 继续优化：互斥锁flag
    // 问题：点击电子导航栏想跳转版心内容时，电子导航栏目的地与终点之间的栏目会依次闪烁被选中的红色背景
    // 原因：页面滚动事件造成的
    // 优化方法：使用flag互斥锁，当点击事件发生时，flag=false禁止滚动事件内容执行；点击事件结束后，flag=tru，允许滚动事件的执行。
    let flag = true

    /* 滑动家用电器开始显示电梯导航*/
    /* 大控制小:页面滚动，电梯导航切换*/
    $(window).scroll(function () {
        getTool()
        // 判断页面应该划到哪个位置
        if (flag) {
            $('.floor .w').each(function (i, ele) {
                // 只要发生了滚动事件,每个元素都会一次执行以下内容
                // 为了更好的体验，减了100：是为了当该内容区域的标题快到达浏览器的顶部时,对应内容的电梯导航亮起来
                if ($(document).scrollTop() >= $(ele).offset().top - 100) {
                    // 页面滚动,下面的i不断的变化
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
                }
            })
        }
    })


    /* 小控制大：点击电梯导航，页面切换 */
    $('.fixedtool li').click(function () {
        // $(this).index()   // 注意this不添加""
        flag = false
        $('html,body').stop().animate({
            scrollTop: $('.floor .w').eq($(this).index()).offset().top
        }, function () {
            flag = true // 回调函数,点击动画跳转结束后,修改为true；允许页面滚动的回调函数做操作
        })
        $(this).addClass('current').siblings().removeClass('current')
    })
})