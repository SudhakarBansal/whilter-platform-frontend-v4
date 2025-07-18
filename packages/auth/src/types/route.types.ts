
import { Role } from "../config/roles/role"
export type RouteAccessConfig = {
  allowedRoles?: Role[]
  redirectAfterLogin?: string
  public?: boolean
   disableSuperAdmin?: boolean
}