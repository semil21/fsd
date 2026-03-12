import express from "express"
import { addUserProfileImageController, getUserDetailsByEmailController, registerNewUserController, removeUserProfileImageController, updateUserProdileController, userLoginController, userPasswordUpdateController } from "../../controller/users/user.controller";
import { verifyAuthToken } from "../../middleware/auth-middleware/auth.middleware";
import { upload } from "../../middleware/image-uploader/image-uploader";

const userRouter = express.Router();

userRouter.get("/users/get-user-details", verifyAuthToken, getUserDetailsByEmailController)

userRouter.post("/auth/register", registerNewUserController)

userRouter.post("/auth/login", userLoginController)

userRouter.put("/users/change-password", verifyAuthToken, userPasswordUpdateController)

userRouter.put("/users/add-profile-image", verifyAuthToken, upload.single("profile"), addUserProfileImageController)

userRouter.put("/users/remove-profile-image", verifyAuthToken, removeUserProfileImageController)

userRouter.put("/users/update-profile", verifyAuthToken, updateUserProdileController)

export default userRouter;