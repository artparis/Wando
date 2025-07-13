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

interface NoXPRolesComponentProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export const NoXPRolesComponent = ({ config, setConfig }: NoXPRolesComponentProps) => {
  const [roles] = useState([
    { id: "admin", name: "Admin", color: "#ff6b6b" },
    { id: "moderator", name: "Moderator", color: "#4ecdc4" },
    { id: "bot", name: "Bot", color: "#45b7d1" },
    { id: "muted", name: "Muted", color: "#96ceb4" },
    { id: "vip", name: "VIP", color: "#feca57" },
    { id: "staff", name: "Staff", color: "#ff9ff3" },
    { id: "helper", name: "Helper", color: "#54a0ff" },
  ]);

  const addNoXPRole = (roleId: string) => {
    if (!config.noXP_Roles.includes(roleId)) {
      setConfig({
        ...config,
        noXP_Roles: [...config.noXP_Roles, roleId],
      });
    }
  };

  const removeNoXPRole = (roleId: string) => {
    setConfig({
      ...config,
      noXP_Roles: config.noXP_Roles.filter((id) => id !== roleId),
    });
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getRoleColor = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.color : "#ffffff";
  };

  const availableRoles = roles.filter((role) => !config.noXP_Roles.includes(role.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>No XP Roles</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Excluded Roles</h3>
          <p className="text-sm text-gray-600">
            Select roles whose members cannot gain XP when sending messages
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Select onValueChange={addNoXPRole}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a role to exclude" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      <span>{role.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => addNoXPRole(availableRoles[0]?.id || "")}>
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Excluded Roles ({config.noXP_Roles.length})</h4>
            {config.noXP_Roles.length === 0 ? (
              <p className="text-sm text-gray-500">No roles are excluded from XP gain</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {config.noXP_Roles.map((roleId) => (
                  <Badge key={roleId} variant="rose" className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getRoleColor(roleId) }}
                    />
                    {getRoleName(roleId)}
                    <Button
                      variant="ghost"
                      onClick={() => removeNoXPRole(roleId)}
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