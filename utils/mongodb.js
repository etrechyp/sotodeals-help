import {
    connect,
    connection
} from 'mongoose';

const conn = {
    isConnected: false
}

export async function connectDB() {

    if (conn.isConnected) return;

    await connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    conn.isConnected = connection.readyState;

    console.log('connection status: ', conn.isConnected);

    connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    connection.on('error', (err) => {
        console.log('MongoDB error', err);
    });
}