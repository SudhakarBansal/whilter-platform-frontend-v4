import { LipSyncControls } from "../tool-controls/LipSyncControls";
import { LipSyncMediaPanel } from "../tool-media-panels/LipSyncMediaPanel";

const LipSyncTool = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col flex-1 gap-3 md:gap-4">
        <div className="grid gap-3 lg:gap-8 flex-1 grid-cols-1 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8 flex flex-col min-h-[500px] bg-transparent">
            <LipSyncMediaPanel />
          </div>
          <div className="lg:col-span-4 p-6 md:p-6 flex flex-col min-h-[500px] h-full bg-gradient-to-b from-blue-400 to-blue-800 shadow-sm rounded-[1rem] lg:sticky lg:top-2 lg:self-start lg:h-auto">
            <LipSyncControls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LipSyncTool;
