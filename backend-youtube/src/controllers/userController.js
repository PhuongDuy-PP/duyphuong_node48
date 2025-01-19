import connect from "../../db.js";

const getUsers = async (req, res) => {
    try {
        const [data] = await connect.query(`
            SELECT * FROM users
        `)

        // response của query hay là excute là 1 list có 2 phần tử
        // phần tử 1: data
        // phần tử 2: metadata

        return res.send({data});
    } catch (error) {
        return res.send(`Error: ${error}`);
    }
}

// define controller create user
const createUser = async (req, res) => {
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
}

// export
// nếu export 2 biến hoặc function trở lên
//  thì không dùng default
export {
    getUsers,
    createUser
}