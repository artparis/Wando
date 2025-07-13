"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";
import { Button } from "#ui/Button";
import { Textarea } from "#components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#ui/Select";

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

interface LevelingMessageComponentProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export const LevelingMessageComponent = ({ config, setConfig }: LevelingMessageComponentProps) => {
  const [channels] = useState([
    { id: "general", name: "#general" },
    { id: "announcements", name: "#announcements" },
    { id: "leveling", name: "#leveling" },
  ]);

  const handleChannelChange = (channelId: string) => {
    setConfig({
      ...config,
      anouncement: {
        ...config.anouncement,
        channel: channelId,
      },
    });
  };

  const handleMessageChange = (message: string) => {
    setConfig({
      ...config,
      anouncement: {
        ...config.anouncement,
        message,
      },
    });
  };

  const handleToggleEnabled = () => {
    setConfig({
      ...config,
      anouncement: {
        ...config.anouncement,
        enabled: !config.anouncement.enabled,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leveling Message</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Level Up Announcements</h3>
            <p className="text-sm text-gray-600">
              Configure the message that will be sent when a member levels up
            </p>
          </div>
          <label
            className={`w-[60px] h-[30px] ${
              config.anouncement.enabled ? "bg-sky-500" : "bg-gray-600"
            } transition-all duration-200 ease-out inline-block relative rounded-full shadow-inner cursor-pointer`}
            onClick={handleToggleEnabled}
          >
            <span
              className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-300 transform ${
                config.anouncement.enabled ? "translate-x-[120%]" : "translate-x-[20%]"
              } top-0.5 bottom-0.5`}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="announcement-channel">Announcement Channel</Label>
            <Select value={config.anouncement.channel} onValueChange={handleChannelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.id}>
                    {channel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="announcement-message">Message Template</Label>
            <Textarea
              id="announcement-message"
              value={config.anouncement.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleMessageChange(e.target.value)}
              placeholder="Congratulations {user}! You reached level {level}!"
              className="min-h-[100px] bg-gray-900 text-white"
            />
            <p className="text-xs text-gray-500">
              Available variables: {"{user}"}, {"{level}"}, {"{xp}"}, {"{guild}"}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Preview</h4>
          <p className="text-sm text-gray-300">
            {config.anouncement.message
              .replace("{user}", "@username")
              .replace("{level}", "5")
              .replace("{xp}", "1250")
              .replace("{guild}", "My Server")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 