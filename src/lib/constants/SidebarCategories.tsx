import { Bolt, Logs, Home, Mailbox, MessageSquareCode, NotepadText, Shield, AlignVerticalJustifyStart, Youtube } from "lucide-react";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { Badge } from "#components/ui/Badge";

export const SidebarCategories: (guildID: string) => Category[] = (guildID) => [
  {
    items: [
      {
        ariaLabel: "Main Dashboard Page",
        href: `/dashboard/${guildID}`,
        icon: <Home className="size-5 text-default-400" />,
        name: "Dashboard",
        target: "_self",
      },
      {
        ariaLabel: "Configuration Page",
        href: `/dashboard/${guildID}/general/configuration`,
        icon: <Bolt className="size-5 text-default-400" />,
        name: "Configuration",
        target: "_self",
      },
    ],
    name: "General",
  },
  {
    items: [
      {
        ariaLabel: "logging Page",
        href: `/dashboard/${guildID}/management/logging`,
        icon: <Logs className="size-5 text-default-400" />,
        name: "Logging",
        target: "_self",
      },
      {
        ariaLabel: "Leveling Page",
        href: `/dashboard/${guildID}/management/leveling`,
        icon: <AlignVerticalJustifyStart className="size-5 text-default-400" />,
        name: "Leveling",
        target: "_self",
      },
      {
        ariaLabel: "Reactionrole Page",
        href: `/dashboard/${guildID}/management/reactionrole`,
        icon: <NotepadText className="size-5 text-default-400" />,
        name: "Reactionrole",
        target: "_self",
      },
      {
        ariaLabel: "youtubenotifications Page",
        href: `/dashboard/${guildID}/management/youtubenotifications`,
        icon: <Youtube className="size-5 text-default-400" />,
        name: "Notifications",
        target: "_self",
      },
    ],
    name: "Management",
  },
  {
    items: [
      {
        ariaLabel: "Embed Messages Page",
        href: `/dashboard/${guildID}/components/embed-messages`,
        icon: <MessageSquareCode className="size-5 text-default-400" />,
        name: "Embed Messages",
        target: "_self",
      },
      {
        ariaLabel: "moderation Page",
        href: `/dashboard/${guildID}/components/moderation`,
        icon: <Shield className="size-5 text-default-400" />,
        name: "Moderation",
        target: "_self",
      },
    ],
    name: "Components",
  },
];

export interface Category {
  items: CategoryItem[];
  name: string;
}

interface CategoryItem {
  ariaLabel: string;
  badge?: ReactElement;
  href: string;
  icon: ReactElement;
  name: string;
  target: HTMLAttributeAnchorTarget;
}
