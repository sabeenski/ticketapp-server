import { JsonController, Get, Param, Body, Post, HttpCode, NotFoundError, CurrentUser, Authorized, Patch,  } from 'routing-controllers'
import Ticket from './entity'
import Event from '../events/entity'
import User from '../users/entity';

@JsonController()
export default class TicketController {

  /* @Authorized() = Remember to uncomment*/
  /* @Post('/events/:id([0-9])/tickets')
  @HttpCode(201)
  async createTicket(
    @Param('id')id: number,

    @Body() newTicket: Ticket
  ){
      const ticket = await Ticket.findOne({
        where: { id : newTicket.id }        
      }) 
      console.log(newTicket.id)
    
      if(!ticket) throw new NotFoundError('Cannot find ticket with that id.')

      const ticketsByUser = await Ticket.find({
        where: { user : ticket.user.id }
      })
      if(!ticketsByUser) throw new NotFoundError('Cannot find tickets by this seller.')
      if(ticketsByUser.length === 1) ticket.fraudRisk += 10
      
      
      const ticketsByEvent = await Ticket.find({
        select: ["price"],
        where: { event : ticket.event.id }
      })
      if(!ticketsByEvent) throw new NotFoundError('Cannot find tickets for this event')
      const priceOfTicketsByEvent = ticketsByEvent.map(ticket => ticket.price)
      const avgPriceOfTickets = (priceOfTicketsByEvent.reduce((acc,i) => acc + i ))/(ticketsByEvent.length)
      if(ticket.price < avgPriceOfTickets) {
        const newRisk1 = avgPriceOfTickets - ticket.price
        ticket.fraudRisk += newRisk1
      }
      if(ticket.price > avgPriceOfTickets){
        const newRisk2 = ticket.price - avgPriceOfTickets
        if(newRisk2 > 10) ticket.fraudRisk -= 10
        else ticket.fraudRisk -= newRisk2
      }

      const hour = ticket.createdOn.getHours()
      if (hour >= 9 && hour <= 17) ticket.fraudRisk -= 10
      else ticket.fraudRisk += 10

      if(ticket.comments.length > 3) ticket.fraudRisk += 5
      
      if(ticket.fraudRisk < 5) ticket.fraudRisk = 5
      if(ticket.fraudRisk > 95) ticket.fraudRisk = 95

      return ticket.save()

    }    */

 
    











  ///Making the work above!! 

  // @Authorized()
  @Post('/events/:id/tickets')
  @HttpCode(201)
  async createTicket(
  @CurrentUser() user: User,
    @Param('id')id: number,
    @Body() ticket: Ticket
  ) {
      const event = await Event.findOne(id)
      if(!event) throw new NotFoundError('Cannot find event with that id')
      const newTicket = await Ticket.create({
          ...ticket,
          event,
          user
          
      })
      return newTicket.save() 
    } 
 



  @Get('/events/:id/tickets')
  async getTickets(
      @Param('id') id: number
  ) {
      const event = await Event.findOne(id)
      const tickets = await Ticket.find({where: {event}, relations: ["comments"]})
      return tickets
  }   


  @Get('/tickets/:id')
  async getTicket(
    @Param('id') id: number
  ){
    const ticket = await Ticket.findOne(id, {relations: ["comments"]})
    return ticket
  }
 

  @Authorized()
  @Patch('/tickets/:id([0-9]+)')
  async updateTicket(
    @CurrentUser() user: User,
    @Param ('id') id: number,
    @Body() update: Partial<Ticket>
    ){  
      const ticket = await Ticket.findOne(id)
      if (!ticket) throw new NotFoundError('Cannot find a ticket with this id')
      if (user) ticket.user = user
      return await Ticket.merge(ticket, update).save()
    } 


  
  
}
