<script setup lang="ts">
import { onActivated, ref, watch } from "vue";
import type { Scope, SectionItem } from "../types/types";

const props = defineProps<{
    item: SectionItem;
    activeScopes: Scope[];
    isClicked: boolean;
    lastChangedScope: Scope | undefined;
}>();
const item = props.item;

const emit = defineEmits(["toggleScope", "updateValue", "changeClick"]);

const changeClicked = () => emit("changeClick", item.name);

const performOperations = (customScopeList?: Scope[]) => {
    console.log("performing operations in ", item.name, props.isClicked);
    const activeScopes = customScopeList || props.activeScopes;
    for (const operation of item.operationsIfEnabled) {
        if (
            operation.executeIfScopeEnabled &&
            !activeScopes.some(
                (el) => el.id === operation.executeIfScopeEnabled
            )
        ) {
            console.log("cont", props.activeScopes);
            continue;
        }

        if (!props.isClicked) {
            console.log("unclicking", item.name);
            if (operation.type === "add") {
                emit("updateValue", {
                    type: operation.type,
                    targetValue: operation.relatedValue,
                    number: -operation.number,
                });
            }
            if (operation.type === "multiply") {
                emit("updateValue", {
                    type: "set",
                    targetValue: operation.relatedValue,
                    number: 1,
                });
                break;
            }
        } else {
            console.log("updating values", item.name);

            emit("updateValue", {
                type: operation.type,
                targetValue: operation.relatedValue,
                number: operation.number,
            });
        }
    }
};

const handleClickedStatusChange = () => {
    if (item.enableScope) emit("toggleScope", item.enableScope);
    else performOperations();
};

watch(() => props.isClicked, handleClickedStatusChange);
watch(
    () => props.activeScopes,
    () => {
        if (props.activeScopes.some((el) => el.name === item.name)) {
            console.log("true! from ", item.name);
            performOperations();
        } else if (props.lastChangedScope?.name === item.name) {
            console.log("true! from ", item.name);

            performOperations([...props.activeScopes, props.lastChangedScope]);
        }
    }
);
/* watch(
    () => [props.isClicked, props.activeScopes],
    () => {
        if (props.activeScopes.some((el) => el.name === item.name)) {
            console.log("true! from ", item.name);
            performOperations();
        } else if (props.isClicked) {
            console.log("changing click status");
            if (item.enableScope) emit("toggleScope", item.enableScope);
            performOperations();
            // handleClickedStatusChange();
        }
    }
); */
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
