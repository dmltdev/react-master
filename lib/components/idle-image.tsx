"use client";

import React, { useEffect, type ImgHTMLAttributes } from "react";

interface IdleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  render?: boolean;
}

/**
 * An image component that preloads images during browser idle time to improve performance.
 * Only renders the image when the `render` prop is true.
 *
 * Perfect for:
 * - Below-the-fold images - Images user hasn't scrolled to yet
 * - Modal/dropdown images - Images that show on user interaction
 * - Gallery thumbnails - Especially in large grids
 * - Background images - Decorative images that aren't critical
 * - Avatar images - Profile pictures, user avatars
 * - Product images - In e-commerce listings (non-hero images)
 *
 * Don't use for:
 * - Hero images - Critical above-the-fold content
 * - Logo/branding - Essential visual elements
 * - Icons - UI elements needed immediately
 *
 * @example
 * // Gallery with selective rendering
 * {images.map((img, index) => (
 *   <IdleImage
 *     key={img.id}
 *     src={img.src}
 *     alt={img.alt}
 *     render={index < 10} // Only render first 10
 *     className="thumbnail"
 *   />
 * ))}
 *
 * @param src - Image source URL
 * @param render - Whether to render the image (default: false)
 * @param alt - Alt text for accessibility (default: "")
 * @param props - Additional HTML img attributes
 */
export default function IdleImage({
  src,
  render = false,
  alt = "",
  ...props
}: IdleImageProps) {
  useEffect(() => {
    let idleCallbackId: number | undefined;

    const preload = () => {
      const img = new Image();
      img.src = src!;
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = requestIdleCallback(preload, { timeout: 2000 });
    } else {
      // Fallback for Safari/unsupported browsers
      const timeoutId = setTimeout(preload, 200);
      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (idleCallbackId) {
        cancelIdleCallback(idleCallbackId);
      }
    };
  }, [src]);

  if (!render || !src) return null;

  return <img src={src} alt={alt} {...props} />;
}
