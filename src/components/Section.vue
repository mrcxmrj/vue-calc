<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import type { Scope, Section } from "../types/types";
import SectionItemDisplay from "./SectionItem.vue";

const props = defineProps<{
    sectionData: Section;
    activeScopes: Scope[];
    lastChangedScope: Scope | undefined;
}>();
const section = props.sectionData;
const emit = defineEmits([
    "updateValue",
    "changeCompletedSections",
    "toggleScope",
]);

const passScope = (scopeId: string) => {
    emit("toggleScope", scopeId);
};

const passUpdateData = (updateObject: {
    type: string;
    targetValue: string;
    number: number;
}) => {
    emit("updateValue", updateObject);
};

type ClickedChildren = { [itemName: string]: boolean };
const clickedChildren: ClickedChildren = reactive({});

const changeClick = (itemName: string) => {
    if (section.selectionType === "single") {
        for (const key of Object.keys(clickedChildren)) {
            if (key !== itemName) clickedChildren[key] = false;
        }
    }

    clickedChildren[itemName] = !clickedChildren[itemName];
    const anyChildrenClicked = Object.values(clickedChildren).some(
        (value) => value === true
    );
    emit("changeCompletedSections", section.name, anyChildrenClicked);
};
</script>

<template>
    <div class="sectionContainer">
        <h2>{{ section.name }}</h2>
        <div class="items">
            <SectionItemDisplay
                v-for="item in section.items"
                :key="item.name"
                :item="item"
                :active-scopes="props.activeScopes"
                :is-clicked="clickedChildren[item.name] || false"
                :last-changed-scope="lastChangedScope"
                @toggle-scope="passScope"
                @update-value="passUpdateData"
                @change-click="changeClick"
                ref="sectionItems"
                class="item"
            />
        </div>
    </div>
</template>

<style scoped>
.sectionContainer {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: red;
}
.items {
    display: flex;
    flex-wrap: wrap;
}

.item {
    flex: 1;
    margin: 10px;
}

h2 {
    text-align: center;
}

@media (max-width: 768px) {
    .items {
        flex-direction: column;
        align-items: stretch;
    }

    .item {
        flex-basis: 100%;
        margin-bottom: 10px;
    }
}
</style>
