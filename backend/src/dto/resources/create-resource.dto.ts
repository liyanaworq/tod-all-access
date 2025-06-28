// create-resource.dto.ts
import { IsString, IsEnum } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  outletId: string;

  @IsString()
  name: string;

  @IsEnum(['HOT_DESK', 'MEETING_ROOM'])
  type: 'HOT_DESK' | 'MEETING_ROOM';
}
