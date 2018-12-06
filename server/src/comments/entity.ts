import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity';
import Ticket from '../tickets/entity';

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  content: string

  @ManyToOne(_type => Ticket, ticket => ticket.comments, {eager: true})
  ticket: Ticket

  @ManyToOne(_type => User, user => user.comments, {eager: true})
  author: User




  
}