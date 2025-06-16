import React from 'react';

export function FolderCard({
    title = "Tools Projects",
    projectCount = 10,
    gradientFrom = "from-blue-300",
    gradientTo = "to-blue-600",
    avatars = [
        { initial: "J", bgColor: "bg-amber-500" },
        { initial: "M", bgColor: "bg-red-500" },
        { initial: "S", bgColor: "bg-purple-500" },
        { initial: "+1", bgColor: "bg-gray-400" }
    ]
}) {
    return (
        <div className="relative w-64 h-60 rounded-2xl overflow-hidden">
            {/* Main folder body with gradient - single polygon */}
            <div
                className={`relative w-full h-full bg-gradient-to-b ${gradientFrom} ${gradientTo}`}
                style={{
                    clipPath: 'polygon(42% 0, 56% 18%, 100% 18%, 100% 100%, 0 100%, 0 0)',
                    boxShadow: '0px -9px 17px 0px #00000033'
                }}>
            </div>

            {/* White footer section */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold text-base leading-tight">
                            {title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-0.5">
                            {projectCount} Projects
                        </p>
                    </div>

                    {/* Dynamic Avatar group */}
                    <div className="flex items-center -space-x-2">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`w-7 h-7 rounded-full ${avatar.bgColor} border-2 border-white flex items-center justify-center text-white text-xs font-medium`}
                                style={{ zIndex: 30 - index * 10 }}
                            >
                                {avatar.initial}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
