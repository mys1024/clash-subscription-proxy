import app from "./app.ts";
import output from "./utils/output.ts";

const port = "8080";

app.listen(`:${port}`);
output.info(`Listening on port ${port}...`);
