import { NavbarComponent } from "#components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "#components/ui/Button";
import { ADD_TO_DISCORD_URL } from "#lib/Constants";
import TrustedServers from "#components/servers";

export default function Home() {
    // Mock data for bot and user - replace with actual data fetching
    const bot = {
        displayAvatarURL: "/assets/muzzle_cropped.png",
        username: "Muzzle"
    };
    const user = null;

    return (
        <>
            <NavbarComponent isDashboard={false} />
            <main>
                <div className="flex full-screen:h-[calc(650px_-_64px)] h-[calc(100dvh_-_64px)] flex-col items-center justify-center gap-6 px-8">
                    <div className="rounded-full bg-amber-950 p-3 text-center text-amber-400 text-xs">
                        Discord Bot for leveling Make your server interactive
                    </div>
                    <div className="flex flex-row gap-3 justify-center items-center">
                        <Image
                            className="w-[96px] h-[96px] rounded-full"
                            src={bot.displayAvatarURL}
                            alt="Bot Avatar"
                            width={96}
                            height={96}
                        />
                        <div className="flex flex-col">
                            <h1 className="text-6xl text-white font-black">{bot.username}</h1>
                            <h1 className="text-2xl text-white font-medium">The Best Multipurpose Bot</h1>
                        </div>
                    </div>
                    <p className="max-w-xl text-center text-default-400">
                        The Ultimate No-Paywall & Featureful Leveling Bot. Easily transfer your existing leaderboard to
                        get started!
                    </p>
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                        <Button asChild={true} variant="white">
                            <Link aria-label="Add to Discord Link" href={ADD_TO_DISCORD_URL} target="_self">
                                Add to Discord
                            </Link>
                        </Button>
                        <Button asChild={true} variant="outline">
                            <Link aria-label="Manage Servers Link" href="/dashboard" target="_self">
                                Manage Servers
                            </Link>
                        </Button>
                    </div>
                    <TrustedServers />
                </div>
            </main>
            <div className="w-screen h-full" style={{ backgroundColor: '#000000' }}>
                <div className="w-[50%] mx-auto py-11 flex flex-col justify-center items-center gap-4">
                    <div className="grid grid-cols-3 xl:grid-cols-6 gap-16 items-center">
                        <div className="col-span-3 flex flex-col gap-4">
                            <h1 className="text-4xl text-white font-black">Leveling and XP System</h1>
                            <p className="text-md text-gray-400 font-medium text-wrap">Make it more fun in your server activities by implementing our leveling system.
                                This gives the rewards to the most active on the server, by gaining xp and getting level ups. This is design to encourage the member of the server
                                to actively participate to the server's activities and chats</p>
                        </div>
                        <div className="col-span-3">
                            <Image
                                className="w-[400px] h-[400px]"
                                src="/assets/leveling-card.png"
                                alt="Leveling Card"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 xl:grid-cols-6 gap-16 items-center">
                        <div className="col-span-3">
                            <Image
                                className="w-[400px] h-[400px]"
                                src="/assets/reaction-roles.png"
                                alt="Reaction Roles"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="col-span-3 flex flex-col gap-4">
                            <h1 className="text-4xl text-white font-black">Reaction Roles</h1>
                            <p className="text-md text-gray-400 font-medium text-wrap">Make it more easier for you to give them all the roles they wanted by implementing our reaction roles system.
                                This is design to make your server modern feels, with a few clicks they can get the roles that they wanted for.</p>
                        </div>
                        <div className="col-span-3 flex flex-col gap-4">
                            <h1 className="text-4xl text-white font-black">Youtube Notifications</h1>
                            <p className="text-md text-gray-400 font-medium text-wrap">With Muzzle you can easily setup notifications to be sent directly to your youtube audience.
                                through discord. Raise views and spark interest in your discord server.</p>
                        </div>
                        <div className="col-span-3">
                            <Image
                                className="w-[400px] h-auto object-contain rounded-lg"
                                src="/assets/youtube.58317071.jpg"
                                alt="Youtube Notifications"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="col-span-3">
                            <Image
                                className="w-[400px] h-auto object-contain rounded-lg"
                                src="/assets/logging.1c7e235c.png"
                                alt="Advanced Logging"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="col-span-3 flex flex-col gap-4">
                            <h1 className="text-4xl text-white font-black">Advanced Logging</h1>
                            <p className="text-md text-gray-400 font-medium text-wrap">Configure Arcane to log members who leave and join your server in less than a minute.
                                Log messages, channels, voice channels, and more with a few clicks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 