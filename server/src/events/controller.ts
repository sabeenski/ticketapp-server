import { JsonController, Get, Param, Body, Post, HttpCode, CurrentUser, Authorized } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity';

@JsonController()
export default class EventController {
 
  @Get('/events')
  async allEvents() {
    return await Event.find({relations: ["user"]})
  }


  @Get('/events/:id')
  getEvent(
    @Param('id') id: number
  ){
   return Event.findOne(id)
    
  }

  
  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @CurrentUser() user: User,
    @Body() event: Event
  ){
    //if(user) event.user = user
    return await Event.create({
      ...event,
      user
    }).save()
    //return await event.save()
    
  } 
}
