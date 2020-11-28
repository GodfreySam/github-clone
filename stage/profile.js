const  body = {
          query: `query { 
            user(login: "GodfreySam"){
              id
              avatarUrl
              name
              bio
              websiteUrl
            }
          }`
        }

document.addEventListener("DOMContentLoaded", () => {
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `query { 
            user(login: "GodfreySam"){
              id
              avatarUrl
              name
              bio
              websiteUrl
            }
          }`
        },
        {
          headers: {
            Authorization:
              "bearer " + "ba3d291c57bbbb952f6782e7357d5ce89aa90b9b",
          },
        }
      )
      .then((response) => {
        let userItems = response.data;
        // console.log(userItems);

         for (let value of Object.values(userItems)) {
          //  console.log(value);
           let output = document.querySelector(".profile-area");
           document.querySelector("#lg-header-img").src = value.user.avatarUrl;
           document.querySelector("#sm-header-img").src = value.user.avatarUrl;
           output.innerHTML = `
              <div class="profile">
                <div class="portrait">
                <img class="profile-img" src="${value.user.avatarUrl}" alt="Profile Image"/>
                </div>
                <div class="bio">
                  <h1 class="primary-heading">${value.user.name}</h1>
                  <h2 class="secondary-heading"></h2>
                  <p class="title">${value.user.bio}<p>
                  <p class="website"><i class="fa fa-link"></i> ${value.user.websiteUrl}<p>
                </div>
              </div>
            `;
         } 
      });     
})