import { JsonController, Get, Param, Body, Post, HttpCode, CurrentUser } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity';

@JsonController()
export default class EventController {
 
  @Get('/events')
  allEvents() {
    return Event.find()
  }


  @Get('/events/:id')
  getEvent(
    @Param('id') id: number
  ){
   return Event.findOne(id)
    
  }

  
  // @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @CurrentUser() user: User,
    @Body() event: Event
  ){
    if(user) event.user = user
    return await event.save()
    
  } 
}
