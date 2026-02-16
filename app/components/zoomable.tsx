import type { ReactNode } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface ZoomableProps {
    children: ReactNode;
}

export default function Zoomable({ children }: ZoomableProps) {
    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: true }}
            centerOnInit
        >
            <TransformComponent
                wrapperClass="flex justify-center"
                contentClass="print:!transform-none"
            >
                {children}
            </TransformComponent>
        </TransformWrapper>
    );
}
