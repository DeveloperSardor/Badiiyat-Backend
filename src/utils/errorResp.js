export default function ErrorResp(error){
return {
    status : 400,
    message : error.message,
    success : false
}
}