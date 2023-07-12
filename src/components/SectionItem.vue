<script setup lang="ts">
import { ref, watch } from "vue";
import type { Operation, Scope, SectionItem } from "../types/types";

const props = defineProps<{
    item: SectionItem;
    activeScopes: Scope[];
}>();
const item = props.item;

const emit = defineEmits(["enableScope", "updateValue"]);

const isClicked = ref<boolean>(false);

const handleClick = () => {
    if (isClicked.value === true) return;
    isClicked.value = true;
    if (item.enableScope) emit("enableScope", item.enableScope);
    for (const operation of item.operationsIfEnabled) {
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
</script>

<template>
    <div class="item-container">
        <h3>{{ item.name }}</h3>
        <div class="image-container" :class="{ clicked: isClicked }">
            <img
                :src="item.imgHref"
                :alt="item.name"
                width="100"
                height="100"
                @click="handleClick"
            />
        </div>
        <div class="description">
            {{ item.description }}
        </div>
    </div>
</template>

<style>
.item-container {
    border-radius: 0.5em;
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
}

.image-container {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
}

.image-container:hover {
    border: 3px solid lightgreen;
    cursor: pointer;
}
.clicked {
    border: 3px solid lightgreen;
    cursor: default !important;
}

.description {
    display: none;
    position: absolute;
    z-index: 1;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5em;
    background-color: black;
    border-radius: 0.5em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    white-space: pre-line;
}

.item-container:hover .description {
    display: block;
}
</style>
