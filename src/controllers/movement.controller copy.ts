import { Request, Response } from "express";
import { GET, POST, route } from "awilix-express";
import { BaseController } from "../common/controllers/base.controller";
import { MovementService } from "../services/movement.service";
import { MovementCreateDto } from "../dtos/movement.dto";

@route("/movement")
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(await this.movementService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.movementService.find(id);
      if (!result) {
        res.status(404);
        res.send;
      }
      res.send(result);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.movementService.store({
        type: req.body.type,
        amount: req.body.amount,
        user_id: req.body.user_id,
      } as MovementCreateDto);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
