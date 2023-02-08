import * as React from 'react';
import AccordionStore, { InjectedButtonAttributes, InjectedHeadingAttributes, InjectedPanelAttributes } from '../helpers/AccordionStore';
import { UUID } from './ItemContext';
export interface ProviderProps {
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    onChange?(args: UUID[]): void;
}
declare type ProviderState = AccordionStore;
export interface AccordionContext {
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    toggleExpanded(uuid: UUID): void;
    isItemDisabled(uuid: UUID): boolean;
    isItemExpanded(uuid: UUID): boolean;
    getPanelAttributes(uuid: UUID, dangerouslySetExpanded?: boolean): InjectedPanelAttributes;
    getHeadingAttributes(uuid: UUID): InjectedHeadingAttributes;
    getButtonAttributes(uuid: UUID, dangerouslySetExpanded?: boolean): InjectedButtonAttributes;
}
export declare class Provider extends React.PureComponent<ProviderProps, ProviderState> {
    static defaultProps: ProviderProps;
    state: ProviderState;
    toggleExpanded: (key: UUID) => void;
    isItemDisabled: (key: UUID) => boolean;
    isItemExpanded: (key: UUID) => boolean;
    getPanelAttributes: (key: UUID, dangerouslySetExpanded?: boolean | undefined) => InjectedPanelAttributes;
    getHeadingAttributes: () => InjectedHeadingAttributes;
    getButtonAttributes: (key: UUID, dangerouslySetExpanded?: boolean | undefined) => InjectedButtonAttributes;
    render(): JSX.Element;
}
export declare class Consumer extends React.PureComponent<{
    children(container: AccordionContext): React.ReactNode;
}> {
    renderChildren: (container: AccordionContext | null) => React.ReactNode;
    render(): JSX.Element;
}
export {};
