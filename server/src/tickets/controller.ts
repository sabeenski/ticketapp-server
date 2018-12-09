import { JsonController, Get, Param, Body, Post, HttpCode, NotFoundError, CurrentUser, Authorized, Patch } from 'routing-controllers'
import Ticket from './entity'
import Event from '../events/entity'
import User from '../users/entity';

@JsonController()
export default class TicketController {

  /* @Authorized() = Remember to uncomment*/
  
  @Get('/tickets/:id')
  async getTicket(
    @Param('id') id: number
  ){
      const ticket = await Ticket.findOne(id, {relations: ["user", "event", "comments"]})
    
      if(!ticket) throw new NotFoundError('Cannot find ticket with that id.')

      const ticketsByUser = await Ticket.find({
        where: {user : ticket.user.id }
      })
      if(ticketsByUser.length === 1) ticket.fraudRisk += 10
      
      //print all tickets with prices that belong to an event
      const ticketsByEvent = await Ticket.find({
        select: ["price"],
        where: { event : ticket.event.id }
      })
      console.log(ticketsByEvent)

      //Get an array of value of price object
      const priceOfTicketsByEvent = ticketsByEvent.map(ticket => ticket.price)
      console.log(priceOfTicketsByEvent)

      //calculate average of all prices
      const avgPriceOfTickets = (priceOfTicketsByEvent.reduce((acc,i) => acc + i ))/(ticketsByEvent.length)
      console.log(avgPriceOfTickets)

      if(ticket.price < avgPriceOfTickets) {
        const newRisk1 = (avgPriceOfTickets - ticket.price)/avgPriceOfTickets*100
        ticket.fraudRisk += newRisk1
      }
      else if(ticket.price > avgPriceOfTickets){
        const newRisk2 = (ticket.price - avgPriceOfTickets)/avgPriceOfTickets*100
        if(newRisk2 > 10) ticket.fraudRisk -= 10
        else ticket.fraudRisk -= newRisk2
      }

      //check time
      const hour = ticket.createdOn.getHours()
      if (hour >= 9 && hour <= 17) ticket.fraudRisk -= 10
      else ticket.fraudRisk += 10
      console.log(hour)

      //based on comments
      if(ticket.comments.length > 3) ticket.fraudRisk += 5
      
      if(ticket.fraudRisk < 5) ticket.fraudRisk = 5
      if(ticket.fraudRisk > 95) ticket.fraudRisk = 95

      return ticket

    }   

 
    
  @Authorized()
  @Post('/events/:id/tickets')
  @HttpCode(201)
  async createTicket(
  @CurrentUser() user: User,
    @Param('id')id: number,
    @Body() ticket: Ticket
  ) {
      const event = await Event.findOne(id)
      if(!event) throw new NotFoundError('Cannot find event with that id')
       return await Ticket.create({
          ...ticket,
          event,
          user    
        }).save()
      
    } 
 



  @Get('/events/:id/tickets')
  async getTickets(
      @Param('id') id: number
  ) {
      const event = await Event.findOne(id)
      return await Ticket.find({where: {event}, relations: ["user", "event"]})
      
  }   

 

  @Authorized()
  @Patch('/events/:eId/tickets/:id')
  async updateTicket(
    @CurrentUser() user: User,
    @Param ('eId') eId: number,
    @Param ('id') id: number,
    @Body() update: Partial<Ticket>
    ){  
      const event = await Event.findOne(eId)
      const ticket = await Ticket.findOne(id, {where: {event}})
      if (!ticket) throw new NotFoundError('Cannot find a ticket with this id')
      if (user) ticket.user = user
      return await Ticket.merge(ticket, update).save()
    } 


  
  
}
