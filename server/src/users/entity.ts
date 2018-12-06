import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Event from '../events/entity';
import Ticket from '../tickets/entity';

import Comment from '../comments/entity';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(8)
  @Column('text')
  @Exclude({toPlainOnly:true})
  password: string

  @OneToMany(_type => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  @OneToMany(_type => Event, event => event.user)
  events: Event[]

  @OneToMany(_type => Comment, comment => comment.author)
  comments: Comment[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}