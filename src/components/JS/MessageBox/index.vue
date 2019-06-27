<template>
    <div class="messageBox">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div>
            <div v-if="cancel" @touchstart="handleCancel">{{ cancel }}</div>
            <div v-if="ok"  @touchstart="handleOk">{{ ok }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox'
}
</script>

<style scoped>
.messageBox{ width: 200px;height: 120px;border: 1px solid #ccc; border-radius: 4px;background: white;box-shadow: 3px 3px 3px 3px #ccc; position: absolute; top:50%; left:50%; margin: -60px 0 0 -100px; }
.messageBox h2 {text-align: center; line-height: 40px; font-size: 18px}
.messageBox p {text-align: center; line-height: 40px;}
.messageBox > div {display: flex; position: absolute; bottom: 0px;width: 100%;border-top: 1px solid #ccc;}
.messageBox > div div {flex:1; text-align: center;line-height: 30px; border-right: 1px solid #ccc;}
.messageBox > div div:last-child {border: none;}
</style>
