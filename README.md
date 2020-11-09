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
- JWT

The activity seeds file generates random coordinates, so activities are spread across Amsterdam:
``` 
          latitude: (52.3 + Math.random() / 10).toFixed(6),
          longitude: (4.8 + Math.random() / 5).toFixed(6),
```

### Frontend

- React Native (Expo)
- Apollo Client
- Font Awesome
- React Native Paper (Material UI framework)

I use the Apollo [reactive variable](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables) to automatically send users to the Home stack when they sign in (or still have a token). 


## Documentation

[Back End](https://github.com/svenve-git/outsiders-backend)

[Wireframe](./docs/Wireframe_v1.png)

[Database Diagram](./docs/Database_diagram.png)

[Project Board](./docs/Project_Board_Screenshot.png)
