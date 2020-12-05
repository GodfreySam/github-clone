const express = require("express");
const axios = require("axios");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
app.listen(port, () => {
  console.log(`Listening at ${port} ...`);
});
app.use(express.static("stage"));
app.use(express.json({ limit: '1mb' }));
app.get("/api", async (request, response, next) => {
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

    const profile_data = await profile_response.data;
    const repo_data = await repo_response.data;

    const results = {
      profile: profile_data,
      repos: repo_data,
    };

    response.json(results);
  } catch (error) {
    next(error);
  }
});
