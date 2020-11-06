import * as React from "react";

export function useIsMounted() {
    const isMountedRef = React.useRef<boolean>(true);
    React.useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, [isMountedRef]);

    return {isMountedRef};
}
