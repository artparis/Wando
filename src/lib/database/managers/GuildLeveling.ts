import { DatabaseManager } from "../Manager";

export const GuildLevelingManager = new DatabaseManager<GuildLeveling, GuildLevelingUpdate>({
  collection: "GuildLeveling",
});

interface GuildLeveling {
  guildID: string;
  enable: boolean;
  xp: GuildLevelingXP;
  anouncement: GuildLevelingAnouncement;
  card: GuildLevelingCard;
  rewards: GuildLevelingRewards;
  noXP_Roles: string[];
  noXP_Channels: string[];
  createdAt: Date;
}

interface GuildLevelingUpdate {
  guildID: string;
  enable?: boolean;
  xp?: Partial<GuildLevelingXP>;
  anouncement?: Partial<GuildLevelingAnouncement>;
  card?: Partial<GuildLevelingCard>;
  rewards?: Partial<GuildLevelingRewards>;
  noXP_Roles?: string[];
  noXP_Channels?: string[];
  createdAt: {
    $date: string;
  };
}

interface GuildLevelingXP {
  min: number;
  max: number;
  cooldown: number;
}

interface GuildLevelingAnouncement {
  channel: string;
  message: string;
  enabled: boolean;
}

interface GuildLevelingCard {
  background: string;
  textColor: string;
  progressBarColor: string;
  enabled: boolean;
}

interface GuildLevelingRewards {
  roles: GuildLevelingRole[];
  enabled: boolean;
}

interface GuildLevelingRole {
  level: number;
  roleID: string;
} 