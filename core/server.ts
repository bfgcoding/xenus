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

    // Set working directory
    this.logger.info(this.fullPath);
    Deno.chdir(this.fullPath);

    for await (const req of s) {
      if (req.url.endsWith("favicon.ico")) {
        req.respond({
          status: 200,
        });
        continue;
      }

      this.logger.info("Getting controller path");
      const controllerPath: string = await this.getControllers(req.url).catch(
        (err) => {
          this.logger.error(err);
          req.respond({
            status: 404,
            body: `Error: No controller for ${req.url}`,
          });
          return "";
        }
      );

      if (controllerPath === "") {
        continue;
      }

      this.logger.info(controllerPath);

      const controller = await import(controllerPath).catch((err) => {
        this.logger.error(err);
      });

      req.respond({
        body: controller.default(req),
      });
    }
  }

  private async getControllers(request: string): Promise<string> {
    this.logger.info(`Request: ${request}`);
    const file = request.endsWith("/") ? `${request}index` : request;

    this.logger.info(`File: ${file}`);

    let result: string;
    try {
      result = await Deno.realPath(`${file}.controller.ts`);
    } catch {
      result = await Deno.realPath(`${file}.ts`).catch((err) => {
        throw err;
      });
    }

    return result;
  }
}
