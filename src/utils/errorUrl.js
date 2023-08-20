export default function ErrorURl(req, res){
    res.send({
        status : 404,
        message : `Url topilmadi!`,
        success : false
    })
}