<template>
    <v-card
    >
      <v-img
        :src=c?.img
      ></v-img>
  
      <v-card-title>
        {{ c?.name }}
      </v-card-title>
  
      <v-card-subtitle>
        <p>Quantity: {{ c?.quantity_owned }}</p>
      </v-card-subtitle>

      <v-card-subtitle>
        <p>Current Price: {{ steamValues.lowest_price }}</p>
      </v-card-subtitle>
  
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCasesStore } from '../store/cases';

const props = defineProps({
	caseId: {
		type: String,
		required: true,
	},
});

const casesStore = useCasesStore();
const c = casesStore.getById(props.caseId);
const steamValues = ref({});

// function priceToFloat(input: string): number {
//     return parseFloat(input.slice(0, -1).replace(",", "."))
// }

// function priceToString(input) {
//     input = (Math.round(input * 100) / 100).toFixed(2);
//     return input.replace(".", ",") + "€"
// }

onMounted(async () => {
  steamValues.value = await casesStore.getPrice(props.caseId);
  console.log(steamValues.value);
});
</script>