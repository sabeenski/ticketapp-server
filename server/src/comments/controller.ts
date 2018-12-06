import {JsonController, Get, Post, Body, HttpCode, Param} from 'routing-controllers'
import Comment from './entity'


@JsonController()
export default class CommentController{

  // @Authorized() > REMEMBER TO UNCOMMENT!
  @Post('/comments')
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment
    ){
    const newComment = await comment.save()
    return await Comment.findOne(newComment.id)
    } 


  @Get('/comments')
  allComments() {
    return Comment.find()
  }
  
  
  @Get('/comments/:id([0-9]+)')
  getComment(
    @Param('id') id: number
  ) {
      return Comment.findOne(id)
    }  


  
    
    
    
    
}
