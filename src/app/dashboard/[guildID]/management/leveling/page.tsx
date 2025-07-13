"use client";

import { Suspense, useEffect, useState } from "react";
import { GuildLevelingManager } from "#lib/database/managers/GuildLeveling";
import { LevelingMessageComponent } from "./_lib/components/LevelingMessage";
import LevelingCardComponent from "./_lib/components/LevelingCard";
import { RankRewardsComponent } from "./_lib/components/RankRewards";
import { XPRateComponent } from "./_lib/components/XPRate";
import { NoXPChannelsComponent } from "./_lib/components/NoXPChannels";
import { NoXPRolesComponent } from "./_lib/components/NoXPRoles";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { Button } from "#ui/Button";
import { Loader2 } from "lucide-react";
import { useToast } from "#ui/useToast";
import { makeClientRequest } from "#lib/Client";

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

const initialConfig: LevelingConfig = {
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

export default function LevelingPage({ params }: { params: { guildID: string } }) {
  const [config, setConfig] = useState<LevelingConfig>(initialConfig);
  const [defaultConfig, setDefaultConfig] = useState<LevelingConfig>(initialConfig);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load initial configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await makeClientRequest(`/api/dashboard/${params.guildID}/management/leveling`, {
          method: "GET",
        });
        const responseData = await response.json() as { data?: LevelingConfig };
        
        if (responseData.data) {
          setConfig(responseData.data);
          setDefaultConfig(responseData.data);
        }
      } catch (error) {
        console.error("Failed to load leveling config:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [params.guildID]);

  // Check for changes
  useEffect(() => {
    setIsChanged(JSON.stringify(config) !== JSON.stringify(defaultConfig));
  }, [config, defaultConfig]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await makeClientRequest(`/api/dashboard/${params.guildID}/management/leveling`, {
        method: "PUT",
        json: config,
      });
      
      setDefaultConfig(config);
      setIsChanged(false);
      toast({
        description: "Leveling configuration saved successfully!",
        variant: "emerald",
      });
    } catch (error) {
      toast({
        description: "Failed to save leveling configuration",
        variant: "rose",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl text-white font-bold">Leveling</h1>
          <p className="text-lg text-gray-600 font-medium">
            Give your members XP and levels up when they send a message
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-xl text-white">Enable</h1>
          <label
            className={`w-[60px] h-[30px] ${
              config.enable ? "bg-sky-500" : "bg-gray-600"
            } transition-all duration-200 ease-out inline-block relative rounded-full shadow-inner cursor-pointer`}
            onClick={() => setConfig({ ...config, enable: !config.enable })}
          >
            <span
              className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-300 transform ${
                config.enable ? "translate-x-[120%]" : "translate-x-[20%]"
              } top-0.5 bottom-0.5`}
            />
          </label>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        onReset={(e) => {
          e.preventDefault();
          handleReset();
        }}
      >
        <div className="flex flex-col gap-6">
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Leveling Message</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <LevelingMessageComponent config={config} setConfig={setConfig} />
          </Suspense>

          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Rank Card</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <LevelingCardComponent config={config} setConfig={setConfig} />
          </Suspense>

          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Rank Rewards</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <RankRewardsComponent config={config} setConfig={setConfig} />
          </Suspense>

          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>XP Rate</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <XPRateComponent config={config} setConfig={setConfig} />
          </Suspense>

          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>No XP Channels</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <NoXPChannelsComponent config={config} setConfig={setConfig} />
          </Suspense>

          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>No XP Roles</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <NoXPRolesComponent config={config} setConfig={setConfig} />
          </Suspense>

          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={!isChanged || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* <FormChangePopUpComponent isChanged={isChanged} /> */}
    </div>
  );
}
