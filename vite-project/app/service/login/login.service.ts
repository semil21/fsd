import axios from "axios"

export const userLoginService = async (email: string, password: string) => {

    try {
        const userLogin = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, { email, password })
        return userLogin
    }

    catch (error: any) {
        throw error.response?.data?.message || "Login failed";
    }
}