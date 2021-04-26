<template>
    <div class="pay">
        <form 
            class="input"
            id="app"
            @submit="checkForm"
        >
            <p v-if="errors.length" class="items_text">
                <b>Пожалуйста, исправьте указанные ошибки:</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>

            <div class="pay">
                <img :src="mir" v-if="activeMir">
                <img :src="visa" v-if="activeVisa">
                <img :src="mastercard" v-if="activeMastercard">
            </div>

            <div class="input__data">
                <label for="number" class="input__data_text">Номер карты</label>
                <input
                    id="number"
                    v-model="number"
                    name="number"
                    type="text" 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}" 
                    maxlength="19"
                    v-on:change='changeLogo'
                >
            </div>

            <div class="input__data">
                <label for="name" class="input__data_text">Держатель карты</label>
                <input
                    id="name"
                    v-model="name"
                    name="name"
                    type="text"
                    placeholder="Ivan Ivanov"
                >
            </div>

            <div class="input__info">
                <div class="input__expires">
                    <label for="expires" class="input__data_text">Срок действия</label>
                    <span class="expiration">
                        <input
                            id="month"
                            v-model="month"
                            type="text"
                            name="month"
                            placeholder="MM"
                            maxlength="2"
                            size="2"
                            />
                        <span>/</span>
                        <input
                            id="year"
                            v-model="year"
                            type="text"
                            name="year"
                            placeholder="YY"
                            maxlength="2"
                            size="2"
                        />
                    </span>
                </div>
                <div class="input__cvv">
                    <label for="cvv" class="input__data_text">CVV-код</label>
                    <input
                        id="cvv"
                        v-model="cvv"
                        name="cvv"
                        type="password"
                        placeholder="***"
                        maxlength="3"
                        pattern="[0-9]{3,3}"
                    >
                </div>
            </div>

            <div class="products_bottom">
                <input class="items_button" type="submit" value="Оплатить заказ">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            mir: './img/mir.png',
            visa: './img/visa.png',
            mastercard: './img/mastercard.png',
            activeMir: false,
            activeVisa: false,
            activeMastercard: false,
            errors: [],
            number: null,
            name: null,
            month: null,
            year: null,
            cvv: null,
        }
    },
    methods: {
        changeLogo () {
            let num = this.number.toString();
            if (num[0] == 2) {
                this.activeVisa = false;
                this.activeMastercard = false;
                this.activeMir = !this.activeMir;
            }
            if (num[0] == 4) {
                this.activeMir = false;
                this.activeMastercard = false;
                this.activeVisa = !this.activeVisa;
            }
            if (num[0] == 6) {
                this.activeMir = false;
                this.activeVisa = false;
                this.activeMastercard = !this.activeMastercard;
            }
            
            let cardCode = this.number.replace(/[^\d]/g, '').substring(0,16);
            cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
            this.number = cardCode;
        },
        checkForm: function (e) {
            this.errors = [];
            if (this.number && this.name && this.month && this.year && this.cvv)  return true;
            if (!this.number) this.errors.push('Требуется указать номер карты.');
            if (!this.name) this.errors.push('Требуется указать имя держателя карты.');
            if (!this.month || !this.year) this.errors.push('Требуется указать срок действия карты.');
            if (!this.cvv) this.errors.push('Требуется указать CVV-код карты.');
            e.preventDefault();
            } 
        },
        send () {
            this.$emit('send')
        },
    }
</script>

<style>

</style>