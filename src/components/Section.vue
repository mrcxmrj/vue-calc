<script setup lang="ts">
import { defineComponent, ref } from "vue";
import type { Scope, Section } from "../types/types";
import SectionItemDisplay from "./SectionItem.vue";

const props = defineProps<{
    sectionData: Section;
    activeScopes: Scope[];
}>();
const section = props.sectionData;
const emit = defineEmits(["updateValue", "completeSection", "enableScope"]);

// const activeScopes = ref<string[]>([]);

const passScope = (scopeId: string) => {
    emit("enableScope", scopeId);
};

const passUpdateData = (updateObject: {
    type: string;
    targetValue: string;
    number: number;
}) => {
    emit("completeSection", section.name);
    emit("updateValue", updateObject);
};
</script>

<template>
    <div class="sectionWrapper">
        <h2>{{ section.name }}</h2>
        <p v-if="section.mustSelectRequirement?.enabled">
            {{ section.mustSelectRequirement.messageIfNotSelected }}
        </p>
        <div class="items">
            <SectionItemDisplay
                v-for="item in section.items"
                :key="item.name"
                :item="item"
                :active-scopes="props.activeScopes"
                @enable-scope="passScope"
                @update-value="passUpdateData"
            />
        </div>
    </div>
</template>

<style scoped>
.sectionWrapper {
    background-color: red;
    color: white;
}

.items {
    display: flex;
}
</style>
