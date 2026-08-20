import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { User } from '../users/entities/user.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findWish(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.findWish(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  createWish(@Body() dto: CreateWishDto, @Req() req: { user: User }) {
    return this.wishesService.createWish(dto, req.user);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copyWish(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.getCopy(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateWish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWishDto,
    @Req() req: { user: User },
  ) {
    return this.wishesService.updateWish(id, req.user.id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeWish(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: User },
  ) {
    return this.wishesService.removeWish(id, req.user.id);
  }
}
