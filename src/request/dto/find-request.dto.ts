import { IsBoolean } from 'class-validator';
import { FilterPaginationDto } from 'src/common/dto/pagination.dto';

export class FindRequestDto extends FilterPaginationDto {
  @IsBoolean()
  isAccepted: boolean;
}
