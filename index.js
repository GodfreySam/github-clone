const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

const database = [];

app.use(express.static(path.join(__dirname, "stage")));
app.get("/api", async (request, response, next) => {
  // console.log(request);
  try {
    const profile_response = await axios.post(
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
          }`,
      },
      {
        headers: {
          Authorization: "bearer " + `${process.env.GITHUB_REPO_KEY}`,
        },
      }
    );

    const repo_response = await axios.post(
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
          Authorization: "bearer " + `${process.env.GITHUB_REPO_KEY}`,
        },
      }
    );

    const profile_data = await profile_response;
    const repo_data = await repo_response;

    const results = {
      profile: profile_data.data,
      repos: repo_data.data,
    };

    database.push(results);
    console.log(database);
    return response.json({
      bio: results.profile,
      item: results.repos
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Listening at ${port} ...`);
});
