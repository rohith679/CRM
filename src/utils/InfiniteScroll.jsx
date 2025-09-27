// // src/components/InfiniteScrollList.js
// import React, { useEffect, useRef } from "react";

// const InfiniteScrollList = ({
//   children,
//   onLoadMore,
//   hasMore = true,
//   loader = null,
//   threshold = 300,
// }) => {
//   const containerRef = useRef(null);

//   const handleScroll = () => {
//     if (!hasMore) return;

//     const container = containerRef.current;
//     if (container) {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       if (scrollHeight - scrollTop - clientHeight < threshold) {
//         onLoadMore();
//       }
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//     }
//     return () => {
//       if (container) {
//         container.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [hasMore]);

//   return (
//     <div
//       ref={containerRef}
//       style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
//     >
//       {children}
//       {hasMore && loader}
//     </div>
//   );
// };

// export default InfiniteScrollList;

import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = ({
  callback, // function to fetch next page
  containerRef, // scrollable container ref
  hasMore = true, // boolean: whether more data exists
  threshold = 100, // how close to bottom (in px) before triggering
  debounce = 200, // delay to reduce calls
}) => {
  const loaderRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!hasMore || !containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const bottomReached = scrollHeight - scrollTop - clientHeight < threshold;

    if (bottomReached) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback();
      }, debounce);
    }
  }, [callback, hasMore, threshold, debounce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [handleScroll]);

  return { loaderRef };
};

export default useInfiniteScroll;
