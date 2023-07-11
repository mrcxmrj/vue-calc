<script setup lang="ts">
import { defineComponent, ref } from "vue";
import type { Section } from "../types/types";
import SectionItemDisplay from "./SectionItem.vue";

const props = defineProps<{
    sectionData: Section;
}>();
const section = props.sectionData;

const activeScopes = ref<string[]>([]);

const enableScope = (scope: string) => {
    if (activeScopes.value.includes(scope)) {
        activeScopes.value = activeScopes.value.filter((el) => el !== scope);
    } else {
        activeScopes.value.push(scope);
    }
};

const emit = defineEmits(["updateValue"]);
const passUpdateData = (updateObject: {
    type: string;
    targetValue: string;
    number: number;
}) => {
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
                :active-scopes="activeScopes"
                @enable-scope="enableScope"
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
