import {JsonController, Get, Post, Body, HttpCode, Param, NotFoundError, Authorized, CurrentUser} from 'routing-controllers'
import Comment from './entity'
import Ticket from '../tickets/entity'
import User from '../users/entity'

@JsonController()
export default class CommentController{

   @Authorized() 
  @Post('/tickets/:id')
  @HttpCode(201)
  async addComment(
    @CurrentUser() user: User,
    @Param ('id') id: number,
    @Body() comment: Comment
    ){
    const ticket = await Ticket.findOne(id)
    if(!ticket) throw new NotFoundError('Cannot find event with that id')
    const newComment = await Comment.create({
      ...comment,
      ticket,
      user
    })
    return newComment.save()
    } 


  @Get('/comments')
  allComments() {
    return Comment.find()
  }
  
  
  @Get('/comments/:id)')
  getComment(
    @Param('id') id: number
  ) {
      return Comment.findOne(id)
    }  


  
    
    
    
    
}
