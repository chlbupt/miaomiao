import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function(){
    return function( opts ){
        var defaults = {
            title: '',
            content: '',
            cancel: '',
            ok: '',
            handleOk: null,
            handleCancel: null
        };
    
        var MyComponent = Vue.extend(MessageBox);
        
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }

        var vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title : defaults.title,
                content : defaults.content,
                ok: defaults.ok,
                cancel: defaults.cancel
            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el);
    }
})();