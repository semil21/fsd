import { Request, Response } from "express";
import Users from "../../schema/users/users.schema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerNewUserController = async (req: Request, res: Response) => {

    try {

        const { firstName, lastName, email, password } = req.body

        const checkEmailExists = await Users.findOne({ email })

        if (checkEmailExists) {
            return res.status(400).send({ message: "Email already exists" })
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const saveNewUser = await Users.create({ firstName, lastName, email, password: hashedPassword })

        const token = jwt.sign({ email: saveNewUser.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' })

        const refreshToken = jwt.sign(
            { email: saveNewUser.email },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );
        if (saveNewUser) {
            res.status(200).send({ message: "User created successfully", auth_token: token, refresh_token: refreshToken })
        }
        else {
            res.status(400).send({ message: "Failed to create new user" })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server Error, Failed to create new user" })
    }
}


export const userLoginController = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body

        const checkEmailExists = await Users.findOne({ email })

        if (!checkEmailExists) {
            return res.status(400).send({ message: "Email does not exist" })
        }


        const verifyPassword = await bcrypt.compare(password, checkEmailExists.password)

        if (!verifyPassword) {
            return res.status(400).send({ message: "Password does not match" })
        }

        const token = jwt.sign({ email: checkEmailExists.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' })

        const refreshToken = jwt.sign(
            { email: checkEmailExists.email },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).send({ message: "User logged in successfully", auth_token: token, refresh_token: refreshToken })

    }

    catch (err) {
        res.status(500).send({ message: "Server Error, Failed to log in" })
    }
}

export const userPasswordUpdateController = async (
    req: Request,
    res: Response
) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const userEmail = (req as any).user.email;


        const user = await Users.findOne({
            email: userEmail,
        });

        if (!user) {
            return res
                .status(400)
                .send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).send({
                message: "Old password incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            message: "Password updated successfully",
        });

    } catch (err) {
        res.status(500).send({
            message:
                "Server Error, Failed to update password",
        });
    }
};



export const addUserProfileImageController =
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res
                    .status(400)
                    .send({ message: "No file uploaded" });
            }

            const filePath = req.file.filename;

            if (filePath) {

                res.status(200).send({
                    message: "Image uploaded",
                    file: filePath,
                });
            }
            else {
                res.status(500).send({
                    message: "Failed to add user image",
                });
            }

        } catch (err) {
            res.status(500).send({
                message: "Failed to add user image",
            });
        }
    };
export const removeUserProfileImageController = async (req: Request, res: Response) => {

    try {

        const removeUserImage = await Users.updateOne({ email: (req as any).user.email }, { $set: { profileImage: "" } })

        if (removeUserImage) {
            res.status(200).send({ message: "Profile image removed successfully" })
        }
        else {
            res.status(500).send({ message: "Server Error, Failed to remove profile image" })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server Error, Failed to remove profile image" })
    }
}

export const getUserDetailsByEmailController = async (req: Request, res: Response) => {

    try {

        const getDetails = await Users.findOne({ email: (req as any).user.email })

        if (getDetails) {
            res.status(200).send({ message: "User details fetched successfully", data: getDetails })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server Error, Failed to get user details" })
    }
}

export const updateUserProdileController = async (req: Request, res: Response) => {

    try {

        const { firstName, lastName, email } = req.body

        const updateProfile = await Users.updateOne({ email: (req as any).user.email }, { $set: { firstName: firstName, lastName: lastName } })

        if (updateProfile) {
            res.status(200).send({ message: "Profile updated successfully" })
        }
        else {
            res.status(500).send({ message: "Server Error, Failed to update profile" })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server Error, Failed to update profile" })
    }
} 