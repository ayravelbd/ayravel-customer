"use client";


import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// declare global for TypeScript
declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export default function useFacebookPixel() {
  const pathname = usePathname();
  const { data: settingsData } = useGetSettingsQuery();

  const pixelId =
    settingsData?.facebookPixel?.pixelId
  
  const isEnabled =
    settingsData?.facebookPixel?.isEnabled;
  

  useEffect(() => {
    if (!pixelId) return;
    if (!isEnabled) return;
    if (typeof window === "undefined") return;

    // Load FB Pixel once
    if (typeof window.fbq === "undefined") {
      const fbqFunc = function (...args: any[]) {
        (window.fbq as any).callMethod
          ? (window.fbq as any).callMethod.apply(window.fbq, args)
          : (window.fbq as any).queue.push(args);
      };

      window.fbq = fbqFunc;
      window._fbq = fbqFunc;
      (window.fbq as any).push = fbqFunc;
      (window.fbq as any).loaded = true;
      (window.fbq as any).version = "2.0";
      (window.fbq as any).queue = [];

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";

      document.head.appendChild(script);
    }

    // Init Pixel
    window.fbq("init", pixelId);

    // Track pageview on route change
    window.fbq("track", "PageView");

  }, [pixelId, pathname]);
}
