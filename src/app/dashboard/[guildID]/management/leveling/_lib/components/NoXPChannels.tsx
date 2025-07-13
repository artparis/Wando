"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { Button } from "#ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#ui/Select";
import { Trash2, Plus } from "lucide-react";
import { Badge } from "#ui/Badge";

interface LevelingConfig {
  enable: boolean;
  xp: {
    min: number;
    max: number;
    cooldown: number;
  };
  anouncement: {
    channel: string;
    message: string;
    enabled: boolean;
  };
  card: {
    background: string;
    textColor: string;
    progressBarColor: string;
    enabled: boolean;
  };
  rewards: {
    roles: Array<{
      level: number;
      roleID: string;
    }>;
    enabled: boolean;
  };
  noXP_Roles: string[];
  noXP_Channels: string[];
}

interface NoXPChannelsComponentProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export const NoXPChannelsComponent = ({ config, setConfig }: NoXPChannelsComponentProps) => {
  const [channels] = useState([
    { id: "general", name: "#general", type: "text" },
    { id: "announcements", name: "#announcements", type: "text" },
    { id: "bot-commands", name: "#bot-commands", type: "text" },
    { id: "voice-chat", name: "#voice-chat", type: "voice" },
    { id: "music", name: "#music", type: "voice" },
    { id: "rules", name: "#rules", type: "text" },
    { id: "welcome", name: "#welcome", type: "text" },
  ]);

  const addNoXPChannel = (channelId: string) => {
    if (!config.noXP_Channels.includes(channelId)) {
      setConfig({
        ...config,
        noXP_Channels: [...config.noXP_Channels, channelId],
      });
    }
  };

  const removeNoXPChannel = (channelId: string) => {
    setConfig({
      ...config,
      noXP_Channels: config.noXP_Channels.filter((id) => id !== channelId),
    });
  };

  const getChannelName = (channelId: string) => {
    const channel = channels.find((c) => c.id === channelId);
    return channel ? channel.name : channelId;
  };

  const availableChannels = channels.filter((channel) => !config.noXP_Channels.includes(channel.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>No XP Channels</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Excluded Channels</h3>
          <p className="text-sm text-gray-600">
            Select channels where users cannot gain XP when sending messages
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Select onValueChange={addNoXPChannel}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a channel to exclude" />
              </SelectTrigger>
              <SelectContent>
                {availableChannels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.id}>
                    <div className="flex items-center gap-2">
                      <span>{channel.name}</span>
                      <Badge variant="cyan" className="text-xs">
                        {channel.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => addNoXPChannel(availableChannels[0]?.id || "")}>
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Excluded Channels ({config.noXP_Channels.length})</h4>
            {config.noXP_Channels.length === 0 ? (
              <p className="text-sm text-gray-500">No channels are excluded from XP gain</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {config.noXP_Channels.map((channelId) => (
                  <Badge key={channelId} variant="cyan" className="flex items-center gap-2">
                    {getChannelName(channelId)}
                    <Button
                      variant="ghost"
                      onClick={() => removeNoXPChannel(channelId)}
                      className="h-auto p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 