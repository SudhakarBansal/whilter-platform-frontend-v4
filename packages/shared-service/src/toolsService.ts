import { ServiceType } from "./config";
import ApiService from "./apiService";

export default function fetchToolsList() {
  const service = new ApiService(ServiceType.fetchTools);
  return service.get(['all']);
}