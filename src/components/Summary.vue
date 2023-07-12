<script setup lang="ts">
import { endingOperations, summary } from "@/data/dataWrapper";
import type { Scope, Values } from "@/types/types";
import { defineComponent, computed, watch, toRef } from "vue";

const props = defineProps<{
    incompleteSections: { name: string; message: string }[];
    activeScopes: Scope[];
    values: Values;
}>();
const values = props.values;
const performEndingOperations = () => {
    for (const operation of endingOperations) {
        switch (operation.type) {
            case "addValues":
                values[operation.toValue!] += values[operation.fromValue!];
                break;
            case "copyValues":
                values[operation.toValue!] = values[operation.fromValue!];
                break;
            case "multiplyValues":
                values[operation.value!] *= values[operation.byValue!];
                break;
            case "multiply":
                values[operation.relatedValue!] *= operation.number!;
                break;
            default:
                break;
        }
    }
};

const reactiveIncompleteSections = toRef(props, "incompleteSections");
watch(reactiveIncompleteSections, (currIncompleteSections) => {
    if (currIncompleteSections.length === 0) performEndingOperations();
});
</script>

<template>
    <div>
        <p>
            {{ summary.totalPriceDescription }}{{ values.price
            }}{{ summary.currency }}
        </p>
        <p v-if="props.activeScopes.length === 0">
            {{ summary.noScopeDisclaimer }}
        </p>
        <p v-else>
            {{ activeScopes.map((item) => item.name).join(" + ") }}
        </p>
        <ul>
            <li v-for="section in props.incompleteSections" :key="section.name">
                {{ section.message }}
            </li>
        </ul>
    </div>
</template>
