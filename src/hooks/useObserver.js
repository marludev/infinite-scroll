import { useEffect, useState } from "react";

const useObserver = (element) => {
  const [observerElement, setObserverElement] = useState(false);

  //! infinity scroll
  useEffect(() => {
    const callback = (entries) => {
      const observing = entries[0].isIntersecting;
      setObserverElement(observing);
    };
    const observer = new IntersectionObserver(callback, {
      rootMargin: "1px",
    });
    observer.observe(element.current);
  }, [observerElement]);
  return { observerElement };
};

export default useObserver;
