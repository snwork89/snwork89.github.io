

const configObject = {
   APP_API:"https://api.maxweave.com/v1"
  // APP_API: "http://192.168.101.160:5555/v1",
};

const init = () => {
  console.log("Init called");
  const loginButton = document.getElementById("login-form-submit");
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button clicked");
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email === "" || password === "") {
      alert("Email And Password Are Required");
    }

    // if(password=="12ab12AB"){
    //   localStorage.setItem("user",JSON.stringify({id:1}))
    //   window.location.replace("index.html");
    // }

    // return

    const user = {
      email: email,
      password: password,
      uniqueId: "3DBD1F4C-357E-11B2-A85C-BEA40D20E9FC",
      cpuId: "BFEBFBFF000806EC",
      baseId: "LENOVOBase BoardL1HF9AR01H5",
      videoId: "30.0.101.1692Intel(R) UHD Graphics 620",
      diskId: "B0A8-F618-7E8A-3B2C-3496-FAAF-E610-F280",
      fingerPrint: "3DBD1F4C-357E-11B2-A85C-BEA40D20E9FC",
    };
    axios
      .post(`${configObject.APP_API}/subscriber/login`, user)
      .then((res) => {
        if (res.data.DATA.requestedUser[0]) {
          let userDetail = res.data.DATA.requestedUser[0];
          let tokenDetail =
            res.data.DATA.tokens[0] && res.data.DATA.tokens[0].token;
          if (userDetail && tokenDetail) {
            localStorage.setItem("user", JSON.stringify(userDetail));
            localStorage.setItem("token", JSON.stringify(tokenDetail));
            window.location.replace("index.html?token=" + tokenDetail);
          }
        }
      })
      .catch((err) => {
        console.log("Err is", err);
      });

    // fetch(`${configObject.APP_API}/subscriber/login`, {
    //   // Adding method type
    //   method: "POST",

    //   // Adding body or contents to send
    //   body: JSON.stringify(user),

    //   // Adding headers to the request
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   // Converting to JSON
    //   .then((response) => response.json())

    //   // Displaying results to console
    //   .then((resposneJson) => {
    //     console.log("Res data is", resposneJson);
    //     if(resposneJson.STATUS=="FAILURE"){
    //       alert("Email And Password Are Incorrect");
    //     }
    //     else{
    //       let userDetail = resposneJson.DATA;
    //       localStorage.setItem("user", JSON.stringify(userDetail));
    //       window.location.replace("index.html");

    //     }
    //   }).catch(err=>console.log("err is",err))

    // location.reload();
  });
};
init();
