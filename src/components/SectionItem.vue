<script setup lang="ts">
import type { Operation, SectionWithScope } from "../types/types";

const props = defineProps<{
    item: SectionWithScope;
}>();
const item = props.item;

const enableScope = (scope: string) => {};

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
        <button @click="enableScope(item.enableScope)">
            Enable {{ item.name }}
        </button>
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
