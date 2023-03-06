<template>
    <tr >
        <td class="text-left"><img :src="props.case.img"></td>
        <td class="text-left">{{ props.case.name }}</td>
        <td class="text-left" v-if="priceData">{{ euroNetPrice(priceData?.price_gross) }}</td>
    </tr>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, PropType } from 'vue';
import { useCasesStore } from '../store/cases';
import { euroNetPrice } from '../utils/utils';
import type { CaseBasics, Case } from '../types/types';

const props = defineProps({
	case: {
		type: Object as PropType<CaseBasics>,
		required: true,
	},
});

const casesStore = useCasesStore();
const priceData = ref<Case>();

onBeforeMount(() => {
  casesStore.getPrice(props.case.name).then((data) => {
    priceData.value = data;
  });  
});
</script>