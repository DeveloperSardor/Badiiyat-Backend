import BookSchema from "../schemas/books.js";
import ErrorResp from "../utils/errorResp.js";
import CategorySchema from '../schemas/category.js'

export class BooksContr {
  constructor() {}
  // Get
  static async GetBooks(req, res) {
    try {
      const { id } = req.params;
      const {category, search} = req.query;
      if (id) {
        const findBook = await BookSchema.findById(id);
        if (findBook == null) {
          return res.send({
            status: 404,
            success: false,
            message: {
              ru: "Книга не найдена",
              en: "Not found book",
              uz: "Kitob topilmadi",
            },
          });
        }
        let similarBooks = await BookSchema.find({category : findBook.category}).populate("author").sort({createdAt : -1})
        similarBooks = similarBooks.filter(el=>el._id != id)
        res.send({
          status: 200,
          message: {
            ru: "Информация о книге",
            en: "Book information",
            uz: "Kitob ma'lumotlari",
          },
          success: true,
          data : {
            mainData : await BookSchema.findById(id).populate('author').populate('category').sort({createdAt : -1}),
            similarBooks
          }
        });
      }else if(search){
        let keyword = search ? {$or : [
            { title : {$regex : search, $options : "i"}}
        ]} : {}

        const searchResults = await BookSchema.find(keyword)
        .populate('author').populate('category').sort({createdAt : -1})

        res.send({
            status : 200,
            message : {
                ru : "Результаты поиска",
                en : "Search results",
                uz : "Qidiruv natijalari"
            },
            success : true,
            data : searchResults
        })
    }
      else if(category){
        const findCat = await CategorySchema.findById(category);
        res.send({
            status: 200,
            message: {
              ru: `Книги, относящиеся к категории ${findCat.category}`,
              en: `Books related to the ${findCat.category} category`,
              uz: `${findCat.category} kategoriyasiga oid kitoblar`,
            },
            success: true,
            data: await BookSchema.find({category}).populate('author').populate('category').sort({createdAt : -1}),
          });
      }
       else {
        res.send({
          status: 200,
          message: {
            ru: "Все книги",
            en: "All books",
            uz: "Barcha kitoblar",
          },
          success: true,
          data: await BookSchema.find().populate('category').populate('author').sort({createdAt : -1}),
        });
      }
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }
  // Post
  static async AddBook(req, res) {
    try {
      const { full_info, pages, img_link, price, title,  author, category } = req.body;
      if (!full_info) {
        return res.send({
          status: 400,
          message: {
            ru: "Информация о книге обязательна",
            en: "Book information is required",
            uz: "Kitob ma'lumotlari majburiy",
          },
          success: false,
        });
      } else if (!pages) {
        return res.send({
          status: 400,
          message: {
            ru: "Книжный лист обязателен",
            en: "Book pages are required",
            uz: "Kitob varaqi majburiy",
          },
          success: false,
        });
      } else if (!price) {
        return res.send({
          status: 400,
          message: {
            ru: "Требуется стоимость книги",
            en: "Book price is required",
            uz: "Kitob narxi majburiy",
          },
          success: false,
        });
      } else if (!author) {
        return res.send({
          status: 400,
          message: {
            ru: "Требуется автор книги",
            en: "The author of the book is required",
            uz: "Kitob muallifi majburiy",
          },
          success: false,
        });
      } else if (!category) {
        return res.send({
          status: 400,
          message: {
            ru: "Укажите категорию книги",
            en: "The category of the book is required",
            uz: "Kitob kategoriyasi majburiy",
          },
          success: false,
        })
      } else if (!title) {
        return res.send({
          status: 400,
          message: {
            ru: "Название книги обязательно",
            en: "The title of the book is required",
            uz: "Kitob nomi majburiy",
          },
          success: false,
        });
      } else if (!img_link) {
        return res.send({
          status: 400,
          message: {
            ru: "требуется изображение книги",
            en: "The image of the book is required",
            uz: "Kitob rasmi majburiy",
          },
          success: false,
        });
      }
      const newBook = await BookSchema.create({title, full_info, pages, price, author, category, img_link})
      res.send({
        status : 201,
        message : {
            ru : "Книга успешно добавлена",
            en : "Book added successfuly",
            uz : "Kitob muvofaqqiyatli qo'shildi"
        },
        success : true,
        data : newBook
      })
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }
  // Put
  static async EditBook(req, res) {
    try {
        const {id} = req.params;
        const checkExists = await BookSchema.findById(id);
        if(checkExists == null){
            return res.send({
                status : 404,
                message : {
                    ru : "Книга не найдена",
                    en : "Not found book",
                    uz : "Kitob topilmadi"
                },
                success : false
            })
        }
        const {title, full_info, pages, price, img_link, author, category} = req.body;
        if(!title && !img_link  && !full_info && !pages && !price && !author && !category){
            return res.send({
                status: 400,
                message: {
                  ru: "Вы не предоставили никакой информации!",
                  en: "You have not submitted any information!",
                  uz: "Siz hech qanday malumot yubormadingiz!",
                },
                success: false
            })
        }
        const editedBook = await BookSchema.findByIdAndUpdate(id, {title,  full_info, pages, img_link, price, author, category}, {new : true})
        res.send({
            status : 200,
            message : {
                ru : "Книга успешно преобразована",
                en : "The book was successfuly updated",
                uz : "Kitob muvofaqqiyatli o'zgardi"
            },
            success : true,
            data : editedBook
        })
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }
  // Delete
  static async DeleteBook(req, res) {
    try {
        const {id} = req.params;
        const checkExists = await BookSchema.findById(id);
        if(checkExists == null){
            return res.send({
                status : 404,
                message : {
                    ru : "Книга не найдена",
                    en : "Not found book",
                    uz : "Kitob topilmadi"
                },
                success : false
            })
        }
        const deletedBook = await BookSchema.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : {
                ru : "Книга успешно удалена",
                en : "The book was successfully deleted",
                uz : "Kitob muvaffaqiyatli o'chirildi"
            },
            success : true,
            data : deletedBook
        })
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }
}
