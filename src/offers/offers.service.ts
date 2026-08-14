import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  findOne(id: number): Promise<Offer | undefined> {
    return this.offerRepository.findOneBy({ id });
  }

  create(offer: CreateOfferDto): Promise<Offer> {
    return this.offerRepository.save(offer);
  }
}
