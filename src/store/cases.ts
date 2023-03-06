import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CaseBasics } from '../types/types'

const url = "http://localhost:"
const port = "4000"

export const useCasesStore = defineStore("cases", () => {
    let cases = ref<CaseBasics[]>([]);

    async function loadCases() {
        const response = await fetch(`${url}${port}/api/cases`)
        cases.value = await response.json();
    };

    function clearCases() {
        cases.value = [];
    }

    function getCases(): CaseBasics[] {
        return cases.value;
    }

    function getByName(name: string): CaseBasics | undefined {
        return cases.value.find(c => c.name === name);
    }

    async function getPrice(name: string) {   
        const response = await fetch(`${url}${port}/api/case/${name}`);  
        return await response.json();
    }
     
	return {
        loadCases,
        clearCases,
        getCases,
        getByName,
        getPrice,
	};
});