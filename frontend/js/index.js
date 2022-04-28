const masterPhone = document.getElementById("masterPhone");
const masterOtp = document.getElementById("masterOtp");
const userPhone = document.getElementById("userPhone");
const userOtp = document.getElementById("userOtp");

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

$("#masterOtpButton").click(function () {
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
      window.recaptchaVerifier.render().then(function (widgetId) {
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
const sendVerificationCode = (isMaster) => {
  let phoneNumber;
  if (isMaster) {
    phoneNumber = masterPhone.value;
  } else {
    phoneNumber = userPhone.value;
  }
  phoneNumber = "+91" + phoneNumber;
  const appVerifier = window.recaptchaVerifier;
  auth
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const sentCodeId = confirmationResult.verificationId;
      console.log("SMS Sent" + sentCodeId);
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
const signInWithPhone = (sentCodeId, isMaster) => {
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
  auth
    .signInWithCredential(credential)
    .then(() => {
      if (isMaster) {
        sessionStorage.setItem("master", masterPhone.value)
        window.location.assign("./masterProfile.html");
      } else {
        sessionStorage.setItem("user", userPhone.value)
        window.location.assign("./userProfile.html");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
