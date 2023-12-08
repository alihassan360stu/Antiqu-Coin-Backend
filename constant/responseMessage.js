const resposeMessage = {
SOME_THING_WENT_WRONG:"Some Thing Went Wrong",
DUPLICATE:(value)=>`${value} Already Exist`,
MISSING_PARAMS:(value)=> `(${value}) Parameter Is Missing In request params`,
INVALID_EMAIL:(email)=> `Invalid Email ( ${email} )`,
PASSWORD_NOT_EQUAL:"Your Password Not Match",
ALREADY_EXIST:"Please Try With Another Email . Your Entered Email Already Exist",
USER_NOT_FOUND:"Please Make Sure That Your Email Is Register",
UNAUThORIZED:"Unauthorized User",
}

module.exports = resposeMessage;