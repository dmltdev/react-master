import { useEffect, type ImgHTMLAttributes } from "react";

interface IdleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  render?: boolean;
}

function IdleImage({
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

export default IdleImage;
