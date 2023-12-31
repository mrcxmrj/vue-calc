<script setup lang="ts">
import { defaultValues, endingOperations, summary } from "@/data/dataWrapper";
import type { Scope, Values } from "@/types/types";
import { watch, toRef, computed } from "vue";

const props = defineProps<{
    incompleteRequiredSections: { name: string; message: string }[];
    optionalSectionChange: boolean;
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

watch(() => props.optionalSectionChange, () => {if (props.incompleteRequiredSections.length === 0) performEndingOperations()})
watch(() => props.incompleteRequiredSections, () => {if (props.incompleteRequiredSections.length === 0) performEndingOperations()})

const requiredSectionsComplete = computed(() => props.incompleteRequiredSections.length === 0)
const getWorkHours = () => {
    const template = summary.items[0].text || ""

    const regex = /#{(.*?),(.*?)}/g;
    const matches = regex.exec(template);
    if (!matches || matches.length !== 3) {
        console.error("wrong summary template")
        return  -1
    }
    
    const value = matches[1].trim();
    const operation = matches[2].trim();

    const isValidKey = (obj: Values, key: string): key is keyof Values  => key in obj;

    if(operation === "numberOfWorkingHours" && isValidKey(values, value)) {
        return values[value] * 8
    }

    console.error("wrong operation provided in the template")
    return -1
}
const roundedPrice = computed(() => Math.round(values.price * 100) / 100)
const roundedWorkHours = computed(() => Math.round(getWorkHours() * 100) / 100)
</script>

<template>
    <div class="summaryContainer">
        <p v-if="props.activeScopes.length === 0 || !requiredSectionsComplete">
            {{ summary.noScopeDisclaimer }}
        </p>
        <p style="font-size: larger;" v-else>
            {{ activeScopes.map((item) => item.name).join(" + ") }}
        </p>
        <ul>
            <li v-for="section in props.incompleteRequiredSections" :key="section.name">
                {{ section.message }}
            </li>
        </ul>
        <hr />
        <p>
            <b>Work hours: {{ requiredSectionsComplete ? roundedWorkHours : 0}}</b>
            <br />
            <h1>
                {{ summary.totalPriceDescription
                }}{{requiredSectionsComplete ? roundedPrice + summary.currency! : "-" }}
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
    padding: 0px 20px 0px 20px;
}

hr {
  border: 0;
  border-bottom: 2px solid #fff;
}
</style>
