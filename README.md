# Outsiders

### Description

This project gives a platform to find, create and share outdoor activities. It helps people host and join activities, so they can enjoy being outdoor together. So do you feel like going out, but are bored of the obligatory 'jog around the block'? Or just feel like kicking a ball with some other people? Post a public activity and invite them! Or have a look and see what's happening.

Of course, the main reason for this app is for me to practice & learn full stack development, and showcase some of the things I have learned. It's probably good to know that I had two weeks to build the MVP, and that it was my first project using Apollo GraphQL and React Native. 

## Demo

<img src="./Outsiders_demo.gif" width="250">


## Stack:

### Backend

- GraphQL
- Sequelize ORM
- PostgreSQL
- Express
- Apollo Server
- JWT Authorization

### Frontend

- React Native (Expo)
- Apollo Client
- Font Awesome
- React Native Paper (Material UI framework)

### Under the hood

There are a few things happening under the hood that I think are nice to share. 

#### Authorization setup
Because I wanted to explore Apollo Client, I refactored my original AuthContext hook to a [reactive variable](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables) in combination with the Apollo cache. This way, the App will automatically pick up whether a user is logged in, so they can be sent to the appropriate navigation stack (Auth or Home). 

```
export const isSignedInVar = makeVar()

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isSignedIn: {
          read() {
            return isSignedInVar()
          },
        },
      },
    },
  },
})
```

#### Randomly generated coordinates
When I was seeding some dummy data to see how the activities looked on the map, I first hardcoded the coordinates and changed a few numbers here and there to spread them around a bit. Well, when I fired up the App, they all turned out to be in Westerpark. Not exactly random and of course a bit inconsiderate to the rest of the city. So to solve this problem I set some outer boundaries in which I wanted my activities to be and then wrote the following function to generate random coordinates within this field: 

``` 
          latitude: (52.3 + Math.random() / 10).toFixed(6),
          longitude: (4.8 + Math.random() / 5).toFixed(6),
```

Simple, but fun.

## Documentation

[Back End](https://github.com/svenve-git/outsiders-backend)

[Wireframe](./docs/Wireframe_v1.png)

[Database Diagram](./docs/Database_diagram.png)

[Project Board](./docs/Project_Board_Screenshot.png)
