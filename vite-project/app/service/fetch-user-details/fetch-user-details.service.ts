import axios from "axios"

export const fetchUserDetails = async () => {

    const auth_token = localStorage.getItem("auth_token")
    try {

        const fetchDetails = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/get-user-details`, { headers: { Authorization: auth_token } })

        return fetchDetails
    }
    catch (error) {
        throw error
    }
}