export interface MustSelectRequirement {
    enabled: boolean;
    messageIfNotSelected: string;
}

export interface Operation {
    type: string;
    executeIfScopeEnabled: string;
    relatedValue: string;
    number: number;
}

export interface SectionItem {
    type: string;
    name: string;
    description: string;
    imgHref: string;
    enableScope: string;
    operationsIfEnabled: Operation[];
}

export interface Section {
    type: string;
    name: string;
    mustSelectRequirement: MustSelectRequirement;
    selectionType: string;
    items: SectionItem[];
}
