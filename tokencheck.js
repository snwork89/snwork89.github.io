
const configObject = {
  APP_API: "https://api.maxweave.com/v1",
  // APP_API: "http://192.168.101.160:5555/v1",
  // APP_API: "http://163.53.177.164:5555/v1",
};
// const BACKEND_MAPPING_ACTIVE_PART = {
//   FABRIC_COST_CALCULATION: {
//     backendName: "Fabric Cost Calculation",
//     domId: "fabric-calculation",
//     displayType: "block",
//   },
//   LOOM_ACTION_CAD_HEB: {
//     backendName: "Loom - Action Cad .heb",
//     domId: "fabric-calculation",
//     displayType: "block",
//   },
// };
// const setadminPanelActivePart = (featuresArray) => {
//   if (Array.isArray(featuresArray)) {
//     Object.keys(BACKEND_MAPPING_ACTIVE_PART).forEach((x) => {
//       if (
//         featuresArray.includes(BACKEND_MAPPING_ACTIVE_PART[x]["backendName"])
//       ) {
//         document.getElementById(
//           BACKEND_MAPPING_ACTIVE_PART[x]["domId"]
//         ).style.display = BACKEND_MAPPING_ACTIVE_PART[x]["displayType"];
//       } else {
//         document.getElementById(
//           BACKEND_MAPPING_ACTIVE_PART[x]["domId"]
//         ).style.display = "none";
//       }
//     });
//   }
// };

const BACKEND_MAPPING_ACTIVE_PART = {
  FABRIC_COST_CALCULATION: {
    backendName: "Fabric Cost Calculation",
    domId: ["fabric-calculation"],
    displayType: "block",
  },
  LOOM_ACTION_CAD_HEB: {
    backendName: "Loom - Action Cad .heb",
    domId: [".heb"],
    displayType: "block",
  },
  LOOM_CHINES_DOBBY_WJL: {
    backendName: "Loom - Chines Dobby .wjl",
    domId: [".wjl"],
    displayType: "block",
  },
  LOOM_RAPIER_DOBBY: {
    backendName: "Loom - Rapier Dobby",
    domId: ["rapier-manual-dobby"],
    displayType: "block",
  },
  LOOM_RIFA_BIN: {
    backendName: "Loom - Rifa .bin",
    domId: [".bin"],
    displayType: "block",
  },
  SPACTRUM_DOBBY: {
    backendName: "Spactrum Dobby .dby .wft .hex",
    domId: ["spactrum"],
    displayType: "block",
  },
  PATERN_EDITOR: {
    backendName: "Pattern Editor",
    domId: ["pattern-editor-trigger"],
    displayType: "block",
  },
  TIE_UP: {
    backendName: "Tie-Up Mode",
    domId: ["li-tie-up", "tie-up-container", "treadles-container"],
    displayType: "block",
  },
  DESIGN_WITH_PART: {
    backendName: "Design With Part",
    domId: ["draft-in-part-trigger", "design-with-part-modal-trigger"],
    displayType: "block",
  },
  MULTIPLE_DENSTIY: {
    backendName: "Multiple Density",
    domId: ["li-cbdesity"],
    displayType: "block",
  },
  CREAMING: {
    backendName: "Creaming",
    domId: ["li-cbcreaming"],
    displayType: "block",
  },
  EXTRA_WARP: {
    backendName: "Extra Warp",
    domId: ["li-cbextrawarp"],
    displayType: "block",
  },
  DOUBLE_BEAM: {
    backendName: "Double Beam",
    domId: ["li-cbdoublebeam"],
    displayType: "block",
  },
  PRINT_FEATURES: {
    backendName: "Print Features",
    domId: ["dropdown-item-print", "print-button"],
    displayType: "block",
  }
};

const setadminPanelActivePart = (featuresArray) => {
  // console.log("featureArray", featuresArray);
  if (Array.isArray(featuresArray)) {
    Object.keys(BACKEND_MAPPING_ACTIVE_PART).forEach((x) => {
      const backendConfig = BACKEND_MAPPING_ACTIVE_PART[x];
      const domIds = backendConfig.domId;
      let isProductionMenuEnable = false;
      let isSelectLoomProfileEnable = false;
      if (
        domIds.some((id) => featuresArray.includes(backendConfig.backendName))
      ) {
        domIds.forEach((domId) => {
          const element = document.getElementById(domId);
          if (element) {
            element.style.display = backendConfig.displayType;
          }
        });
        if (
          backendConfig.backendName === "Fabric Cost Calculation" ||
          backendConfig.backendName === "Loom - Action Cad .heb" ||
          backendConfig.backendName === "Loom - Chines Dobby .wjl" ||
          backendConfig.backendName === "Loom - Rapier Dobby" ||
          backendConfig.backendName === "Loom - Rifa .bin" ||
          backendConfig.backendName === "Spactrum Dobby .dby .wft .hex"
        ) {
          isProductionMenuEnable = true;
        }
        if (
          backendConfig.backendName === "Loom - Action Cad .heb" ||
          backendConfig.backendName === "Loom - Chines Dobby .wjl" ||
          backendConfig.backendName === "Loom - Rapier Dobby" ||
          backendConfig.backendName === "Loom - Rifa .bin" ||
          backendConfig.backendName === "Spactrum Dobby .dby .wft .hex"
        ) {
          isSelectLoomProfileEnable = true;
        }
      } else {
        domIds.forEach((domId) => {
          const element = document.getElementById(domId);
          if (element) {
            element.style.display = "none";
          }
        });
      }
      if (isProductionMenuEnable) {
        const productionMenusElement =
          document.getElementById("production-menus");
        if (productionMenusElement) {
          productionMenusElement.style.display = "block";
        }
      }
      if (isSelectLoomProfileEnable) {
        const selectLoomProfileElement = document.getElementById(
          "select-loom-profile"
        );
        if (selectLoomProfileElement) {
          selectLoomProfileElement.style.display = "block";
        }
      }
    });
  }
};

const init = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get("token");

  localStorage.setItem("token", token);

  if (token) {
    axios
      .get(`${configObject.APP_API}/subscriber/redirect-url/${token}`)
      .then((res) => {
        if (res.data.DATA) {
          let companyDetail = res.data.DATA.company;

          // companyDetail["subscriptionPlan"] = {features:[]}
          
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
            const featuresArray = companyDetail?.subscriptionPlan?.features;
            
            if (Array.isArray(featuresArray)) {
              setadminPanelActivePart(featuresArray.map((x)=>x.features));
            }
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        //uncomment to start Auth
        //  window.location.replace("login.html");
        // alert(JSON.stringify(err));
        window.location.replace("https://maxweave.com");
      });

  
  }
  else{
    window.location.replace("https://maxweave.com");
  }
};

init();
