const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const emailId = document.getElementById("email");
const phoneNo = document.getElementById("phone");
const productList = document.getElementById("product");

function cancelForm() {
  form.reset();
  grecaptcha.reset();
}

const items = document.getElementsByClassName("inputdata");
const errornumber = document.querySelector(".pnum");
const errorFirstName = document.querySelector("#errorfirstname");
const errorLastName = document.querySelector("#errorlastname")
for (const inputdata of items) {
  if(inputdata.getAttribute('name') === "phone"){
    inputdata.addEventListener('input', function() {
      const phoneValue = phoneNo.value.trim();
      if (phoneValue.length > 10) {
        phoneNo.value = phoneValue.slice(0, 10); // Limit to 10 digits
      }
    });
  }
}
function checkInputs() {
 


  // console.log("first", items);

  for (const inputdata of items) {
    if (inputdata.value == "") {
      inputdata.classList.add("error");
      inputdata.parentElement.classList.add("error");
    }

    if (items[2].value != "") {
      checkmail();
    }
    items[2].addEventListener("keyup", () => {
      checkmail();
    });

    inputdata.addEventListener("keyup", () => {
      if (inputdata != "") {
        inputdata.classList.remove("error");
        inputdata.parentElement.classList.remove("error");
      } else {
        inputdata.classList.add("error");
        inputdata.parentElement.classList.add("error");
      }
    });
  }
}





function checkmail() {
  const emailcheck =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errormail = document.querySelector(".error-txt.email");
  if (!emailId.value.match(emailcheck)) {
    emailId.classList.add("error");
    emailId.parentElement.classList.add("error");

    if (emailId.value != "") {
      errormail.innerText = "Enter a valid mail address";
    } else {
      errormail.innerText = "Email address can't be blank";
    }
  } else {
    emailId.classList.remove("error");
    emailId.parentElement.classList.remove("error");
  }
}





function checkPhoneNo() {
  const phoneRegex = (/^\(?([6-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/) ;
  const errornumber = document.querySelector(".pnum");

  if (!phoneNo.value.match(phoneRegex)){
    phoneNo.classList.add("error");
    phoneNo.parentElement.classList.add("error");
    if (phoneNo.value != "") {
      errornumber.innerText = "Enter a valid phone number";
    } else {
      errornumber.innerText = "Phonenumber can't be blank";
    }
  } 
  else {
    phoneNo.classList.remove("error");
    phoneNo.parentElement.classList.remove("error");
  }
}


// function checkLetter(){
//   const nameRegex = "/^[a-zA-Z\s-]*$"
//   const errorFirstName = document.querySelector("#errorfirstname");

//   if (!firstName.value.match(nameRegex)){
//     firstName.classList.add("error");
//     firstName.parentElement.classList.add("error");
//     errorFirstName.innerText = "Enter a valid name";
//     if (firstName.value != "") {
//       errorFirstName.innerText = "Firstname can't be blank"
//       // console.log("first",firstName.value)
     
//     } else {
//       ;
//     }
//   } 
//   else {
//     firstName.classList.remove("error");
//     firstName.parentElement.classList.remove("error");
//   }
// }



function sendEmail() {
  let noProduct = productList.value.length > 1 ? productList.value : "No product selected";

  const bodyMessage = `
        First name : ${firstName.value} <br>
        Last name : ${lastName.value} <br>
        Email : ${emailId.value} <br>
        Phone number : ${phoneNo.value} <br>
        Product name : ${noProduct}
    `;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "yuvanarjun0702@gmail.com",
    Password: "D55E69C62AB2714FC9AB95B5247EDF8BFFCD",
    To: "yuvanarjun0702@gmail.com",
    From: "yuvanarjun0702@gmail.com",
    Subject: "This is the subject",
    Body: bodyMessage,
  }).then((message) => alert(message));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  checkPhoneNo();

  var response = grecaptcha.getResponse();
  if (response.length == 0) {
    alert("Please complete the CAPTCHA");
    return false;
  } else {
    if (
      !firstName.classList.contains("error") &&
      !lastName.classList.contains("error") &&
      !emailId.classList.contains("error") &&
      !phoneNo.classList.contains("error") &&
      !productList.classList.contains("error")
    ) {
      sendEmail();
    }

    return true;
  }
});
