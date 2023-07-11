<script setup lang="ts">
import { defineComponent, ref } from "vue";
import type { Section, Operation, MustSelectRequirement } from "../types/types";
import SectionComponent from "./Section.vue";
import { sections as sectionsData } from "@/data/dataWrapper";

const sections: Section[] = sectionsData;
</script>

<template>
    <SectionComponent
        v-for="section in sections"
        :key="section.name"
        :sectionData="section"
    />
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
