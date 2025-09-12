import VirtualTryOnScreen from "../tool-media-panels/VirtualTryon";

const VirtualTryonTool = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col flex-1 gap-3 md:gap-4">
        {/* <div className="grid gap-3 lg:gap-8 flex-1 grid-cols-1 lg:grid-cols-12 items-start"> */}
        <VirtualTryOnScreen />
        {/* </div> */}
      </div>
    </div>
  );
};

export default VirtualTryonTool;
