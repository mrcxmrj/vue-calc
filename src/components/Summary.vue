<script setup lang="ts">
import { endingOperations, summary } from "@/data/dataWrapper";
import type { Scope, Values } from "@/types/types";
import { watch, toRef } from "vue";

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

const refreshPage = () => window.location.reload()
</script>

<template>
    <div class="summaryContainer">
        <p v-if="props.activeScopes.length === 0">
            {{ summary.noScopeDisclaimer }}
        </p>
        <p v-else>
            <h3>{{ activeScopes.map((item) => item.name).join(" + ") }}</h3>
        </p>
        <ul>
            <li v-for="section in props.incompleteSections" :key="section.name">
                {{ section.message }}
            </li>
        </ul>
        <hr />
        <p>
            <b>Work hours: {{ values["multiplied_building_days"] / 8 }}</b>
            <br />
            <h1>
                {{ summary.totalPriceDescription
                }}{{ values.price !== 0 ? values.price + summary.currency! : "-" }}
            </h1>
        </p>
            <button @click="refreshPage" class="refresh-button">Reset</button>

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

.refresh-button {
  font-size: 18px;
  padding: 10px 20px;
}
</style>
