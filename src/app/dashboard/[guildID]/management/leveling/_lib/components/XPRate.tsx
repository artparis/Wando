"use client";

import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";

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

interface XPRateComponentProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export const XPRateComponent = ({ config, setConfig }: XPRateComponentProps) => {
  const handleXPChange = (field: keyof typeof config.xp, value: string) => {
    setConfig({
      ...config,
      xp: {
        ...config.xp,
        [field]: Number(value),
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>XP Rate</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">XP Gain Settings</h3>
          <p className="text-sm text-gray-600">
            Configure how much XP users gain and the cooldown between gains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="xp-min">Minimum XP</Label>
            <Input
              id="xp-min"
              type="number"
              min="1"
              max="100"
              value={config.xp.min}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleXPChange("min", e.target.value)
              }
              placeholder="15"
            />
            <p className="text-xs text-gray-500">Minimum XP gained per message</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="xp-max">Maximum XP</Label>
            <Input
              id="xp-max"
              type="number"
              min="1"
              max="100"
              value={config.xp.max}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleXPChange("max", e.target.value)
              }
              placeholder="25"
            />
            <p className="text-xs text-gray-500">Maximum XP gained per message</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="xp-cooldown">Cooldown (seconds)</Label>
            <Input
              id="xp-cooldown"
              type="number"
              min="1"
              max="3600"
              value={config.xp.cooldown}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleXPChange("cooldown", e.target.value)
              }
              placeholder="60"
            />
            <p className="text-xs text-gray-500">Time between XP gains</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Current Settings</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Min XP:</span>
              <span className="text-white ml-2">{config.xp.min}</span>
            </div>
            <div>
              <span className="text-gray-400">Max XP:</span>
              <span className="text-white ml-2">{config.xp.max}</span>
            </div>
            <div>
              <span className="text-gray-400">Cooldown:</span>
              <span className="text-white ml-2">{config.xp.cooldown}s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 