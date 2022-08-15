import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'

var parseSTL = require('parse-stl')

const config = {
  currency: 'HKD',
  currencySymbol: '$',
  chargeBase: 0,
  chargePercent: 0,
  printer: { '0': 406, '1': 355, '2': 406 },
  fdm: { mm: 0.4, cm: 1.08, inch: 2.7432 },
  sla: { mm: 0.112, cm: 1.12, inch: 2.8448 },
  polyjet: { mm: 0.308, cm: 3.0792, inch: 7.821 },
  fileUploadIteration: 12,
}

const req = { body: config }

const convert = {
  mm: { mm: 1, cm: 0.1, inch: 0.03937 },
  cm: { mm: 10, cm: 1, inch: 0.3937 },
  inch: { mm: 25.4, cm: 2.54, inch: 1 },
}

//function used for calculating volume
function signedVolumeOfTriangle(p1, p2, p3) {
  var v321 = p3.x * p2.y * p1.z
  var v231 = p2.x * p3.y * p1.z
  var v312 = p3.x * p1.y * p2.z
  var v132 = p1.x * p3.y * p2.z
  var v213 = p2.x * p1.y * p3.z
  var v123 = p1.x * p2.y * p3.z
  return (-v321 + v231 + v312 - v132 - v213 + v123) / 6
}

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

    // console.log({ stl_file })

    const STL_FILE_PATH = `./public/${uuid_filename}.stl`
    await fs.writeFileSync(STL_FILE_PATH, stl_file, 'base64')

    // stl price quote testing start

    var stl_buf = fs.readFileSync(STL_FILE_PATH)
    var mesh = parseSTL(stl_buf)

    var positions = mesh.positions
    var objectPolygons = positions.length
    // if (!objectPolygons > 0) {
    if (false) {
      res.send(JSON.stringify({ information: 'file appears to be empty' }))
      return
    }

    let objectVolume = 0
    let dimensionSet = { bottom: 0, top: 0, diff: 0 }
    let dimensions = []
    dimensions[0] = dimensionSet //x
    dimensions[1] = dimensionSet //y
    dimensions[2] = dimensionSet //z

    for (var i = 0; i < objectPolygons; i += 3) {
      let t1 = {}
      t1.x = positions[i + 0][0]
      t1.y = positions[i + 0][1]
      t1.z = positions[i + 0][2]

      let t2 = {}
      t2.x = positions[i + 1][0]
      t2.y = positions[i + 1][1]
      t2.z = positions[i + 1][2]

      let t3 = {}
      t3.x = positions[i + 2][0]
      t3.y = positions[i + 2][1]
      t3.z = positions[i + 2][2]

      //turn up the volume
      objectVolume += signedVolumeOfTriangle(t1, t2, t3)

      //get maximum vertex range to calculate bounding box
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          if (dimensions[j].top < positions[i + k][j]) {
            dimensions[j].top = positions[i + k][j]
          }
          if (dimensions[j].bottom > positions[i + k][j]) {
            dimensions[j].bottom = positions[i + k][j]
          }
        }
      }
    }

    objectVolume = objectVolume * 0.001

    //file passed all validation and was read,
    // so now setting/getting runtime vars (if we'd fail the above then no need to do the below)
    //collect additional passed/set vars
    var clientFeedback = ''
    var printer = req.body.printer
    var unitChoice = 'mm'
    var materialChoice = 'fdm'

    //calculate object box against printbed
    for (var i = 0; i < 3; i++) {
      dimensions[i].diff = dimensions[i].top - dimensions[i].bottom
    }

    for (var i = 0; i < 3; i++) {
      // var d[i].top-(d[i].bottom)
      if (convert[unitChoice]['mm'] * dimensions[i].diff > printer[i]) {
        clientFeedback +=
          '<br>Object larger than print bed on dimension ' +
          i +
          ' (' +
          convert[unitChoice]['mm'] * dimensions[i].diff +
          'mm > ' +
          printer[i] +
          'mm)'
      }
    }

    //cost calculation based on object
    var chargeTotal = 0
    chargeTotal = objectVolume * 1.6
    let { currencySymbol } = config

    //add base charges
    // chargeTotal += chargeTotal * chargeAddPercent //add percentage of cost charge
    // chargeTotal += chargeAddBase //add base charge
    // chargeTotal = chargeTotal.toFixed(2)

    // stl price quote testing end
    return {
      result: 'uploaded',
      orphan: `${uuid_filename}.stl`,
      orphan_url: `http://localhost:3001/api/public/${uuid_filename}.stl`,
      charge: {
        success: true,
        // processInformation: 'file processed' + clientFeedback,
        // processTimeMS: new Date() - timeStart,
        // processServerFilename: filenameServer,
        objectVolume: objectVolume,
        objectPolygons: objectPolygons / 3,
        objectVolumeUnits: objectVolume + ' ' + unitChoice + '<sup>3</sup>',
        objectDimensionsMM: dimensions,
        unitChoice: unitChoice,
        // unitChoiceCost: currencySymbol + unitCharge,
        // chargeAddBase: currencySymbol + chargeAddBase,
        // chargeAddPercent: chargeAddPercent + '%',
        chargeTotal: `${currencySymbol} ${chargeTotal}`,
      },
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
