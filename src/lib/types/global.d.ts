declare global {
    interface Window {
        Tawk_API?: {
            maximize: () => void;
            minimize: () => void;
            toggle: () => void;
            hideWidget: () => void;
            showWidget: () => void;
            [key: string]: any;
        };
    }
}

export { };
