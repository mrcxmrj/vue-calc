<script setup lang="ts">
import { summary } from "@/data/dataWrapper";
import { defineComponent, computed, watch, toRef } from "vue";

const props = defineProps<{
    incompleteSections: { name: string; message: string }[];
}>();

const reactiveIncompleteSections = toRef(props, "incompleteSections");
watch(reactiveIncompleteSections, (currIncompleteSections) => {
    if (currIncompleteSections.length === 0) console.log("calculation time!");
});

const totalPrice = computed(() => 100); // Replace with your logic to calculate the total price
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
            {{ summary.totalPriceDescription }}{{ totalPrice
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
