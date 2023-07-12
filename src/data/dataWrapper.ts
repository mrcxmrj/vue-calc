/*eslint-env es6*/
import data from "./data.json";
import type {
    Scope,
    Section,
    EndingOperation,
    Data,
    SummaryItem,
    ValueItem,
    SummaryDefinition,
} from "./../types/types";

const typedData: Data = data;

const scopes: Scope[] =
    (typedData.find((item) => item.type === "scopeDefinition")
        ?.items as Scope[]) || [];

const sections: Section[] =
    (typedData.find((item) => item.type === "sectionDefinition")
        ?.items as Section[]) || [];

const endingOperations: EndingOperation[] =
    (typedData.find((item) => item.type === "endingOperationsDefinition")
        ?.items as EndingOperation[]) || [];

// there is only one summary
const summary: SummaryDefinition = typedData.find(
    (item) => item.type === "summaryDefinition"
) as SummaryDefinition;

const values: ValueItem[] =
    (typedData.find((item) => item.type === "valuesDefinition")
        ?.items as ValueItem[]) || [];

// const values: ValueItem[] = valueItems.filter((item) => item.type === "value");
// const price: ValueItem = valueItems.find((item) => item.type === "price")!;

const defaultValues: Record<string, number> = {};
for (const item of values) {
    const { id, defaultValue } = item;
    defaultValues[id] = defaultValue;
}

export { scopes, sections, endingOperations, summary, defaultValues };
