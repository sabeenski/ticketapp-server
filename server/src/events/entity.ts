import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Ticket from '../tickets/entity';
import User from '../users/entity';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:true})
  picture: string

  @Column('text', {nullable:false})
  startDate: Date

  @Column('text', {nullable:false})
  endDate: Date

  @OneToMany(_type => Ticket, ticket => ticket.event, {eager: true})
  tickets: Ticket[]

  @ManyToOne(_type => User, user => user.events)

  user: User
  
}