document.addEventListener("DOMContentLoaded", () => {
  axios
    .post(
      "https://api.github.com/graphql",
      {
        query: `query { 
          repositoryOwner(login: "GodfreySam") {
              ... on User {
                repositories(last: 10) {
                  edges {
                    node {
                      name,
                      url
                      createdAt
                      updatedAt
                      forkCount
                      languages(last: 1) {
                        nodes{
                          name
                        }
                      }
                      viewerHasStarred
                      name
                      owner{
                        resourcePath
                      }
                      stargazers{
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }`,
      },
      {
        headers: {
          Authorization: "bearer " + "ba3d291c57bbbb952f6782e7357d5ce89aa90b9b",
        },
      }
    )
    .then((response) => {
      let repoItems = response.data;
        // console.log(repoItems);

        for (let value1 of Object.values(repoItems)) {
          // console.log(value1);
          for (let value2 of Object.values(value1)) {
            // console.log(value2);
            for (let value3 of Object.values(value2)) {
              // console.log(value3);
            //  let value4 = Object.values(value3)
            //     console.log(value4);
                Object.values(value3).map((element) => {
                  // console.log(element);
                  let ownerName = element[0].node.owner.resourcePath.split("").slice(1).join("");
                  // let item1Date = element[0].node.updatedAt.split('').splice(0, 10).join('');
                  // console.log(item1Date);
                  document.querySelector(".secondary-heading").innerHTML = ownerName;
                  document.querySelector(
                    ".sm-secondary-heading"
                  ).innerHTML = ownerName;
                  let output = document.querySelector(".repo-item");
                  output.innerHTML = `
                      <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[0].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[0].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on ${moment(
                              element[0].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[1].node.name}</h2>
                          <div class="sub-info">
                           <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[1].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[1].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[2].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[2].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[2].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[3].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[3].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[3].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[4].node.name}</h2>
                          <div class="sub-info">
                           <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[4].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[4].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[5].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[5].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on ${moment(
                              element[5].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[6].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[6].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[6].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[7].node.name}</h2>
                          <div class="sub-info">
                           <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[7].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[7].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[8].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[8].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on  ${moment(
                              element[8].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>

                       <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${element[9].node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                element[9].node.languages.nodes[0].name
                              }</span>
                          <div class="date-info"> 
                            <span class="updated-time">Updated on  ${moment(
                              element[9].node.updatedAt
                                .split("")
                                .splice(0, 10)
                                .join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>
                    `;
                });           
            }
          }
        }
      
    });
});