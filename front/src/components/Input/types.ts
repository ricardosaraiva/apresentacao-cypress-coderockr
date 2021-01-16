import { ChangeEvent } from "react";

export type Props = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    id: string,
    type?: string,
};
