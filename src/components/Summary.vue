<script setup lang="ts">
import { defaultValues, endingOperations, summary } from "@/data/dataWrapper";
import type { Scope, Values } from "@/types/types";
import { watch, toRef } from "vue";

const props = defineProps<{
    incompleteRequiredSections: { name: string; message: string }[];
    activeScopes: Scope[];
    values: Values;
}>();
const values = props.values;
const performEndingOperations = () => {
    values["price"] = defaultValues["price"]
    values["active_working_hours"] = defaultValues["active_working_hours"]
    values["multiplier"] = defaultValues["multiplier"]
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

/* const reactiveIncompleteSections = toRef(props, "incompleteSections");
watch(reactiveIncompleteSections, (currIncompleteSections) => {
    if (currIncompleteSections.length === 0) performEndingOperations();
}); */
watch(() => props.incompleteRequiredSections, () => {if (props.incompleteRequiredSections.length === 0) performEndingOperations()})
</script>

<template>
    <div class="summaryContainer">
        <p v-if="props.activeScopes.length === 0 || props.incompleteRequiredSections.length !== 0">
            {{ summary.noScopeDisclaimer }}
        </p>
        <p v-else>
            <h3>{{ activeScopes.map((item) => item.name).join(" + ") }}</h3>
        </p>
        <ul>
            <li v-for="section in props.incompleteRequiredSections" :key="section.name">
                {{ section.message }}
            </li>
        </ul>
        <hr />
        <p>
            <b>Work hours: {{ props.incompleteRequiredSections.length === 0 ? values["multiplied_building_days"] / 8 : 0}}</b>
            <br />
            <h1>
                {{ summary.totalPriceDescription
                }}{{ props.incompleteRequiredSections.length === 0 ? values.price + summary.currency! : "-" }}
            </h1>
        </p>
    </div>
</template>
<style scoped>
.summaryContainer {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: red;
    box-sizing: border-box;
    padding: 10px;
}
</style>
