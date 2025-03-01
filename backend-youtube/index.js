// import thư viện expressJS
import express from 'express';
import connect from './db.js';
import rootRoutes from './src/routes/rootRoutes.js';
import cors from 'cors'; // lib giúp cho BE có thể nhận request từ FE
import cookieParser from 'cookie-parser';

// khởi tạo ứng dụng express
const app = express();

// sử dụng cors
// config cors để BE lấy được refresh token từ FE
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// thêm middleware để get info cookie từ FE hoặc postman
app.use(cookieParser());

// expose hình, video ra ngoài internet
app.use(express.static("."));

// parse body từ string => JSON
app.use(express.json());

// import rootRoutes
app.use(rootRoutes);

// tạo API
// param1: path của API
// param2: callback function
app.get("/welcome", (req, res) => {
    // trả dữ liệu về cho client (FE, postman,...)
    // dùng res
    return res.send("welcome to node48");
})

//  lấy information từ request (headers, body, params, query)
// 1. params
app.get("/users/:id/:hoTen", (req, res) => {
    // lấy giá trị id từ params
    // const id = req.params.id;
    // lưu ý: define bao nhiêu params thì phải truyền 
    // đúng số params đó vào URL
    // define tên params nào thì phải lấy đúng tên đó
    // VD: /users/:id
    // const id = req.params.id;
    // const id = req.params.id1; => null
    const {id} = req.params; // destructuring
    // debug log
    // => dùng console.log
    const params = req.params;
    console.log({params});
    return res.send(`Value id: ${id}`); // trả về dạng string
});

// 2. query
// URL: /users?id=1&hoTen=abc
app.get("/get-query", (req, res) => {
    // lấy giá trị từ query
    // lưu ý: method GET và DELETE sẽ không có body
    const query = req.query;

    return res.send({query}); // trả về dạng JSON
});

// 3. lấy information từ header request
// header giúp bảo vệ API
app.get("/get-header", (req, res) => {
    // lấy giá trị header từ request
    const headers = req.headers;
    return res.send({headers});
})

// get body request
// method POST, PUT mới có body
app.post("/get-body", (req, res) => {
    // lấy giá trị body từ request
    // body sẽ có dạng JSON
    const body = req.body;

    return res.send({body});
})

// viết API kết nối tới database
// app.get("/get-users", async (req, res) => {
//     try {
//         const [data] = await connect.query(`
//             SELECT * FROM users
//         `)

//         // response của query hay là excute là 1 list có 2 phần tử
//         // phần tử 1: data
//         // phần tử 2: metadata

//         return res.send({data, test});
//     } catch (error) {
//         return res.send(`Error: ${error}`);
//     }
// });

// viết API create user
app.post("/create-user", async (req, res) => {
    try {
        const queryString = `
            INSERT INTO users(full_name, email, pass_word) VALUES
            (?, ?, ?)
        `;
        let body = req.body;
        let {full_name, email, pass_word} = body; // destructuring
        // thực thi query
        const [data] = await connect.execute(queryString, [full_name, email, pass_word])
        return res.send(data);
    } catch (error) {
        return res.send(`Error: ${error}`);
    }
})

// URL mặc định của BE: http://localhost:3000
// khai báo port mà BE sẽ lắng nghe
const port = 3000;
// param1: port
// param2: callback function
// () => {}: style define function theo kiểu ES6
app.listen(port, () => {
    console.log(`BE is running with port ${port}`);
})

// npx sequelize-auto -h localhost -d node48_youtube -u root -x 123456 -p 3307 --dialect mysql -o src/models -l esm


// setting Prisma
// B1: npx prisma init
// B2: update file schema.prisma và .env
// B3: pull các table từ db về
//      npx prisma db pull
// B4: tạo prisma client để thao tác với db
//      npx prisma generate