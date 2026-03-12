import axios from "axios"

export const updatePasswordService = async (oldPassword: string, newPassword: string) => {

    const token = localStorage.getItem("auth_token")
    try {
        const updatePassword = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/change-password`, { oldPassword, newPassword },

            {
                headers: {
                    Authorization: token
                }
            }
        )
        return updatePassword
    } catch (error: any) {
        throw error.response?.data?.message || "Update password failed";
    }
}