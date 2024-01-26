import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  src?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: Date })
  created: Date;

  @ManyToOne((type) => Photo, (photo) => photo.user)
  user: User;
}
