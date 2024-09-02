import { useEffect, useRef, useState } from "react";

export function useOverflowTooltip(content: React.ReactNode) {
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollWidth, clientWidth } = contentRef.current;
        setIsOverflow(scrollWidth > clientWidth);
      }
    };

    // Initial check
    checkOverflow();

    // ResizeObserver to handle content changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [content]);

  return { contentRef, isOverflow };
}
