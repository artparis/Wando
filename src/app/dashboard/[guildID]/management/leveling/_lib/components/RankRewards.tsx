"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";
import { Button } from "#ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#ui/Select";
import { Trash2, Plus } from "lucide-react";

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

interface LevelingRewardsComponentProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export const RankRewardsComponent = ({ config, setConfig }: LevelingRewardsComponentProps) => {
  const [roles] = useState([
    { id: "role1", name: "Level 5", color: "#ff6b6b" },
    { id: "role2", name: "Level 10", color: "#4ecdc4" },
    { id: "role3", name: "Level 20", color: "#45b7d1" },
    { id: "role4", name: "Level 50", color: "#96ceb4" },
    { id: "role5", name: "Level 100", color: "#feca57" },
  ]);

  const handleToggleEnabled = () => {
    setConfig({
      ...config,
      rewards: {
        ...config.rewards,
        enabled: !config.rewards.enabled,
      },
    });
  };

  const addRoleReward = () => {
    setConfig({
      ...config,
      rewards: {
        ...config.rewards,
        roles: [
          ...config.rewards.roles,
          { level: 1, roleID: "" },
        ],
      },
    });
  };

  const removeRoleReward = (index: number) => {
    const newRoles = config.rewards.roles.filter((_, i) => i !== index);
    setConfig({
      ...config,
      rewards: {
        ...config.rewards,
        roles: newRoles,
      },
    });
  };

  const updateRoleReward = (index: number, field: "level" | "roleID", value: string | number) => {
    const newRoles = [...config.rewards.roles];
    newRoles[index] = {
      ...newRoles[index],
      [field]: field === "level" ? Number(value) : value,
    };
    setConfig({
      ...config,
      rewards: {
        ...config.rewards,
        roles: newRoles,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank Rewards</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Level Role Rewards</h3>
            <p className="text-sm text-gray-600">
              Automatically assign roles to users when they reach specific levels
            </p>
          </div>
          <label
            className={`w-[60px] h-[30px] ${
              config.rewards.enabled ? "bg-sky-500" : "bg-gray-600"
            } transition-all duration-200 ease-out inline-block relative rounded-full shadow-inner cursor-pointer`}
            onClick={handleToggleEnabled}
          >
            <span
              className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-300 transform ${
                config.rewards.enabled ? "translate-x-[120%]" : "translate-x-[20%]"
              } top-0.5 bottom-0.5`}
            />
          </label>
        </div>

        <div className="space-y-4">
          {config.rewards.roles.map((role, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`level-${index}`}>Level</Label>
                  <Input
                    id={`level-${index}`}
                    type="number"
                    min="1"
                    value={role.level}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateRoleReward(index, "level", e.target.value)
                    }
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-${index}`}>Role</Label>
                  <Select value={role.roleID} onValueChange={(value) => updateRoleReward(index, "roleID", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((roleOption) => (
                        <SelectItem key={roleOption.id} value={roleOption.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: roleOption.color }}
                            />
                            {roleOption.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => removeRoleReward(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}

          <Button onClick={addRoleReward} variant="outline" className="w-full">
            <Plus className="size-4 mr-2" />
            Add Role Reward
          </Button>
        </div>

        {config.rewards.roles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No role rewards configured</p>
            <p className="text-sm">Click "Add Role Reward" to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 