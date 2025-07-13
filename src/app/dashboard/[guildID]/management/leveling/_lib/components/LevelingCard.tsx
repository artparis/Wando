import { useEffect, useRef, useState } from "react";
import drawLevelingCard from "../../../../../../../utils/drawLevelingCard";
import { ChromePicker } from "react-color";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";

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

interface LevelingCardProps {
  config: LevelingConfig;
  setConfig: React.Dispatch<React.SetStateAction<LevelingConfig>>;
}

export default function LevelingCard({ config, setConfig }: LevelingCardProps) {
    const [dropMenu, setDropMenu] = useState(true)
    const [avatarColor, setAvatarColor] = useState(false)
    const [textColor, setTextColor] = useState(false)
    const [usernameColor, setUsernameColor] = useState(false)
    const [overlayColor, setOverlayColor] = useState(false)
    const [progressBarColor, setProgressBarColor] = useState(false)
    // REMOVED: const [redrawTrigger, setRedrawTrigger] = useState(0)

    const ref = useRef<HTMLCanvasElement>(null)
    
    // Mock user data for preview
    const mockUser = {
        id: "123456789",
        avatar: "default.png",
        username: "Preview User"
    }

    useEffect(() => {
        const canvas = ref.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                // Clear the canvas first
                context.clearRect(0, 0, 467, 141)
                
                // Convert LevelingConfig card structure to the expected format
                const cardConfig = {
                    background: config.card.background,
                    color: {
                        overlayColor: "#000000",
                        avatar: "#FFFFFF",
                        progressbar: config.card.progressBarColor,
                        username: "#FFFFFF",
                        text: config.card.textColor
                    },
                    overlay: 0.5
                }
                
                // Call the function synchronously
                try {
                    drawLevelingCard(context, cardConfig, mockUser)
                } catch (error) {
                    console.error('Error drawing leveling card:', error)
                }
            } else {
                console.error('Could not get 2D context from canvas')
            }
        } else {
            console.error('Canvas ref is null')
        }
    }, [config, mockUser])

    // Handle clicking outside color pickers
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.color-picker-container')) {
                setTextColor(false)
                setProgressBarColor(false)
                setDropMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleBackgroundChange = (value: string) => {
        setConfig({
            ...config,
            card: {
                ...config.card,
                background: value
            }
        })
    }

    const handleTextColorChange = (color: string) => {
        setConfig({
            ...config,
            card: {
                ...config.card,
                textColor: color
            }
        })
    }

    const handleProgressBarColorChange = (color: string) => {
        setConfig({
            ...config,
            card: {
                ...config.card,
                progressBarColor: color
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rank Card</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Rank Card Customization</h3>
                        <p className="text-sm text-gray-600">
                            Customize the appearance of level-up rank cards
                        </p>
                    </div>
                    <label
                        className={`w-[60px] h-[30px] ${
                            config.card.enabled ? "bg-sky-500" : "bg-gray-600"
                        } transition-all duration-200 ease-out inline-block relative rounded-full shadow-inner cursor-pointer`}
                        onClick={() => setConfig({
                            ...config,
                            card: {
                                ...config.card,
                                enabled: !config.card.enabled
                            }
                        })}
                    >
                        <span
                            className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-300 transform ${
                                config.card.enabled ? "translate-x-[120%]" : "translate-x-[20%]"
                            } top-0.5 bottom-0.5`}
                        />
                    </label>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-md text-gray-300 font-medium mb-2">Preview</h4>
                        <div className="min-w-fit max-w-[467px] aspect-[3.31/1] relative">
                            <canvas className="rounded-xl w-full h-full block" ref={ref} width={467} height={141}/>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Image URL input on its own row */}
                        <div className="flex gap-2 items-center mb-4">
                            <input 
                                className="flex-1 h-[45px] rounded-lg border border-gray-600 bg-neutral-800 px-3 py-1 text-lg text-gray-300 font-semibold outline-none focus:border-sky-500"
                                placeholder="image url" 
                                pattern="(https:)?\/\/(\w+\.)?imgur\.com\/(\S*)(\.[a-zA-Z]{3,4})"
                                value={config.card.background.startsWith('#') ? '' : config.card.background} 
                                onChange={(e) => handleBackgroundChange(e.target.value)}
                            />
                        </div>
                        {/* Row with Text Color, Card Background Color, Progress Bar Color */}
                        <div className="flex flex-row justify-between items-center gap-8">
                            {/* Text Color Picker */}
                            <div className="flex flex-col items-center flex-1">
                                <h4 className="text-md text-gray-300 font-medium mb-2">Text Color</h4>
                                <div className="relative color-picker-container flex flex-row items-center gap-2">
                                    <div 
                                        className="w-[45px] h-[45px] rounded-lg border-4 border-stone-800 cursor-pointer flex items-center justify-center" 
                                        onClick={() => {
                                            setAvatarColor(false)
                                            setOverlayColor(false)
                                            setUsernameColor(false)
                                            setTextColor((prev) => !prev)
                                            setProgressBarColor(false)
                                        }} 
                                        style={{ backgroundColor: config.card.textColor }}
                                    >
                                        <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                    </div>
                                    {textColor && (
                                        <div className="absolute left-0 bottom-[110%] z-10">
                                            <ChromePicker 
                                                className="!bg-neutral-800" 
                                                color={config.card.textColor} 
                                                onChange={(color) => handleTextColorChange(color.hex)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Card Background Color Picker (centered) */}
                            <div className="flex flex-col items-center flex-1">
                                <h4 className="text-md text-gray-300 font-medium mb-2">Card Background</h4>
                                <div className="relative color-picker-container flex flex-row items-center justify-center">
                                    <div 
                                        className="w-[45px] h-[45px] rounded-lg border-4 border-stone-800 cursor-pointer flex items-center justify-center" 
                                        onClick={() => {
                                            setAvatarColor(false)
                                            setOverlayColor(false)
                                            setUsernameColor(false)
                                            setTextColor(false)
                                            setProgressBarColor(false)
                                            if (config.card.background.startsWith('#')) {
                                                setDropMenu(prev => !prev)
                                            } else {
                                                setDropMenu(true)
                                            }
                                        }} 
                                        style={{ backgroundColor: config.card.background.startsWith('#') ? config.card.background : '#23272A' }}
                                    >
                                        <i className="text-white text-sm fa-solid fa-eye-dropper flex items-center justify-center h-full"></i>
                                    </div>
                                    {dropMenu && config.card.background.startsWith('#') && (
                                        <div className="absolute left-0 bottom-[110%] z-10">
                                            <ChromePicker 
                                                className="!bg-neutral-800" 
                                                color={config.card.background} 
                                                onChange={(color) => handleBackgroundChange(color.hex)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Progress Bar Color Picker */}
                            <div className="flex flex-col items-center flex-1">
                                <h4 className="text-md text-gray-300 font-medium mb-2">Progress Bar Color</h4>
                                <div className="relative color-picker-container flex flex-row items-center gap-2">
                                    <div 
                                        className="w-[45px] h-[45px] rounded-lg border-4 border-stone-800 cursor-pointer flex items-center justify-center" 
                                        onClick={() => {
                                            setAvatarColor(false)
                                            setOverlayColor(false)
                                            setUsernameColor(false)
                                            setTextColor(false)
                                            setProgressBarColor((prev) => !prev)
                                        }} 
                                        style={{ backgroundColor: config.card.progressBarColor }}
                                    >
                                        <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                    </div>
                                    {progressBarColor && (
                                        <div className="absolute left-0 bottom-[110%] z-10">
                                            <ChromePicker 
                                                className="!bg-neutral-800" 
                                                color={config.card.progressBarColor} 
                                                onChange={(color) => handleProgressBarColorChange(color.hex)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
