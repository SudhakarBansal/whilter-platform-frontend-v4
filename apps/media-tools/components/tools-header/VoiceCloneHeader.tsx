import type { ToolHeaderProps } from '@/types/tool.types';

export const VoiceCloneHeader = ({ title, description }: ToolHeaderProps) => (
    <div className="space-y-2">
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="bg-purple-50 p-3 rounded-md">
            <p className="text-sm text-purple-700">
                Clone voices with advanced AI technology
            </p>
        </div>
    </div>
);
