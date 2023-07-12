export interface Scope {
    type: string;
    name: string;
    id: string;
}

export interface ScopeDefinition {
    type: string;
    items: Scope[];
}

export interface Section {
    type: string;
    name: string;
    mustSelectRequirement?: MustSelectRequirement;
    selectionType: "single" | "multi";
    items: SectionItem[];
}

export interface SectionDefinition {
    type: string;
    items: Section[];
}

export interface MustSelectRequirement {
    enabled: boolean;
    messageIfNotSelected: string;
}

export interface SectionItem {
    type: string;
    name: string;
    description: string;
    imgHref: string;
    enableScope: string;
    operationsIfEnabled: Operation[];
}

export interface Operation {
    type: "add" | "multiply";
    executeIfScopeEnabled?: string;
    relatedValue: string;
    number: number;
}

export interface EndingOperation {
    type: "addValues" | "copyValues" | "multiplyValues" | "multiply";
    fromValue?: string;
    toValue?: string;
    byValue?: string;
    value?: string;
    relatedValue?: string;
    number?: number;
}

export interface EndingOperationsDefinition {
    type: string;
    items: EndingOperation[];
}

export interface SummaryItem {
    type: string;
    text?: string;
}

export interface SummaryDefinition {
    type: string;
    totalPriceDescription?: string;
    noScopeDisclaimer?: string;
    currency?: string;
    items: SummaryItem[];
}

export interface ValueItem {
    type: "value" | "price";
    id: string;
    defaultValue: number;
}

export interface ValuesDefinition {
    type: string;
    items: ValueItem[];
}

export type Data = (
    | ScopeDefinition
    | SectionDefinition
    | EndingOperationsDefinition
    | SummaryDefinition
    | ValuesDefinition
)[];
