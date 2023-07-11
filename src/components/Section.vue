<script setup lang="ts">
import { defineComponent, ref } from "vue";
import type { Section, Operation, MustSelectRequirement } from "../types/types";
import SectionItemDisplay from "./SectionItem.vue";

const props = defineProps<{
    sectionData: Section;
}>();
const section = props.sectionData;
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
