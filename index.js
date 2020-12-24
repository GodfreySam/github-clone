const express = require("express");
const axios = require("axios");
// const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
const cors = require('cors');
const Datastore = require('nedb');
const aboutDB = new Datastore();
const repoDB = new Datastore();
// aboutDB.loadDatabase();
// repoDB.loadDatabase();

app.use(express.static("stage"));
app.get("/about", cors(), async (request, response, next) => {
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

    const profile_data = await profile_response;
   
    const results = {
      profile: profile_data.data
    };

    aboutDB.insert(results);
    
    return response.json({
      bio: results.profile
    });
  } catch (error) {
    next(error);
  }
});

app.get("/repo", cors(), async (request, response, next) => {
  // console.log(request);
  try {
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

    const repo_data = await repo_response;

    const results = {
      repos: repo_data.data,
    };

    repoDB.insert(results);

    return response.json({
      item: results.repos,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Listening at ${port} ...`);
});
