import { existsSync, ensureDirSync  } from '../deno_modules.ts'

export default class FileUploadService {
  private mineType: string;
  private bytes: Uint8Array;
  private filename: string;

  constructor(file: string, filename: string) {
    const data = file.split(',')
    const bstr = atob(data[1])
    let n = bstr.length;
    
    this.filename = filename;
    this.bytes = new Uint8Array(n);
    this.mineType = (<any>data[0].match(/:(.*?);/))[1]

    this.procesBytes(n, bstr)
    this.verifyFile();
  }

  private procesBytes(n: number, bstr: string) {
    while(n--){
      this.bytes[n] = bstr.charCodeAt(n);
    }
  }

  private verifyFile() {
    const acceptableType = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml', 'application/pdf']
    const file = this.createFileObject();
    
    if (file.size < 1) {
      throw Error('File is empty!')
    }

    if (!acceptableType.includes(file.type)) {
      throw Error('Incorrect file type!')
    }
  }

  public createFileObject() {
    return new File([this.bytes], this.filename, { type:this.mineType });
  }

  public async toFile(path:string = '') {
    const fullPath = `./public/${path}/`

    if(!existsSync(fullPath)) {
      ensureDirSync(fullPath)
    }

    await Deno.writeFile(fullPath + this.filename, this.bytes);
  }
}