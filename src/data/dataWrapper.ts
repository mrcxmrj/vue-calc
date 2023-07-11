/*eslint-env es6*/
import data from "./data.json";
import type {
    Scope,
    Section,
    EndingOperation,
    Data,
    SummaryItem,
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

const summaries: SummaryItem[] =
    (typedData.find((item) => item.type === "summaryDefinition")
        ?.items as SummaryItem[]) || [];

console.log(scopes, sections, endingOperations, summaries);
export { scopes, sections, endingOperations, summaries };
