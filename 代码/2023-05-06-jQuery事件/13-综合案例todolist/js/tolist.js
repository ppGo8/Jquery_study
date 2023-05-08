$(function () {
    // 绑定回车键盘抬起事件
    $('#title').on('keyup', function (e) {
        // 按下Enter键；其他判断方法：e.keycode===13
        if (e.key === 'Enter') {
            // 获得用户输入
            const title = $(this).val()

            // 判断是否有本地存储
            const list = getList()
            if (!list) {
                // 没有本地存储,直接存储
                list.push({ title: title, done: false })
                saveList(list)
            } else {
                // 有本地存储:没办法直接追加到本地存储
                // 操作：1.取出本地存储的数组形式 2.追加到数组 3.存新数组到本地存储
                list.push({ title: title, done: false })
                saveList(list)
            }

            // 清空用户输入内容
            $(this).val('')

            // 用户输入新list的渲染
            render()
        }
    })


    // 本地存储数据渲染加载到页面
    function render() {
        const list = getList()
        if (list) {
            // 重要:每次渲染之前删除所有节点
            $('ol,ul').empty()
            let todoCount = 0   //正在进行的个数
            let doneConut = 0   //已经完成的个数
            // jQuery遍历数据、对象方法
            $.each(list, function (i, ele) {
                if (ele.done) {
                    const li = $('<li><input type="checkbox" checked="checked"><p></p>' + '<a href="#" data-id=' + i + '></li>')  // 并不支持模板字符串,所以使用+号拼接多个字符串
                    // 修改内容
                    li.children('p').html(ele.title)
                    // 添加到父盒子最前面
                    $('ul').prepend(li)
                    doneConut++
                } else {
                    // 创建新节点
                    // 问题:可不可以使用index获得各个小圆点的索引号? 不行，因为a标签被小li包围,各个a之间不是兄弟的关系;而index()获得是元素在兄弟之间的索引号
                    const li = $('<li><input type="checkbox"><p></p>' + '<a href="#" data-id=' + i + '></li>')  // 并不支持模板字符串,所以使用+号拼接多个字符串
                    // 修改内容
                    li.children('p').html(ele.title)
                    // 添加到父盒子最前面
                    $('ol').prepend(li)
                    todoCount++
                }
            })
            console.log(todoCount);
            console.log(doneConut);
            $('#todocount').text(todoCount)
            $('#donecount').text(doneConut)

        }
    }
    // 页面加载后的渲染
    render()


    // 读取本地存储数据(经常使用,所以封装了一个函数)
    function getList() {
        const list = localStorage.getItem('list')
        if (list) {
            // 返回数组类型的对象,后面可以直接使用
            return JSON.parse(list)
        } else {
            // 查不到，返回空数组；程序更加合理和完善，返回的数据类型一样
            return []
        }
    }


    // 保存本地存储数据,虽然只有一行代码但是常用,所以也写成了函数
    function saveList(list) {
        localStorage.setItem('list', JSON.stringify(list))
    }

    // 删除操作
    // 事件委托：给父亲,只能用on,因为li是动态生成的
    $('ol,ul').on('click', 'a', function () {
        // 两种方法都可以获得自定义属性 1.$(this).data('id') 2.$(this).attr('data-id')
        let index = $(this).attr('data-id')
        const list = getList()
        // 删除数组的中的元素
        list.splice(index, 1)
        saveList(list)

        // 重新渲染,还是每次渲染都所有的数据简单：而不是输入一条渲染一条新的;删除一条??不知道怎么操作了
        render()
    })

    // 正在进行的和已经完成的选项操作
    $('ol,ul').on('click', 'input', function () {
        // 获取本地存储
        const list = getList()
        // 修改数据
        let index = $(this).siblings('a').attr('data-id') // 不管是在false还是true：data-id是由这个数组在本地存储里的id决定的
        list[index].done = $(this).prop('checked') // 妙:true和false通过前面的check决定；这样可以避免单独分析
        // 存储到本地
        saveList(list)
        render()
    })



})