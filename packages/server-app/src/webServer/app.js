export default (server) => {
    server.get('*', (req, res) => {
       res.status(200).send('hello world');
    });
    return server;
}
