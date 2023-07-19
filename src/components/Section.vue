<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import type { Operation, Scope, Section, SectionItem } from "../types/types";
import SectionItemDisplay from "./SectionItem.vue";

const props = defineProps<{
    sectionData: Section;
    activeScopes: Scope[];
}>();
const section = props.sectionData;
const emit = defineEmits([
    "updateValue",
    "changeCompletedSections",
    "toggleScope",
]);

type ClickedChildren = { [itemName: string]: boolean };
const clickedChildren: ClickedChildren = reactive({});

const changeClickedChildren = (item: SectionItem) => {
    for (const key of Object.keys(clickedChildren)) {
        if (clickedChildren[key]) {
            const unclickedItem = section.items.find(
                (item) => item.name === key
            )!;
            undoOperations(unclickedItem.operationsIfEnabled);
        }
    }

    if (section.selectionType === "single") {
        for (const key of Object.keys(clickedChildren)) {
            if (key !== item.name) {
                clickedChildren[key] = false;
            }
        }
    }

    clickedChildren[item.name] = !clickedChildren[item.name];

    const anyChildrenClicked = Object.values(clickedChildren).some(
        (value) => value === true
    );
    emit("toggleScope", item.enableScope);
    emit("changeCompletedSections", section.name, anyChildrenClicked);
};

const undoOperations = (operations: Operation[]) => {
    for (const operation of operations) {
        if (
            operation.executeIfScopeEnabled &&
            !props.activeScopes.some(
                (el) => el.id === operation.executeIfScopeEnabled
            )
        ) {
            continue;
        }
        if (operation.type === "add")
            emit("updateValue", {
                type: operation.type,
                targetValue: operation.relatedValue,
                number: -operation.number,
            });
        if (operation.type === "multiply") {
            emit("updateValue", {
                type: "set",
                targetValue: operation.relatedValue,
                number: 0,
            });
            break;
        }
    }
};

const performOperations = (operations: Operation[]) => {
    for (const operation of operations) {
        if (
            operation.executeIfScopeEnabled &&
            !props.activeScopes.some(
                (el) => el.id === operation.executeIfScopeEnabled
            )
        ) {
            continue;
        }

        emit("updateValue", {
            type: operation.type,
            targetValue: operation.relatedValue,
            number: operation.number,
        });
    }
};

watch(clickedChildren, () => {
    for (const child of section.items) {
        if (clickedChildren[child.name]) {
            performOperations(child.operationsIfEnabled);
        }
    }
});
</script>

<template>
    <div class="sectionContainer">
        <h2>{{ section.name }}</h2>
        <div class="items">
            <SectionItemDisplay
                v-for="item in section.items"
                :key="item.name"
                :item="item"
                :is-clicked="clickedChildren[item.name] || false"
                @change-click="changeClickedChildren"
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
