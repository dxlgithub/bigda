$(function() {
    getUserInfo()

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
            },
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }


            // }
        })

        function renderAvatar(user) {
            console.log(user);
            var name = user.username || user.nickname
            $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            if (user.user_pic !== null) {
                $('.layui-nav-img').attr('src', user.user_pic).show()
                $('.text-avatar').hide()
            } else {
                $('.layui-nav-img').hide()
                var first = name[0].toUpperCase()
                $('.text-avatar').html(first).show()
            }
        }

        var layer = layui.layer

        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            });

        })

    }


})