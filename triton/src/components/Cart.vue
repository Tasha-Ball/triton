<template>
    <div>
        <Top :msg="'КОРЗИНА ТОВАРОВ'" />
        <p v-if="!getItemsInCart.length" class="footer_text center">Товары не добавлены</p>
        <div class="cart center">
            <div>
                <CartItem
                    v-for="(item, index) in getItemsInCart"
                    :item="item"
                    :key="item"
                    @deleteItem="deleteItem(index)"
                    @enlarge="enlarge(item)"
                    @reduce="reduce(item)"
                />
            </div>
            <div>
                <div v-if="getItemsInCart.length" class="cart__info">
                    <p class="checkout__heading">ОБЩАЯ СТОИМОСТЬ <span class="color__text">₽ {{ countCartTotal }}</span></p>
                    <div>
                        <Button @clicked="buyItem"> Перейти к оплате </Button>
                    </div>
                </div>
                <div class="payment center" v-if="buy">
                    <Payment @send="send"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import CartItem from './CartItem.vue'
import Top from './Top.vue'
import Button from './Button.vue'
import Payment from './Payment.vue'

export default {
    data () {
        return {
            buy: false,
            data: {},
        }
    },
    components: {
        CartItem,
        Top,
        Button,
        Payment
    },
    computed: {
        ...mapGetters([
            'getItemsInCart',
            'getCart',
            'getFullPrice'
        ]),
        countCartTotal() {
            let result = [];
            if (this.getItemsInCart.length) {
                for (let num of this.getItemsInCart) {
                    result.push( this.getCart[num].price * this.getCart[num].quantity )
                };
                result = result.reduce(function(sum, el) {
                    return sum + el;
                });
                return result;
            } else {
                return 0;
            }
        }
    },
    methods: {
        ...mapActions([
            'deleteFromCart',
            'sendOrder',
            'enlargeNumber',
            'reduceNumber',
        ]),
        enlarge (item) {
            this.enlargeNumber(item);
        },
        reduce (item) {
            this.reduceNumber(item);
        },
        deleteItem (index) {
            this.deleteFromCart(index);
        },
        buyItem() {
            this.buy = !this.buy;
            this.data = this.getCart;
        },
        send () {
            this.sendOrder(this.data);
            alert('Спасибо за заказ!');
        }
    },
}
</script>

<style module>
    
</style>