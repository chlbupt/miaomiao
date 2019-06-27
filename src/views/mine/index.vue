<template>
    <div id="main">
        <Header title="我的喵喵" />
        <div id="content">
            <router-view />
        </div>
        <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/tabBar'
import Login from '@/components/login'
export default {
    name: 'mine',
    components:{
        Header,
        TabBar,
        Login
    }
}
</script>

<style scoped>

</style>
