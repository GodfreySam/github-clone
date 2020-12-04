const express = require("express");
const axios = require("axios");
// const { response } = require("express");
require('dotenv').config();
// console.log(process.env)
const app = express();
app.listen(8000, () => console.log('Listening at port 8000 ...'));
app.use(express.static("stage"));

app.get('/api', async (request, response) => {
  
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
        Authorization: "bearer " + `${process.env.GITHUB_PROFILE_KEY}`,
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
    repos: repo_data
  };

  response.json(results);
});