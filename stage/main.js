getProfile();

async function getProfile() {
  const response = await fetch("/api");
  const data = await response.json();
  // console.log(data.profile.data.user);
  const userItems = data.profile.data.user;
  document.querySelector("#lg-header-img").src = userItems.avatarUrl;
  document.querySelector("#sm-header-img").src = userItems.avatarUrl;
  let output = document.querySelector(".profile-area");
  output.innerHTML += `
    <div class="profile">
      <div class="portrait">
      <img class="profile-img" src="${userItems.avatarUrl}" alt="Profile Image"/>
      </div>
      <div class="bio">
        <h1 class="primary-heading">${userItems.name}</h1>
        <h2 class="secondary-heading heading"></h2>
        <p class="title">${userItems.bio}<p>
        <p class="website"><i class="fa fa-link"></i> ${userItems.websiteUrl}<p>
      </div>
    </div>
  `;
}
getRepos();
async function getRepos() {
  const response = await fetch("/api");
  const data = await response.json();
  const repoItems = data.repos.data.repositoryOwner;
  const repos = await Promise.all(Object.values(repoItems));
  const myRepos = Object.values(repos).map(async (repo) => {
    const myRepo = await repo;
    return myRepo;
  });
  const nodes = await Promise.all(myRepos);
  Object.values(nodes).map((element) => {
    for (let el of Object.values(element)) {
      el.forEach((item) => {
        let ownerName = item.node.owner.resourcePath
          .split("")
          .slice(1)
          .join("");

        document.querySelectorAll(".heading").forEach((el) => {
          el.innerHTML = ownerName;
        });
        let output = document.querySelector(".repo-item");
        output.innerHTML += `
                      <div class="repo">
                        <div class="line">
                          <h2 class="repo-title">${item.node.name}</h2>
                          <div class="sub-info">
                          <span class="last-language">
                              <i class="fa fa-circle inner-icon"></i> ${
                                item.node.languages.nodes[0].name
                              }</span>
                          <div class="date-info">
                            <span class="updated-time">Updated on ${moment(
                              item.node.updatedAt
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
  });
}
