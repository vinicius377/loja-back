import { IsEnum, IsMongoId, IsString } from "class-validator";
import { Status } from "./Status";

export class ChangeStatusDto {
  @IsEnum(Status)
  status: Status

  @IsMongoId()
  pedidoId: string

  @IsString()
  motivo: string
}
