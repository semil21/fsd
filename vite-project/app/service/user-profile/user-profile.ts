import axios from "axios"

export const updateUserProfileService = async (data: any) => {

    const auth_token = localStorage.getItem("auth_token")
    try {
        const updateProfile = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/update-profile`, data,

            {
                headers: {
                    Authorization: auth_token
                }
            }
        )
        return updateProfile
    }
    catch (error: any) {
        throw error.response?.data?.message || "Failed to update user profile";
    }
}