import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  MinLength,
  MaxLength,
  IsString,
  IsUrl,
  IsNumber,
  Min,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('wishes')
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  @MinLength(1)
  @MaxLength(250)
  @IsString()
  name: string;

  @Column({ length: 500 })
  @IsUrl({ require_protocol: true })
  link: string;

  @Column({ nullable: true, length: 500 })
  @IsUrl({ require_protocol: true, allow_relative: false })
  image: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  raised: number;

  @Column({ type: 'text', length: 1024 })
  @MinLength(1)
  @MaxLength(1024)
  @IsString()
  description: string;

  @Column({ default: 0 })
  @IsNumber()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishes, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
