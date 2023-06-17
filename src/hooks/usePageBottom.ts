import { useState, useEffect } from "react";

const usePageBottom = (offset: number) => {
    const [reachedBottom, setReachedBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offsetHeight = document.documentElement.offsetHeight;
            const innerHeight = window.innerHeight;
            const scrollTop = document.documentElement.scrollTop;

            const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= offset;

            setReachedBottom(hasReachedBottom);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return reachedBottom
};

export default usePageBottom;