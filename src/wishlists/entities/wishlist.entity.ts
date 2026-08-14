import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsString, MinLength, MaxLength, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  @MinLength(1)
  @MaxLength(250)
  @IsString()
  name: string;

  @Column({ type: 'text', length: 1500 })
  @MinLength(0)
  @MaxLength(1500)
  @IsString()
  description?: string;

  @Column({ nullable: true, length: 500 })
  @IsUrl({ require_protocol: true, allow_relative: false })
  image: string | null;

  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable({ name: 'wishlist_items' })
  items: Wish[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
