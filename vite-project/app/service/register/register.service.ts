import axios from "axios"

export const registerUserService = async (data: any) => {


    try {

        const registerUser = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, data)

        return registerUser
    }
    catch (error: any) {
        throw error.response?.data?.message || "Failed to register user";
    }
}