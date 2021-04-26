<template>
    <div class="items items_mb">
        <img class="items_img" :src=" getItemData.img " alt="img">
        <button class="basket_cart" @click="addItemToCart">
            <img :src=" getItemData.cart " alt="cart">
            Добавить в корзину
        </button>
        <div class="items_content">
            <h3 class="items_heading"> {{ getItemData.name }} </h3>
            <p class="items_text"> {{ getItemData.text }} </p>
            <p class="items_price"> ₽ {{ getItemData.price }} </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        id: String
    },
    computed: {
        ...mapGetters([
            'getData'
        ]),
        getItemData () {
            return this.getData[this.id]
        }
    },
    methods: {
        ...mapActions([
            'addToCart',
            'sendOrder'
        ]),
        addItemToCart () {
            //this.addToCart({id: this.id, newCart: this.getItemData})
            this.$emit('addItemToCart')
        }
    }
}
</script>

<style module>
    
</style>