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
          Authorization: "bearer " + "06b3911d10fd57493da207f8ccbd50f299bd527e",
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
            console.log(value3);

            //     console.log(value4);
            Object.values(value3).map((element) => {
              console.log(element);
              for (let el of element) {
                console.log(el.node);

                let ownerName = el.node.owner.resourcePath
                  .split("")
                  .slice(1)
                  .join("");

                document.querySelector(
                  ".secondary-heading"
                ).innerHTML = ownerName;
                document.querySelector(
                  ".sm-secondary-heading"
                ).innerHTML = ownerName;
                let output = document.querySelector(".repo-item");
                output.innerHTML += `
                      <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${el.node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                el.node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on ${moment(
                              el.node.updatedAt.split("").splice(0, 10).join("")
                            ).format("MMM, DD")}</span></div>
                        </div>
                        </div>
                        <div class="star">
                          <button class="btn"><i class="fa fa-star inner-icon"></i> Star</button>
                        </div>
                      </div>
                  `;
              }
            });
          }
        }
      }
    });
});
