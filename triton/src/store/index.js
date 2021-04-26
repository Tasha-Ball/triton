import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);  //получаем доступ к хранилищу, чтобы мы могли обращаться к нему

export default new Vuex.Store({
    state: {
        data: {},
        itemsOnPage: [],
        itemsInCart: [],
        cart: {},
        img: {}
    },
    mutations: {
        // каталог товаров
        setData (state, payload) {
            state.data = { ...state.data, ...payload.newData };
            state.itemsOnPage.push(...Object.keys(payload.newData))
        },  
        // добавить в корзину
        setCart (state, id) {
            if (state.cart[id]) {
                state.cart[id].quantity++;
            } else {
                state.cart[id] = state.data[id];
                Vue.set(state.cart[id], 'quantity', 1);
                state.itemsInCart.push(id);
            };
        },
        // удалить товар из корзины
        removeFromCart (state, index) {
            let id = state.itemsInCart[index];
            delete state.cart[id];
            state.itemsInCart.splice(index, 1);
        },
        // увеличить количество товара в корзине
        enlarge (state, index) {
            state.cart[index].quantity++;
        },
        // уменьшить количество товара в корзине
        reduce (state, index) {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--;
            }
        }

    },
    getters: {
        getData: state => state.data,
        getItemsOnPage: state => state.itemsOnPage,
        getCart: state => state.cart,
        getItemsInCart: state => state.itemsInCart,
    },
    actions: {
        // получить данные с сервера
        requestData ({ commit }, page) {
            fetch(`/itemslist/${page}`, {
                method: 'GET',
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                commit('setData', { newData: res });
            })
            .catch((err) => {
                alert('No more pages!')
            });
        },
        // добавить в корзину
        addToCart ({commit}, id) {
            commit('setCart', id);
        },
        // заказать товар (список товаров записываем в cart.json)
        sendOrder ({}, data) {
            fetch ('/cartlist', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        },
        // добавить новый товар (действие совершает администратор)
        loadItem ({commit}, data) {
            fetch ('/itemslist', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                commit('setData', { newData: res });
            });
        },
        // удалить товар из корзины
        deleteFromCart ({commit}, index) {
            commit('removeFromCart', index)
        },
        // увеличить количество товара в корзине
        enlargeNumber ({commit}, index) {
            commit('enlarge', index)
        },
        // уменьшить количество товара в корзине
        reduceNumber ({commit}, index) {
            commit('reduce', index)
        }
    },
});
