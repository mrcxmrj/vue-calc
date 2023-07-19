<script setup lang="ts">
import { reactive, ref } from "vue";
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
    type: "add" | "multiply" | "set";
    number: number;
}) => {
    switch (type) {
        case "add":
            values[targetValue] += number;
            break;
        case "multiply":
            values[targetValue] *= number;
            break;
        case "set":
            values[targetValue] = number;
            break;
    }
    console.log(targetValue, values[targetValue]);
};

const requiredSections = sections.flatMap((section) =>
    section.mustSelectRequirement?.enabled
        ? {
              name: section.name,
              message: section.mustSelectRequirement.messageIfNotSelected,
          }
        : []
);

const incompleteRequiredSections = ref(requiredSections);
const optionalSectionChange = ref(false);

const changeCompletedSections = (sectionName: string, isCompleted: boolean) => {
    if (isCompleted) {
        incompleteRequiredSections.value =
            incompleteRequiredSections.value.filter(
                (el) => el.name !== sectionName
            );
        return;
    }

    if (
        !incompleteRequiredSections.value.some((el) => el.name === sectionName)
    ) {
        const incompleteRequiredSection = requiredSections.find(
            (el) => el.name === sectionName
        );
        if (incompleteRequiredSection)
            incompleteRequiredSections.value.push(incompleteRequiredSection);
        // should also probably be done in an immutable way
        else optionalSectionChange.value = !optionalSectionChange.value;
    }
};

const activeScopes = ref<Scope[]>([]);
const lastChangedScope = ref<Scope>();

const toggleScope = (scopeId: string) => {
    const scopeObject = scopes.find((el) => el.id === scopeId);

    if (!scopeObject) return;
    if (activeScopes.value.some((el) => el.id === scopeId)) {
        activeScopes.value = activeScopes.value.filter(
            (el) => el.id !== scopeObject?.id
        );
    } else {
        activeScopes.value = [...activeScopes.value, scopeObject];
    }
    lastChangedScope.value = scopeObject;

    console.log(activeScopes.value);
};
</script>

<template>
    <div class="container">
        <SectionComponent
            v-for="section in sections"
            :key="section.name"
            :section-data="section"
            :active-scopes="activeScopes"
            :last-changed-scope="lastChangedScope"
            @update-value="updateValue"
            @toggle-scope="toggleScope"
            @change-completed-sections="changeCompletedSections"
        />
        <SummaryComponent
            :incomplete-required-sections="incompleteRequiredSections"
            :optional-section-change="optionalSectionChange"
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
