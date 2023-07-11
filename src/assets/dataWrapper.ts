/*eslint-env es6*/
import data from "./data.json";
import type {
    ScopeItem,
    SectionItem,
    EndingOperation,
    Operation,
    Data,
    SummaryItem,
    ScopeDefinition,
} from "./../types/types";

const typedData: Data = data;

const scopes: ScopeItem[] =
    (typedData.find((item) => item.type === "sectionDefinition")
        ?.items as ScopeItem[]) || [];

const sections: SectionItem[] =
    (typedData.find((item) => item.type === "sectionDefinition")
        ?.items as SectionItem[]) || [];

const endingOperations: EndingOperation[] =
    (typedData.find((item) => item.type === "endingOperationsDefinition")
        ?.items as EndingOperation[]) || [];

const summaries: SummaryItem[] =
    (typedData.find((item) => item.type === "summaryDefinition")
        ?.items as SummaryItem[]) || [];

console.log(scopes, sections, endingOperations, summaries);
export { scopes, sections, endingOperations, summaries };
