
import { getAuth } from "@whilter/auth"

const handler = getAuth()

export { handler as GET, handler as POST }