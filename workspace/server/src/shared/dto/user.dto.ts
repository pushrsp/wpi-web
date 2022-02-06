import { RequestUserDto } from "../../users/dto/request.user.dto";

export class UserDto extends RequestUserDto {
  public _id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public isAccepted: boolean;
}
