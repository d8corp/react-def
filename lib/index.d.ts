import { Component, ReactNode, ComponentType } from 'react';
import PropTypes from 'prop-types';
export declare type DefProps = {
    children: ReactNode;
    element?: ReactNode;
    component?: ComponentType;
};
export default class Def extends Component<DefProps> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        element: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        component: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
    static defaultProps: {
        element: any;
    };
    static timer: number;
    static currentDef: Def;
    static stack: Set<Def>;
    static start(): void;
    static render(): void;
    componentWillUnmount(): void;
    render(): {};
}
