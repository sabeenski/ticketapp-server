import { JsonController, Get, Param, Body, Post, HttpCode } from 'routing-controllers'
import Event from './entity'

@JsonController()
export default class EventController {



  
  @Get('/events')
  allEvents() {
    return Event.find()
  }


  @Get('/events/:id([0-9]+)')
  getEvent(
    @Param('id') id: number
  ){
   return Event.findOne(id)
    
  }

  
  /* @Authorized() = Remember to uncomment*/
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() event: Event
  ) {
      const newEvent = await event.save()
      return await Event.findOne(newEvent.id)
    } 
}
