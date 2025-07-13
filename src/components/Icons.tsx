import type { HTMLAttributes } from "react";
import { cn } from "./Util";

export const Overseer = ({ className }: IconProps) => (
  <svg
    aria-label="Muzzle SVG Icon"
    className={cn(className)}
    fill="currentColor"
    height="750"
    role="img"
    viewBox="0 0 750 750"
    width="750"
  >
    <defs>
      <image
        height="700"
        width="700"
        href="https://i.imgur.com/xwnxw0x.png"
        id="image"
        preserveAspectRatio="xMidYMid meet"
      />
    </defs>
    <use href="#image" x="25" y="25" /> {/* moved closer to top-left */}
  </svg>
);

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {}
