import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { CottageService } from './cottage.service';
import { createCottageDto, editCottageDto } from './dto';

@ApiTags('Cottage')
@ApiBearerAuth()
@Controller('cottage')
export class CottageController {
  constructor(private cottageService: CottageService) {}
  @ApiOperation({ summary: 'to get all cottages (owner and client)' })
  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  async getAll() {
    return await this.cottageService.getAll();
  }
  @ApiOperation({ summary: 'to get one cottage (owner and client)' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.cottageService.findOne({ id: id });
  }
  @ApiOperation({ summary: 'to create a cottage (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() dto: createCottageDto) {
    return await this.cottageService.create(dto);
  }
  @ApiOperation({ summary: 'to update a cottage (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Put()
  async update(@Body() dto: editCottageDto) {
    return await this.cottageService.update(dto);
  }
  @ApiOperation({ summary: 'to delete a cottage (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.cottageService.deleteOne(id);
  }
}
