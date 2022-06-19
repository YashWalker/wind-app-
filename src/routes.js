import React, { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const CRoutes = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(20);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(100);
  }, [prevLoc]);

  return (
    <>
      {progress && (
        <LoadingBar
          color="#F69901"
          height={4}
          progress={progress}
          //   onLoaderFinished={() => setProgress(0)}
        />
      )}
      <Routes>{children}</Routes>
    </>
  );
};

export default CRoutes;
