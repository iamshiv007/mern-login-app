import { toast } from "react-hot-toast"
import { Authenticate } from "./helper"

/** validate login page username*/
export async function usernameValidate(values){
    const errors = usernameVerify({}, values)

    if(values.username) {
        // check user exist or not
        const { status } = await Authenticate(values.username)

        if(status !== 200){
            errors.exist = toast.error("User does not axist...!")
        }
    }

    return errors
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values)

    return errors
}

/** validate register */
export async function registerValidate(values){
    const errors = usernameVerify({}, values)
    emailVerify(errors, values)
    passwordVerify(errors, values)

    return errors
}

/** validate profile */
export async function profileValidate(values){
    // const errors = detailVerify({}, values)
    // emailVerify(errors, values)
    const errors = emailVerify({}, values)

    return errors
}

/** validate emaill */

function emailVerify(errors = {}, values){
    if(!values.email){
        errors.email = toast.error('Email Required...!');
    }else if(values.email.includes(" ")){
        errors.email = toast.error("Wrong email...!")
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("Invalid email address...!")
    }
}

/** validate password */
function passwordVerify(errors = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!")
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!")
    } else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 character")
    } else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have a spacial character")
    } else if (values.cpassword || values.cpassword === '') {
    if (values.password !== values.cpassword){
        errors.cpassword = toast.error("Password not matched")
    }
}

    return errors;
}

/**validate username */
function usernameVerify(errors = {}, values){
    if(!values.username){
        errors.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        errors.username = toast.error("Invalid Username...")
    }

    return errors;
}

/**validate detail */
// function detailVerify(errors = {}, values){
//     if(!values.firstName){
//         errors.firstName = toast.error('First Name Required...!');
//     }else if(values.firstName.includes(" ")){
//         errors.firstName = toast.error("Invalid First Name...")
//     }

//     if(!values.lastName){
//         errors.lastName = toast.error('Last Name Required...!');
//     }else if(values.lastName.includes(" ")){
//         errors.lastName = toast.error("Invalid Last Name...")
//     }
    
//     if(!values.address){
//         errors.lastName = toast.error('Address Required...!');
//     }else if(values.address === " "){
//         errors.lastName = toast.error("Invalid Address...")
//     }
    
//     if(!values.mobile){
//         errors.mobile = toast.error('Mobile No. Required...!');
//     }else if(values.mobile.includes(" ")){
//         errors.mobile = toast.error("Invalid Mobile No....")
//     }

//     return errors;
// }