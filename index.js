import db from './db.js';
import app from './src/app.js';

const PORT = process.env.PORT;

async function main() {
    try {
        await db.sync();


        app.listen(
            PORT, () => console.log(`App runing on PORT:::${PORT}`)
        );
    } catch (error) {
        console.log(error.message);
    }
}

main();