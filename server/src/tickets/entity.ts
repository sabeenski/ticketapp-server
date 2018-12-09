import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Event from '../events/entity'
import User from '../users/entity';
import Comment from '../comments/entity'



@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:true})
  price: number

  @Column('text', {nullable:true})
  description: string

  @Column('text', {nullable:true})
  picture: string

  @Column('float', {default:0})
  fraudRisk: number

  @CreateDateColumn({type: "timestamp"})
  createdOn: Date

  @ManyToOne(_type => Event, event => event.tickets)
  event: Event

  @ManyToOne(_type => User, user => user.tickets)
  user: User

  @OneToMany(_type => Comment, comment => comment.ticket)
  comments: Comment[]
}