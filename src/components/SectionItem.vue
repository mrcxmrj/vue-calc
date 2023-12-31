<script setup lang="ts">
import { onActivated, ref, watch } from "vue";
import type { Scope, SectionItem } from "../types/types";

const props = defineProps<{
    item: SectionItem;
    isClicked: boolean;
}>();
const item = props.item;

const emit = defineEmits(["changeClick"]);

const changeClicked = () => emit("changeClick", item);
</script>

<template>
    <div
        class="item-container"
        :class="{ clicked: props.isClicked }"
        @click="changeClicked"
    >
        <div class="text-container">
            <h3>
                {{ item.name }}
            </h3>
            <div class="description">
                {{ item.description }}
            </div>
        </div>
        <div class="image-container" :class="{ clicked: props.isClicked }">
            <img
                :src="item.imgHref"
                :alt="item.name"
                width="100"
                height="100"
            />
        </div>
    </div>
</template>

<style scoped>
.image-container {
    position: relative;
    min-width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
}

@media (min-width: 768px) {
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
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
    .clicked.image-container {
        outline: 3px solid lightgreen;
    }
    .item-container:hover .image-container {
        outline: 3px solid lightgreen;
        cursor: pointer;
    }

    .item-container:hover .description {
        display: block;
    }
}

@media (max-width: 768px) {
    .item-container {
        background-color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 0.5em;
        padding: 10px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: left;
    }
    .text-container {
        margin-left: 10px;
    }

    h3 {
        color: black;
    }

    .description {
        margin-top: 0.5em;
        color: gray;
        display: block;
    }

    .clicked.item-container {
        background-color: lightgreen;
    }
}
</style>
