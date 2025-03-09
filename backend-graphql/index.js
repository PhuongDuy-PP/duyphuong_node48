import express from "express";
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

// build schema graphql
const schema = buildSchema(`
    type Video {
        video_id: Int
        video_name: String
        thumbnail: String
    }

    type Query{
        videos: [Video]
        video(id: Int): Video
    }

    type Mutation {
        createVideo: Video
    }
`);

// root resolver
const resolvers = {
    videos: async () => {
        return await prisma.videos.findMany();
    },
    video: async ({id}) => {
        let data = await prisma.videos.findFirst({
            where: {
                video_id: id
            }
        })

        console.log(data)
        return await prisma.videos.findFirst({
            where: {
                video_id: id
            }
        })
    },
    createVideo: async () => {
        return await prisma.videos.create({
            data: {
                video_name: "New Video",
                thumbnail: "https://www.google.com"
            }
        })
    }
}

// define graphql endpoint
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true // bật giao diện graphiql
}));

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})