import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared stroke-icon chrome — 24px grid, currentColor, rounded joins. */
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ services */

export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.6V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.6" />
  </Svg>
);

export const IconOffice = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M15 21V10h3a2 2 0 0 1 2 2v9" />
    <path d="M8 7h4M8 11h4M8 15h4" />
  </Svg>
);

export const IconDeep = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3h5l1 4H9z" />
    <path d="M10 7v3.2a3 3 0 0 1-.7 1.9L8 13.7V20a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-6.3l-1.3-1.6a3 3 0 0 1-.7-1.9V7" />
    <path d="M19 4.5 20 3l1 1.5L22.5 5 21 6l-1 1.5L19 6l-1.5-1z" />
  </Svg>
);

export const IconMove = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2 8.5 12 4l10 4.5v7L12 20 2 15.5z" />
    <path d="M2 8.5 12 13l10-4.5M12 13v7" />
    <path d="M7 6.2 17 10.7" />
  </Svg>
);

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20c0-8 5-14 16-15 1 10-4 15-11 15-2.5 0-5 0-5 0z" />
    <path d="M9 15c1.8-3.4 4.4-5.8 8-7.4" />
  </Svg>
);

export const IconWindow = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M12 3v18M3 12h18" />
    <path d="M6.5 7.5 9 6M6.5 10.5 9 9" />
  </Svg>
);

/* ------------------------------------------------------------------------ ui */

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.8 2.5C10.8 19.3 4.7 13.2 4 5.8A2.5 2.5 0 0 1 6.5 3z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Svg>
);

export const IconStar = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.4 6.7 19.2l1.1-5.9L3.5 9.2l5.9-.8z" />
  </svg>
);

export const IconQuote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M9.5 5C6.4 6.6 4.5 9.4 4.5 13v6h7v-7H8c0-2.4 1-4.1 3-5.2zm10 0c-3.1 1.6-5 4.4-5 8v6h7v-7H18c0-2.4 1-4.1 3-5.2z" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const IconSparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="m18.5 15.5.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
  </Svg>
);

export const IconBubble = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="13" r="6.5" />
    <circle cx="17.5" cy="6.5" r="3" />
    <path d="M7 10.5a3.6 3.6 0 0 1 2.4-2" />
  </Svg>
);

export const IconRecycle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.6 5.4 12 3l3.4 2.4" />
    <path d="M12 3v7" />
    <path d="m4.6 15.6.6 4.1 4-.9" />
    <path d="m5.2 19.7 6-3.5" />
    <path d="m19.4 15.6-.6 4.1-4-.9" />
    <path d="m18.8 19.7-6-3.5" />
  </Svg>
);

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2M17.5 14.6A5.5 5.5 0 0 1 20.5 20" />
  </Svg>
);

/* -------------------------------------------------------------------- social */

export const IconFacebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V13h2.7v8z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconLinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M4.8 8.6h3v11.6h-3zM6.3 3.7a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10.3 8.6h2.9v1.6c.5-.9 1.7-1.8 3.4-1.8 3 0 3.6 1.9 3.6 4.5v7.3h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4v6.6h-3z" />
  </svg>
);

export const IconYouTube = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.1V8.9l5.2 3.1z" />
  </svg>
);

/* ------------------------------------------------------------------ registry */

export const serviceIcons = {
  home: IconHome,
  office: IconOffice,
  deep: IconDeep,
  move: IconMove,
  leaf: IconLeaf,
  window: IconWindow,
} as const;

export const socialIcons = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  youtube: IconYouTube,
} as const;
