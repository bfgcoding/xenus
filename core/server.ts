import { Logger, DefaultLogger } from "./logger.ts";
import { serve } from "https://deno.land/std@0.56.0/http/server.ts";

export class Server {
  private fullPath: string = "";
  private logger: Logger = new DefaultLogger();

  public async build(path: string, logger?: Logger): Promise<void> {
    if (logger) {
      this.logger = logger;
    }

    this.fullPath = await Deno.realPath(path).catch((err) => {
      this.logger.error(err);
      throw err;
    });
  }

  public async serve(port: number): Promise<void> {
    this.logger.info(`Serving on port: ${port}`);
    const s = serve({ port });

    for await (const req of s) {
      if (req.url.endsWith("favicon.ico")) {
        req.respond({
          status: 200,
        });
        continue;
      }

      this.logger.info(req.url);
    }
  }
}
