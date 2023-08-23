import { JWT } from "../utils/jwt.js";
import UserSchema from '../schemas/users.js'
import ErrorResp from "../utils/errorResp.js";

export class UserContr{
    constructor(){}

    // Authorization Functions 
    // SIGN UP
    static async Register(req, res){
        try {
            const {firstname, lastname, email, phone, password, img_link} = req.body;
            if(!firstname){
                return res.send({
                    status : 400,
                    success : false,
                    message : {
                        ru : "Введите ваше имя!",
                        en : "Enter your firstname!",
                        uz : "Ismingizni kiriting!"
                    }
                })
            }else if(!lastname){
                return res.send({
                    status : 400,
                    success : false,
                    message : {
                        ru : "Введите ваше фамилия!",
                        en : "Enter your lastname!",
                        uz : "Familiyangizni kiriting!"
                    }
                })
            }else if(!email){
                return res.send({
                    status : 400,
                    success : false,
                    message : {
                        ru : "Введите ваше электронная почта!",
                        en : "Enter your email!",
                        uz : "Emailingizni kiriting!"
                    }
                })
            }else if(!phone){
                return res.send({
                    status : 400,
                    success : false,
                    message : {
                        ru : "Введите свой номер телефона!",
                        en : "Enter your phone number!",
                        uz : "Telefon raqamingizni kiriting!"
                    }
                })
            }else if(!password){
                return res.send({
                    status : 400,
                    success : false,
                    message : {
                        ru : "Введите пароль!",
                        en : "Enter your password!",
                        uz : "Parol kiriting!"
                    }
                })
            }
            const checkName = await UserSchema.findOne({firstname, lastname})
            const checkEmail = await UserSchema.findOne({email})
            const checkPhone = await UserSchema.findOne({phone})
            if(checkName){
             return res.send({
                status : 400,
                message : {
                    ru : "Такие имя и фамилия уже существуют",
                    en : "Such a firstname and lastname already exists!",
                    uz : "Bunday ism-familiya allaqchon mavjud!"
                },
                success : false
             })
            }else if(checkEmail){
                return res.send({
                    status : 400,
                    message : {
                        ru : "Такие email уже существуют",
                        en : "Such a email already exists!",
                        uz : "Bunday email allaqchon mavjud!"
                    },
                    success : false
                 }) 
            }else if(checkPhone){
                return res.send({
                    status : 400,
                    message : {
                        ru : "Этот номер телефона уже существует!",
                        en : "Such a phone number already exists!",
                        uz : "Bunday telefon raqam allaqchon mavjud!"
                    },
                    success : false
                 }) 
            }
            const newUser = await UserSchema.create({firstname, lastname, email, phone, password, img_link})
            res.send({
                status : 201,
                success : true,
                message : {
                    ru : "Вы успешно зарегистрировались!",
                    en : "Registration has been successfuly!",
                    uz : "You have successfuly registered!"
                },
                token : JWT.SIGN(newUser._id),
                data : newUser,
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }

    // SIGN IN 


// Login Admin

    static async LoginAdmin(req, res){
        try{
            const {email, password} = req.body;
               if(!email){
            return res.send({
                status : 400,
                success : false,
                message : {
                    ru : "Введите ваше электронная почта!",
                    en : "Enter your email!",
                    uz : "Emailingizni kiriting!"
                }
            })
         }else if(!password){
            return res.send({
                status : 400,
                success : false,
                message : {
                    ru : "Введите ваш пароль!",
                    en : "Enter your password!",
                    uz : "Parolingizni kiriting!"
                }
            })
         }
            const findUser = await UserSchema.findOne({email, password});
              if(findUser == null){
           return res.send({
                status : 404,
                message : {
                    ru : "Пользователь не найден!",
                    en : "Not found user!",
                    uz : "Foydalanuvchi topilmadi!"
                },
                success : false
            })
         }else if(!findUser.isAdmin){
          return res.send({
                status : 404,
                message : {
                    ru : "Вы не админ!",
                    en : "You are not admin!",
                    uz : "Siz admin emassiz!"
                },
                success : false
            })        
         }
               res.send({
            status : 200,
            message : {
                ru : "Вы успешно вошли в систему!",
                en : "You have successfuly logined!",
                uz : "Siz muvofaqqiyatli kirdingiz!"
            },
            success : true,
            data : findUser,
            token : JWT.SIGN(findUser._id)
         })
        }catch(err){
             res.send(ErrorResp(err))
        }

    }
    
    static async Login(req, res){
        try{
         const {email, password} = req.body;
         if(!email){
            return res.send({
                status : 400,
                success : false,
                message : {
                    ru : "Введите ваше электронная почта!",
                    en : "Enter your email!",
                    uz : "Emailingizni kiriting!"
                }
            })
         }else if(!password){
            return res.send({
                status : 400,
                success : false,
                message : {
                    ru : "Введите ваш пароль!",
                    en : "Enter your password!",
                    uz : "Parolingizni kiriting!"
                }
            })
         }
         const findUser = await UserSchema.findOne({email, password});
         if(findUser == null){
           return res.send({
                status : 404,
                message : {
                    ru : "Пользователь не найден!",
                    en : "Not found user!",
                    uz : "Foydalanuvchi topilmadi!"
                },
                success : false
            })
         }
         res.send({
            status : 200,
            message : {
                ru : "Вы успешно вошли в систему!",
                en : "You have successfuly logined!",
                uz : "Siz muvofaqqiyatli kirdingiz!"
            },
            success : true,
            data : findUser,
            token : JWT.SIGN(findUser._id)
         })
        }catch(err){
            res.send(ErrorResp(err))
        }    
    }
    

    // GET Methods

static async GetUsersForAdmin(req, res){
    try{
     res.send({
         status : 200,
         message : {
             ru : "Пользователи",
             en : "Users",
             uz : "Foydalanuvchilar"
         },
         success : true,
         data : await UserSchema.find().sort({createdAt : -1})
     })
    }catch(error){
         res.send(ErrorResp(err))
    }

}


    
    static async GetMyProfile(req, res){
        try {
            const {token} = req.headers;
            const {userId} = JWT.VERIFY(token);
            const findUser = await UserSchema.findById(userId);
            if(findUser == null){
               return res.send({
                    status : 404,
                    message : {
                        ru : "Пользователь не найден!",
                        en : "Not found user!",
                        uz : "Foydalanuvchi topilmadi!"
                    },
                    success : false
                })
            }
            res.send({
                status : 200,
                message : {
                    ru : "Ваш профиль",
                    en : "Your profile",
                    uz : "Sizning profilingiz"
                },
                success : true,
                data : findUser
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }

    // PUT METHOD
    static async EditMyProfile(req, res){
        try {
            const {token} = req.headers;
            const {userId} = JWT.VERIFY(token);
            const {firstname, lastname, phone, img_link} = req.body;
            if(!firstname && !lastname && !phone && !img_link){
                return res.send({
                    status : 400,
                    message : {
                        ru : "Вы не предоставили никакой информации!",
                        en : "You have not submitted any information!",
                        uz : "Siz hech qanday malumot yubormadingiz!"
                    },
                    success : false
                })
            }
            const findUser = await UserSchema.findById(userId);
            if(findUser == null){
                return res.send({
                    status : 404,
                    message : {
                        ru : "Пользователь не найден!",
                        en : "Not found user!",
                        uz : "Foydalanuvchi topilmadi!"
                    },
                    success : false
                })
            }
            const editedProfile = await UserSchema.findByIdAndUpdate(userId, {firstname, lastname, phone, img_link}, {new : true})
            res.send({
                status : 200,
                message : {
                    ru : "Изменено успешно",
                    en : "Successfuly edited",
                    uz : "Muvofaqqiyatli o'zgartirildi"
                },
                success : true,
                data : editedProfile
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }

    static async EditSecurity(req, res){
        try {
            const {token} = req.headers;
            const {userId} = JWT.VERIFY(token);
            const findUser = await UserSchema.findById(userId);
            if(findUser == null){
                return res.send({
                    status : 404,
                    message : {
                        ru : "Пользователь не найден!",
                        en : "Not found user!",
                        uz : "Foydalanuvchi topilmadi!"
                    },
                    success : false
                })
            }
            const {email, password} = req.body;
            if(!email && !password){
                return res.send({
                    status : 400,
                    message : {
                        ru : "Вы не предоставили никакой информации!",
                        en : "You have not submitted any information!",
                        uz : "Siz hech qanday malumot yubormadingiz!"
                    },
                    success : false
                })
            }
            const editedSecurityData = await UserSchema.findByIdAndUpdate(userId, {email, password}, {new : true})
            res.send({
                status : 200,
                message : {
                    ru : "Изменено успешно",
                    en : "Successfuly edited",
                    uz : "Muvofaqqiyatli o'zgartirildi"
                },
                success : true,
                data : editedSecurityData
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }
}
