import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loadAnimation from "./old-man.json";
import "@styles/loading/index.css";

const LogoLoading = () => {
  const refLoad = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: refLoad.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadAnimation,
    });

    return () => instance.destroy();
  }, []);

  return <div ref={refLoad} className="contentLoading"></div>;
};

export default LogoLoading;
