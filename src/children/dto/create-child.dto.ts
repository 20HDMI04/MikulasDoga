import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/*
A gyerekekről tárolandó adatok:
Név
Pontos cím (országgal együtt)
Jó volt-e vagy sem
*/
export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsBoolean()
  @IsNotEmpty()
  goodKid: boolean;
}
