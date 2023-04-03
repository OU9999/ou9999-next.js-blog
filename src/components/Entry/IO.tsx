// useIntersectionObserver custom hook
import { useEffect, useRef } from "react";

export const useIntersectionObserve = (
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  content: string
) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    headingElementsRef.current = {};

    const callback: IntersectionObserverCallback = (
      headings: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];

        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string): number =>
        Object.values(headingElementsRef.current).findIndex(
          (heading: any) => heading.id === id
        );

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    if (document.readyState === "complete") {
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ) as Element[];

      const observer = new IntersectionObserver(callback, {
        rootMargin: "-64px 0px -40% 0px",
      });
      headingElements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    headingElementsRef.current = {};

    const callback: IntersectionObserverCallback = (
      headings: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];

        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string): number =>
        Object.values(headingElementsRef.current).findIndex(
          (heading: any) => heading.id === id
        );

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    if (document.readyState === "complete") {
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ) as Element[];

      const observer = new IntersectionObserver(callback, {
        rootMargin: "-64px 0px -40% 0px",
      });
      headingElements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    } else {
      return;
    }
  }, [content, setActiveId]);
};
