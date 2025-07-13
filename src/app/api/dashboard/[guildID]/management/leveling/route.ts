import type { NextRequest } from "next/server";
import { z } from "zod";
import { GuildLevelingManager } from "#lib/database/managers/GuildLeveling";
import { NextJSONResponse } from "#lib/Responses";

const LevelingConfigSchema = z.object({
  enable: z.boolean(),
  xp: z.object({
    min: z.number().min(1).max(100),
    max: z.number().min(1).max(100),
    cooldown: z.number().min(1).max(3600),
  }),
  anouncement: z.object({
    channel: z.string(),
    message: z.string(),
    enabled: z.boolean(),
  }),
  card: z.object({
    background: z.string(),
    textColor: z.string(),
    progressBarColor: z.string(),
    enabled: z.boolean(),
  }),
  rewards: z.object({
    roles: z.array(z.object({
      level: z.number().min(1),
      roleID: z.string(),
    })),
    enabled: z.boolean(),
  }),
  noXP_Roles: z.array(z.string()),
  noXP_Channels: z.array(z.string()),
});

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      guildID: string;
    };
  },
) => {
  try {
    const levelingConfig = await GuildLevelingManager.findOne({
      guildID: params.guildID,
    });

    if (!levelingConfig) {
      // Return default configuration if none exists
      const defaultConfig = {
        enable: false,
        xp: {
          min: 15,
          max: 25,
          cooldown: 60,
        },
        anouncement: {
          channel: "",
          message: "Congratulations {user}! You reached level {level}!",
          enabled: false,
        },
        card: {
          background: "#23272A",
          textColor: "#FFFFFF",
          progressBarColor: "#7289DA",
          enabled: true,
        },
        rewards: {
          roles: [],
          enabled: false,
        },
        noXP_Roles: [],
        noXP_Channels: [],
      };

      return NextJSONResponse({
        data: defaultConfig,
        status: 200,
      });
    }

    return NextJSONResponse({
      data: {
        enable: levelingConfig.enable,
        xp: levelingConfig.xp,
        anouncement: levelingConfig.anouncement,
        card: levelingConfig.card,
        rewards: levelingConfig.rewards,
        noXP_Roles: levelingConfig.noXP_Roles,
        noXP_Channels: levelingConfig.noXP_Channels,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching leveling config:", error);

    return NextJSONResponse({
      data: "Internal Server Error",
      status: 500,
    });
  }
};

export const PUT = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      guildID: string;
    };
  },
) => {
  try {
    const body = await request.json().catch(() => null);

    if (!JSON.parse(JSON.stringify(body))) {
      return NextJSONResponse({
        data: "Bad Request",
        status: 400,
      });
    }

    const { data, error } = LevelingConfigSchema.safeParse(body);

    if (error) {
      return NextJSONResponse({
        data: error.issues[0].message,
        status: 422,
      });
    }

    await GuildLevelingManager.upsert(
      {
        guildID: params.guildID,
      },
      {
        enable: data.enable,
        xp: data.xp,
        anouncement: data.anouncement,
        card: data.card,
        rewards: data.rewards,
        noXP_Roles: data.noXP_Roles,
        noXP_Channels: data.noXP_Channels,
      },
      {
        guildID: params.guildID,
        enable: data.enable,
        xp: data.xp,
        anouncement: data.anouncement,
        card: data.card,
        rewards: data.rewards,
        noXP_Roles: data.noXP_Roles,
        noXP_Channels: data.noXP_Channels,
        createdAt: {
          $date: new Date().toISOString(),
        },
      },
    );

    return NextJSONResponse({
      data: {},
      status: 200,
    });
  } catch (error) {
    console.error("Error updating leveling config:", error);

    return NextJSONResponse({
      data: "Internal Server Error",
      status: 500,
    });
  }
}; 