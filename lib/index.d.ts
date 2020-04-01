import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type DefProps = {
    children: ReactNode;
    placeholder?: ReactNode;
};
export default class Def extends Component<DefProps> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        placeholder: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        placeholder: any;
    };
    static timer: number;
    static currentDef: Def;
    static stack: Set<Def>;
    static start(): void;
    static render(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
}
