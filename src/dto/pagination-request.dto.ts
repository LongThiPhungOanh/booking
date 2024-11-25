import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequest {
  @ApiProperty({ name: 'size', type: Number, default: 20 })
  readonly size: number = 20;
  @ApiProperty({ name: 'pageIndex', type: Number, default: 0 })
  readonly pageIndex: number = 0;
  @ApiProperty({ name: 'sortField', type: String, required: false })
  readonly sortField?: string;

  getOffset(): number {
    return this.pageIndex * this.size;
  }
}
