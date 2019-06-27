<template>
    <div>
        <div>个人中心</div>
        <div>
            当前用户: {{ $store.state.user.name }}
            <a href="javascript:;" @touchstart="handleToLogout">退出</a>
            <div v-if="$store.state.user.isAdmin">用户身份：管理员
                <a href="/admin" target="_blank" >进入管理后台</a>
            </div>
            <div v-else>用户身份：普通用户</div>
            <div>
                <input type="file" name="file" value="上传头像" @change="handleToUpload">
                <img :src="$store.state.user.avatar" alt="" class="avatar">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
    name: 'center',
    methods:{
        handleToUpload(ev){
            var file = ev.target.files[0];
            var params = new FormData();
            params.append('file', file, file.name);
            var configs = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.axios.post('/api2/users/uploadAvatar', params)
            .then(res => {
                var status = res.data.status;
                var that = this;
                if( status === 0 ){
                    messageBox({
                        title: '信息',
                        content: '上传头像成功',
                        ok: '确定',
                        handleOk(){
                            that.$store.commit('user/USER_NAME', {
                                name: that.$store.state.user.name,
                                isAdmin: that.$store.state.user.isAdmin,
                                avatar: res.data.data.avatar + '?' + Math.random()
                            });
                        }
                    });
                }else{
                     messageBox({
                        title: '信息',
                        content: '上传头像失败',
                        ok: '确定'
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        handleToLogout(){
            this.axios.get('/api2/users/logout')
            .then(res => {
                var status = res.data.status;
                if( status === 0){
                    window.localStorage.removeItem('name');
                    window.localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME', { name: '', isAdmin: false, avatar: '' });
                    this.$router.push('/mine/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    beforeRouteEnter(to, from, next){
        axios.get('/api2/users/getUser')
        .then(res => {
            var statue = res.data.status;
            if(statue === 0){
                window.localStorage.setItem('name', res.data.data.username);
                window.localStorage.setItem('isAdmin', res.data.data.isAdmin);
                next(vm => {
                    vm.$store.commit('user/USER_NAME', { 
                        name: res.data.data.username,
                        isAdmin: res.data.data.isAdmin,
                        avatar: res.data.data.avatar,
                    });
                });
            }else{
                next('/mine/login');
            }
        })
        
    }
}
</script>

<style scoped>
.avatar { width: 100px; height: 100px; border-radius: 50%; overflow: hidden;}
</style>
