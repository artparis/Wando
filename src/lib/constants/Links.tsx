import { CirclePlus, Gavel, LayoutDashboard, LifeBuoy, LockKeyhole, Users, CircleDollarSign } from "lucide-react";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "#lib/Constants";

export const Links: ({
  useLongText,
}: {
  useLongText: boolean;
}) => Record<"useful_links" | "about_us", Link[]> = ({ useLongText }) => ({
  useful_links: [
    {
      ariaLabel: "Add to Discord Link",
      href: ADD_TO_DISCORD_URL,
      icon: <CirclePlus className="size-5 text-default-400" />,
      name: useLongText ? "Add to Discord" : "Add to Discord",
      target: "_blank",
    },
    {
      ariaLabel: "Support Link",
      href: SUPPORT_SERVER_URL,
      icon: <LifeBuoy className="size-5 text-default-400" />,
      name: useLongText ? "Support" : "Support",
      target: "_blank",
    },
    {
      ariaLabel: "Manage Servers Page",
      href: "/dashboard",
      icon: <LayoutDashboard className="size-5 text-default-400" />,
      name: useLongText ? "Manage Servers" : "Dashboard",
      target: "_self",
    },
    {
      ariaLabel: "Manage Servers Page",
      href: "/premium",
      icon: <CircleDollarSign className="size-5 text-default-400" />,
      name: useLongText ? (
        <span style={{ color: '#FFD700' }}>Premium ✨</span>
      ) : (
        <span style={{ color: '#FFD700' }}>Premium ✨</span>
      ),
      target: "_self",
    },
  ],
  about_us: [
    {
      ariaLabel: "Terms of Service Page",
      href: "/terms",
      icon: <Gavel className="size-5 text-default-400" />,
      name: useLongText ? "Terms of Service" : "Terms",
      target: "_self",
    },
    {
      ariaLabel: "Privacy Policy Page",
      href: "/privacy",
      icon: <LockKeyhole className="size-5 text-default-400" />,
      name: useLongText ? "Privacy Policy" : "Privacy",
      target: "_self",
    },
    {
      ariaLabel: "Meet the Team Page",
      href: "/team",
      icon: <Users className="size-5 text-default-400" />,
      name: useLongText ? "Meet the Team" : "Team",
      target: "_self",
    },
  ],
});

interface Link {
  ariaLabel: string;
  href: string;
  icon: ReactElement;
  name: string | ReactElement;
  target: HTMLAttributeAnchorTarget;
}
