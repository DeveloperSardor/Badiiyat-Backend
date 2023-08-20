import { response } from 'express'
import CategoriesSchema from '../schemas/category.js'
import ErrorResp from '../utils/errorResp.js'


export class CategoryContr{
    constructor(){}
    // Get Methods

static async GetCategories(req, res){
    try {
        res.send({
            status : 200,
            message : {
                ru : "Все категории",
                en : "All categories",
                uz : "Barcha kategoriyalar"
            },
            success : true,
            data : await CategoriesSchema.find()
        })
    } catch (error) {
        res.send(ErrorResp(error))
    }
}

    // static async GetBookCategories(req, res){
    //     try {
    //         res.send({
    //             status : 200,
    //             success : true,
    //             data : await CategoriesSchema.find({forWhom : "book"}),
    //             message : {
    //                 ru : "Категории книг",
    //                 en : "Categories of books",
    //                 uz : "Kitoblar kategoriyalari"
    //             }
    //         })
    //     } catch (error) {
    //         res.send(ErrorResp(error))
    //     }
    // }

    // static async GetAuthorCategories(req, res){
    //     try {
    //         res.send({
    //             status : 200,
    //             success : true,
    //             data : await CategoriesSchema.find({forWhom : "author"}),
    //             message : {
    //                 ru : "Авторские категории",
    //                 en : "Categories of authors",
    //                 uz : "Avtorlar kategoriyalari"
    //             }
    //         })
    //     } catch (error) {
    //         res.send(ErrorResp(error))
    //     }
    // }


    // POST 

    static async AddCategory(req, res){
        try {
            const {category} = req.body;
       
             if(!category){
                return res.send({
                    status : 400,
                    message : {
                        ru : `название категории обязательно`,
                        en : `A category name is required`,
                        uz : `Kategoriya nomi majburiy!`
                    },
                    success : false
                })
            }
            const newCategory  = await CategoriesSchema.create({ category})
            res.send({
                status : 201,
                success : true,
                data : newCategory,
                message : {
                    ru : "Категория успешно добавлена",
                    en : "Category added successfully!",
                    uz : "Kategoriya muvofaqqiyatli qo'shildi"
                }
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }

    // PUT

    static async EditCategory(req, res){
        try {
            const {id} = req.params;
            const checkExists = await CategoriesSchema.findById(id);
            if(checkExists == null){
                res.send({
                    status : 404,
                    message : {
                        ru : "Категория не найдена",
                        en : "Not found category",
                        uz : "Kategoriya topilmadi"
                    },
                    success : false
                })
            }
            const {category} = req.body;
            if(!category ){
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
            const editedCategory = await CategoriesSchema.findByIdAndUpdate(id, {category}, {new : true})
            res.send({
                status : 200,
                message : {
                    ru : "Изменено успешно",
                    en : "Successfuly edited",
                    uz : "Muvofaqqiyatli o'zgartirildi"
                },
                success : true,
                data : editedCategory
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }


    // DELETE
    static async DeleteCategory(req, res){
        try {
            const {id} = req.params;
            const checkExists = await CategoriesSchema.findById(id);
            if(checkExists == null){
                res.send({
                    status : 404,
                    message : {
                        ru : "Категория не найдена",
                        en : "Not found category",
                        uz : "Kategoriya topilmadi"
                    },
                    success : false
                })
            }
            const deletedCategory = await CategoriesSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                data : deletedCategory,
                message : {
                    ru : "Удалено успешно",
                    en : "Successfuly deleted",
                    uz : "Muvofaqqiyatli o'chirildi"
                },
                success : true
            })
        } catch (error) {
            res.send(ErrorResp(error))
        }
    }
}