import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { UserService } from './user.service';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'to get all users (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'to delete user (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
