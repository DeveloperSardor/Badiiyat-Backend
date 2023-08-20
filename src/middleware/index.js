import ErrorResp from "../utils/errorResp.js";
import UserSchema from "../schemas/users.js";
import { JWT } from "../utils/jwt.js";

export const checkToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.send({
        status: 400,
        message: {
          ru: `Вам нужно отправить токен из "headers"`,
          en: `You must send token from "headers"`,
          uz: `Token yuboring "headers" dan`,
        },
        success: false,
      });
    }
    const { userId } = JWT.VERIFY(token);
    const findUser = await UserSchema.findById(userId);
    if (findUser == null) {
      return res.send({
        status: 404,
        message: {
          ru: "Пользователь не найден!",
          en: "Not found user!",
          uz: "Foydalanuvchi topilmadi!",
        },
        success: false,
      });
    } else {
      next();
    }
  } catch (error) {
    res.send(ErrorResp(error));
  }
};

export const checkIsAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.send({
        status: 400,
        message: {
          ru: `Вам нужно отправить токен из "headers"`,
          en: `You must send token from "headers"`,
          uz: `Token yuboring "headers" dan`,
        },
        success: false,
      });
    }
    const { userId } = JWT.VERIFY(token);
    const findUser = await UserSchema.findById(userId);
    if (findUser == null) {
        return res.send({
          status: 404,
          message: {
            ru: "Пользователь не найден!",
            en: "Not found user!",
            uz: "Foydalanuvchi topilmadi!",
          },
          success: false,
        });
      }else if(!findUser.isAdmin){
        return res.send({
            status: 404,
            message: {
              ru: "Вы не админ!",
              en: "You aren't admin!",
              uz: "Siz admin emassiz!",
            },
            success: false,
          });
      }else{
        next()
      }
  } catch (error) {
    res.send(ErrorResp(error));
  }
};



