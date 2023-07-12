<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { Scope, Section, Values } from "../types/types";
import SectionComponent from "./Section.vue";
import SummaryComponent from "./Summary.vue";
import {
    sections as sectionsData,
    defaultValues,
    scopes,
} from "@/data/dataWrapper";

const sections: Section[] = sectionsData;

const values = reactive<Values>({
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

const activeScopes = ref<Scope[]>([]);

// toggles the presense of scope
const enableScope = (scopeId: string) => {
    const scopeObject = scopes.find((el) => el.id === scopeId);
    if (!scopeObject) return;
    if (activeScopes.value.some((el) => el.id === scopeId)) {
        activeScopes.value = activeScopes.value.filter(
            (el) => el !== scopeObject
        );
    } else {
        activeScopes.value.push(scopeObject);
    }
};
</script>

<template>
    <div class="container">
        <SectionComponent
            v-for="section in sections"
            :key="section.name"
            :sectionData="section"
            :active-scopes="activeScopes"
            @updateValue="updateValue"
            @enable-scope="enableScope"
            @completeSection="completeSection"
        />
        <SummaryComponent
            :incompleteSections="incompleteSections"
            :activeScopes="activeScopes"
            :values="values"
        />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    color: white;
    font-family: "Arial", sans-serif;
}

@media (max-width: 768px) {
    .container {
        margin: 0;
        box-shadow: none;
        border-radius: 0;
    }
}

.container > * {
    width: 100%;
    margin-bottom: 20px;
}

.container > *:last-child {
    margin-bottom: 0;
}
</style>
