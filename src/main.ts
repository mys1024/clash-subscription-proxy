import app from "./app.ts";
import output from "./utils/output.ts";

const port = Deno.env.get("HTTP_PORT") ?? "8080";

app.listen(`:${port}`);
output.info(`Listening on port ${port}...`);
