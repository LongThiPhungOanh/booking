import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from './pagination-request.dto';

export class SearchTextRequest extends PaginationRequest {
  @ApiProperty({ name: 'searchText', type: String, required: false })
  readonly searchText?: string;
}
