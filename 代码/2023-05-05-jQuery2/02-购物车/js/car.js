$(function () {
    /*  模块1：全选复选按钮  */
    /*  模块5：选中商品添加背景 */
    // 大控制小：把全选按钮checkall的状态赋值给三个小按钮
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'))
        $('.j-checkbox, .checkall ').prop('checked', $(this).prop('checked'))   // 并集选择器

        if ($(this).prop('checked')) {
            // 所有商品大盒子添加这个类
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 取消类
            $('.cart-item').removeClass('check-cart-item');
        }

    })

    // 小控制大:如果选中按钮的数量=全部复选框的数量 ,那么就把全选按钮选上
    $('.j-checkbox').change(function () {
        $('.j-checkbox').change(function () {
            if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
                $('.checkall').prop('checked', true)
            } else {
                $('.checkall').prop('checked', false)   // 不选中全选按钮
            }
        })

        if ($(this).prop('checked')) {
            // 只有自己添加这个类
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 取消类
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })


    /*  模块2：修改购物车商品数量   */
    // 点击加号
    $('.increment').click(function () {
        let n = $(this).siblings('input').val()
        n++
        $(this).siblings('input').val(n)
        let p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)     // 获得价格
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + (n * p).toFixed(2))     // 计算小计
        getSum()
    })

    // 点击减号
    $('.decrement').click(function () {
        let n = +$(this).siblings('input').val() // val()返回字符串,注意格式转换
        if (n === 1) return false // n=1时,不能再减少;return后的代码不会执行
        n--
        $(this).siblings('input').val(n)
        let p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)     // 获得价格
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + (n * p).toFixed(2))     // 计算小计
        getSum()

    })

    // 模块2优化：用户手输文本框商品数量
    $('.itxt').change(function () {
        let n = $(this).val() // 获得输入的值
        let p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)     // 获得单价
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (n * p).toFixed(2))     // 输出小计
        getSum()
    })

    // 模块3：购物车总计部分
    function getSum() {
        let count = 0  // 总数量
        let money = 0  // 总价格
        $('.itxt').each(function (i, ele) {
            count += parseInt($(ele).val())
        })
        $('.amount-sum em').text(count)

        $('.p-sum').each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1))    // 注意:是获得元素的内容值,一定要添加text
        })
        $('.price-sum em').text('￥' + money.toFixed(2))
    }
    getSum()

    /* 模块4：删除购物车内容 */
    function getClear() {
        // 点击删除按钮
        $('.p-action').click(
            function () {
                $(this).parents('.cart-item').remove()
                getSum()
            }
        )
        // 点击删除选中商品
        $('.remove-batch').click(function () {
            $('.j-checkbox:checked').parents('.cart-item').remove()
            getSum()
        })
        // 点击清空购物车
        $('.clear-all').click(function () {
            $('.cart-item').remove()
            getSum()
        })
    }
    getClear()



})