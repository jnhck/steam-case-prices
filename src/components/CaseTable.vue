<template>
  <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          <!-- image -->
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          NetPrice
        </th>
      </tr>
    </thead>
    <tbody v-for="c in cases" :key="c.name">
        <CaseTableRow :case="c"></CaseTableRow>
    </tbody>
  </v-table>
</template>
 

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import CaseTableRow from '../components/CaseTableRow.vue';
import { useCasesStore } from '../store/cases';
import type { CaseBasics } from '../types/types';

const casesStore = useCasesStore();
const cases = ref<CaseBasics[]>([]);

onBeforeMount(async () => {
  await casesStore.loadCases();
  cases.value = casesStore.getCases();
});
</script>