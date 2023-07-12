<script setup lang="ts">
import { ref } from "vue";
import type { Operation, Scope, SectionItem } from "../types/types";

const props = defineProps<{
    item: SectionItem;
    activeScopes: Scope[];
}>();
const item = props.item;

const emit = defineEmits(["enableScope", "updateValue"]);

const oddClicks = ref<boolean>(true);

const handleClick = () => {
    oddClicks.value = !oddClicks.value;
    if (item.enableScope) emit("enableScope", item.enableScope);
    for (const operation of item.operationsIfEnabled) {
        if (oddClicks.value) {
            emit("updateValue", {
                type: "default",
                targetValue: operation.relatedValue,
                number: operation.number,
            });
            continue;
        }
        if (
            operation.executeIfScopeEnabled &&
            props.activeScopes.some(
                (el) => el.id === operation.executeIfScopeEnabled
            )
        )
            continue;

        emit("updateValue", {
            type: operation.type,
            targetValue: operation.relatedValue,
            number: operation.number,
        });
    }
};

const getOperationMessage = (operation: Operation) => {
    let message = "";

    switch (operation.type) {
        case "add":
            message = `Add ${operation.number} to ${operation.relatedValue}`;
            break;
        case "multiply":
            message = `Multiply ${operation.number} with ${operation.relatedValue}`;
            break;
        default:
            break;
    }

    return message;
};
</script>

<template>
    <div class="container">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <img :src="item.imgHref" :alt="item.name" width="100" height="100" />
        <button @click="handleClick">Enable {{ item.name }}</button>

        <div
            v-for="operation in item.operationsIfEnabled"
            :key="operation.type"
        >
            <p>{{ getOperationMessage(operation) }}</p>
        </div>
    </div>
</template>

<style>
.container {
    background-color: white;
    color: black;
    border-radius: 0.5em;
    margin: 1em;
}
</style>
