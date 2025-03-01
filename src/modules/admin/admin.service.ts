
import { User } from "../user/user.model"



const UserBlockFromAdmininDB = async (
    id: string,
) => {
    const result = await User.findById(id)
    return result
}

export const AdminService = {
    UserBlockFromAdmininDB,
}