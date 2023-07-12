<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { Section } from "../types/types";
import SectionComponent from "./Section.vue";
import SummaryComponent from "./Summary.vue";
import { sections as sectionsData, defaultValues } from "@/data/dataWrapper";

const sections: Section[] = sectionsData;

const values = reactive({
    roller_multiplier: defaultValues["roller_multiplier"],
    excavator_crane_multiplier: defaultValues["excavator_crane_multiplier"],
    speed_multiplier: defaultValues["speed_multiplier"],
    workday_price: defaultValues["workday_price"],
    multiplier: defaultValues["multiplier"],
    building_days: defaultValues["building_days"],
    multiplied_building_days: defaultValues["multiplied_building_days"],
    active_working_hours: defaultValues["active_working_hours"],
    price: defaultValues["price"],
});

const updateValue = ({
    targetValue,
    type,
    number,
}: {
    targetValue: keyof typeof values;
    type: "add" | "multiply" | "default";
    number: number;
}) => {
    switch (type) {
        case "add":
            values[targetValue] += number;
            break;
        case "multiply":
            values[targetValue] *= number;
            break;
        case "default":
            values[targetValue] = defaultValues[targetValue];
            break;
    }
};

const requiredSections = sections.flatMap((section) =>
    section.mustSelectRequirement?.enabled
        ? {
              name: section.name,
              message: section.mustSelectRequirement.messageIfNotSelected,
          }
        : []
);

const incompleteSections = ref(requiredSections);

const completeSection = (section: string) => {
    incompleteSections.value = incompleteSections.value.filter(
        (el) => el.name !== section
    );
};
</script>

<template>
    <SectionComponent
        v-for="section in sections"
        :key="section.name"
        :sectionData="section"
        @updateValue="updateValue"
        @completeSection="completeSection"
    />
    <SummaryComponent :incompleteSections="incompleteSections" />
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
