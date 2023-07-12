<script setup lang="ts">
import { endingOperations, summary } from "@/data/dataWrapper";
import type { Values } from "@/types/types";
import { defineComponent, computed, watch, toRef } from "vue";

const props = defineProps<{
    incompleteSections: { name: string; message: string }[];
    values: Values;
}>();
const values = props.values;
const performEndingOperations = () => {
    console.log("calculating...");
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

// const totalPrice = computed(() => 100); // Replace with your logic to calculate the total price
const hasScope = computed(() => true); // Replace with your logic to determine if options are selected

const formatItemText = (text: string) => {
    return text.replace(
        "#{multiplied_building_days,numberOfWorkingHours}#",
        "5 working hours"
    );
};
</script>

<template>
    <div>
        <p>
            {{ summary.totalPriceDescription }}{{ values.price
            }}{{ summary.currency }}
        </p>
        <ul>
            <li v-for="section in props.incompleteSections" :key="section.name">
                {{ section.message }}
            </li>
        </ul>
        <p v-if="!hasScope">{{ summary.noScopeDisclaimer }}</p>
        <ul v-else>
            <li v-for="item in summary.items" :key="item.text">
                {{ formatItemText(item.text || "") }}
            </li>
        </ul>
    </div>
</template>
