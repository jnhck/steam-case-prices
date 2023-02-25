<template>
    <v-row>
        <transition-group name="list">
            <v-col v-for="c in cases" :key="c.id">
                <CaseCard :caseId="c.id" />
            </v-col>
        </transition-group>
    </v-row>
</template>

<script setup lang="ts">
import CaseCard from '../components/CaseCard.vue';
import { useCasesStore } from '../store/cases';

const casesStore = useCasesStore();

const cases = casesStore.getCases();

</script>