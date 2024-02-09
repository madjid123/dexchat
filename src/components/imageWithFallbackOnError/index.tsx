import React, { ReactElement, ReactNode, useState } from "react";
import Avvvatars from "avvvatars-react";
import { cn } from "~/utils";
type Props = {
    value: string;
    src: string;
    alt: string;
    height: number;
    width: number;
    className: string;
    fallback?: ReactNode;
    htmlFor?: string;
}
export const ImageWithFallbackOnError: React.FC<Props> = (props) => {
    const [hideImage, setHideImage] = useState(false);
    const Fallback = props.fallback;
    return (<label htmlFor={props.htmlFor}> {(!hideImage ? (
        <img

            {...props}
            onError={() => {
                setHideImage(true);
            }}
        />
    ) : (
        props.fallback ? (Fallback) : <Avvvatars radius={8} value={props.value} size={32}></Avvvatars>)
    )}</label>)
};

export default ImageWithFallbackOnError;