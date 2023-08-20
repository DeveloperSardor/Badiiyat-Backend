import AuthorSchema from "../schemas/author.js";
import BookSchema from '../schemas/books.js'
import ErrorResp from "../utils/errorResp.js";

export class AuthorContr {
  constructor() {}
  // Get Methods
  static async GetAuthors(req, res) {
    try {
      const { id } = req.params;
      const { category, search } = req.query;
      if (id) {
        const findAuthorById = await AuthorSchema.findById(id);
        if (findAuthorById == null) {
          return res.send({
            status: 404,
            message: {
              ru: "Автор не найден",
              en: "Not found author",
              uz: "Muallif topilmadi",
            },
            success: false,
          });
        }
        let authorBooks = await BookSchema.find({author : id})
        res.send({
          status: 200,
          message: {
            ru: "Данные автора",
            en: "Author's datas",
            uz: "Muallif malumotlari",
          },
          success: true,
          data : {
            mainData : await AuthorSchema.findById(id).populate('category'),
            authorBooks 
          }
        });
      } else if (search) {
        let keyword = search
          ? {
              $or: [
                { firsname: { $regex: search, $options: "i" } },
                { lastname: { $regex: search, $options: "i" } },
              ],
            }
          : {};
        const searchResults = await AuthorSchema.find(keyword).populate(
          "category"
        );

        res.send({
          status: 200,
          message: {
            ru: "Результаты поиска",
            en: "Search results",
            uz: "Qidiruv natijalari",
          },
          success: true,
          data: searchResults,
        });
      }else if(category){
        const findCat = await CategorySchema.findById(category);
        res.send({
            status: 200,
            message: {
              ru: `Авторы, относящиеся к категории ${findCat.category}`,
              en: `Authors related to the ${findCat.category} category`,
              uz: `${findCat.category} kategoriyasiga oid mualliflar`,
            },
            success: true,
            data: await AuthorSchema.find({category}).populate('category'),
          });
      }
       else {
        res.send({
          status: 200,
          message: {
            ru: "Все авторы",
            en: "All authors",
            uz: "Barcha mualliflar",
          },
          success: true,
          data: await AuthorSchema.find().populate("category"),
        });
      }
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }

  static async AddAuthor(req, res) {
    try {
      const {
        firstname,
        lastname,
        date_of_birth,
        date_of_death,
        img_link,
        country,
        bio,
        category,
      } = req.body;
      if (!firstname) {
        return res.send({
          status: 400,
          message: {
            ru: "Укажите имя автора",
            en: "Author name is required",
            uz: "Muallif ismi majburiy",
          },
          success: false,
        });
      } else if (!lastname) {
        return res.send({
          status: 400,
          message: {
            ru: "Фамилия автора обязательна",
            en: "Author lastname is required",
            uz: "Muallif familiyasi majburiy",
          },
          success: false,
        });
      } else if (!date_of_birth) {
        return res.send({
          status: 400,
          message: {
            ru: "Дата рождения автора обязательна",
            en: "Author date of birth is required",
            uz: "Muallif tug'ulgan sanasi majburiy",
          },
          success: false,
        });
      } else if (!country) {
        return res.send({
          status: 400,
          message: {
            ru: "Страна автора обязательна",
            en: "Author country is required",
            uz: "Muallif mamlakati majburiy",
          },
          success: false,
        });
      } else if (!bio) {
        return res.send({
          status: 400,
          message: {
            ru: "Биография автора обязательна",
            en: "Author biography is required",
            uz: "Muallif biografiyasi majburiy",
          },
          success: false,
        });
      } else if (!category) {
        return res.send({
          status: 400,
          message: {
            ru: "Категория автора обязательна",
            en: "Author category is required",
            uz: "Muallif kategoriyasi majburiy",
          },
          success: false,
        });
      } else if (!img_link) {
        return res.send({
          status: 400,
          message: {
            ru: "Фото автора обязательно",
            en: "Author image is required",
            uz: "Muallif rasmi majburiy",
          },
          success: false,
        });
      }
      const newAuthor = await AuthorSchema.create({
        firstname,
        lastname,
        date_of_birth,
        date_of_death,
        country,
        bio,
        img_link,
        category,
      });
      res.send({
        status: 201,
        success: true,
        data: newAuthor,
        message: {
          ru: "Автор успешно добавлен",
          en: "Author added successfuly!",
          uz: "Muallif muvofaqqiyatli qo'shildi",
        },
      });
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }

  //   PUT METHOD
  static async EditAuthor(req, res) {
    try {
      const { id } = req.params;
      const checkExists = await AuthorSchema.findById(id);
      if (checkExists == null) {
        return res.send({
          status: 404,
          message: {
            ru: "Автор не найден",
            en: "Not found author",
            uz: "Muallif topilmadi",
          },
          success: false,
        });
      }
      const {
        firstname,
        lastname,
        date_of_birth,
        date_of_death,
        country,
        bio,
        img_link,
        category,
      } = req.body;
      if (
        !firstname &&
        !lastname &&
        !date_of_birth &&
        !date_of_death &&  
        !category &&
        !bio &&
        !img_link &&
        !category
      ) {
        return res.send({
          status: 400,
          message: {
            ru: "Вы не предоставили никакой информации!",
            en: "You have not submitted any information!",
            uz: "Siz hech qanday malumot yubormadingiz!",
          },
          success: false,
        });
      }

      const editedAuthor = await AuthorSchema.findByIdAndUpdate(
        id,
        {
          firstname,
          lastname,
          date_of_birth,
          date_of_death,
          country,
          bio,
          img_link,
          category,
        },
        { new: true }
      );
      res.send({
        status: 200,
        message: {
          ru: "Автор успешно изменен!",
          en: "Author successfuly updated!",
          uz: "Muallif muvofaqqiyatli o'zgartirildi!",
        },
        success: true,
        data: editedAuthor,
      });
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }

  // DELETE METHOD

  static async DeleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const checkExists = await AuthorSchema.findById(id);
      if (checkExists == null) {
        return res.send({
          status: 404,
          message: {
            ru: "Автор не найден",
            en: "Not found author",
            uz: "Muallif topilmadi",
          },
          success: false,
        });
      }
      const deletedAuthor = await AuthorSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: {
          ru: "Автор успешно удален",
          en: "Author successfuly deleted",
          uz: "Muallif muvofaqqiyatli o'zgartirildi",
        },
        success: true,
        data: deletedAuthor,
      });
    } catch (error) {
      res.send(ErrorResp(error));
    }
  }
}
