<template>
  <div>
    <div class="box-promocja wyprzedaz" style="width: auto; margin: 0px auto;" v-if="getPrice > 40">
      <p class="select">
        <span class="select-label"> -- Wybierz książkę w promocyjnej cenie -- </span>
        <select class="wyprzedazval promocja" name="wyprzedaz1" v-if="getPromo" v-model="position" id="pleasantFirst"
                @change="selectBook" ref="pleasantFirst">
          <option value=""> -- Wybierz książkę w promocyjnej cenie --</option>
          <option v-for="(promo, index) in getPromo" :value="promo" :key="index">{{ promo.name }}.
            {{ promo.salePrice.brutto }} zł
          </option>
        </select>
      </p>
      <p class="select">
        <span class="select-label"> -- Wybierz książkę w promocyjnej cenie -- </span>
        <select class="wyprzedazval promocja" name="wyprzedaz2" id="pleasantSecond" v-if="getPromo" v-model="position"
                @change="selectBook" ref="pleasantSecond">
          <option value=""> -- Wybierz książkę w promocyjnej cenie --</option>
          <option v-for="(promo, index) in getPromo" :value="'wyprzedaz2' + promo.ident" :key="index">{{ promo.name }}.
            {{ promo.salePrice.brutto }} zł
          </option>
        </select>
      </p>
      <p class="select">
        <span class="select-label"> -- Wybierz książkę w promocyjnej cenie -- </span>
        <select class="wyprzedazval promocja" name="wyprzedaz3" v-if="getPromo" v-model="position" id="pleasantThird"
                @change="selectBook" ref="pleasantThird">
          <option> -- Wybierz książkę w promocyjnej cenie --</option>
          <option :value="'wyprzedaz3' + promo.ident" v-for="(promo, index) in getPromo" :key="index">{{ promo.name }}.
            {{ promo.salePrice.brutto }} zł
          </option>
        </select>
      </p>
    </div>
    <div class="box-promocja wyprzedaz" style="width:auto;margin:0 auto;" v-else-if="getPrice < 40">
      Zamów książki papierowe o wartości min. 40,00 zł (brakuje <b>{{ 40 - getPrice }}&nbsp;zł</b>), aby móc skorzystać
      z promocji
      "Sympatyczna Cena".
    </div>
  </div>
</template>

<script lang="ts">

import {Vue} from "vue-property-decorator";
import Cart, {CartEntity} from "../../model/Cart";
import Component from "vue-class-component";
import {DomElement} from "../../model/Operators";

@Component
export default class PleasantPrice extends Vue {

  public position: CartEntity | null = null;


  get getPromo(): Array<Cart> {
    return this.$store.getters.getPleasant;
  }

  get getPrice(): number {
    return this.$store.getters.getSummaryPrice;
  }

  public selectBook(e: any) {
    let getTarget = e.target as DomElement;
    let pos: any = this.position
      if (pos) {
        pos.promoId = getTarget.id;
        pos.quantity = 1;
    //     // this.$store.dispatch("addPromoToCard", cart)
      }
  }
}
</script>