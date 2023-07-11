/*eslint-env es6*/
import data from "./data.json";
import type {
    Scope,
    Section,
    EndingOperation,
    Data,
    Summary,
    ValueItem,
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
const summary: Summary = typedData.find(
    (item) => item.type === "summaryDefinition"
)?.items[0] as Summary;

const valueItems: ValueItem[] =
    (typedData.find((item) => item.type === "valuesDefinition")
        ?.items as ValueItem[]) || [];

const values: ValueItem[] = valueItems.filter((item) => item.type === "value");

const defaultValues: Record<string, number> = {};
for (const item of values) {
    const { id, defaultValue } = item;
    defaultValues[id] = defaultValue;
}

const price: ValueItem = valueItems.find((item) => item.type === "price")!;

export { scopes, sections, endingOperations, summary, defaultValues, price };
