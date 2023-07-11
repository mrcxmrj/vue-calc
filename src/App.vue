<script setup lang="ts">
import SectionList from "./components/SectionList.vue";

const data = {
    type: "section",
    name: "What type of road building equipment is desired? *",
    mustSelectRequirement: {
        enabled: true,
        messageIfNotSelected: "Question 1 - Choose road building equipment",
    },
    selectionType: "multi",
    items: [
        {
            type: "sectionItemWithScope",
            name: "Excavator",
            description:
                "Excavator which allows you to dig holes and move earth.",
            imgHref: "https://dummyimage.com/300x300/000/fff&text=Excavator",
            enableScope: "excavator",
            operationsIfEnabled: [
                {
                    type: "add",
                    executeIfScopeEnabled: "excavator",
                    relatedValue: "excavator_crane_multiplier",
                    number: 1,
                },
                {
                    type: "multiply",
                    executeIfScopeEnabled: "crane",
                    relatedValue: "excavator_crane_multiplier",
                    number: 0,
                },
                {
                    type: "add",
                    executeIfScopeEnabled: "crane",
                    relatedValue: "excavator_crane_multiplier",
                    number: 1.2,
                },
            ],
        },
        {
            type: "sectionItemWithScope",
            name: "Crane",
            description: "Crane which allows you to lift heavy objects.",
            imgHref: "https://dummyimage.com/300x300/000/fff&text=Crane",
            enableScope: "crane",
            operationsIfEnabled: [
                {
                    type: "add",
                    executeIfScopeEnabled: "crane",
                    relatedValue: "excavator_crane_multiplier",
                    number: 1,
                },
                {
                    type: "multiply",
                    executeIfScopeEnabled: "excavator",
                    relatedValue: "excavator_crane_multiplier",
                    number: 0,
                },
                {
                    type: "add",
                    executeIfScopeEnabled: "excavator",
                    relatedValue: "excavator_crane_multiplier",
                    number: 1.2,
                },
            ],
        },
        {
            type: "sectionItemWithScope",
            name: "Roller",
            description: "Roller which allows you to flatten the ground.",
            imgHref: "https://dummyimage.com/300x300/000/fff&text=Roller",
            enableScope: "roller",
            operationsIfEnabled: [
                {
                    type: "add",
                    executeIfScopeEnabled: "roller",
                    relatedValue: "roller_multiplier",
                    number: 0.9,
                },
            ],
        },
    ],
};
</script>

<template>
    <SectionList />
</template>

<style scoped></style>
