const configObject = {
  APP_API: "https://api.maxweave.com/v1",
  // APP_API: "http://192.168.101.160:5555/v1",
  // APP_API: "http://163.53.177.164:5555/v1",
};
const BACKEND_MAPPING_ACTIVE_PART = {
  FABRIC_COST_CALCULATION: {
    backendName: "Fabric Cost Calculation",
    domId: "fabric-calculation",
    displayType: "block",
  },
};
const setadminPanelActivePart = (featuresArray) => {
  if (Array.isArray(featuresArray)) {
    Object.keys(BACKEND_MAPPING_ACTIVE_PART).forEach((x) => {
      if (
        featuresArray.includes(BACKEND_MAPPING_ACTIVE_PART[x]["backendName"])
      ) {
        document.getElementById(
          BACKEND_MAPPING_ACTIVE_PART[x]["domId"]
        ).style.display = BACKEND_MAPPING_ACTIVE_PART[x]["displayType"];
      } else {
        document.getElementById(
          BACKEND_MAPPING_ACTIVE_PART[x]["domId"]
        ).style.display = "none";
      }
    });
  }
};

const init = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get("token");

  if (token === null) {
    //window.location.replace("login.html");
    window.location.replace("https://maxweave.com");
  } else {
    localStorage.setItem("token", token);
  }
  if (token) {
    axios
      .get(`${configObject.APP_API}/subscriber/redirect-url/${token}`)
      .then((res) => {
        if (res.data.DATA) {
          let companyDetail = res.data.DATA.company;
          let userDetail = res.data.DATA.user;

          if (userDetail) {
            document.getElementById(
              "submenu-user-name"
            ).innerText = `${userDetail.firstName} ${userDetail.lastName}`;
            localStorage.setItem("user", JSON.stringify(userDetail));
          }
          if (companyDetail) {
            document.getElementById(
              "submenu-company-name"
            ).innerText = `${companyDetail.companyName}`;
            localStorage.setItem("company", JSON.stringify(companyDetail));

            if (Array.isArray(companyDetail["features"])) {
              setadminPanelActivePart(companyDetail["features"]);
            }
          }
        }
      })
      .catch((err) => {
        //uncomment to start Auth
        //  window.location.replace("login.html");
        window.location.replace("https://maxweave.com");
      });

    // const user = localStorage.getItem("user");
    // console.log("user", user);
    // if (user && JSON.parse(user)._id) {
    //   axios.get(confi)
    //   //window.location.replace("index.html");
    // } else {
    //   window.location.replace("login.html");
    // }
  }
};

init();
