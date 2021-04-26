<template>
    <div>
        <div class="header center">
            <router-link :to="{ name: 'catalog' }">
                <img
                    class="header__account"
                    :src="logo"
                    alt="logo">
            </router-link>
            <div class="header__right">
                <router-link :to="{ name: 'form' }">
                    <img
                        class="header__account"
                        :src=" account "
                        alt="img">
                </router-link>
                <div class="catalog_text">
                    <router-link :to="{ name: 'cart' }">
                    <img
                        :src=" cart "
                        alt="img">
                    </router-link>
                    {{ getNum }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
    data () {
        return {
            logo: "./img/logo.svg",
            account: "./img/account.svg",
            cart: "./img/cart.svg",
        }
    },
    computed: {
        ...mapGetters([
            'getNum'
        ])
    }
}
</script>

<style module>
    
</style>