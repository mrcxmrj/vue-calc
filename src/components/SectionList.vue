<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type {
    Section,
    Operation,
    MustSelectRequirement,
    ValueItem,
} from "../types/types";
import SectionComponent from "./Section.vue";
import { sections as sectionsData, valuesData } from "@/data/dataWrapper";

const sections: Section[] = sectionsData;

const values = reactive({
    roller_multiplier: valuesData["roller_multiplier"],
    excavator_crane_multiplier: valuesData["excavator_crane_multiplier"],
    speed_multiplier: valuesData["speed_multiplier"],
    workday_price: valuesData["workday_price"],
    multiplier: valuesData["multiplier"],
    building_days: valuesData["building_days"],
    multiplied_building_days: valuesData["multiplied_building_days"],
    active_working_hours: valuesData["active_working_hours"],
});
console.log(values);
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
