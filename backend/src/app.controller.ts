import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/upload-stl-base64')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStlDataUrl(@Body() body: any): Promise<object> {
    let { stl_file } = body
    const uuid_filename = uuidv4()
    console.log({ stl_file })
    await fs.writeFileSync(`./public/${uuid_filename}.stl`, stl_file, 'base64')
    return {
      result: 'uploaded',
      orphan: `${uuid_filename}.stl`,
      orphan_url: `http://localhost:3001/api/public/${uuid_filename}.stl`,
    }
  }

  // @Post('/upload_stl_base64')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadStlDataUrl(@Body() body: any): Promise<object> {
  //   let { stl_file } = body;
  //   const uuid_filename = uuidv4();
  //   console.log({ stl_file });

  //   await fs.writeFileSync(`./public/${uuid_filename}.stl`, stl_file, 'base64');

  //   return {
  //     result: 'uploaded',
  //     orphan: `${uuid_filename}.stl`,
  //     orphan_url: `http://localhost:3000/public/${uuid_filename}.stl`,
  //   };
  // }

  @Post('/post_helloworld')
  getPostHelloworld(@Body() payload: object): object {
    return { hello: 'world' }
  }

  // @Post('upload_stl')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadStl(@UploadedFile() file: Express.Multer.File): Promise<object> {
  //   const uuid_filename = uuidv4();

  //   await fs.writeFileSync(`./public/${uuid_filename}.stl`, file.buffer);

  //   return {
  //     result: 'uploaded',
  //     orphan: `${uuid_filename}.stl`,
  //     orphan_url: `http://localhost:3000/public/${uuid_filename}.stl`,
  //   };
  // }
}
