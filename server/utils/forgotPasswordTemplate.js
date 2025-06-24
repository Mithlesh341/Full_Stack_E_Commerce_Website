const forgotPasswordTemplate = ({name, otp}) =>{
    return `
<div>
    <p> Dear, ${name}</p>
    <p>You have requested a password reset. Please use following OTP code to reset your password.</p>
    <div style="background :yellow; font-size : 20px; padding : 20px; text-align : center; font-weight : 800;">
        ${otp}
    </div>    
    <p>This otp is valid for 1 hour only. Enter this otp in the blinkeyit website to proceed with reseting your pasword.</p>
    <br/>
    </br>
    <p> Thanks </p>
    <p> BlinkeyIt</p>
</div>
    
    `
}

export default forgotPasswordTemplate