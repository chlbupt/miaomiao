const state = {
    name: window.localStorage.getItem('name') || '',
    isAdmin: window.localStorage.getItem('isAdmin') || false,
    avatar: '',
};

const actions = {

};

const mutations = {
    USER_NAME(state, payload){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.avatar = payload.avatar;
    }

};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}