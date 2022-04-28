const firebaseConfig = {
  apiKey: "AIzaSyCB3CD-b0gNtSox4SY--3tECoI75j8VRLo",
  authDomain: "qubehealth-87767.firebaseapp.com",
  projectId: "qubehealth-87767",
  storageBucket: "qubehealth-87767.appspot.com",
  messagingSenderId: "543875510716",
  appId: "1:543875510716:web:a0bcdecebb20198c52bbb9",
  measurementId: "G-1294R73ZVG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let pattern = /[1-9]{1}[0-9]{9}/;
let codePattern = /[0-9]{6}/;

$(document).ready(() => {
  const masterPhone = document.getElementById("masterPhone");
  const masterOtp = document.getElementById("masterOtp");
  const userPhone = document.getElementById("userPhone");
  const userOtp = document.getElementById("userOtp");

  // ? Handle OTP Button Clicks
  $("#userOtpButton").click(function () {
    if (userPhone.value == "") {
      alert("User Phone Number is required");
      return false;
    }
    if (!pattern.test(userPhone.value)) {
      alert("User Phone Number should be of pattern - XXXXX12345");
      return false;
    }

    // window.location.assign("./userProfile.html");
    if (window.recaptchaVerifier != null) {
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "userOtpButton",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Verified");
        },
      }
    );
    sendVerificationCode(false);
  });

  $("#masterOtpButton").click(async () => {
    if (masterPhone.value == "") {
      alert("Master Phone Number is required");
      return false;
    }
    if (!pattern.test(masterPhone.value)) {
      alert("Master Phone Number should be of pattern - XXXXX12345");
      return false;
    }

    // window.location.assign("./masterProfile.html");
    if (window.recaptchaVerifier != null) {
      await window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "masterOtpButton",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Verified");
        },
      }
    );
    sendVerificationCode(true);
  });

  // ? Handle Sending Verification Code to User
  const sendVerificationCode = async (isMaster) => {
    let phoneNumber;
    if (isMaster) {
      phoneNumber = masterPhone.value;
    } else {
      phoneNumber = userPhone.value;
      await $.ajax(
        {
          "url": "http://localhost:8080/getUserByPhone/"+phoneNumber,
          "method": "GET",
          "timeout": 0,
        }
      ).done((response) => {
        console.log(response);
      }).fail((e) => {
          alert(e.responseJSON.messages.error);
          return false;
      });
    }
    
   

    phoneNumber = "+91" + phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    await auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        const sentCodeId = confirmationResult.verificationId;
        console.log("SMS Sent" + sentCodeId);
        alert("OTP Sent");
        if (isMaster) {
          $("#masterSubmit").click(() => {
            signInWithPhone(sentCodeId, isMaster);
          });
        } else {
          $("#userSubmit").click(() => {
            signInWithPhone(sentCodeId, isMaster);
          });
        }
      });
  };

  // ? Handle Signing User with Verification Code
  const signInWithPhone = async (sentCodeId, isMaster) => {
    let code;
    if (isMaster) {
      code = masterOtp.value;
    } else {
      code = userOtp.value;
    }
    if (!codePattern.test(code)) {
      alert("OTP should be numeric and have a length of 6.");
      return false;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(
      sentCodeId,
      code
    );
    await auth
      .signInWithCredential(credential)
      .then(async (response) => {
        if (isMaster) {
          sessionStorage.clear();
          sessionStorage.setItem("master", masterPhone.value);

          var form = new FormData();
          form.append("mobile_number", masterPhone.value);
          await $.ajax({
            "url": "http://localhost:8080/masters/create",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
          }).done(function (response) {
            console.log(response);
          }).fail((e) => {
            alert(e.responseJSON.messages.error);
            return false;
          });

          window.location.assign("./masterProfile.html");
        } else {
          sessionStorage.clear();
          sessionStorage.setItem("user", userPhone.value);
          window.location.assign("./userProfile.html");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
});
