import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => console.log('mongo db connection created'));

const db = mongoose.connection;

db.once('open', () => {
    server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
});
