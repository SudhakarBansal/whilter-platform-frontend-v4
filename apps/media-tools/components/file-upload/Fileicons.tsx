import AudioFile from "@mui/icons-material/AudioFile";
import VideoFile from "@mui/icons-material/VideoFile";
import ImageIcon from "@mui/icons-material/Image";
import Description from "@mui/icons-material/Description";

interface FileIconProps {
  fileType: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ fileType }) => {
  if (fileType.startsWith("audio"))
    return <AudioFile className="text-blue-500" />;
  if (fileType.startsWith("video"))
    return <VideoFile className="text-red-500" />;
  if (fileType.startsWith("image"))
    return <ImageIcon className="text-green-500" />;
  return <Description className="text-gray-500" />;
};
