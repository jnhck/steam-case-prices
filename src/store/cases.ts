import { defineStore } from 'pinia'
import type { Case } from '../types/types'

const url = "http://localhost:"
const port = "420"

export const useCasesStore = defineStore("cases", () => {
    const fakeCases = [
        {
            id: "1",
            name: "Chroma 2 Case",
            img: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFAuhqSaKWtEu43mxtbbk6b1a77Twm4Iu8Yl3bCU9Imii1Xt80M5MmD7JZjVLFH-6VnQJQ/62fx62f",
            quantity_owned: 838,
            price_average_bought: 0.10
        },
        {
            id: "2",
            name: "Operation Broken Fang Case",
            img: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU3naeZIWUStYjgxdnewfGmZb6DxW8AupMp27yT9IqiilCxqkRkZGyldoaLMlhp6IQjKcg/62fx62f",
            quantity_owned: 44,
            price_average_bought: 1.15
        },
        {
            id: "3",
            name: "CS20 Case",
            img: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU0naHKIj9D7oTgl4LelaGnMuqIwDgFusR337HCpYmhiwzm8ktqMjv2INKLMlhprbp6CTE/62fx62f",
            quantity_owned: 117,
            price_average_bought: 0.15
        }
    ]

    function getCases(): Case[] {
        return fakeCases;
    }

    function getById(id: string): Case | undefined {
        return fakeCases.find(c => c.id === id);
    }

    async function getPrice(id: string) {
        const name = getById(id)?.name;
        if (!name) {
            return undefined;
        }
        const response = await fetch(`${url}${port}/api/case/${name}`);     
        return response.json();
    }
 
	return {
        getCases,
        getById,
        getPrice,
	};
});