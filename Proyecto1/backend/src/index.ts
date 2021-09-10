import { App } from './app';


// starts the app
async function main() {

    const app = new App(3000);
    await app.listen();
}

main();