import { MouseEvent } from 'react';

export enum ButtonVariant {
    primary,
    success,
    danger,
}

export type Props = {
    variant?: ButtonVariant,
    id?: string,
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void,
};
