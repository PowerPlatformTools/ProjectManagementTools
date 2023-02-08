/// <reference types="react" />
import { DivAttributes } from '../helpers/types';
declare type Props = DivAttributes & {
    className?: string;
};
declare const AccordionItemPanel: ({ className, id, ...rest }: Props) => JSX.Element;
export default AccordionItemPanel;
